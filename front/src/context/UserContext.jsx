import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
const pathUrl = 'http://172.20.10.4:8000/api/v0'; // URL вашего API

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Состояние для хранения данных пользователя
  const [goals, setGoals] = useState([]); // Состояние для хранения целей пользователя
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const storedUser = localStorage.getItem('user');
  console.log(storedUser);
  if (!storedUser) throw new Error('Пользователь не найден в localStorage');

  const userId = JSON.parse(storedUser).id; // Извлекаем ID пользователя из localStorage
  // useEffect для загрузки данных о пользователе и его целях
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`${pathUrl}/users/${userId}`); // Запрос на получение данных о пользователе

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData); // Сохраняем данные о пользователе в state
          // Запрос на получение целей пользователя
          const goalsResponse = await fetch(`${pathUrl}/users/1/goals`);
          if (goalsResponse.ok) {
            const goalsData = await goalsResponse.json();
            console.log(goalsData);
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

  // Функция для добавления новой цели
  const addGoal = async (newGoal) => {
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }

    try {
      const pathUrl = 'http://localhost:8000/api/v0'; // Обновите URL при необходимости
      const response = await fetch(`${pathUrl}/users/${userId}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newGoal.name,
          plan_sum: newGoal.plan_sum,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка сети при добавлении цели');
      }

      const createdGoal = await response.json();
      setGoals((prevGoals) => [...prevGoals, createdGoal]);
      return createdGoal;
    } catch (error) {
      console.error('Ошибка при добавлении цели:', error);
      throw error;
    }
  };

  // Функция для редактирования цели
  const editGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`${pathUrl}/users/${userId}/goals/${updatedGoal.id}`, {
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
    <UserContext.Provider value={{ user, goals, addGoal, editGoal, deleteGoal, loading }}>
      {children}
    </UserContext.Provider>
  );
};
