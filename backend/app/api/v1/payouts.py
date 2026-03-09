from sqlalchemy import select

from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.models import Payout
from app.schemas.payout import PayoutResponse, PayoutDetail, PayoutList
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("", response_model=PayoutList)
async def list_payouts(db: AsyncSession = Depends(get_db)) -> PayoutList:
    result = await db.execute(
        select(Payout).order_by(Payout.payout_date.desc())
    )
    payouts = result.scalars().all()
    items = [
        PayoutResponse(
            id=p.id,
            payout_date=p.payout_date,
            gross_statement_net=p.gross_statement_net,
            imbalance_penalty=p.imbalance_penalty,
            adjustments=p.adjustments,
            final_payout=p.final_payout,
            status=p.status,
        )
        for p in payouts
    ]
    return PayoutList(items=items)


@router.get("/{payout_id}", response_model=PayoutDetail)
async def get_payout(payout_id: int, db: AsyncSession = Depends(get_db)) -> PayoutDetail:
    result = await db.execute(select(Payout).where(Payout.id == payout_id))
    payout = result.scalars().first()
    if payout is None:
        raise HTTPException(status_code=404, detail="Payout not found")
    return PayoutDetail(
        id=payout.id,
        payout_date=payout.payout_date,
        gross_statement_net=payout.gross_statement_net,
        imbalance_penalty=payout.imbalance_penalty,
        adjustments=payout.adjustments,
        final_payout=payout.final_payout,
        status=payout.status,
    )
