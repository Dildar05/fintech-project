from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from core.database import Base,engine

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(255))
    email = Column(String(255), unique=True)
    phone = Column(String(11), unique=True)
    password = Column(String)  # Remember to hash passwords!
    goals = relationship("Goal", backref="user", cascade="all, delete-orphan")
    cards = relationship("Card", backref="user", cascade="all, delete-orphan")
    
Base.metadata.create_all(bind=engine)