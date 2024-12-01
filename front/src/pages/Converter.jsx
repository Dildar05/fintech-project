import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Clock, TrendingUp, Trash2 } from 'lucide-react';
import Navigation from '../components/Navigation';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [conversionHistory, setConversionHistory] = useState([]);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      setConversionHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (conversionHistory.length > 0) {
      localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    }
  }, [conversionHistory]);

  const handleConvert = async () => {
    setErrorMessage('');

    if (!amount || amount <= 0) {
      setErrorMessage('Пожалуйста, введите сумму для конвертации');
      return;
    }

    if (fromCurrency === toCurrency) {
      setErrorMessage('Пожалуйста, выберите разные валюты');
      return;
    }

    try {
      setIsLoading(true);
      const url = `https://v6.exchangerate-api.com/v6/8c27d6b84277eb7f940a56ae/pair/${fromCurrency}/${toCurrency}/${amount}`;
      const response = await fetch(url);
      const data = await response.json();
      const resultValue = data.conversion_result.toFixed(2);
      setResult(resultValue);

      const newHistory = [
        {
          from: fromCurrency,
          to: toCurrency,
          amount: amount,
          result: resultValue,
          date: new Date().toLocaleTimeString(),
        },
        ...conversionHistory.slice(0, 4),
      ];

      setConversionHistory(newHistory);
      localStorage.setItem('conversionHistory', JSON.stringify(newHistory));
    } catch (error) {
      setErrorMessage('Ошибка при конвертации. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const clearHistory = () => {
    setConversionHistory([]);
    localStorage.removeItem('conversionHistory');
  };

  return (
    <div className='min-h-[100dvh] bg-[#111827] pb-20'>
      <div className='max-w-md mx-auto p-6 space-y-6'>
        <h1 className='text-2xl font-bold mb-8'>Currency Converter</h1>

        <div className='bg-[#1F2937] rounded-2xl p-6 space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm text-gray-400'>Amount</label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full bg-transparent text-2xl font-semibold outline-none'
              placeholder='Enter amount'
            />
          </div>

          <div className='flex items-center space-x-4'>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className='flex-1 py-3 px-4 rounded-xl bg-[#374151] outline-none'
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} {currency.symbol}
                </option>
              ))}
            </select>

            <button
              onClick={handleSwapCurrencies}
              className='w-10 h-10 bg-[#374151] rounded-full flex items-center justify-center hover:bg-[#4B5563] transition-colors'
            >
              <ArrowDownUp size={20} />
            </button>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className='flex-1 py-3 px-4 rounded-xl bg-[#374151] outline-none'
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} {currency.symbol}
                </option>
              ))}
            </select>
          </div>

          {errorMessage && <div className='text-red-500 text-sm text-center'>{errorMessage}</div>}

          <button
            onClick={handleConvert}
            className='w-full py-4 bg-customBlue rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? 'Converting...' : 'Convert'}
          </button>

          {result && (
            <div className='text-center p-4 bg-[#374151] rounded-xl'>
              <div className='text-3xl font-bold'>{result}</div>
              <div className='text-gray-400 mt-2'>
                {amount} {fromCurrency} = {result} {toCurrency}
              </div>
            </div>
          )}
        </div>

        {conversionHistory.length > 0 && (
          <div className='bg-[#1F2937] rounded-2xl p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-2'>
                <Clock size={20} className='text-gray-400' />
                <h2 className='text-lg font-semibold'>Conversion History</h2>
              </div>
            </div>

            <div className='space-y-4'>
              {conversionHistory.map((item, index) => (
                <div key={index} className='flex justify-between items-center p-3 bg-[#374151] rounded-xl'>
                  <div>
                    <div className='text-sm text-gray-400'>{item.date}</div>
                    <div>
                      {item.amount} {item.from} → {item.result} {item.to}
                    </div>
                  </div>
                  <TrendingUp size={16} className='text-green-500' />
                </div>
              ))}
            </div>

            <button
              onClick={clearHistory}
              className='w-full mt-4 py-3 flex items-center justify-center space-x-2 text-red-500 hover:text-red-400 transition-colors'
            >
              <Trash2 size={20} />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Converter;
