from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from core.database import Base, engine

class TypeTransaction(Base):
    __tablename__ = "typeTransaction"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    goal_transactions = relationship("TransactionGoal", backref="type_transaction")
    card_transactions = relationship("TransactionCard", backref="type_transaction")
    
Base.metadata.create_all(bind=engine)