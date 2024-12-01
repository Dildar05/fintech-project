import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <div className='pb-20 p-6'>
      <div className='flex items-center space-x-2 mb-6' onClick={() => navigate(-1)}>
        <button>
          <ChevronLeft />
        </button>
        <h1 className='text-xl font-semibold'>Edit Profile</h1>
      </div>

      <div className='flex flex-col items-center mb-8'>
        <div className='relative'>
          <img
            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
            alt='Profile'
            className='w-24 h-24 rounded-full mb-4'
          />
          <button className='absolute bottom-4 right-0 bg-blue-500 rounded-full p-2'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
          </button>
        </div>
        <h2 className='text-xl font-semibold'>Tanya Myroniuk</h2>
        <p className='text-gray-400'>Senior Designer</p>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-gray-400'>Full Name</label>
          <input
            type='text'
            defaultValue='Tanya Myroniuk'
            className='w-full bg-[#12131A] p-4 rounded-xl outline-none'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-gray-400'>Email Address</label>
          <input
            type='email'
            defaultValue='tanya.myroniuk@gmail.com'
            className='w-full bg-[#12131A] p-4 rounded-xl outline-none'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-gray-400'>Phone Number</label>
          <input type='tel' defaultValue='+380970562389' className='w-full bg-[#12131A] p-4 rounded-xl outline-none' />
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-gray-400'>Birth Date</label>
          <div className='grid grid-cols-3 gap-4'>
            <input type='text' defaultValue='28' className='w-full bg-[#12131A] p-4 rounded-xl outline-none' />
            <input type='text' defaultValue='September' className='w-full bg-[#12131A] p-4 rounded-xl outline-none' />
            <input type='text' defaultValue='2000' className='w-full bg-[#12131A] p-4 rounded-xl outline-none' />
          </div>
        </div>
      </div>

      <button className='w-full bg-blue-500 text-white py-3 rounded-xl mt-8'>Save Changes</button>
    </div>
  );
};
