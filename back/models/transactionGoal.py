from sqlalchemy import Column, Integer, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base, engine

class TransactionGoal(Base):
    __tablename__ = "transactionGoal"
    id = Column(Integer, primary_key=True)
    sum = Column(Numeric(10, 2), nullable=False)
    goal_id = Column(Integer, ForeignKey("goal.id", ondelete="CASCADE"), index=True)
    date = Column(DateTime, nullable=False)
    type_transaction_id = Column(Integer, ForeignKey("typeTransaction.id"), nullable=False) #Corrected Foreign Key name
    
Base.metadata.create_all(bind=engine)