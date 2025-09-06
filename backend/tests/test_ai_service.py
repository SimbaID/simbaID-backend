from simbaid.services.ai_service import GroqAIService


def test_ai_echo_roundtrip():
    svc = GroqAIService(api_key=None)
    assert svc.echo("hello") == "hello"


def test_ai_service_factory_covered():
    # Cover the trivial _client branch with missing key
    svc = GroqAIService(api_key=None)
    assert svc._client() is None
