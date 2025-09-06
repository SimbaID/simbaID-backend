from simbaid.utils.logger import get_logger


def test_get_logger_branches():
    # First call should add a handler
    logger1 = get_logger("simbaid.test")
    assert logger1.handlers
    # Second call hits the branch where handlers already exist
    logger2 = get_logger("simbaid.test")
    assert logger2.handlers
    assert logger1 is logger2
