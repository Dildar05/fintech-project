from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.user import User
from schemas.user import UserSchema, UserCreateSchema, UserLoginSchema, UserLoginLocalstorageSchema, UserChangePasswordSchema
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
        full_name=user.full_name,
        email=user.email,
        password=user.password,  # Заменить на хэширование пароля для безопасности
        phone=user.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/auth/register", response_model=UserSchema)
def register(user: UserCreateSchema, db: Session = Depends(get_db)):
    """
    Регистрация нового пользователя.
    """
    # Проверка, существует ли уже пользователь с таким же email (если нужно)
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")

    existing_phone = db.query(User).filter(User.phone == user.phone).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Пользователь с таким номером телефона уже существует")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=user.password,  
        phone=user.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/auth/login", response_model=UserLoginLocalstorageSchema)
def login(user: UserLoginSchema, db: Session = Depends(get_db)):
    """
    Авторизация пользователя.
    """
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=400, detail="Пользователь не найден")

    if existing_user.password != user.password:
        raise HTTPException(status_code=400, detail="Неверный пароль")

    return existing_user

@router.put("users/{user_id}/change_password")
def change_password(user_id: int, user: UserChangePasswordSchema, db: Session = Depends(get_db)):
    """
    Изменение пароля пользователя.
    """
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if existing_user.password != user.curr_password:
        raise HTTPException(status_code=400, detail="Неверный текущий пароль")

    if user.new_password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Пароли не совпадают")

    existing_user.password = user.new_password
    db.commit()
    db.refresh(existing_user)

    return existing_user