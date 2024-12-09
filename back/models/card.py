from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from core.database import Base, engine


class Card(Base):
    __tablename__ = "card"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    term = Column(Date, nullable=False)
    cvv = Column(String(3), nullable=False)
    transactions = relationship("TransactionCard", backref="card", cascade="all, delete-orphan")
    
Base.metadata.create_all(bind=engine)