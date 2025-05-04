import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './LoginForm.css';
import { FiUser, FiLock } from 'react-icons/fi';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, pin);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="form-title">Welcome Back</h2>
      
      <div className="form-group">
        <label htmlFor="username" className="form-label">Username</label>
        <div className="input-container">
          <FiUser className="input-icon" />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Enter your username"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="pin" className="form-label">4-digit PIN</label>
        <div className="input-container">
          <FiLock className="input-icon" />
          <input
            id="pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="form-input"
            placeholder="••••"
            maxLength={4}
            pattern="\d{4}"
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Sign In
      </button>
    </form>
  );
}