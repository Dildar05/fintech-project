from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Card  # Модель SQLAlchemy для карты
from database import get_db  # Получение сессии базы данных

# Создаем объект APIRouter для маршрутов карт
card_router = APIRouter(prefix="/cards", tags=["cards"])

@card_router.post("/", response_model=dict)
def create_card(user_id: int, term_date: str, cvv: int, db: Session = Depends(get_db)):
    """
    Создание новой карты.
    """
    # Создаем новую карту
    new_card = Card(user_id=user_id, term_date=term_date, cvv=cvv)
    db.add(new_card)
    db.commit()
    db.refresh(new_card)
    return {
        "id": new_card.id,
        "user_id": new_card.user_id,
        "term_date": new_card.term_date,
        "cvv": new_card.cvv
    }

@card_router.get("/{card_id}", response_model=dict)
def get_card(card_id: int, db: Session = Depends(get_db)):
    """
    Получение карты по ID.
    """
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return {
        "id": card.id,
        "user_id": card.user_id,
        "term_date": card.term_date,
        "cvv": card.cvv
    }

@card_router.delete("/{card_id}", response_model=dict)
def delete_card(card_id: int, db: Session = Depends(get_db)):
    """
    Удаление карты по ID.
    """
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    db.delete(card)
    db.commit()
    return {"message": f"Card with ID {card_id} has been deleted"}
