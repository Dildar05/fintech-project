from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal


class TypeTransactionSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class TypeTransactionCreateSchema(BaseModel):
    name: str