import React, { useState } from 'react';
import { Eye, EyeOff, CircleDot } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://172.20.10.4:8000/api/v0/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Сохраняем ID пользователя в localStorage
        localStorage.setItem('user', JSON.stringify({ id: result.id }));
        navigate('/home');
      } else {
        const error = await response.json();
        alert(error.detail);
      }
    } catch (error) {
      alert('Ошибка при входе');
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen p-8'>
      <div className='flex items-center space-x-2 mb-12'>
        <CircleDot className='w-8 h-8 text-customBlue' />
        <span className='text-xl font-bold'>GOALBANK</span>
      </div>

      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-2'>Sign In</h2>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-2'>
            <label className='text-sm text-gray-400'>Email Address</label>
            <input
              type='email'
              placeholder='John@gmail.com'
              className='w-full p-4 bg-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none'
              {...register('email')}
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          </div>

          <div className='space-y-2'>
            <label className='text-sm text-gray-400'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Your password'
                className='w-full p-4 bg-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none'
                {...register('password')}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 bg-transparent p-0'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          </div>

          <button
            type='submit'
            className='w-full py-4 bg-customBlue rounded-xl font-semibold hover:bg-blue-600 transition-colors'
          >
            Sign In
          </button>
        </form>

        <p className='text-center text-gray-400'>
          I'm a new user.{' '}
          <Link to='/registration' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
