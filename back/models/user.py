from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(255))
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String, nullable=False)  # Remember to hash passwords!
    goals = relationship("Goal", backref="user", cascade="all, delete-orphan")
    cards = relationship("Card", backref="user", cascade="all, delete-orphan")