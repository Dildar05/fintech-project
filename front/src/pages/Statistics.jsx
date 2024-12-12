import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { MoneyOperationPopup } from '../components/goals/MoneyOperationPopup';
import { GoalSettings } from '../components/goals/GoalSettings';
import AddGoalModal from '../components/goals/AddGoalModal';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/UserContext';

const Statistics = () => {
  const { user } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStatistics = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/v0/users/${user.id}/goals`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке статистики');
      }
      const data = await response.json();
      setGoals(data); // Обновляем состояние целей
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [location]);

  const handleAddGoal = async (goalData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v0/users/${user.id}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: goalData.name,
          plan_sum: goalData.plan_sum,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании цели');
      }

      const newGoal = await response.json();
      setGoals((prevGoals) => [...prevGoals, newGoal]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Ошибка при добавлении цели:', error);
      alert('Не удалось создать цель');
    }
  };
  // В UserContext добавляем функцию deleteGoal
  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v0/users/${user.id}/goals/${goalId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении цели');
      }

      // Обновляем список целей после удаления
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error('Ошибка при удалении цели:', error);
      alert('Не удалось удалить цель');
    }
  };
  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20'>
      <div className='p-4'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-lg font-semibold'>Goals</h1>
          </div>
          <button
            className='w-8 h-8 bg-customBlue rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors'
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
          </button>
        </div>
        {goals.length === 0 ? (
          <div className='text-center text-gray-400'>
            <p>У вас нету целей.</p>
            <p>Создайте цель</p>
          </div>
        ) : (
          <div className='space-y-3'>
            {goals.map((goal) => (
              <div
                key={goal.id}
                className='bg-[#12131A] rounded-lg p-3 cursor-pointer hover:bg-[#2D3748] transition-colors'
                onClick={() => navigate(`/goal/${goal.id}`)}
              >
                <div className='flex justify-between items-center mb-3'>
                  <div className='flex items-center space-x-2'>
                    <p className='text-gray-400 font-medium'>{goal.name}</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button className='p-1 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors'>
                      <Settings size={14} className='text-gray-400' />
                    </button>
                    <button
                      className='p-1 bg-[#374151] rounded-lg hover:bg-red-600 transition-colors'
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем всплытие события
                        if (window.confirm('Вы уверены, что хотите удалить эту цель?')) {
                          deleteGoal(goal.id);
                        }
                      }}
                    >
                      <Trash2 size={14} className='text-gray-400 hover:text-white' />
                    </button>
                  </div>
                </div>

                <div className='flex justify-between items-end mb-3'>
                  <div>
                    <p className='text-xl font-bold'>{goal.current_sum} ₸</p>
                    <p className='text-xs text-gray-400'>Текущий баланс</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-md font-semibold'>{goal.plan_sum} ₸</p>
                    <p className='text-xs text-gray-400'>Цель</p>
                  </div>
                </div>

                <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-1'>
                  <div
                    className='h-full bg-customBlue rounded-full transition-all duration-300'
                    style={{ width: `${(goal.current_sum / goal.plan_sum) * 100}%` }}
                  />
                </div>

                <div className='flex justify-between'>
                  <p className='text-xs text-gray-400'>
                    Прогресс: {((goal.current_sum / goal.plan_sum) * 100).toFixed(1)}%
                  </p>
                  <p className='text-xs text-gray-400'>Осталось: {goal.plan_sum - goal.current_sum} ₸</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && <AddGoalModal onClose={() => setIsModalOpen(false)} onSave={handleAddGoal} />}
      <Navigation />
    </div>
  );
};

export default Statistics;
