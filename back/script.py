from sqlalchemy.orm import Session
from datetime import date
from database import engine, Base
from models import User, Goal, Card, TypeTransaction, TransactionGoal, TransactionCard

# Создаем таблицы в базе данных (если их еще нет)
Base.metadata.create_all(bind=engine)

# Открываем сессию
with Session(bind=engine) as session:
    # 1. Добавляем 10 пользователей
    users = [
        User(full_name=f"User {i}", email=f"user{i}@example.com", password="password")
        for i in range(1, 11)
    ]
    session.add_all(users)
    session.commit()

    # 2. Добавляем 10 целей, связанных с пользователями
    goals = [
        Goal(
            user_id=(i % 10) + 1, 
            name=f"Goal {i}", 
            plan_sum=1000 + i * 100, 
            current_sum=500 + i * 50, 
            comment=f"Comment for Goal {i}"
        )
        for i in range(1, 11)
    ]
    session.add_all(goals)
    session.commit()

    # 3. Добавляем 10 карт, связанных с пользователями
    cards = [
        Card(
            user_id=(i % 10) + 1, 
            term_date=date(2025, (i % 12) + 1, 1), 
            cvv=100 + i
        )
        for i in range(1, 11)
    ]
    session.add_all(cards)
    session.commit()

    # 4. Добавляем 10 типов транзакций
    type_transactions = [
        TypeTransaction(name=f"Transaction Type {i}")
        for i in range(1, 11)
    ]
    session.add_all(type_transactions)
    session.commit()

    # 5. Добавляем 10 транзакций для целей
    transaction_goals = [
        TransactionGoal(
            goal_id=(i % 10) + 1, 
            sum=100 + i * 10, 
            date=date(2024, (i % 12) + 1, 15), 
            type_transaction_id=(i % 10) + 1
        )
        for i in range(1, 11)
    ]
    session.add_all(transaction_goals)
    session.commit()

    # 6. Добавляем 10 транзакций для карт
    transaction_cards = [
        TransactionCard(
            card_id=(i % 10) + 1, 
            sum=200 + i * 20, 
            date=date(2024, (i % 12) + 1, 10), 
            type_transaction_id=(i % 10) + 1
        )
        for i in range(1, 11)
    ]
    session.add_all(transaction_cards)
    session.commit()

# Завершение
print("Данные успешно добавлены!")
