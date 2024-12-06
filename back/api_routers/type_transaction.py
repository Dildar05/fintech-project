from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import TypeTransaction  # Модель SQLAlchemy для типа транзакции
from database import get_db  # Получение сессии базы данных

# Создаем объект APIRouter для маршрутов типов транзакций
type_transaction_router = APIRouter(prefix="/type_transactions", tags=["type_transactions"])

@type_transaction_router.post("/", response_model=dict)
def create_type_transaction(name: str, db: Session = Depends(get_db)):
    """
    Создание нового типа транзакции.
    """
    # Проверяем, существует ли тип транзакции с таким именем
    existing_type = db.query(TypeTransaction).filter(TypeTransaction.name == name).first()
    if existing_type:
        raise HTTPException(status_code=400, detail="TypeTransaction with this name already exists")
    
    # Создаем новый тип транзакции
    new_type = TypeTransaction(name=name)
    db.add(new_type)
    db.commit()
    db.refresh(new_type)
    return {"id": new_type.id, "name": new_type.name}

@type_transaction_router.get("/", response_model=list)
def get_all_type_transactions(db: Session = Depends(get_db)):
    """
    Получение всех типов транзакций.
    """
    types = db.query(TypeTransaction).all()
    return [{"id": t.id, "name": t.name} for t in types]

@type_transaction_router.get("/{type_id}", response_model=dict)
def get_type_transaction(type_id: int, db: Session = Depends(get_db)):
    """
    Получение типа транзакции по ID.
    """
    type_transaction = db.query(TypeTransaction).filter(TypeTransaction.id == type_id).first()
    if not type_transaction:
        raise HTTPException(status_code=404, detail="TypeTransaction not found")
    return {"id": type_transaction.id, "name": type_transaction.name}

@type_transaction_router.delete("/{type_id}", response_model=dict)
def delete_type_transaction(type_id: int, db: Session = Depends(get_db)):
    """
    Удаление типа транзакции по ID.
    """
    type_transaction = db.query(TypeTransaction).filter(TypeTransaction.id == type_id).first()
    if not type_transaction:
        raise HTTPException(status_code=404, detail="TypeTransaction not found")
    db.delete(type_transaction)
    db.commit()
    return {"message": f"TypeTransaction with ID {type_id} has been deleted"}
