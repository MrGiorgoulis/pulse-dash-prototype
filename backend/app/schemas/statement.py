from datetime import date
from pydantic import BaseModel


class StatementResponse(BaseModel):
    id: int
    statement_date: date
    product: str
    gross_curtailment_value: int
    revenue_share: int
    net_value: int
    status: str

    class Config:
        from_attributes = True


class StatementList(BaseModel):
    items: list[StatementResponse]
