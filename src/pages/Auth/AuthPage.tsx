import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/auth/Loginform/LoginForm';
import SignupForm from '../../components/auth/SignupForm/SignupForm';
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthPage;