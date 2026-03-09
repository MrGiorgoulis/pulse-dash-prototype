from datetime import time
from sqlalchemy import select

from fastapi import APIRouter, Depends
from app.database import get_db
from app.models import Event
from app.schemas.event import EventResponse, EventList
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


def _format_window(start: time, end: time) -> str:
    return f"{start.strftime('%H:%M')} – {end.strftime('%H:%M')}"


@router.get("", response_model=EventList)
async def list_events(db: AsyncSession = Depends(get_db)) -> EventList:
    result = await db.execute(
        select(Event).order_by(Event.event_date.desc())
    )
    events = result.scalars().all()
    items = [
        EventResponse(
            id=e.id,
            event_date=e.event_date,
            window=_format_window(e.window_start, e.window_end),
            product=e.product,
            target_kw=e.target_kw,
            delivered_kw=e.delivered_kw,
            effectiveness_pct=round((e.delivered_kw / e.target_kw * 100) if e.target_kw else 0),
        )
        for e in events
    ]
    return EventList(items=items)
