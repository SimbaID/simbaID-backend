from simbaid.core.app import app
from fastapi.testclient import TestClient


def test_health_endpoint():
    c = TestClient(app)
    res = c.get("/api/v1/health")
    assert res.status_code == 200
    data = res.json()
    assert data == {"status": "ok"}
