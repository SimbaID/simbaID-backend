import os
import pytest
from fastapi.testclient import TestClient
from simbaid.core.app import app


@pytest.fixture(scope="session", autouse=True)
def set_env():
    os.environ.setdefault("ENV", "test")
    # Avoid requiring real external keys
    os.environ.setdefault("GROQ_API_KEY", "test-key")
    yield


@pytest.fixture()
def client():
    return TestClient(app)
