import React from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState('ru');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'uk', name: 'Українська' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20 p-6'>
      <div className='flex items-center space-x-2 mb-8' onClick={() => navigate(-1)}>
        <button>
          <ChevronLeft className='text-gray-400' />
        </button>
        <h1 className='text-xl font-semibold'>Language</h1>
      </div>

      <div className='space-y-2'>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => setSelectedLanguage(language.code)}
            className='w-full flex items-center justify-between bg-[#12131A] p-4 rounded-xl'
          >
            <span>{language.name}</span>
            {selectedLanguage === language.code && <Check size={20} className='text-blue-500' />}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Language;
