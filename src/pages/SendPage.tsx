import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import './SendPage.css';

export default function SendPage() {
  const { address } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add send transaction logic here
    setIsLoading(false);
  };

  return (
    <div className="send-page">
      <div className="send-container">
        <h1>Send Payment</h1>
        <form onSubmit={handleSend} className="send-form">
          <div className="form-group">
            <label htmlFor="recipient">Recipient Address</label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount (ETH)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.000000000000000001"
              required
            />
          </div>
          <button type="submit" className="send-button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Payment'}
          </button>
        </form>
      </div>
    </div>
  );
} 