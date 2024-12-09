from sqlalchemy import create_engine, exc 
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"

try:
    
    
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    class Base(DeclarativeBase): pass
    Base.metadata.create_all(bind=engine)

except exc.SQLAlchemyError as e:
    print(f"Ошибка подключения к базе данных: {e}")
    exit(1)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
