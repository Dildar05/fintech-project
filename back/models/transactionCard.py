from sqlalchemy import Column, Integer, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base, engine

class TransactionCard(Base):
    __tablename__ = "transactionCard"
    id = Column(Integer, primary_key=True)
    sum = Column(Numeric(10, 2), nullable=False)
    card_id = Column(Integer, ForeignKey("card.id", ondelete="CASCADE"), index=True)
    date = Column(DateTime, nullable=False)
    type_transaction_id = Column(Integer, ForeignKey("typeTransaction.id"), nullable=False) #Corrected Foreign Key name
    
    
Base.metadata.create_all(bind=engine)