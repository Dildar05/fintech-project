import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20 p-6'>
      <div className='flex items-center space-x-2 mb-8'>
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className='text-gray-400' />
        </button>
        <h1 className='text-xl font-semibold'>Change Password</h1>
      </div>

      <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
        <div className='space-y-2'>
          <label className='text-sm text-gray-400'>Current Password</label>
          <div className='relative'>
            <input
              type={showOldPassword ? 'text' : 'password'}
              className='w-full bg-[#12131A] p-4 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='button'
              onClick={() => setShowOldPassword(!showOldPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-gray-400'>New Password</label>
          <div className='relative'>
            <input
              type={showNewPassword ? 'text' : 'password'}
              className='w-full bg-[#12131A] p-4 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='button'
              onClick={() => setShowNewPassword(!showNewPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className='text-xs text-gray-400 mt-1'>
            Password must be at least 8 characters long and include numbers and special characters
          </p>
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-gray-400'>Confirm New Password</label>
          <div className='relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className='w-full bg-[#12131A] p-4 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors mt-8'
        >
          Update Password
        </button>
      </form>
    </div>
  );
};
