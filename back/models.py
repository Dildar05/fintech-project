from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, Date, Boolean
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    goals = relationship("Goal", back_populates="user")
    cards = relationship("Card", back_populates="user")


class Goal(Base):
    __tablename__ = "goal"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    completed = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey('user.id'))
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


class TransactionType(Base):  # Renamed for clarity
    __tablename__ = "transaction_type"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    goal_transactions = relationship("TransactionGoal", back_populates="type_transaction")
    card_transactions = relationship("TransactionCard", back_populates="type_transaction")


class TransactionGoal(Base):
    __tablename__ = "transaction_goal"
    id = Column(Integer, primary_key=True, index=True)
    sum = Column(DECIMAL, nullable=False)
    goal_id = Column(Integer, ForeignKey("goal.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    date = Column(Date)
    type_transaction_id = Column(Integer, ForeignKey("transaction_type.id")) # Updated FK
    goal = relationship("Goal", back_populates="transactions")
    type_transaction = relationship("TransactionType", back_populates="goal_transactions")
    user = relationship("User", back_populates="goal_transactions")


class TransactionCard(Base):
    __tablename__ = "transaction_card"
    id = Column(Integer, primary_key=True, index=True)
    sum = Column(DECIMAL, nullable=False)
    card_id = Column(Integer, ForeignKey("card.id"))
    user_id = Column(Integer, ForeignKey("user.id"))
    date = Column(Date)
    type_transaction_id = Column(Integer, ForeignKey("transaction_type.id")) # Updated FK
    card = relationship("Card", back_populates="transactions")
    type_transaction = relationship("TransactionType", back_populates="card_transactions")
    user = relationship("User", back_populates="card_transactions")