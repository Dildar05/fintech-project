import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart2, RefreshCcw, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: Home, path: '/home', label: 'Главная' },
    { icon: BarChart2, path: '/statistics', label: 'Статистика' },
    { icon: RefreshCcw, path: '/converter', label: 'Конвертор' },
    { icon: Settings, path: '/settings', label: 'Настройки' },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-[#12131A] border-t border-gray-800'>
      <div className='flex justify-around items-center p-4'>
        {navItems.map(({ icon: Icon, path, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center space-y-1 ${isActive(path) ? 'text-customBlue' : 'text-gray-400'}`}
          >
            <Icon size={24} />
            <span className='text-xs'>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
