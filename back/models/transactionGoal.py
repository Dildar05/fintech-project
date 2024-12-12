# fintech-project/back/models/transactionGoal.py

from sqlalchemy import Column, Integer, Numeric, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from core.database import Base,engine
from datetime import datetime

class TransactionGoal(Base):
    __tablename__ = "transaction_goal"
    id = Column(Integer, primary_key=True, index=True)
    sum = Column(Numeric(10, 2), nullable=False)  # Изменено на Numeric
    is_deposit = Column(Boolean, nullable=False)
    goal_id = Column(Integer, ForeignKey("goal.id", ondelete="CASCADE"), nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)

    goal = relationship("Goal", back_populates="transactions")
Base.metadata.create_all(bind=engine)