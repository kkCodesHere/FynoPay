import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import './DashboardPage.css';

export default function DashboardPage() {
  const { address } = useWallet();

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="wallet-info">
          <div className="wallet-card">
            <h2>Wallet Balance</h2>
            <p className="balance">0 ETH</p>
            <p className="address">{address}</p>
          </div>
        </div>
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {/* Transaction items will be added here */}
            <p className="no-transactions">No recent transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
} 