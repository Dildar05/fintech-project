from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Goal  # Модель SQLAlchemy для цели
from database import get_db  # Получение сессии базы данных

# Создаем объект APIRouter для маршрутов целей
goal_router = APIRouter(prefix="/goals", tags=["goals"])

@goal_router.post("/", response_model=dict)
def create_goal(user_id: int, name: str, plan_sum: float, comment: str = "", db: Session = Depends(get_db)):
    """
    Создание новой цели.
    """
    # Создаем новую цель
    new_goal = Goal(user_id=user_id, name=name, plan_sum=plan_sum, current_sum=0, comment=comment)
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return {
        "id": new_goal.id,
        "user_id": new_goal.user_id,
        "name": new_goal.name,
        "plan_sum": str(new_goal.plan_sum),
        "current_sum": str(new_goal.current_sum),
        "comment": new_goal.comment
    }

@goal_router.get("/{goal_id}", response_model=dict)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    """
    Получение цели по ID.
    """
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return {
        "id": goal.id,
        "user_id": goal.user_id,
        "name": goal.name,
        "plan_sum": str(goal.plan_sum),
        "current_sum": str(goal.current_sum),
        "comment": goal.comment
    }
