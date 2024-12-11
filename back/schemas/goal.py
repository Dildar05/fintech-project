from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal
from .transactionGoal import TransactionGoalSchema

class GoalSchema(BaseModel):
    id: int
    name: str
    user_id: int
    plan_sum: Decimal
    current_sum: Decimal
    comment: Optional[str]

    class Config:
        orm_mode = True


class GoalCreateSchema(BaseModel):
    name: str
    plan_sum: float
    current_sum: Decimal = Decimal('0')
    comment: str = ""

