import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ArrowUp, Plus } from 'lucide-react';
import { MoneyOperationPopup } from '../components/goals/MoneyOperationPopup';
import { GoalSettings } from '../components/goals/GoalSettings';
// Исправьте импорт AddGoalModal в вашем файле Statistics.jsx
import AddGoalModal from '../components/goals/AddGoalModal';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/UserContext';

const Statistics = () => {
  const { goals, addGoal } = useContext(UserContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGoal = (goalData) => {
    addGoal(goalData);
    setIsModalOpen(false);
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
                    <ArrowUp size={14} className='text-green-500' />
                  </button>
                  <button className='p-1 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors'>
                    <Settings size={14} className='text-gray-400' />
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
      </div>
      {isModalOpen && <AddGoalModal onClose={() => setIsModalOpen(false)} onSave={handleAddGoal} />}
      <Navigation />
    </div>
  );
};

export default Statistics;
