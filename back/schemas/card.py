from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal
from .transactionCard import TransactionCardSchema

class CardSchema(BaseModel):
    id: int
    user_id: int
    term: date
    cvv: str = Field(..., max_length=3, min_length=3)
    transactions: List[TransactionCardSchema] = []

    class Config:
        orm_mode = True


class CardCreateSchema(BaseModel):
    term: date
    cvv: str = Field(..., max_length=3, min_length=3)

