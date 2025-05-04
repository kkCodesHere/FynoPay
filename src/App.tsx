import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/theme.css';
import TransactionHistory from './components/transactions/TransactionHistory';
import './App.css';

// Import page components
import HomePage from './pages/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import Navbar from './components/shared/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <WalletProvider>
          <AuthProvider>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth/:mode" element={<AuthPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/transactions" element={<TransactionHistory />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/help" element={<HelpPage />} />
                </Routes>
              </main>
              <ToastContainer position="bottom-right" />
            </div>
          </AuthProvider>
        </WalletProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;