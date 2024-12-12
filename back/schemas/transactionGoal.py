from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from decimal import Decimal

class TransactionGoalCreateSchema(BaseModel):
    sum: Decimal
    is_deposit: bool
    date: Optional[datetime] = None

    class Config:
        orm_mode = True

class TransactionGoalSchema(BaseModel):
    id: int
    sum: Decimal
    is_deposit: bool
    goal_id: int
    date: datetime

    class Config:
        orm_mode = True