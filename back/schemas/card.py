from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal


class CardSchema(BaseModel):
    id: int
    user_id: int
    term: date
    cvv: str = Field(..., max_length=3, min_length=3)
    

    class Config:
        orm_mode = True


class CardCreateSchema(BaseModel):
    term: date
    cvv: str = Field(..., max_length=3, min_length=3)

