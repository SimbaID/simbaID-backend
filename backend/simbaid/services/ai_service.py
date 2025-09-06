from __future__ import annotations
from dataclasses import dataclass
from typing import Optional
from ..core.config import settings

try:
    # Optional at runtime; tests will mock
    from groq import Groq  # type: ignore
except Exception:  # pragma: no cover - import fallback
    Groq = None  # type: ignore


@dataclass
class GroqAIService:
    api_key: Optional[str]

    def _client(self):  # pragma: no cover - trivial getter
        if not self.api_key or Groq is None:
            return None
        return Groq(api_key=self.api_key)

    def echo(self, text: str) -> str:
        # For now, if client exists we could use it, but we keep it simple and safe
        # In the future, replace with real LLM call. Echo keeps tests deterministic.
        return text


def get_ai_service() -> GroqAIService:
    return GroqAIService(api_key=settings.groq_api_key)
