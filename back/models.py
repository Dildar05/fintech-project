from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, Date
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    goals = relationship("Goal", back_populates="user")
    cards = relationship("Card", back_populates="user")


class Goal(Base):
    __tablename__ = "goal"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    name = Column(String)
    plan_sum = Column(DECIMAL)
    current_sum = Column(DECIMAL)
    comment = Column(String)
    user = relationship("User", back_populates="goals")
    transactions = relationship("TransactionGoal", back_populates="goal")


class Card(Base):
    __tablename__ = "card"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    term_date = Column(Date)
    cvv = Column(Integer)
    user = relationship("User", back_populates="cards")
    transactions = relationship("TransactionCard", back_populates="card")


class TypeTransaction(Base):
    __tablename__ = "type_transaction"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    goal_transactions = relationship("TransactionGoal", back_populates="type_transaction")
    card_transactions = relationship("TransactionCard", back_populates="type_transaction")


class TransactionGoal(Base):
    __tablename__ = "transaction_goal"
    id = Column(Integer, primary_key=True, index=True)
    sum = Column(DECIMAL)
    goal_id = Column(Integer, ForeignKey("goal.id"))
    date = Column(Date)
    type_transaction_id = Column(Integer, ForeignKey("type_transaction.id"))
    goal = relationship("Goal", back_populates="transactions")
    type_transaction = relationship("TypeTransaction", back_populates="goal_transactions")


class TransactionCard(Base):
    __tablename__ = "transaction_card"
    id = Column(Integer, primary_key=True, index=True)
    sum = Column(DECIMAL)
    card_id = Column(Integer, ForeignKey("card.id"))
    date = Column(Date)
    type_transaction_id = Column(Integer, ForeignKey("type_transaction.id"))
    card = relationship("Card", back_populates="transactions")
    type_transaction = relationship("TypeTransaction", back_populates="card_transactions")