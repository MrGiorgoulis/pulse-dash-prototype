# PULSE DR API (FastAPI + PostgreSQL)

Backend for the PULSE Demand Response platform.

## Requirements

- Python 3.11+
- PostgreSQL 14+

## Setup

1. **Create a virtualenv and install dependencies**

   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate   # Windows
   # source .venv/bin/activate   # macOS/Linux
   pip install -r requirements.txt
   ```

2. **Start PostgreSQL (Docker)**

   From the project root:

   ```bash
   docker compose up -d
   ```

   This creates the `pulse_dr` database and user `pulse` / password `pulse` (matching `.env.example`). If you use a different Postgres setup, create a database and user accordingly.

3. **Configure environment**

   ```bash
   copy .env.example .env
   # Edit .env and set DATABASE_URL, e.g.:
   # DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/pulse_dr
   ```

4. **Run migrations**

   ```bash
   alembic upgrade head
   ```

5. **Seed sample data (optional)**

   ```bash
   python -m scripts.seed_data
   ```

## Run the API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- API: http://localhost:8000
- OpenAPI docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

| Path                             | Description                            |
| -------------------------------- | -------------------------------------- |
| `GET /health`                    | Health check                           |
| `GET /api/v1/dashboard/customer` | Customer dashboard KPIs and chart data |
| `GET /api/v1/assets`             | List assets                            |
| `GET /api/v1/events`             | List events (customer view)            |
| `GET /api/v1/statements`         | List statements                        |
| `GET /api/v1/payouts`            | List payouts                           |
| `GET /api/v1/payouts/{id}`       | Payout detail                          |

## Project layout

```
backend/
├── app/
│   ├── main.py          # FastAPI app, CORS, lifespan
│   ├── config.py        # Settings from env
│   ├── database.py      # Async engine, session, Base
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic request/response
│   └── api/v1/          # Route modules
├── alembic/             # Migrations
├── scripts/
│   └── seed_data.py     # Dev seed script
├── requirements.txt
├── .env.example
└── README.md
```
