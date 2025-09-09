# SimbaID — Voice-Biometric DID

A modular, offline-first identity platform using voice biometrics and zero-knowledge proofs. This repository contains:

- Backend FastAPI service (`backend/`) with modular packages (`api`, `core`, `services`, `models`, `utils`).
- Full pytest test suite targeting 100% coverage.
- Contracts project (`contracts/`) with a sample Solidity contract and Hardhat tests.
- Demo script and environment configuration.

## Directory Structure

- `backend/`
  - `simbaid/`
    - `api/v1/routes.py` — HTTP endpoints (`/health`, `/ai/echo`, `/testall`).
    - `core/app.py` — FastAPI application factory and router wiring.
    - `core/config.py` — Pydantic settings with `.env` support.
    - `services/ai_service.py` — Groq AI service stub (echo; safe for tests).
    - `models/schemas.py` — Pydantic request/response models.
    - `utils/logger.py` — Minimal logging helper.
  - `tests/` — Pytest suite with coverage enforced at 100%.
  - `pyproject.toml`, `setup.py`, `pytest.ini`, `environment.yml`, `.env.example`, `.env`.
  - `run.py` — Launches uvicorn dev server.
  - `api_demo.py` — cURL demo that hits `/api/v1/testall`.
- `contracts/`
  - `contracts/SimbaID.sol` — Simple DID registry sample.
  - `test/simbaid.test.js` — Hardhat tests.
  - `hardhat.config.js`, `package.json`.
- `SimbaIDPRD.md` — Product Requirements Document.
 - `frontend/` — Forked web frontend based on `simbaID-ff`.

## Prerequisites

- Python 3.11 (managed via Conda)
- Node.js LTS (for Hardhat)

## Backend — Setup (Conda venv)

1) Create and activate the Conda env:

```bash
conda env create -f backend/environment.yml
conda activate simbaid
```

2) (Optional) Install package in editable mode:

```bash
python -m pip install -e backend
```

3) Configure environment variables:

- Copy `backend/.env.example` to `backend/.env` and set values.
- Required: `GROQ_API_KEY` (optional for local since AI is stubbed as echo).

```bash
cp backend/.env.example backend/.env
# edit backend/.env
```

4) Run the API locally:

```bash
python backend/run.py
# or
uvicorn simbaid.core.app:app --host 0.0.0.0 --port 8000 --reload
```

5) Try the demo cURL:

```bash
python backend/api_demo.py
# or
curl -s http://localhost:8000/api/v1/testall | jq
```

Endpoints:
- `GET /api/v1/health` → `{ "status": "ok" }`
- `POST /api/v1/ai/echo` → `{ "reply": "<text>" }` with body `{ "text": "hello" }`
- `GET /api/v1/testall` → Checks health and AI echo end-to-end

## Backend — Tests and Coverage (100%)

```bash
cd backend
pytest
```

- Coverage settings are in `backend/pytest.ini` with `--cov-fail-under=100`.
- The AI service is a safe echo stub to keep tests deterministic.

## Contracts — Setup and Test

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

The sample contract `SimbaID.sol` demonstrates a minimal DID registry:
- `register(did, voiceHash)` stores a DID and a hash of the voice embedding.
- `get(address)` returns the stored DID and hash.

## Support

Open issues or reach out with feature requests. Contributions welcome.
