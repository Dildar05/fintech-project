from typing import Optional

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str

    class Config:
        orm_mode = True


class UserCreateSchema(BaseModel):
    full_name: str
    email: str
    password: str
    phone: str


class UserLoginSchema(BaseModel):
    email: str
    password: str

class UserLoginLocalstorageSchema(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    
    class Config:
        orm_mode = True
class UserChangePasswordSchema(BaseModel):
    curr_password: str
    new_password: str
    confirm_password: str