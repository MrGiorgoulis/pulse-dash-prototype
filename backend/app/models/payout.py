from datetime import date
from sqlalchemy import String, Integer, Date
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Payout(Base):
    __tablename__ = "payouts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    payout_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    gross_statement_net: Mapped[int] = mapped_column(Integer, nullable=False)
    imbalance_penalty: Mapped[int] = mapped_column(Integer, nullable=False)
    adjustments: Mapped[int] = mapped_column(Integer, nullable=False)  # can be negative
    final_payout: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False)  # Completed, Processing
