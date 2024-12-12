// components/goals/EditGoalModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditGoalModal = ({ goal, onClose, onSave }) => {
  const [name, setName] = useState(goal.name);
  const [planSum, setPlanSum] = useState(goal.plan_sum);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: name,
      plan_sum: Number(planSum),
    });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-[#1F2937] rounded-xl p-6 w-full max-w-md'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Редактировать цель</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white'>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm text-gray-400 mb-2'>Название цели</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full bg-[#374151] rounded-lg p-2 text-white'
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block text-sm text-gray-400 mb-2'>Целевая сумма</label>
            <input
              type='number'
              value={planSum}
              onChange={(e) => setPlanSum(e.target.value)}
              className='w-full bg-[#374151] rounded-lg p-2 text-white'
              min='0'
              required
            />
          </div>

          <div className='flex justify-end space-x-3'>
            <button type='button' onClick={onClose} className='px-4 py-2 text-sm text-gray-400 hover:text-white'>
              Отмена
            </button>
            <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditGoalModal;
