import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Onboarding from './components/Onboarding';
import Home from './pages/Home';
import Converter from './pages/Converter';
import SettingsP from './pages/SettingsP';
import Language from './pages/Language';
import { Profile } from './pages/Profile';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { EditProfile } from './pages/EditProfile';
import { ChangePassword } from './pages/ChengePassword';
import Statistics from './pages/Statistics';
import GoalDetails from './pages/GoalDetails';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoadingScreen />} />
        <Route path='/registration' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route
          path='/home'
          element={
            <UserProvider>
              <Home />
            </UserProvider>
          }
        />

        <Route
          path='/profile'
          element={
            <UserProvider>
              <Profile />
            </UserProvider>
          }
        />
        <Route path='/converter' element={<Converter />} />
        <Route
          path='/settings'
          element={
            <UserProvider>
              <SettingsP />
            </UserProvider>
          }
        />
        <Route path='/language' element={<Language />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route
          path='/change-password'
          element={
            <UserProvider>
              <ChangePassword />
            </UserProvider>
          }
        />
        <Route
          path='/statistics'
          element={
            <UserProvider>
              <Statistics />
            </UserProvider>
          }
        />
        <Route
          path='/goal/:id'
          element={
            <UserProvider>
              <GoalDetails />
            </UserProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
