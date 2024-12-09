from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()


class Card(Base):
    __tablename__ = "card"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    term = Column(Date, nullable=False)
    cvv = Column(String(3), nullable=False)
    transactions = relationship("TransactionCard", backref="card", cascade="all, delete-orphan")

