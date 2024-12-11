// UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функция для получения данных о пользователе
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await fetch(`http://172.20.10.4:8000/api/v0/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          // Получение целей пользователя
          const goalsResponse = await fetch(`http://172.20.10.4:8000/api/v0/users/${data.id}/goals`);
          if (goalsResponse.ok) {
            const goalsData = await goalsResponse.json();
            setGoals(goalsData);
          }
        } else {
          console.error('Не удалось получить данные пользователя');
        }
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Функция для добавления новой цели
  const addGoal = async (newGoal) => {
    try {
      const response = await fetch(`http://172.20.10.4:8000/api/v0/users/${user.id}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        const createdGoal = await response.json();
        setGoals((prevGoals) => [...prevGoals, createdGoal]);
      } else {
        const error = await response.json();
        console.error('Ошибка при добавлении цели:', error);
      }
    } catch (error) {
      console.error('Ошибка при добавлении цели:', error);
    }
  };

  // Функция для редактирования цели
  const editGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`http://172.20.10.4:8000/api/v0/users/${user.id}/goals/${updatedGoal.id}`, {
        method: 'PUT', // Или 'PATCH' в зависимости от API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });

      if (response.ok) {
        const savedGoal = await response.json();
        setGoals((prevGoals) => prevGoals.map((goal) => (goal.id === savedGoal.id ? savedGoal : goal)));
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
      const response = await fetch(`http://172.20.10.4:8000/api/v0/users/${user.id}/goals/${goalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
      } else {
        const error = await response.json();
        console.error('Ошибка при удалении цели:', error);
      }
    } catch (error) {
      console.error('Ошибка при удалении цели:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, goals, setGoals, addGoal, editGoal, deleteGoal, loading }}>
      {children}
    </UserContext.Provider>
  );
};
