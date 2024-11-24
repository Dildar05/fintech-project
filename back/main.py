from fastapi import FastAPI
from api_routers import user

from database import Base, engine

# Создание таблиц при старте приложения
Base.metadata.create_all(bind=engine)

# Инициализация приложения
app = FastAPI()

# Подключение роутеров
app.include_router(user.api_routers)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}
