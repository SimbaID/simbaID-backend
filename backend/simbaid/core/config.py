from pydantic import Field
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    env: str = Field(default="dev")
    groq_api_key: str | None = Field(default=None, env="GROQ_API_KEY")

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache(maxsize=1)
def get_settings() -> "Settings":
    return Settings()  # type: ignore[call-arg]


settings = get_settings()
