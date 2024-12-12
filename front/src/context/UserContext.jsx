import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
const pathUrl = 'http://localhost:8000/api/v0'; // URL вашего API

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    });
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }, [user]);
  
    useEffect(() => {
      if (!user) {
        setLoading(false);
        return;
      }
  
      const userId = user.id;
  
      const fetchUserData = async () => {
        try {
          const userResponse = await fetch(`${pathUrl}/users/${userId}`);
  
          if (userResponse.ok) {
            const userData = await userResponse.json();
  
            if (JSON.stringify(userData) !== JSON.stringify(user)) {
              setUser(userData);
            }
  
            const goalsResponse = await fetch(`${pathUrl}/users/${userId}/goals`);
            if (goalsResponse.ok) {
              const goalsData = await goalsResponse.json();
              setGoals(goalsData);
            } else {
              console.error('Не удалось получить цели');
            }
          } else {
            console.error('Не удалось получить данные пользователя');
          }
        } catch (error) {
          console.error('Ошибка при получении данных о пользователе:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, []);
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
    };
  
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
          setGoals((prevGoals) => prevGoals.map((goal) => (goal.id === savedGoal.id ? savedGoal : goal)));
        } else {
          const error = await response.json();
          console.error('Ошибка при редактировании цели:', error);
        }
      } catch (error) {
        console.error('Ошибка при редактировании цели:', error);
      }
    };
  
    const deleteGoal = async (goalId) => {
      try {
        const response = await fetch(`${pathUrl}/users/${user.id}/goals/${goalId}`, {
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
  
    const changePassword = async (currentPassword, newPassword, confirmPassword) => {
      try {
        const response = await fetch(`${pathUrl}/users/${user.id}/change_password`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ curr_password: currentPassword, new_password: newPassword, confirm_password: confirmPassword }),
          });
      
        if (response.ok) {
          return true; // Возвращаем true при успехе
        } else {
          return false
        }
      } catch (error) {
        console.error('Ошибка при изменении пароля:', error);
         return false; // Возвращаем false в случае ошибки
      }
    };
  
    return (
      <UserContext.Provider value={{ user, setUser, goals, editGoal, deleteGoal, changePassword, loading, logout }}>
        {children}
      </UserContext.Provider>
    );
  };