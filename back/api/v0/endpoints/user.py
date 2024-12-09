from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.user import User
from schemas.user import UserSchema, UserCreateSchema
from core.database import get_db

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

@router.get("/users/{user_id}", response_model=UserSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Возвращает пользователя по его id.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user

@router.post("/users", response_model=UserSchema)
def create_user(user: UserCreateSchema, db: Session = Depends(get_db)):
    """
    Создает нового пользователя в базе данных.
    """
    # Проверка, существует ли уже пользователь с таким же email (если нужно)
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")

    # Создание нового пользователя
    new_user = User(
        id = user.id,
        full_name=user.full_name,
        email=user.email,
        password=user.password  # Заменить на хэширование пароля для безопасности
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
