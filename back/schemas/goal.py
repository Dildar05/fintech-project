from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from decimal import Decimal
from .transactionGoal import TransactionGoalSchema

class GoalSchema(BaseModel):
    id: int
    name: str
    user_id: int
    plan_sum: Decimal
    current_sum: Decimal
    comment: Optional[str] = None

    class Config:
        orm_mode = True


class GoalCreateSchema(BaseModel):
    name: str
    plan_sum: Decimal
    current_sum: Optional[Decimal] = Decimal('0')
    comment: Optional[str] = ""

    class Config:
        orm_mode = True
        
class GoalUpdateSchema(BaseModel):
    name: Optional[str] = None
    plan_sum: Optional[float] = None
    current_sum: Optional[float] = None

    class Config:
        orm_mode = True