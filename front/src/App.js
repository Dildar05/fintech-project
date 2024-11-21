import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Onboarding from './components/Onboarding';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoadingScreen />} />
        <Route path='/registration' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/onboarding' element={<Onboarding />} />
      </Routes>
    </Router>
  );
};

export default App;
