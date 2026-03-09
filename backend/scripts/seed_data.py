"""
Seed database with sample data for development.
Run from backend dir: python -m scripts.seed_data
Requires: DATABASE_URL set and tables created (uvicorn or alembic upgrade head).
"""
import asyncio
from datetime import date, time

from sqlalchemy import select
from app.database import AsyncSessionLocal, engine
from app.models import Site, Asset, Event, Statement, Payout


async def seed() -> None:
    async with AsyncSessionLocal() as db:
        # Skip if already seeded
        n = await db.scalar(select(Asset.id))
        if n is not None:
            print("Data already present, skipping seed.")
            return

        # Sites
        site_alpha = Site(name="Site Alpha")
        site_beta = Site(name="Site Beta")
        site_gamma = Site(name="Site Gamma")
        db.add_all([site_alpha, site_beta, site_gamma])
        await db.flush()

        # Assets
        assets = [
            Asset(
                name="HVAC Unit A1",
                site_id=site_alpha.id,
                asset_type="HVAC",
                dispatchable_range="50–200 kW",
                control_mode="Direct",
                coverage_status="Covered",
                readiness_indicator="Ready",
                not_covered_reason=None,
            ),
            Asset(
                name="Chiller Block B",
                site_id=site_alpha.id,
                asset_type="Chiller",
                dispatchable_range="100–400 kW",
                control_mode="Setpoint",
                coverage_status="Covered",
                readiness_indicator="Ready",
                not_covered_reason=None,
            ),
            Asset(
                name="Pump Station E",
                site_id=site_beta.id,
                asset_type="Pump",
                dispatchable_range="80–280 kW",
                control_mode="Setpoint",
                coverage_status="Not Covered",
                readiness_indicator="—",
                not_covered_reason="This asset requires comfort boundary settings before it can participate.",
            ),
            Asset(
                name="Compressor G",
                site_id=site_gamma.id,
                asset_type="Compressor",
                dispatchable_range="60–220 kW",
                control_mode="Direct",
                coverage_status="Not Covered",
                readiness_indicator="—",
                not_covered_reason="This asset requires comfort boundary settings before it can participate.",
            ),
            Asset(
                name="Boiler H",
                site_id=site_gamma.id,
                asset_type="Boiler",
                dispatchable_range="100–350 kW",
                control_mode="Setpoint",
                coverage_status="Covered",
                readiness_indicator="Calibration Due",
                not_covered_reason=None,
            ),
        ]
        db.add_all(assets)

        # Events
        events = [
            Event(
                event_date=date(2026, 3, 9),
                window_start=time(14, 0),
                window_end=time(16, 0),
                product="Day-Ahead",
                target_kw=450,
                delivered_kw=420,
            ),
            Event(
                event_date=date(2026, 3, 8),
                window_start=time(10, 0),
                window_end=time(12, 0),
                product="Real-Time",
                target_kw=300,
                delivered_kw=255,
            ),
            Event(
                event_date=date(2026, 3, 7),
                window_start=time(15, 0),
                window_end=time(17, 0),
                product="Emergency",
                target_kw=500,
                delivered_kw=340,
            ),
            Event(
                event_date=date(2026, 3, 5),
                window_start=time(9, 0),
                window_end=time(11, 0),
                product="Day-Ahead",
                target_kw=400,
                delivered_kw=378,
            ),
        ]
        db.add_all(events)

        # Statements
        statements = [
            Statement(
                statement_date=date(2026, 3, 8),
                product="Day-Ahead",
                gross_curtailment_value=1840,
                revenue_share=368,
                net_value=1472,
                status="Paid",
            ),
            Statement(
                statement_date=date(2026, 3, 1),
                product="Real-Time",
                gross_curtailment_value=920,
                revenue_share=184,
                net_value=736,
                status="Paid",
            ),
            Statement(
                statement_date=date(2026, 2, 22),
                product="Day-Ahead",
                gross_curtailment_value=2100,
                revenue_share=420,
                net_value=1680,
                status="Pending",
            ),
        ]
        db.add_all(statements)

        # Payouts (store amounts in dollars)
        payouts = [
            Payout(
                payout_date=date(2026, 3, 10),
                gross_statement_net=4520,
                imbalance_penalty=120,
                adjustments=0,
                final_payout=4400,
                status="Completed",
            ),
            Payout(
                payout_date=date(2026, 3, 3),
                gross_statement_net=2890,
                imbalance_penalty=0,
                adjustments=50,
                final_payout=2940,
                status="Completed",
            ),
            Payout(
                payout_date=date(2026, 2, 25),
                gross_statement_net=1680,
                imbalance_penalty=45,
                adjustments=-30,
                final_payout=1605,
                status="Processing",
            ),
        ]
        db.add_all(payouts)

        await db.commit()
        print("Seed completed.")


def main() -> None:
    asyncio.run(seed())
    asyncio.run(engine.dispose())


if __name__ == "__main__":
    main()
