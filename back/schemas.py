from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class UserBase(BaseModel):
    full_name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class GoalBase(BaseModel):
    name: str
    plan_sum: float
    current_sum: float
    comment: Optional[str] = None

class GoalCreate(GoalBase):
    pass

class GoalResponse(GoalBase):
    id: int

    class Config:
        orm_mode = True

class CardBase(BaseModel):
    term_date: date
    cvv: int


class CardCreate(CardBase):
    pass

class CardResponse(CardBase):
    id: int

    class Config:
        orm_mode = True


class TypeTransactionBase(BaseModel):
    name: str

class TypeTransactionCreate(TypeTransactionBase):
    pass

class TypeTransactionResponse(TypeTransactionBase):
    id: int

    class Config:
        orm_mode = True


class TransactionGoalBase(BaseModel):
    sum: float
    date: date
    type_transaction_id: int

class TransactionGoalCreate(TransactionGoalBase):
    pass

class TransactionGoalResponse(TransactionGoalBase):
    id: int

    class Config:
        orm_mode = True

class TransactionCardBase(BaseModel):
    sum: float
    date: date
    type_transaction_id: int

class TransactionCardCreate(TransactionCardBase):
    pass

class TransactionCardResponse(TransactionCardBase):
    id: int

    class Config:
        orm_mode = True