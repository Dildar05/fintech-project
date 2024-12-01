import React from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className='pb-20 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center space-x-2' onClick={() => navigate('/settings')}>
          <button className='text-gray-400 hover:text-white transition-colors'>
            <ChevronLeft />
          </button>
          <h1 className='text-xl font-semibold'>Profile</h1>
        </div>
        <button onClick={() => navigate('/edit-profile')}>
          <Settings size={24} />
        </button>
      </div>

      <div className='flex flex-col items-center mb-8'>
        <img
          src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
          alt='Profile'
          className='w-24 h-24 rounded-full mb-4'
        />
        <h2 className='text-xl font-semibold'>Tanya Myroniuk</h2>
        <p className='text-gray-400'>Senior Designer</p>
      </div>

      <div className='space-y-4'>
        {[
          { label: 'Personal Information', icon: ChevronRight },
          { label: 'Payment Preferences', icon: ChevronRight },
          { label: 'Address', icon: ChevronRight },
          { label: 'Settings', icon: ChevronRight },
        ].map((item, index) => (
          <button key={index} className='w-full flex items-center justify-between bg-[#12131A] p-4 rounded-xl'>
            <span>{item.label}</span>
            <item.icon size={20} className='text-gray-400' />
          </button>
        ))}
      </div>
    </div>
  );
};
