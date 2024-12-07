# schemas.py

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class UserBase(BaseModel):
    full_name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True  

class GoalBase(BaseModel):
    name: str
    plan_sum: float
    current_sum: float
    comment: Optional[str] = None

class GoalCreate(BaseModel):
    user_id: int
    name: str
    plan_sum: float
    comment: Optional[str] = None


class GoalResponse(GoalBase):
    id: int

    class Config:
        from_attributes = True  

class CardBase(BaseModel):
    term_date: date
    cvv: int

class CardCreate(CardBase):
    pass

class CardResponse(CardBase):
    id: int

    class Config:
        from_attributes = True  

class TypeTransactionBase(BaseModel):
    name: str

class TypeTransactionCreate(TypeTransactionBase):
    pass

class TypeTransactionResponse(TypeTransactionBase):
    id: int

    class Config:
        from_attributes = True  

class TransactionGoalBase(BaseModel):
    sum: float
    date: date
    type_transaction_id: int

class TransactionGoalCreate(TransactionGoalBase):
    pass

class TransactionGoalResponse(TransactionGoalBase):
    id: int

    class Config:
        from_attributes = True  

class TransactionCardBase(BaseModel):
    sum: float
    date: date
    type_transaction_id: int

class TransactionCardCreate(TransactionCardBase):
    pass

class TransactionCardResponse(TransactionCardBase):
    id: int

    class Config:
        from_attributes = True  


# Добавляем модель Token
class Token(BaseModel):
    access_token: str
    token_type: str


# Добавляем модель UserInDB
class UserInDB(UserBase):
    id: int

    class Config:
        from_attributes = True  