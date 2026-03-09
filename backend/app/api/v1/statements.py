from sqlalchemy import select

from fastapi import APIRouter, Depends
from app.database import get_db
from app.models import Statement
from app.schemas.statement import StatementResponse, StatementList
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("", response_model=StatementList)
async def list_statements(db: AsyncSession = Depends(get_db)) -> StatementList:
    result = await db.execute(
        select(Statement).order_by(Statement.statement_date.desc())
    )
    statements = result.scalars().all()
    items = [
        StatementResponse(
            id=s.id,
            statement_date=s.statement_date,
            product=s.product,
            gross_curtailment_value=s.gross_curtailment_value,
            revenue_share=s.revenue_share,
            net_value=s.net_value,
            status=s.status,
        )
        for s in statements
    ]
    return StatementList(items=items)
