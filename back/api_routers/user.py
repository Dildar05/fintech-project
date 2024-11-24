from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User  # Модель SQLAlchemy
from database import get_db  # Получение сессии базы данных

# Создаем объект APIRouter для маршрутов пользователей
api_routers = APIRouter(prefix="/users", tags=["users"])

@api_routers.post("/", response_model=dict)
def create_user(full_name: str, email: str, password: str, db: Session = Depends(get_db)):
    """
    Создание нового пользователя.
    """
    # Проверяем, существует ли пользователь с таким email
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Создаем нового пользователя
    new_user = User(full_name=full_name, email=email, password=password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "full_name": new_user.full_name, "email": new_user.email}

@api_routers.get("/{user_id}", response_model=dict)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Получение пользователя по ID.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user.id, "full_name": user.full_name, "email": user.email}
