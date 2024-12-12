from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from typing import List

from models.user import User
from schemas.user import UserSchema
from models.goal import Goal
from schemas.goal import GoalSchema, GoalCreateSchema
from models.transactionGoal import TransactionGoal
from schemas.transactionGoal import TransactionGoalCreateSchema, TransactionGoalSchema

from core.database import get_db
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime

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


@router.get("/users/{user_id}/goals", response_model=List[GoalSchema])
def get_all_goals_for_user(user_id: int, db: Session = Depends(get_db)):
    """
    Возвращает все цели пользователя по его id.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    goals = db.query(Goal).filter(Goal.user_id == user_id).all()
    return goals

@router.get("/users/{user_id}/goals/{goal_id}", response_model=GoalSchema)
def get_goal_for_user(user_id: int, goal_id: int, db: Session = Depends(get_db)):
    """
    Возвращает цель пользователя по его id и id цели.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Цель не найдена")

    return goal

# Вариант 1: Убрать response_model
@router.delete("/users/{user_id}/goals/{goal_id}", status_code=200)
async def delete_goal(
    user_id: int,
    goal_id: int,
    db: Session = Depends(get_db)
):
    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == user_id
    ).first()
    
    if goal is None:
        raise HTTPException(status_code=404, detail="Цель не найдена")
    
    db.delete(goal)
    db.commit()
    
    return {"message": "Цель успешно удалена"}


@router.post("/users/{user_id}/goals/{goal_id}/transactions", response_model=GoalSchema)
def add_transaction(
    user_id: int,
    goal_id: int,
    transaction: TransactionGoalCreateSchema,
    db: Session = Depends(get_db)
):
    # Проверка пользователя
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    # Проверка цели
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Цель не найдена")

    # Создание транзакции
    new_transaction = TransactionGoal(
        sum=transaction.sum,
        is_deposit=transaction.is_deposit,
        goal_id=goal_id,
        date=transaction.date if transaction.date else datetime.utcnow()
    )

    # Обновление текущей суммы цели
    if new_transaction.is_deposit:
        goal.current_sum += new_transaction.sum
    else:
        if goal.current_sum < new_transaction.sum:
            raise HTTPException(status_code=400, detail="Недостаточно средств для снятия")
        goal.current_sum -= new_transaction.sum

    db.add(new_transaction)
    db.commit()
    db.refresh(goal)

    return goal

@router.get("/users/{user_id}/goals/{goal_id}/transactions", response_model=List[TransactionGoalSchema])
def get_transactions(
    user_id: int,
    goal_id: int,
    db: Session = Depends(get_db)
):
    # Проверка пользователя
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    # Проверка цели
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Цель не найдена")

    # Получение транзакций
    transactions = db.query(TransactionGoal).filter(TransactionGoal.goal_id == goal_id).all()

    return transactions
