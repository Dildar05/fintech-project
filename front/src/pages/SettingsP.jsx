import React, { useContext } from 'react';
import { ChevronRight, Globe, Lock, Shield, FileText, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/UserContext';

const SettingsP = () => {
  const { user, setUser } = useContext(UserContext); // Получаем и user, и setUser
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };
  const settingsItems = [
    {
      id: 'language',
      label: 'Language',
      value: 'Русский',
      icon: Globe,
      path: '/language',
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      path: '/profile',
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      path: '/security',
    },
    {
      id: 'password',
      label: 'Change Password',
      icon: Lock,
      path: '/change-password',
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: FileText,
      path: '/privacy-policy',
    },
  ];

  return (
    <div className='min-h-screen bg-[#0A0B0F] pb-20 p-6'>
      <div className='flex items-center space-x-2 mb-8'>
        <h1 className='text-xl font-semibold'>Settings</h1>
      </div>

      <div className='space-y-4'>
        {settingsItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className='w-full flex items-center justify-between bg-[#12131A] p-4 rounded-xl'
          >
            <div className='flex items-center space-x-3'>
              <item.icon size={20} className='text-gray-400' />
              <span>{item.label}</span>
            </div>
            <div className='flex items-center space-x-2 text-gray-400'>
              {item.value && <span>{item.value}</span>}
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>

      <button className='w-full mt-8 py-4 bg-red-500/10 text-red-500 rounded-xl font-medium' onClick={handleLogout}>
        Log Out
      </button>
      <Navigation />
    </div>
  );
};
export default SettingsP;
