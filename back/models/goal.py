# fintech-project/back/models/goal.py

from sqlalchemy import Column, Integer, String, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from core.database import Base, engine

class Goal(Base):
    __tablename__ = "goal"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    plan_sum = Column(Numeric(10, 2))
    current_sum = Column(Numeric(10, 2))
    comment = Column(String(255))
    transactions = relationship("TransactionGoal", back_populates="goal", cascade="all, delete-orphan")
    
Base.metadata.create_all(bind=engine)