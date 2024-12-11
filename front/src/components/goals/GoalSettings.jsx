import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * @param {{
 *   goal: {
 *     id: number,
 *     name: string,
 *     current: number,
 *     target: number
 *   },
 *   onClose: () => void,
 *   onSave: (updatedGoal: object) => void
 * }} props
 */
export const GoalSettings = ({ goal, onClose, onSave }) => {
  const [name, setName] = useState(goal.name);
  const [target, setTarget] = useState(goal.target.toString());

  const handleSave = () => {
    onSave({
      ...goal,
      name,
      target: parseInt(target),
    });
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-[#12131A] rounded-xl w-full max-w-sm'>
        <div className='p-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Настройки цели</h2>
            <button onClick={onClose} className='text-gray-400 hover:text-white transition-colors'>
              <X size={24} />
            </button>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Название цели</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full bg-[#1E1F25] p-4 rounded-xl outline-none'
                placeholder='Введите название цели'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Целевая сумма</label>
              <input
                type='number'
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className='w-full bg-[#1E1F25] p-4 rounded-xl outline-none'
                placeholder='Введите сумму'
                min='0'
              />
            </div>
          </div>

          <div className='flex space-x-3'>
            <button
              onClick={onClose}
              className='flex-1 py-3 bg-[#1E1F25] rounded-xl font-medium hover:bg-[#2A2B35] transition-colors'
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className='flex-1 py-3 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 transition-colors'
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
