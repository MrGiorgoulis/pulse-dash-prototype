"""Initial schema: sites, assets, events, statements, payouts

Revision ID: 001
Revises:
Create Date: 2026-03-09

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "sites",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_sites_name"), "sites", ["name"], unique=False)

    op.create_table(
        "assets",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("site_id", sa.Integer(), nullable=False),
        sa.Column("asset_type", sa.String(length=64), nullable=False),
        sa.Column("dispatchable_range", sa.String(length=64), nullable=False),
        sa.Column("control_mode", sa.String(length=64), nullable=False),
        sa.Column("coverage_status", sa.String(length=32), nullable=False),
        sa.Column("readiness_indicator", sa.String(length=64), nullable=True),
        sa.Column("not_covered_reason", sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(["site_id"], ["sites.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_assets_name"), "assets", ["name"], unique=False)
    op.create_index(op.f("ix_assets_site_id"), "assets", ["site_id"], unique=False)

    op.create_table(
        "events",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("event_date", sa.Date(), nullable=False),
        sa.Column("window_start", sa.Time(), nullable=False),
        sa.Column("window_end", sa.Time(), nullable=False),
        sa.Column("product", sa.String(length=64), nullable=False),
        sa.Column("target_kw", sa.Integer(), nullable=False),
        sa.Column("delivered_kw", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_events_event_date"), "events", ["event_date"], unique=False)

    op.create_table(
        "statements",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("statement_date", sa.Date(), nullable=False),
        sa.Column("product", sa.String(length=64), nullable=False),
        sa.Column("gross_curtailment_value", sa.Integer(), nullable=False),
        sa.Column("revenue_share", sa.Integer(), nullable=False),
        sa.Column("net_value", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_statements_statement_date"), "statements", ["statement_date"], unique=False)

    op.create_table(
        "payouts",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("payout_date", sa.Date(), nullable=False),
        sa.Column("gross_statement_net", sa.Integer(), nullable=False),
        sa.Column("imbalance_penalty", sa.Integer(), nullable=False),
        sa.Column("adjustments", sa.Integer(), nullable=False),
        sa.Column("final_payout", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_payouts_payout_date"), "payouts", ["payout_date"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_payouts_payout_date"), table_name="payouts")
    op.drop_table("payouts")
    op.drop_index(op.f("ix_statements_statement_date"), table_name="statements")
    op.drop_table("statements")
    op.drop_index(op.f("ix_events_event_date"), table_name="events")
    op.drop_table("events")
    op.drop_index(op.f("ix_assets_site_id"), table_name="assets")
    op.drop_index(op.f("ix_assets_name"), table_name="assets")
    op.drop_table("assets")
    op.drop_index(op.f("ix_sites_name"), table_name="sites")
    op.drop_table("sites")
