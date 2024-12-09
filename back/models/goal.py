from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

class Goal(Base):
    __tablename__ = "goal"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    plan_sum = Column(Numeric(10, 2))
    current_sum = Column(Numeric(10, 2))
    comment = Column(String(255))
    transactions = relationship("TransactionGoal", backref="goal", cascade="all, delete-orphan")

