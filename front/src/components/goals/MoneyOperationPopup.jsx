// fintech-project/front/src/components/goals/MoneyOperationPopup.jsx
import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const MoneyOperationPopup = ({ type, onClose, onSave }) => {
  const isDeposit = type === 'deposit';
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Пожалуйста, введите корректную сумму.');
      return;
    }
    onSave(isDeposit, parsedAmount); // Передаем Boolean значение
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-[#12131A] rounded-xl w-full max-w-sm p-6'>
        <h2 className='text-xl font-semibold mb-4'>{isDeposit ? 'Пополнение Цели' : 'Снятие С Средств'}</h2>
        <div className='flex items-center space-x-2 mb-4'>
          {isDeposit ? (
            <ArrowUpRight className='text-green-500' size={24} />
          ) : (
            <ArrowDownLeft className='text-red-500' size={24} />
          )}
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='w-full p-2 bg-[#1E1F25] text-white rounded'
            placeholder='Введите сумму'
          />
        </div>
        <div className='flex justify-end space-x-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors'
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded ${
              isDeposit ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors`}
          >
            {isDeposit ? 'Пополнить' : 'Снять'}
          </button>
        </div>
      </div>
    </div>
  );
};
