from datetime import date
from pydantic import BaseModel


class EventResponse(BaseModel):
    id: int
    event_date: date
    window: str
    product: str
    target_kw: int
    delivered_kw: int
    effectiveness_pct: int

    class Config:
        from_attributes = True


class EventList(BaseModel):
    items: list[EventResponse]
