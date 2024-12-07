from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import TransactionCard, Card, TypeTransaction  # Модели SQLAlchemy
from database import get_db  # Получение сессии базы данных

# Создаем объект APIRouter для маршрутов транзакций по картам
transaction_card_router = APIRouter(prefix="/transaction_cards", tags=["transaction_cards"])

@transaction_card_router.post("/", response_model=dict)
def create_transaction_card(
    card_id: int, 
    sum: float, 
    date: str, 
    type_transaction_id: int, 
    db: Session = Depends(get_db)
):
    """
    Создание новой транзакции для карты.
    """
    # Проверяем, существует ли карта
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    # Проверяем, существует ли тип транзакции
    type_transaction = db.query(TypeTransaction).filter(TypeTransaction.id == type_transaction_id).first()
    if not type_transaction:
        raise HTTPException(status_code=404, detail="TypeTransaction not found")

    # Создаем новую транзакцию
    new_transaction = TransactionCard(
        card_id=card_id,
        sum=sum,
        date=date,
        type_transaction_id=type_transaction_id
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    return {
        "id": new_transaction.id,
        "card_id": new_transaction.card_id,
        "sum": str(new_transaction.sum),
        "date": new_transaction.date,
        "type_transaction_id": new_transaction.type_transaction_id
    }

@transaction_card_router.get("/", response_model=list)
def get_all_transaction_cards(db: Session = Depends(get_db)):
    """
    Получение всех транзакций для карт.
    """
    transactions = db.query(TransactionCard).all()
    return [
        {
            "id": t.id,
            "card_id": t.card_id,
            "sum": str(t.sum),
            "date": t.date,
            "type_transaction_id": t.type_transaction_id
        }
        for t in transactions
    ]

@transaction_card_router.get("/{transaction_id}", response_model=dict)
def get_transaction_card(transaction_id: int, db: Session = Depends(get_db)):
    """
    Получение транзакции по ID.
    """
    transaction = db.query(TransactionCard).filter(TransactionCard.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="TransactionCard not found")
    return {
        "id": transaction.id,
        "card_id": transaction.card_id,
        "sum": str(transaction.sum),
        "date": transaction.date,
        "type_transaction_id": transaction.type_transaction_id
    }

@transaction_card_router.delete("/{transaction_id}", response_model=dict)
def delete_transaction_card(transaction_id: int, db: Session = Depends(get_db)):
    """
    Удаление транзакции по ID.
    """
    transaction = db.query(TransactionCard).filter(TransactionCard.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="TransactionCard not found")
    
    db.delete(transaction)
    db.commit()
    return {"message": f"TransactionCard with ID {transaction_id} has been deleted"}
