# app/auth.py

import jwt # type: ignore
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from passlib.context import CryptContext
from models import User
from sqlalchemy.orm import Session
from database import get_db

SECRET_KEY = "your_secret_key"  # Используйте сложный и длинный ключ в реальном проекте
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Инициализация CryptContext для работы с паролями
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Хеширование пароля
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# JWT создание токенов
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Валидация токена
def get_current_user(token: str, db: Session):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    return user
