from fastapi import APIRouter, Depends
from ...models.schemas import HealthResponse, TestAllResponse, AIRequest, AIResponse
from ...services.ai_service import GroqAIService, get_ai_service

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@router.post("/ai/echo", response_model=AIResponse)
def ai_echo(payload: AIRequest, ai: GroqAIService = Depends(get_ai_service)) -> AIResponse:
    # For MVP, just echo via AI service passthrough
    reply = ai.echo(payload.text)
    return AIResponse(reply=reply)


@router.get("/testall", response_model=TestAllResponse)
def test_all(ai: GroqAIService = Depends(get_ai_service)) -> TestAllResponse:
    # Simple end-to-end check: health + minimal AI call
    health_ok = True
    ai_ok = ai.echo("ping") == "ping"
    return TestAllResponse(health=health_ok, ai=ai_ok)
