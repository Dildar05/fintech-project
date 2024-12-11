// fintech-project/front/src/components/AddGoalModal.jsx
import React, { useState } from 'react';

const AddGoalModal = ({ onClose, onSave }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalName && targetAmount) {
      onSave({ name: goalName, plan_sum: Number(targetAmount) });
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-[#12131A] p-6 rounded-xl w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>Добавить цель</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-400'>Название цели</label>
            <input
              type='text'
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className='w-full p-2 bg-gray-800 rounded-xl'
              required
            />
          </div>
          <div>
            <label className='block text-gray-400'>Целевая сумма</label>
            <input
              type='number'
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className='w-full p-2 bg-gray-800 rounded-xl'
              required
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <button type='button' onClick={onClose} className='px-4 py-2 bg-gray-600 rounded-xl'>
              Отмена
            </button>
            <button type='submit' className='px-4 py-2 bg-customBlue rounded-xl'>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
