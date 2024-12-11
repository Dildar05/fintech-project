from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal
from .goal import GoalSchema
from .card import CardSchema

class UserSchema(BaseModel):
    full_name: Optional[str]
    email: EmailStr
    phone: Optional[str]

    class Config:
        orm_mode = True


class UserCreateSchema(BaseModel):
    full_name: Optional[str]
    email: EmailStr
    password: str
    phone: Optional[str]
    
class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserLoginLocalstorageSchema(BaseModel):
    id:int
