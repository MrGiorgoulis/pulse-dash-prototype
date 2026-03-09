from datetime import date, time
from sqlalchemy import String, Integer, Date, Time
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    event_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    window_start: Mapped[time] = mapped_column(Time, nullable=False)
    window_end: Mapped[time] = mapped_column(Time, nullable=False)
    product: Mapped[str] = mapped_column(String(64), nullable=False)
    target_kw: Mapped[int] = mapped_column(Integer, nullable=False)
    delivered_kw: Mapped[int] = mapped_column(Integer, nullable=False)
