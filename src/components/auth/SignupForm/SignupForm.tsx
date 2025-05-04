"use client";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './SignupForm.css';

interface FormData {
  fullName: string;
  phoneNumber: string;
  username: string;
  email: string;
  pin: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    username: '',
    email: '',
    pin: '',
    password: '',
    confirmPassword: '',
  });

  const [showPin, setShowPin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear password error when user types in either password field
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add your signup logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <p className="subtitle">Join FynoPay and start managing your finances</p>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="10-digit number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="pin-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="pin-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEye /> : <FiEyeOff/>}
            </button>
          </div>
        </div>
      </div>

      <div className="form-group pin-group">
        <label htmlFor="pin">Payment PIN</label>
        <div className="pin-input-wrapper">
          <input
            type={showPin ? "text" : "password"}
            id="pin"
            name="pin"
            placeholder="4-digit PIN"
            value={formData.pin}
            onChange={handleChange}
            maxLength={4}
            pattern="[0-9]{4}"
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPin(!showPin)}
          >
            {showPin ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      {passwordError && <div className="error-message">{passwordError}</div>}

      <button
        type="submit"
        className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
        disabled={isSubmitting}
      >
        Create Account
      </button>

      <p className="login-link">
        Already have an account?<Link to="/login">Log In</Link>
      </p>
    </form>
  );
};

export default SignupForm; 