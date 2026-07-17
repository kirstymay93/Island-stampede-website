import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
API_KEY = os.getenv("EMERGENT_LLM_KEY")
OUT = "/app/frontend/assets/images"

BASE = ("High-end cinematic sports photography, professional indoor bull riding event. "
        "Electric blue (#0A44FF) stadium spotlights, deep black arena, dramatic haze and lens flare, "
        "modern premium sports-entertainment aesthetic like UFC / Formula 1 / Red Bull. "
        "Motion, adrenaline, sharp focus, high contrast, 4k, ultra detailed. "
        "NOT rustic, NOT country, NOT farm, no vintage western styling.")

JOBS = {
    "hero": "A professional bull rider mid-ride on a powerful bucking bull in a packed modern indoor arena, dust flying, dramatic electric blue spotlights, wide cinematic shot, epic hero angle. " + BASE,
    "gallery1": "Close dynamic action shot of a bull rider gripping the rope as the bull leaps, muscles and dust, blue rim lighting. " + BASE,
    "gallery2": "A massive bull bucking violently in a spotlight, rider silhouette, crowd blurred in background, energetic. " + BASE,
    "gallery3": "Victorious bull rider standing in arena with arms raised, confetti and blue smoke, celebration moment. " + BASE,
    "gallery4": "Wide shot of the packed indoor Silverdome-style arena from above, electric blue lighting sweeping the crowd, arena floor lit. " + BASE,
}

async def gen(name, prompt):
    chat = LlmChat(api_key=API_KEY, session_id=f"stampede-{name}", system_message="Image generator")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    _, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        with open(f"{OUT}/{name}.png", "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print(f"OK {name}")
    else:
        print(f"FAIL {name}")

async def main():
    for n, p in JOBS.items():
        try:
            await gen(n, p)
        except Exception as e:
            print(f"ERR {n}: {e}")

asyncio.run(main())
