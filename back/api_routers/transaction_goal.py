from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import TransactionGoal, Goal, TypeTransaction  # Модели SQLAlchemy
from database import get_db  # Получение сессии базы данных

# Создаем объект APIRouter для маршрутов транзакций по целям
transaction_goal_router = APIRouter(prefix="/transaction_goals", tags=["transaction_goals"])

@transaction_goal_router.post("/", response_model=dict)
def create_transaction_goal(
    goal_id: int, 
    sum: float, 
    date: str, 
    type_transaction_id: int, 
    db: Session = Depends(get_db)
):
    """
    Создание новой транзакции для цели.
    """
    # Проверяем, существует ли цель
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    # Проверяем, существует ли тип транзакции
    type_transaction = db.query(TypeTransaction).filter(TypeTransaction.id == type_transaction_id).first()
    if not type_transaction:
        raise HTTPException(status_code=404, detail="TypeTransaction not found")

    # Создаем новую транзакцию
    new_transaction = TransactionGoal(
        goal_id=goal_id,
        sum=sum,
        date=date,
        type_transaction_id=type_transaction_id
    )
    db.add(new_transaction)

    # Обновляем текущую сумму цели
    goal.current_sum += sum
    db.commit()
    db.refresh(new_transaction)

    return {
        "id": new_transaction.id,
        "goal_id": new_transaction.goal_id,
        "sum": str(new_transaction.sum),
        "date": new_transaction.date,
        "type_transaction_id": new_transaction.type_transaction_id
    }

@transaction_goal_router.get("/", response_model=list)
def get_all_transaction_goals(db: Session = Depends(get_db)):
    """
    Получение всех транзакций для целей.
    """
    transactions = db.query(TransactionGoal).all()
    return [
        {
            "id": t.id,
            "goal_id": t.goal_id,
            "sum": str(t.sum),
            "date": t.date,
            "type_transaction_id": t.type_transaction_id
        }
        for t in transactions
    ]

@transaction_goal_router.get("/{transaction_id}", response_model=dict)
def get_transaction_goal(transaction_id: int, db: Session = Depends(get_db)):
    """
    Получение транзакции по ID.
    """
    transaction = db.query(TransactionGoal).filter(TransactionGoal.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="TransactionGoal not found")
    return {
        "id": transaction.id,
        "goal_id": transaction.goal_id,
        "sum": str(transaction.sum),
        "date": transaction.date,
        "type_transaction_id": transaction.type_transaction_id
    }

@transaction_goal_router.delete("/{transaction_id}", response_model=dict)
def delete_transaction_goal(transaction_id: int, db: Session = Depends(get_db)):
    """
    Удаление транзакции по ID.
    """
    transaction = db.query(TransactionGoal).filter(TransactionGoal.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="TransactionGoal not found")
    
    # Обновляем текущую сумму цели при удалении транзакции
    goal = db.query(Goal).filter(Goal.id == transaction.goal_id).first()
    if goal:
        goal.current_sum -= transaction.sum

    db.delete(transaction)
    db.commit()
    return {"message": f"TransactionGoal with ID {transaction_id} has been deleted"}
