// src/pages/GoalDetails.jsx
// В начале файла GoalDetails.jsx обновить импорты
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { MoneyOperationPopup } from '../components/goals/MoneyOperationPopup';

const GoalDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDepositPopup, setShowDepositPopup] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [amount, setAmount] = useState('');
  const [goal, setGoal] = useState(null);

  // Здесь можно получить данные о цели из локального хранилища или API
  useEffect(() => {
    // Временное решение - моковые данные
    const mockGoal = {
      id: Number(id),
      name: 'Название цели',
      current: 12000,
      target: 150000,
      transactions: [
        {
          type: 'deposit',
          amount: 5000,
          date: '2024-03-20 15:30',
        },
        {
          type: 'withdraw',
          amount: 2000,
          date: '2024-03-19 12:45',
        },
      ],
    };
    setGoal(mockGoal);
  }, [id]);
  const handleSave = () => {
    if (!amount) return;

    const newTransaction = {
      type: showDepositPopup ? 'deposit' : 'withdraw',
      amount: Number(amount),
      date: new Date().toLocaleString(),
    };

    setGoal((prevGoal) => ({
      ...prevGoal,
      current: showDepositPopup ? prevGoal.current + Number(amount) : prevGoal.current - Number(amount),
      transactions: [newTransaction, ...(prevGoal.transactions || [])],
    }));

    setAmount('');
    setShowDepositPopup(false);
    setShowWithdrawPopup(false);
  };

  if (!goal) {
    return (
      <div className='min-h-screen bg-[#0A0B0F] p-6 flex items-center justify-center'>
        <p className='text-gray-400'>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20 p-6'>
      {/* Заголовок */}
      <div className='flex items-center space-x-2 mb-8' onClick={() => navigate(-1)}>
        <button className='text-gray-400 hover:text-white transition-colors'>
          <ChevronLeft size={24} />
        </button>
        <h1 className='text-xl font-semibold'>{goal.name}</h1>
      </div>

      {/* Карточка с балансом */}
      <div className='bg-[#12131A] rounded-xl p-6 mb-6'>
        <div className='flex justify-between items-end mb-4'>
          <div>
            <p className='text-3xl font-bold'>{goal.current} ₸</p>
            <p className='text-sm text-gray-400'>Текущий баланс</p>
          </div>
          <div className='text-right'>
            <p className='text-xl font-semibold'>{goal.target} ₸</p>
            <p className='text-sm text-gray-400'>Цель</p>
          </div>
        </div>

        <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-4'>
          <div
            className='h-full bg-blue-500 rounded-full transition-all duration-300'
            style={{ width: `${(goal.current / goal.target) * 100}%` }}
          />
        </div>

        <div className='flex space-x-4'>
          <button
            onClick={() => setShowDepositPopup(true)}
            className='flex-1 py-3 bg-[#374151] rounded-xl font-medium hover:bg-[#4B5563] transition-colors'
          >
            <ArrowUp className='inline mr-2 text-green-500' size={20} />
            Пополнить
          </button>
          <button
            onClick={() => setShowWithdrawPopup(true)}
            className='flex-1 py-3 bg-[#374151] rounded-xl font-medium hover:bg-[#4B5563] transition-colors'
          >
            <ArrowDown className='inline mr-2 text-red-500' size={20} />
            Снять
          </button>
        </div>
      </div>

      {/* История транзакций */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>История транзакций</h2>
        <div className='space-y-3'>
          {goal.transactions?.map((tx, index) => (
            <div key={index} className='flex justify-between items-center bg-[#12131A] p-4 rounded-xl'>
              <div>
                <p className='font-medium'>{tx.type === 'deposit' ? 'Пополнение' : 'Снятие'}</p>
                <p className='text-sm text-gray-400'>{tx.date}</p>
              </div>
              <p className={`font-medium ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                {tx.type === 'deposit' ? '+' : '-'} {tx.amount} ₸
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Попапы для операций */}
      {(showDepositPopup || showWithdrawPopup) && (
        <MoneyOperationPopup
          type={showDepositPopup ? 'deposit' : 'withdraw'}
          amount={amount}
          onAmountChange={setAmount}
          onCancel={() => {
            setShowDepositPopup(false);
            setShowWithdrawPopup(false);
            setAmount('');
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default GoalDetails;
