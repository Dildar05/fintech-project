from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal
from .goal import GoalSchema
from .card import CardSchema

class UserSchema(BaseModel):
    id: int
    full_name: Optional[str]
    email: EmailStr
    goals: List[GoalSchema] = []
    cards: List[CardSchema] = []

    class Config:
        orm_mode = True


class UserCreateSchema(BaseModel):
    full_name: Optional[str]
    email: EmailStr
    password: str

