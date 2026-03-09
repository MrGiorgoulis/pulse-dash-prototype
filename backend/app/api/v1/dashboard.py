from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends
from app.database import get_db
from app.models import Asset, Event, Statement, Payout
from app.schemas.dashboard import (
    CustomerDashboardResponse,
    CustomerDashboardKPIs,
    CurtailmentByEventItem,
    AssetHealthItem,
)

router = APIRouter()


@router.get("/customer", response_model=CustomerDashboardResponse)
async def get_customer_dashboard(db: AsyncSession = Depends(get_db)) -> CustomerDashboardResponse:
    """Customer dashboard KPIs and chart data."""
    # KPIs: aggregate from DB (or return defaults if empty)
    total_assets = await db.scalar(select(func.count(Asset.id)))
    covered_assets = await db.scalar(
        select(func.count(Asset.id)).where(Asset.coverage_status == "Covered")
    )
    total_assets = total_assets or 0
    covered_assets = covered_assets or 0
    coverage_pct = round((covered_assets / total_assets * 100) if total_assets else 0)

    events_count = await db.scalar(select(func.count(Event.id))) or 0
    curtailment_result = await db.execute(
        select(func.coalesce(func.sum(Event.delivered_kw), 0)).select_from(Event)
    )
    total_curtailment_kw = curtailment_result.scalar() or 0

    revenue_result = await db.execute(
        select(func.coalesce(func.sum(Payout.final_payout), 0)).select_from(Payout)
    )
    total_revenue = revenue_result.scalar() or 0

    kpis = CustomerDashboardKPIs(
        active_products=3,
        coverage_score_pct=coverage_pct,
        assets_covered=covered_assets,
        assets_total=total_assets,
        events_participated=events_count,
        total_curtailment_delivered_kw=total_curtailment_kw,
        total_revenue=total_revenue,
    )

    # Curtailment by event: top events by delivered_kw
    events_rows = await db.execute(
        select(Event)
        .order_by(Event.event_date.desc(), Event.delivered_kw.desc())
        .limit(10)
    )
    events_list = events_rows.scalars().all()
    curtailment_by_event = [
        CurtailmentByEventItem(
            event=f"{e.product} {e.event_date}",
            kw=e.delivered_kw,
        )
        for e in events_list
    ]
    if not curtailment_by_event:
        curtailment_by_event = [
            CurtailmentByEventItem(event="Summer Peak DR", kw=420),
            CurtailmentByEventItem(event="Grid Emergency #4", kw=380),
        ]

    # Asset health: group by readiness_indicator
    health_rows = await db.execute(
        select(Asset.readiness_indicator, func.count(Asset.id))
        .where(Asset.readiness_indicator.isnot(None))
        .group_by(Asset.readiness_indicator)
    )
    asset_health = [
        AssetHealthItem(status=row[0] or "Unknown", count=row[1])
        for row in health_rows.all()
    ]
    if not asset_health:
        asset_health = [
            AssetHealthItem(status="Ready", count=42),
            AssetHealthItem(status="Needs Calibration", count=8),
        ]

    return CustomerDashboardResponse(
        kpis=kpis,
        curtailment_by_event=curtailment_by_event,
        asset_health=asset_health,
    )
