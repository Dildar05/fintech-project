import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const MoneyOperationPopup = ({ type, amount, onAmountChange, onCancel, onSave }) => {
  const isDeposit = type === 'deposit';
  const title = isDeposit ? 'Попап для пополнения' : 'Попап для пополнения';
  const action = isDeposit ? 'Пополнить' : 'Вывести';
  const Icon = isDeposit ? ArrowDownLeft : ArrowUpRight;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-[#12131A] rounded-xl w-full max-w-sm'>
        <div className='p-6 space-y-4'>
          <h2 className='text-xl font-semibold'>{title}</h2>

          <div className='flex items-center space-x-2 bg-[#1E1F25] p-3 rounded-xl'>
            <Icon className={isDeposit ? 'text-green-500' : 'text-red-500'} />
            <input
              type='number'
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              className='bg-transparent w-full outline-none text-xl'
              placeholder='0'
            />
          </div>

          <div className='flex space-x-3'>
            <button onClick={onCancel} className='flex-1 py-3 bg-[#1E1F25] rounded-xl font-medium'>
              Отмена
            </button>
            <button onClick={onSave} className='flex-1 py-3 bg-blue-500 rounded-xl font-medium'>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
