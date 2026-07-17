from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, BeforeValidator
from typing import List, Optional, Annotated
from datetime import datetime, timezone
from pathlib import Path
import os, logging, uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(title="Island Stampede API")
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------- Models ----------
class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    type: str = Field(description="'ticket' or 'sponsor'")
    party_size: Optional[str] = ""
    company: Optional[str] = ""
    message: Optional[str] = ""


class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Island Stampede API live", "event": "LET'S RIDE TASMANIA"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    if payload.type not in ("ticket", "sponsor"):
        raise HTTPException(status_code=400, detail="type must be 'ticket' or 'sponsor'")
    lead = Lead(**payload.dict())
    await db.leads.insert_one(lead.dict())
    logger.info(f"New {lead.type} lead: {lead.email}")
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(type: Optional[str] = None):
    query = {"type": type} if type else {}
    docs = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Lead(**d) for d in docs]


@api_router.get("/stats")
async def stats():
    tickets = await db.leads.count_documents({"type": "ticket"})
    sponsors = await db.leads.count_documents({"type": "sponsor"})
    return {"ticket_leads": tickets, "sponsor_leads": sponsors}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
