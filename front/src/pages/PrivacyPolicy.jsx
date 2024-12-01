import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20 p-6'>
      <div className='flex items-center space-x-2 mb-8' onClick={() => navigate(-1)}>
        <button>
          <ChevronLeft className='text-gray-400' />
        </button>
        <h1 className='text-xl font-semibold'>Privacy Policy</h1>
      </div>

      <div className='space-y-6'>
        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Data Collection</h2>
          <p className='text-gray-400 leading-relaxed'>
            We collect information that you provide directly to us, including when you create an account, make a
            transaction, or contact us for support.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Use of Information</h2>
          <p className='text-gray-400 leading-relaxed'>
            We use the information we collect to provide, maintain, and improve our services, to process your
            transactions, and to communicate with you.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Data Security</h2>
          <p className='text-gray-400 leading-relaxed'>
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Your Rights</h2>
          <p className='text-gray-400 leading-relaxed'>
            You have the right to access, update, or delete your personal information. You can exercise these rights by
            contacting our support team.
          </p>
        </section>
      </div>
    </div>
  );
};
