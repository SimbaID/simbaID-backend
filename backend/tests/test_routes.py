from fastapi.testclient import TestClient
from simbaid.core.app import app


def test_testall_endpoint():
    client = TestClient(app)
    res = client.get("/api/v1/testall")
    assert res.status_code == 200
    data = res.json()
    assert data.get("health") is True
    assert data.get("ai") is True


def test_ai_echo_endpoint():
    client = TestClient(app)
    res = client.post("/api/v1/ai/echo", json={"text": "Simba"})
    assert res.status_code == 200
    assert res.json()["reply"] == "Simba"
