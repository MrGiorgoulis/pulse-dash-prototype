from sqlalchemy import select
from sqlalchemy.orm import selectinload

from fastapi import APIRouter, Depends
from app.database import get_db
from app.models import Asset
from app.schemas.asset import AssetResponse, AssetList
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("", response_model=AssetList)
async def list_assets(db: AsyncSession = Depends(get_db)) -> AssetList:
    result = await db.execute(
        select(Asset).options(selectinload(Asset.site)).order_by(Asset.name)
    )
    assets = result.scalars().all()
    items = [
        AssetResponse(
            id=a.id,
            name=a.name,
            site=a.site.name,
            asset_type=a.asset_type,
            dispatchable_range=a.dispatchable_range,
            control_mode=a.control_mode,
            coverage_status=a.coverage_status,
            readiness_indicator=a.readiness_indicator,
            not_covered_reason=a.not_covered_reason if a.coverage_status == "Not Covered" else None,
        )
        for a in assets
    ]
    return AssetList(items=items)
