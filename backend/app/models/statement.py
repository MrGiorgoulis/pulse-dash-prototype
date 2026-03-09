from datetime import date
from sqlalchemy import String, Integer, Date
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Statement(Base):
    __tablename__ = "statements"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    statement_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    product: Mapped[str] = mapped_column(String(64), nullable=False)
    gross_curtailment_value: Mapped[int] = mapped_column(Integer, nullable=False)
    revenue_share: Mapped[int] = mapped_column(Integer, nullable=False)
    net_value: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False)  # Paid, Pending
