import React, { useContext } from 'react';
import { ArrowUp, ArrowDown, DollarSign, Upload, Apple, ShoppingCart } from 'lucide-react';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const cardNumber = '4562 1122 4595 7852';
  const cvv = '6986';
  const cardId = '48940';

  const actions = [
    { icon: ArrowUp, label: 'Sent' },
    { icon: ArrowDown, label: 'Receive' },
    { icon: DollarSign, label: 'Loan' },
    { icon: Upload, label: 'Topup' },
  ];

  const transactions = [
    {
      id: 1,
      name: 'Apple Store',
      category: 'Entertainment',
      icon: Apple,
      amount: -5.99,
      color: 'white',
    },
    {
      id: 2,
      name: 'Spotify',
      category: 'Music',
      icon: () => (
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png'
          alt='Spotify'
          className='w-4 h-4'
        />
      ),
      amount: -12.99,
      color: '#1ED760',
    },
    {
      id: 3,
      name: 'Money Transfer',
      category: 'Transaction',
      icon: ArrowDown,
      amount: 300,
      color: '#0066FF',
    },
    {
      id: 4,
      name: 'Grocery',
      category: 'Shopping',
      icon: ShoppingCart,
      amount: -88,
      color: '#FF6B6B',
    },
  ];
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };
  return (
    <div className='min-h-screen bg-[#0A0B0F] text-white p-6 pb-20'>
      <div className='flex items-center space-x-3 mb-8'>
        <div>
          <p className='text-gray-400 text-sm'>Welcome back,</p>
          {/* тут должен быть имя пользователя */}
          <p className='font-semibold text-lg'>{user?.full_name}</p>
        </div>
      </div>

      <div
        className='w-full aspect-[1.588/1] rounded-2xl p-6 flex flex-col justify-between mb-8 relative overflow-hidden'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/images/DALL·E-2024-11-29-21.08.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Верхняя секция */}
        <div className='flex justify-between items-start relative z-10'>
          <div className='flex items-center space-x-2'>
            <div className='relative w-10 h-7 bg-[#C0A062] rounded'>
              <div className='absolute inset-0.5 grid grid-cols-2 grid-rows-4 gap-[1px]'>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className='bg-[#D4B675] rounded-sm' />
                ))}
              </div>
            </div>
          </div>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png'
            alt='Mastercard'
            className='h-8 object-contain'
          />
        </div>

        {/* Средняя секция - номер карты */}
        <div className='font-mono text-xl tracking-wider mt-5 relative z-10'>{cardNumber}</div>

        {/* Нижняя секция */}
        <div className='flex justify-between items-center text-sm text-gray-400 mt-4 relative z-10'>
          <div className='text-2xl font-semibold text-white'>{formatBalance(cardId)} $</div>
          <div>CVV {cvv}</div>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-4 mb-8'>
        {actions.map((Action, index) => (
          <button key={index} className='flex flex-col items-center space-y-2'>
            <div className='w-12 h-12 rounded-full bg-[#12131A] flex items-center justify-center'>
              <Action.icon size={20} className='text-customBlue' />
            </div>
            <span className='text-xs text-gray-400'>{Action.label}</span>
          </button>
        ))}
      </div>

      <div>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Transaction</h2>
          <button className='text-customBlue text-sm'>See All</button>
        </div>

        <div className='space-y-4'>
          {transactions.map((tx) => (
            <div key={tx.id} className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className='w-10 h-10 rounded-full bg-[#12131A] flex items-center justify-center'
                  style={{ color: tx.color }}
                >
                  <tx.icon size={20} />
                </div>
                <div>
                  <p className='font-medium'>{tx.name}</p>
                  <p className='text-sm text-gray-400'>{tx.category}</p>
                </div>
              </div>
              <p className={`font-medium ${tx.amount > 0 ? 'text-customBlue' : ''}`}>
                {tx.amount > 0 ? '+' : ''}
                {tx.amount > 0 ? '$' : '- $'}
                {Math.abs(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};
export default Home;
