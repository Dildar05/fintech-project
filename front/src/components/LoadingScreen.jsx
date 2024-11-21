import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = ({ duration = 2000, onFinish }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onFinish) onFinish();
      navigate('/onboarding');
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onFinish, navigate]);

  if (!loading) return null;

  return (
    <div className='loading-screen flex items-center justify-center h-screen'>
      <img src='/images/Logo.svg' alt='Logo' className='logo' />
    </div>
  );
};

export default LoadingScreen;
