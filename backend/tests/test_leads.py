"""Backend tests for Island Stampede leads & stats endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get('EXPO_PUBLIC_BACKEND_URL', 'https://island-stampede.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_root(api_client):
    r = api_client.get(f"{API}/")
    assert r.status_code == 200
    assert "Island Stampede" in r.json().get("message", "")


# ---------- Leads: create ----------
def test_create_ticket_lead(api_client):
    payload = {"name": "TEST_Ticket", "email": "test_ticket@example.com",
               "phone": "0400000000", "type": "ticket",
               "party_size": "4", "message": "excited"}
    r = api_client.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["type"] == "ticket"
    assert d["email"] == payload["email"]
    assert d["party_size"] == "4"
    assert "id" in d and "created_at" in d


def test_create_sponsor_lead(api_client):
    payload = {"name": "TEST_Sponsor", "email": "test_sponsor@example.com",
               "type": "sponsor", "company": "AcmeCo"}
    r = api_client.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["type"] == "sponsor"
    assert d["company"] == "AcmeCo"


def test_create_invalid_type(api_client):
    payload = {"name": "TEST_Bad", "email": "bad@example.com", "type": "foo"}
    r = api_client.post(f"{API}/leads", json=payload)
    assert r.status_code == 400


def test_create_missing_name(api_client):
    r = api_client.post(f"{API}/leads", json={"email": "x@example.com", "type": "ticket"})
    assert r.status_code == 422


def test_create_invalid_email(api_client):
    r = api_client.post(f"{API}/leads",
                        json={"name": "X", "email": "not-an-email", "type": "ticket"})
    assert r.status_code == 422


# ---------- Leads: list / filter ----------
def test_list_leads(api_client):
    r = api_client.get(f"{API}/leads")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list) and len(data) >= 1
    assert "_id" not in data[0]  # Mongo _id must be excluded


def test_filter_leads_ticket(api_client):
    r = api_client.get(f"{API}/leads", params={"type": "ticket"})
    assert r.status_code == 200
    for lead in r.json():
        assert lead["type"] == "ticket"


def test_filter_leads_sponsor(api_client):
    r = api_client.get(f"{API}/leads", params={"type": "sponsor"})
    assert r.status_code == 200
    for lead in r.json():
        assert lead["type"] == "sponsor"


# ---------- Stats ----------
def test_stats(api_client):
    r = api_client.get(f"{API}/stats")
    assert r.status_code == 200
    d = r.json()
    assert "ticket_leads" in d and "sponsor_leads" in d
    assert isinstance(d["ticket_leads"], int)
    assert d["ticket_leads"] >= 1 and d["sponsor_leads"] >= 1
