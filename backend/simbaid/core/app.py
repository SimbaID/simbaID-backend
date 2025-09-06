from fastapi import FastAPI
from ..utils.logger import get_logger
from .config import settings
from ..api.v1.routes import router as v1_router

logger = get_logger(__name__)


def create_app() -> FastAPI:
    app = FastAPI(title="SimbaID Backend", version="0.1.0")
    app.include_router(v1_router, prefix="/api/v1")

    return app


app = create_app()
