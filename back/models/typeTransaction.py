from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()


class TypeTransaction(Base):
    __tablename__ = "type_transaction"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    goal_transactions = relationship("TransactionGoal", backref="type_transaction")
    card_transactions = relationship("TransactionCard", backref="type_transaction")

