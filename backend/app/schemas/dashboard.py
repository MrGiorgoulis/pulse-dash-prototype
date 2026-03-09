from pydantic import BaseModel


class CustomerDashboardKPIs(BaseModel):
    active_products: int
    coverage_score_pct: int
    assets_covered: int
    assets_total: int
    events_participated: int
    total_curtailment_delivered_kw: int
    total_revenue: int  # dollars


class CurtailmentByEventItem(BaseModel):
    event: str
    kw: int


class AssetHealthItem(BaseModel):
    status: str
    count: int


class CustomerDashboardResponse(BaseModel):
    kpis: CustomerDashboardKPIs
    curtailment_by_event: list[CurtailmentByEventItem]
    asset_health: list[AssetHealthItem]
