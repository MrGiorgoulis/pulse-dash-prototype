from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Site(Base):
    __tablename__ = "sites"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)

    assets: Mapped[list["Asset"]] = relationship("Asset", back_populates="site")


class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    site_id: Mapped[int] = mapped_column(ForeignKey("sites.id"), nullable=False, index=True)
    asset_type: Mapped[str] = mapped_column(String(64), nullable=False)
    dispatchable_range: Mapped[str] = mapped_column(String(64), nullable=False)  # e.g. "50–200 kW"
    control_mode: Mapped[str] = mapped_column(String(64), nullable=False)  # Direct, Setpoint
    coverage_status: Mapped[str] = mapped_column(String(32), nullable=False)  # Covered, Not Covered
    readiness_indicator: Mapped[str] = mapped_column(String(64), nullable=True)  # Ready, —, Calibration Due
    not_covered_reason: Mapped[str | None] = mapped_column(Text, nullable=True)

    site: Mapped["Site"] = relationship("Site", back_populates="assets")
