from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

class TransactionCard(Base):
    __tablename__ = "transaction_card"
    id = Column(Integer, primary_key=True)
    sum = Column(Numeric(10, 2), nullable=False)
    card_id = Column(Integer, ForeignKey("card.id", ondelete="CASCADE"), index=True)
    date = Column(DateTime, nullable=False)
    type_transaction = Column(Integer, ForeignKey("type_transaction.id"), nullable=False)