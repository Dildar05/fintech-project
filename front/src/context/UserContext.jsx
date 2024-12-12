import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
const pathUrl = 'http://localhost:8000/api/v0'; // URL вашего API

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Получаем данные пользователя из localStorage при инициализации
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [goals, setGoals] = useState([]); // Состояние для хранения целей пользователя
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

  useEffect(() => {
    // Сохраняем или удаляем данные пользователя в localStorage при изменении состояния
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // useEffect для загрузки данных о пользователе и его целях
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const userId = user.id;

    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`${pathUrl}/users/${userId}`); // Запрос на получение данных о пользователе

        if (userResponse.ok) {
          const userData = await userResponse.json();

          // Проверяем, изменились ли данные пользователя
          if (JSON.stringify(userData) !== JSON.stringify(user)) {
            setUser(userData);
          }

          const goalsResponse = await fetch(`${pathUrl}/users/${userId}/goals`);
          if (goalsResponse.ok) {
            const goalsData = await goalsResponse.json();
            setGoals(goalsData); // Сохраняем цели пользователя
          } else {
            console.error('Не удалось получить цели');
          }
        } else {
          console.error('Не удалось получить данные пользователя');
        }
      } catch (error) {
        console.error('Ошибка при получении данных о пользователе:', error);
      } finally {
        setLoading(false); // Завершаем процесс загрузки
      }
    };

    fetchUserData();
  }, []); // useEffect с пустым массивом зависимостей выполняется один раз при монтировании компонента

  // Функция для редактирования цели
  const editGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`${pathUrl}/users/${user.id}/goals/${updatedGoal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });

      if (response.ok) {
        const savedGoal = await response.json();
        setGoals((prevGoals) => prevGoals.map((goal) => (goal.id === savedGoal.id ? savedGoal : goal))); // Обновляем цель в списке
      } else {
        const error = await response.json();
        console.error('Ошибка при редактировании цели:', error);
      }
    } catch (error) {
      console.error('Ошибка при редактировании цели:', error);
    }
  };

  // Функция для удаления цели
  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`${pathUrl}/users/${user.id}/goals/${goalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId)); // Удаляем цель из списка
      } else {
        const error = await response.json();
        console.error('Ошибка при удалении цели:', error);
      }
    } catch (error) {
      console.error('Ошибка при удалении цели:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, goals, editGoal, deleteGoal, loading }}>
      {children}
    </UserContext.Provider>
  );
};
