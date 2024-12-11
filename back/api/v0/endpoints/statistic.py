from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from models.user import User
from schemas.user import UserSchema
from models.goal import Goal
from schemas.goal import GoalSchema, GoalCreateSchema

from core.database import get_db

router = APIRouter()

@router.get("/goals", response_model=List[GoalSchema])
def get_all_goals(db: Session = Depends(get_db)):
    """
    Возвращает все цели из базы данных.
    """
    goals = db.query(Goal).all()
    return goals  # Возвращаем пустой список, если целей нет


@router.get("/goals/{goal_id}", response_model=GoalSchema)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    """
    Возвращает цель по ее id.
    """
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Цель не найдена")
    return goal


@router.post("/users/{user_id}/goals", response_model=GoalSchema)
def create_goal_for_user(user_id: int, goal: GoalCreateSchema, db: Session = Depends(get_db)):
    """
    Создает новую цель для пользователя по его id.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    new_goal = Goal(**goal.dict(), user_id=user_id)
    try:
        db.add(new_goal)
        db.commit()  # Фиксация изменений
        db.refresh(new_goal)  # Обновление объекта после коммита
    except SQLAlchemyError as e:  # Ловим только ошибки SQLAlchemy
        db.rollback()  # Откат транзакции в случае ошибки
        raise HTTPException(status_code=500, detail=f"Ошибка создания цели: {str(e)}")

    return new_goal

