import React, { useState } from 'react';
import { CircleDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Fastest Payment in the world',
      description: 'Integrate multiple payment methods to help you up the process quickly',
      image: '/images/Group 1.svg',
    },
    {
      title: 'The most Secure Platform for Customer',
      description: 'Built-in fingerprint, face recognition and more, keeping you completely safe',
      image: '/images/Group 3.svg',
    },
    {
      title: 'Paying for Everything is Easy and Convenient',
      description: 'Built-in fingerprint, face recognition and more, keeping you completely safe',
      image: '/images/Group 4.svg',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/login');
    }
  };

  const step = steps[currentStep];

  return (
    <div className='flex flex-col items-center justify-between min-h-screen p-8'>
      <div className='flex items-center space-x-2'>
        <CircleDot className='w-8 h-8 text-blue-500' />
        <span className='text-xl font-bold'>GOALBANK</span>
      </div>

      <div className='max-w-md w-full space-y-8'>
        <div className='w-full h-64 rounded-2xl overflow-hidden'>
          <img src={step.image} alt={step.title} className='w-full h-full object-contain' />
        </div>

        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-bold'>{step.title}</h2>
          <p className='text-gray-400'>{step.description}</p>
        </div>

        <div className='flex justify-center space-x-2'>
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-customBlue' : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className='w-full py-4 bg-customBlue rounded-xl font-semibold hover:bg-blue-600 transition-colors'
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>

      <div className='h-8' />
    </div>
  );
};

export default Onboarding;
