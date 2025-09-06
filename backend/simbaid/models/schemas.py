from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class AIRequest(BaseModel):
    text: str


class AIResponse(BaseModel):
    reply: str


class TestAllResponse(BaseModel):
    health: bool
    ai: bool
