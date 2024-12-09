from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal

class TransactionCardSchema(BaseModel):
    id: int
    sum: Decimal
    card_id: int
    date: datetime
    type_transaction: int

    class Config:
        orm_mode = True


class TransactionCardCreateSchema(BaseModel):
    sum: Decimal
    card_id: int
    date: datetime
    type_transaction: int