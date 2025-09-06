import importlib

def test_package_import_and_version():
    pkg = importlib.import_module("simbaid")
    assert hasattr(pkg, "__version__")
