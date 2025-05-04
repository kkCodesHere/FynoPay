import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Payment from './Payment';
import Search from '../search/Search';
import './CryptoPayments.css';

const NETWORKS = [
  { label: 'Ethereum', value: 'ETH' },
  { label: 'Polygon', value: 'POLY' }
];

type Tab = 'SEND' | 'REQUEST';

const CryptoPayments: React.FC = () => {
  const [tab, setTab] = useState<Tab>('SEND');
  const [selectedUser, setSelectedUser] = useState<{ username: string; address: string } | null>(null);
  const [network, setNetwork] = useState('ETH');
  const [requestAmount, setRequestAmount] = useState('');
  const [requestNote, setRequestNote] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Simulate current user's wallet address
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

  const handleUserSelect = (user: { username: string; address: string }) => {
    setSelectedUser(user);
  };

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setSelectedUser(null);
      setRequestAmount('');
      setRequestNote('');
    }, 2000);
  };

  return (
    <motion.div className="crypto-payments-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="crypto-tabs">
        <button className={tab === 'SEND' ? 'active' : ''} onClick={() => { setTab('SEND'); setSelectedUser(null); }}>Send</button>
        <button className={tab === 'REQUEST' ? 'active' : ''} onClick={() => { setTab('REQUEST'); setSelectedUser(null); }}>Request</button>
      </div>
      <div className="network-selector">
        <span>Network:</span>
        <select value={network} onChange={e => setNetwork(e.target.value)}>
          {NETWORKS.map(n => (
            <option key={n.value} value={n.value}>{n.label}</option>
          ))}
        </select>
      </div>
      <div className="crypto-payments-content">
        <AnimatePresence mode="wait">
          {!selectedUser ? (
            <motion.div key="search" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Search onUserSelect={handleUserSelect} />
            </motion.div>
          ) : tab === 'SEND' ? (
            <motion.div key="send" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Payment receiver={selectedUser} walletAddress={walletAddress} onTransactionComplete={() => setSelectedUser(null)} />
            </motion.div>
          ) : (
            <motion.div key="request" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <form className="request-form" onSubmit={handleRequest}>
                <h2>Request Payment</h2>
                <p className="receiver-info">From: {selectedUser.username}</p>
                <div className="amount-input">
                  <label htmlFor="request-amount">Amount</label>
                  <input
                    type="number"
                    id="request-amount"
                    value={requestAmount}
                    onChange={e => setRequestAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.000000000000000001"
                    required
                  />
                </div>
                <div className="note-input">
                  <label htmlFor="request-note">Note (optional)</label>
                  <input
                    type="text"
                    id="request-note"
                    value={requestNote}
                    onChange={e => setRequestNote(e.target.value)}
                    placeholder="Add a note..."
                  />
                </div>
                <button type="submit" className="request-btn">Request Payment</button>
                {requestSuccess && <div className="request-success">Request sent!</div>}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CryptoPayments; 