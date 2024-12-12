import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ArrowUp, ArrowDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/UserContext';
import { MoneyOperationPopup } from '../components/goals/MoneyOperationPopup';

const GoalDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [goal, setGoal] = useState(null);
  const [transactions, setTransactions] = useState([]); // Добавляем состояние для транзакций
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationType, setOperationType] = useState(null); // 'deposit' или 'withdraw'

  useEffect(() => {
    const fetchGoalDetails = async () => {
      if (!user) {
        setError('Пользователь не авторизован.');
        setIsLoading(false);
        return;
      }

      try {
        const goalResponse = await fetch(`http://localhost:8000/api/v0/users/${user.id}/goals/${id}`);
        if (!goalResponse.ok) {
          throw new Error('Не удалось получить данные о цели.');
        }
        const goalData = await goalResponse.json();
        setGoal(goalData);

        // Загружаем транзакции для этой цели
        const transactionsResponse = await fetch(
          `http://localhost:8000/api/v0/users/${user.id}/goals/${id}/transactions`
        );
        if (!transactionsResponse.ok) {
          throw new Error('Не удалось получить данные о транзакциях.');
        }
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData); // Сохраняем транзакции в состояние
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && id) {
      fetchGoalDetails();
    }
  }, [user, id]);

  const handleSave = async (isDeposit, amount) => {
    if (!user) {
      alert('Пользователь не авторизован.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v0/users/${user.id}/goals/${id}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_deposit: isDeposit, // Boolean значение
          sum: amount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при добавлении транзакции.');
      }

      // Обновление состояния цели
      const updatedGoal = await response.json();
      setGoal(updatedGoal);

      // Обновление состояния транзакций
      const transactionsResponse = await fetch(
        `http://localhost:8000/api/v0/users/${user.id}/goals/${id}/transactions`
      );
      if (!transactionsResponse.ok) {
        throw new Error('Не удалось получить данные о транзакциях.');
      }
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      // Закрываем модальное окно
      setOperationType(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#0A0B0F] p-6 flex items-center justify-center'>
        <p className='text-gray-400'>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[#0A0B0F] p-6 flex items-center justify-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20 p-6'>
      {/* Заголовок */}
      <div className='flex items-center space-x-2 mb-8 cursor-pointer' onClick={() => navigate('/statistics')}>
        <button className='text-gray-400 hover:text-white transition-colors'>
          <ChevronLeft size={24} />
        </button>
        <h1 className='text-xl font-semibold'>{goal.name}</h1>
      </div>

      {/* Карточка с балансом */}
      <div className='bg-[#12131A] rounded-xl p-6 mb-6'>
        <div className='flex justify-between items-end mb-4'>
          <div>
            <p className='text-xl font-bold'>{goal.current_sum} ₸</p>
            <p className='text-sm text-gray-400'>Текущий баланс</p>
          </div>
          <div className='text-right'>
            <p className='text-xl font-semibold'>{goal.plan_sum} ₸</p>
            <p className='text-sm text-gray-400'>Цель</p>
          </div>
        </div>

        <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-4'>
          <div
            className='h-full bg-blue-500 rounded-full transition-all duration-300'
            style={{ width: `${(goal.current_sum / goal.plan_sum) * 100}%` }}
          />
        </div>

        <div className='flex justify-between'>
          <p className='text-xs text-gray-400'>Прогресс: {((goal.current_sum / goal.plan_sum) * 100).toFixed(1)}%</p>
          <p className='text-xs text-gray-400'>Осталось: {goal.plan_sum - goal.current_sum} ₸</p>
        </div>
      </div>

      {/* Кнопки для пополнения и снятия */}
      <div className='flex space-x-4 mb-6'>
        <button
          onClick={() => setOperationType('deposit')}
          className='flex-1 py-3 bg-green-500 rounded-xl font-medium hover:bg-green-600 transition-colors'
        >
          <ArrowUp className='inline mr-2 text-white' size={20} />
          Пополнить
        </button>
        <button
          onClick={() => setOperationType('withdraw')}
          className='flex-1 py-3 bg-red-500 rounded-xl font-medium hover:bg-red-600 transition-colors'
        >
          <ArrowDown className='inline mr-2 text-white' size={20} />
          Снять
        </button>
      </div>

      {/* История транзакций */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>История транзакций</h2>
        <div className='space-y-3'>
          {transactions?.map((tx, index) => (
            <div key={index} className='flex justify-between items-center bg-[#12131A] p-4 rounded-xl'>
              <div>
                <p className='font-medium'>{tx.is_deposit ? 'Пополнение' : 'Снятие'}</p>
                <p className='text-sm text-gray-400'>{new Date(tx.date).toLocaleString()}</p>
              </div>
              <p className={`font-medium ${tx.is_deposit ? 'text-green-500' : 'text-red-500'}`}>
                {tx.is_deposit ? '+' : '-'} {tx.sum} ₸
              </p>
            </div>
          ))}
        </div>
      </div>

      <Navigation />

      {/* Модальное окно для операций */}
      {operationType && (
        <MoneyOperationPopup type={operationType} onClose={() => setOperationType(null)} onSave={handleSave} />
      )}
    </div>
  );
};

export default GoalDetails;
