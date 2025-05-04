import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { FiCopy } from 'react-icons/fi';
import './ReceivePage.css';

export default function ReceivePage() {
  const { address } = useWallet();
  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="receive-page">
      <div className="receive-container">
        <h1>Receive Payment</h1>
        <div className="qr-code">
          {/* QR Code will be added here */}
          <div className="qr-placeholder">
            QR Code Placeholder
          </div>
        </div>
        <div className="address-container">
          <p className="address-label">Your Wallet Address</p>
          <div className="address-box">
            <code className="address">{address}</code>
            <button 
              className="copy-button"
              onClick={copyAddress}
              title="Copy address"
            >
              <FiCopy />
            </button>
          </div>
          {copied && <p className="copied-message">Address copied!</p>}
        </div>
      </div>
    </div>
  );
} 