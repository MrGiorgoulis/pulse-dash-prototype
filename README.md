# PULSE DR

Demand response platform prototype: React frontend + FastAPI backend + PostgreSQL.

## Prerequisites

- **Node.js** 18+ and npm (for the frontend)
- **Python** 3.11+ (for the backend)
- **Docker** and Docker Compose (for PostgreSQL)

## Clone and run (first time)

### 1. Clone the repo

```bash
git clone <repository-url>
cd pulse-dash-prototype
```

### 2. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

This starts Postgres with database `pulse_dr` and user `pulse` / password `pulse`.

### 3. Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
copy .env.example .env          # Windows (or cp on macOS/Linux)
# .env already has DATABASE_URL for Docker; change if needed

alembic upgrade head
python -m scripts.seed_data     # optional: sample data for customer portal
```

### 4. Frontend setup

From the project root (new terminal if needed):

```bash
cd frontend
npm install
copy .env.example .env          # Windows (or cp on macOS/Linux)
# .env sets VITE_API_BASE_URL=http://localhost:8000
```

---

## Run the app (after setup)

1. **Postgres** (if not already running):

   ```bash
   docker compose up -d
   ```

2. **Backend** (from `backend/` with venv activated):

   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

3. **Frontend** (from `frontend/`):

   ```bash
   npm run dev
   ```

4. Open the app (e.g. http://localhost:5173). Use the role selector (top right) to switch between **Operator** and **Customer Admin** / **Customer Viewer**. Customer views use the API and database.

- **API docs:** http://localhost:8000/docs
- **Health:** http://localhost:8000/health

---

## Project layout

| Path                 | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `frontend/`          | React (Vite) + TypeScript UI; customer portal and operator dashboard |
| `backend/`           | FastAPI + SQLAlchemy (async) + PostgreSQL                            |
| `docker-compose.yml` | PostgreSQL 16 container                                              |

See `backend/README.md` for API details and `frontend/` for UI tooling.
