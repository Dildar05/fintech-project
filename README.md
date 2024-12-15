# GoalBank

**GoalBank** \- это приложение для управления вашими финансовыми целями и мечтами. С помощью GoalBank вы можете создавать цели, вносить средства, отслеживать прогресс, а также пользоваться конвертером валют. Приложение построено на современных технологиях и работает на основе FastAPI, React, SQLite и Docker.

## Основные функции

- **Создание целей:** Легко создавайте финансовые цели и указывайте сумму, которую хотите накопить.
- **Внесение средств:** Удобно фиксируйте внесенные суммы и отслеживайте прогресс накоплений.
- **Прогресс цели:** Узнавайте, сколько осталось накопить для достижения вашей мечты.
- **Конвертер валют:** Функция позволяет переводить сумму из одной валюты в другую.
- **Домашняя страница:** Доступ к общей информации и навигации по приложению.
- **Страница пользователя:** Управление профилем и просмотр персонализированных данных.

## Технологический стек

- **Back-end:** FastAPI
- **Front-end:** React
- **База данных:** SQLite
- **Контейнеризация:** Docker

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/Dildar05/fintech-project.git
cd fintech-project
```

### 2. Настройка Docker

Убедитесь, что у вас установлен Docker и Docker Compose.

Запустите приложение:

```bash
docker-compose up --build
```

### 3. Доступ к приложению

- Перейдите в браузер по адресу: [http://localhost:3000](http://localhost:3000)
- Документация API доступна по адресу: [http://localhost:8000/docs](http://localhost:8000/docs)

## Структура проекта

### Корневая директория
```
Dildar05-fintech-project
├── back/                   # Серверная часть приложения
├── front/                  # Клиентская часть приложения
├── README.md               # Описание проекта
└── docker-compose.yml      # Конфигурация Docker Compose
```

### Серверная часть (back)
```
back/
├── api/                    # Роуты API
│   ├── v0/                 # Версия API
│   │   ├── endpoints/      # Эндпоинты API
│   │   │   ├── user.py     # Эндпоинты для управления пользователями
│   │   │   └── statistic.py # Эндпоинты для статистики
│   │   └── __init__.py
│   └── __init__.py
├── core/                   # Основные модули приложения
│   ├── database.py         # Логика подключения к базе данных
│   └── __init__.py
├── schemas/                # Схемы данных (Pydantic)
│   ├── transactionGoal.py  # Схема операций с целями
│   ├── goal.py             # Схема целей
│   ├── card.py             # Схема карточек
│   └── user.py             # Схема пользователей
├── models/                 # Модели базы данных (SQLAlchemy)
│   ├── transactionGoal.py
│   ├── goal.py
│   ├── card.py
│   └── user.py
├── main.py                 # Точка входа приложения FastAPI
├── test.db                 # Тестовая база данных
├── requirements.txt        # Зависимости Python
└── Dockerfile              # Docker-файл для сервера
```

### Клиентская часть (front)
```
front/
├── public/                 # Публичные файлы
│   ├── index.html          # Основной HTML-файл
│   └── images/             # Изображения
├── src/                    # Исходный код приложения
│   ├── context/            # Контексты React
│   │   └── UserContext.jsx # Управление состоянием пользователя
│   ├── components/         # Компоненты React
│   │   ├── Navigation.jsx  # Навигация
│   │   ├── LoadingScreen.jsx # Загрузка
│   │   ├── goals/          # Компоненты для работы с целями
│   │   │   ├── AddGoalModal.jsx
│   │   │   ├── GoalSettings.jsx
│   │   │   ├── EditGoalModal.jsx
│   │   │   └── MoneyOperationPopup.jsx
│   │   └── Onboarding.jsx  # Стартовый экран
│   ├── pages/              # Страницы приложения
│   │   ├── Home.jsx        # Домашняя страница
│   │   ├── Profile.jsx     # Страница профиля
│   │   ├── Statistics.jsx  # Статистика
│   │   ├── SignIn.jsx      # Вход в систему
│   │   ├── SignUp.jsx      # Регистрация
│   │   ├── Converter.jsx   # Конвертер валют
│   │   └── ...             # Другие страницы
│   ├── App.js              # Основной файл React
│   ├── style.css           # Основные стили
│   └── index.js            # Точка входа React
├── package.json            # Зависимости и скрипты
├── tailwind.config.js      # Конфигурация Tailwind CSS
├── Dockerfile              # Docker-файл для клиента
└── README.md               # Описание клиентской части
```

## API Endpoints

- **`GET /api/v0/users`** \- Возвращение всех пользователей из базы данных
- **`POST /api/v0/users`** \- Создание нового пользователя в базе данных
- **`GET /api/v0/users/{user_id}`** \-Получение пользователя 
- **`POST /api/v0/auth/register`** \- Регистрация нового пользователя
- **`POST /api/v0/auth/login`** \- Авторизация пользователя
- **`PATCH /api/v0/users/{user_id}/change_password`** \- Изменение пароля пользователя

- **`GET /api/v0/goals`** \- Возвращение все цели из базы данных
- **`GET /api/v0/goals/{goal_id}`** \- Получение цели
- **`POST /api/v0/users/{user_id}/goals`** \- Создание новую цель для пользователя по его id
- **`GET /api/v0/users/{user_id}/goals`** \- Возвращение все цели пользователя по его id
- **`GET /api/v0/users/{user_id}/goals/{goal_id}`** \- Возвращение цель пользователя по его id 
- **`DELETE /api/v0/users/{user_id}/goals/{goal_id}`** \- Удаление цели
- **`PUT /api/v0/users/{user_id}/goals/{goal_id}`** \- Изменение цели
- **`POST /api/v0/users/{user_id}/goals/{goal_id}/transactions`** \- Добавление транзакции
- **`GET /api/v0/users/{user_id}/goals/{goal_id}/transactions`** \- Получение транзакции
















## Вклад в проект

Будем рады вашим предложениям и улучшениям! Для этого:

1. Сделайте форк репозитория.
2. Создайте новую ветку: `git checkout -b feature-name`.
3. Внесите изменения и сделайте коммит: `git commit -m 'Добавлена новая функция'`.
4. Отправьте изменения: `git push origin feature-name`.
5. Создайте Pull Request.



---

**GoalBank** \- ваш надежный помощник на пути к мечте!
