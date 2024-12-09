from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

class TransactionGoal(Base):
    __tablename__ = "transaction_goal"
    id = Column(Integer, primary_key=True)
    sum = Column(Numeric(10, 2), nullable=False)
    goal_id = Column(Integer, ForeignKey("goal.id", ondelete="CASCADE"), index=True)
    date = Column(DateTime, nullable=False)
    type_transaction = Column(Integer, ForeignKey("type_transaction.id"), nullable=False)

