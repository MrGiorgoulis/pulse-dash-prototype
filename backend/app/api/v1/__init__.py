from fastapi import APIRouter

from app.api.v1 import assets, events, statements, payouts, dashboard
from app.config import settings

api_router = APIRouter(prefix=settings.API_V1_PREFIX)

api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(assets.router, prefix="/assets", tags=["assets"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(statements.router, prefix="/statements", tags=["statements"])
api_router.include_router(payouts.router, prefix="/payouts", tags=["payouts"])
