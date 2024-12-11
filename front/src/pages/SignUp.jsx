// SignUp.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, CircleDot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUp = () => {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // fintech-project/front/src/pages/SignUp.jsx

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v0/auth/register', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          password: data.password,
          phone: data.phoneNumber,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(result));
        navigate('/login');
      } else {
        const error = await response.json();
        alert(error.detail);
      }
    } catch (error) {
      alert(error.message);
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
          <h2 className='text-2xl font-bold mb-2'>Sign Up</h2>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-2'>
            <label className='text-sm text-gray-400'>Full Name</label>
            <input
              placeholder='John Doe'
              className={`w-full p-4 bg-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none ${
                errors.fullName ? 'border-2 border-red-500' : ''
              }`}
              {...register('fullName')}
            />
            {errors.fullName && <p className='text-red-500 text-sm'>{errors.fullName.message}</p>}
          </div>

          <div className='space-y-2'>
            <label className='text-sm text-gray-400'>Phone Number</label>
            <input
              type='tel'
              placeholder='+380970562389'
              className='w-full p-4 bg-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none'
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && <p className='text-red-500 text-sm'>{errors.phoneNumber.message}</p>}
          </div>

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
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          </div>

          <button
            type='submit'
            className='w-full py-4 bg-customBlue rounded-xl font-semibold hover:bg-blue-600 transition-colors'
          >
            Sign Up
          </button>
        </form>

        <p className='text-center text-gray-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
