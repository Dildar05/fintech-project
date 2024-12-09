from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.user import User
from schemas.user import UserSchema
from core.database import get_db  # Предположим, вы настроили базу данных здесь.

router = APIRouter()

@router.get("/users", response_model=List[UserSchema])
def get_all_users(db: Session = Depends(get_db)):
    """
    Возвращает всех пользователей из базы данных.
    """
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=404, detail="Пользователи не найдены")
    return users
