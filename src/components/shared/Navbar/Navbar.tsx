import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../../../contexts/WalletContext';
import ThemeToggle from '../../shared/ThemeToggle';
import './Navbar.css';
import { FiHome, FiSettings, FiHelpCircle, FiLogIn, FiUser, FiList, FiGrid } from 'react-icons/fi';
import React from 'react';

export default function Navbar() {
  const { address, connect, isConnected } = useWallet();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { to: '/', icon: FiHome, label: 'Home' },
    { to: '/dashboard', icon: FiGrid, label: 'Dashboard' },
    { to: '/transactions', icon: FiList, label: 'Transactions' },
    { to: '/settings', icon: FiSettings, label: 'Settings' },
    { to: '/help', icon: FiHelpCircle, label: 'Help' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🅵</span>
          <span className="logo-text">FynoPay</span>
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`nav-link ${isActive(link.to) ? 'active' : ''}`}>
              {React.createElement(link.icon, { className: "nav-icon" })}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="auth-actions">
          <ThemeToggle />
          {isConnected ? (
            <div className="wallet-connected">
              <span className="wallet-address">
                {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="auth-btn login-btn">
                <FiLogIn className="btn-icon" />
                Login
              </Link>
              <Link to="/auth/signup" className="auth-btn signup-btn">
                <FiUser className="btn-icon" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}