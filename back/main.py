from fastapi import FastAPI
from api.v0.endpoints import user  # Импортируем файл с маршрутом

app = FastAPI()

# Подключаем маршрут
app.include_router(user.router, prefix="/api/v0", tags=["Users"])
