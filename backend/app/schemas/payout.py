from datetime import date
from pydantic import BaseModel


class PayoutResponse(BaseModel):
    id: int
    payout_date: date
    gross_statement_net: int
    imbalance_penalty: int
    adjustments: int
    final_payout: int
    status: str

    class Config:
        from_attributes = True


class PayoutDetail(PayoutResponse):
    """Same as response; used for detail panel."""

    pass


class PayoutList(BaseModel):
    items: list[PayoutResponse]
