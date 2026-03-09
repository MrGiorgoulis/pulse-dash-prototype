from pydantic import BaseModel


class AssetResponse(BaseModel):
    id: int
    name: str
    site: str
    asset_type: str
    dispatchable_range: str
    control_mode: str
    coverage_status: str
    readiness_indicator: str | None
    not_covered_reason: str | None = None

    class Config:
        from_attributes = True


class AssetList(BaseModel):
    items: list[AssetResponse]
