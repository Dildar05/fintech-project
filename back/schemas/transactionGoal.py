from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal

class TransactionGoalSchema(BaseModel):
    id: int
    sum: Decimal
    goal_id: int
    date: datetime
    type_transaction: int

    class Config:
        orm_mode = True


class TransactionGoalCreateSchema(BaseModel):
    sum: Decimal
    goal_id: int
    date: datetime
    type_transaction: int