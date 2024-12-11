import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ArrowUp, Plus } from 'lucide-react';
import { MoneyOperationPopup } from '../components/MoneyOperationPopup';
import { GoalSettings } from '../components/GoalSettings';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/UserContext';

const Statistics = () => {
  const { goals, setGoals, addGoal } = useContext(UserContext); // Используем контекст
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showDepositPopup, setShowDepositPopup] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [amount, setAmount] = useState('12000');

  const handleSave = () => {
    if (showDepositPopup) {
      const updatedGoals = goals.map((g) => {
        if (g.id === selectedGoal.id) {
          return { ...g, current_sum: g.current_sum + Number(amount) };
        }
        return g;
      });
      setGoals(updatedGoals);
      setShowDepositPopup(false);
    } else if (showWithdrawPopup) {
      const updatedGoals = goals.map((g) => {
        if (g.id === selectedGoal.id) {
          return { ...g, current_sum: g.current_sum - Number(amount) };
        }
        return g;
      });
      setGoals(updatedGoals);
      setShowWithdrawPopup(false);
    }
  };

  // Обновленная функция для добавления новой целиasdf
  const handleAddGoal = async (newGoal) => {
    try {
      const createdGoal = await addGoal(newGoal); // Используем функцию из контекста
      setShowAddGoal(false);
    } catch (error) {
      alert(error.message || 'Ошибка при добавлении цели');
    }
  };

  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20'>
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-xl font-semibold'>Goals</h1>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className='w-10 h-10 bg-customBlue rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors'
          >
            <Plus size={24} />
          </button>
        </div>

        <div className='space-y-4'>
          {goals.map((goal) => (
            <div
              key={goal.id}
              className='bg-[#12131A] rounded-xl p-4 cursor-pointer hover:bg-[#2D3748] transition-colors'
              onClick={() => navigate(`/goal/${goal.id}`)}
            >
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                  <p className='text-gray-400 font-medium'>{goal.name}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGoal(goal);
                      setShowDepositPopup(true);
                    }}
                    className='p-2 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors'
                  >
                    <ArrowUp size={16} className='text-green-500' />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGoal(goal);
                      setShowSettings(true);
                    }}
                    className='p-2 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors'
                  >
                    <Settings size={16} className='text-gray-400' />
                  </button>
                </div>
              </div>

              <div className='flex justify-between items-end mb-4'>
                <div>
                  <p className='text-2xl font-bold'>{goal.current_sum} ₸</p>
                  <p className='text-sm text-gray-400'>Текущий баланс</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-semibold'>{goal.plan_sum} ₸</p>
                  <p className='text-sm text-gray-400'>Цель</p>
                </div>
              </div>

              <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2'>
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

      {showAddGoal && (
        <GoalSettings
          goal={{ id: 0, name: '', plan_sum: 0, target: 0 }}
          onClose={() => setShowAddGoal(false)}
          onSave={handleAddGoal}
        />
      )}

      {showSettings && selectedGoal && (
        <GoalSettings
          goal={selectedGoal}
          onClose={() => setShowSettings(false)}
          onSave={(updatedGoal) => {
            setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
            setShowSettings(false);
          }}
        />
      )}

      {(showDepositPopup || showWithdrawPopup) && selectedGoal && (
        <MoneyOperationPopup
          type={showDepositPopup ? 'deposit' : 'withdraw'}
          amount={amount}
          onAmountChange={setAmount}
          onClose={() => {
            setShowDepositPopup(false);
            setShowWithdrawPopup(false);
            setSelectedGoal(null);
          }}
          onSave={handleSave}
        />
      )}
      <Navigation />
    </div>
  );
};

export default Statistics;
