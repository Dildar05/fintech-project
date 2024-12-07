from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User, Goal  # Ensure Goal model is imported
from database import get_db 

user_router = APIRouter(prefix="/users", tags=["users"])

@user_router.post("/", response_model=dict)
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

@user_router.get("/{user_id}", response_model=dict)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Получение пользователя по ID.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user.id, "full_name": user.full_name, "email": user.email}


# добавь чтобы по id user можно было получить 
@user_router.get("/{user_id}/goals", response_model=list)
def get_user_goals(user_id: int, db: Session = Depends(get_db)):
    """
    Получение целей пользователя по ID.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    goals = user.goals  # Assuming `goals` is a relationship attribute in the User model
    return [{"id": goal.id, "description": goal.description, "completed": goal.completed} for goal in goals]