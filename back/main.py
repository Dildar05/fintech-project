from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v0.endpoints import user, statistic # Импортируем файл с маршрутом



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Укажите ваш фронтенд-домен
    allow_credentials=True,
    allow_methods=["*"],  # Позволяет все HTTP-методы
    allow_headers=["*"],  # Позволяет все заголовки
)
# Подключаем маршрут
app.include_router(user.router, prefix="/api/v0", tags=["Users"])
app.include_router(statistic.router, prefix="/api/v0", tags=["Statistics"])