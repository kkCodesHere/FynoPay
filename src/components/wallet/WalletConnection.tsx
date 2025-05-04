import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import './WalletConnection.css';

interface WalletConnectionProps {
  onWalletConnected: (address: string) => void;
  onVerificationComplete: () => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ 
  onWalletConnected, 
  onVerificationComplete 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string>('');

  useEffect(() => {
    // Generate a random nonce for verification
    // Updated for ethers v6
    setNonce(ethers.hexlify(ethers.randomBytes(32)));
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[];

      // Check if accounts is defined and has at least one element
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      onWalletConnected(address);

      // Request signature for verification
      const message = `Sign this message to verify your wallet ownership. Nonce: ${nonce}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      // Verify signature (this would typically be done on the backend)
      // For demo purposes, we'll just complete the verification
      onVerificationComplete();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <motion.div 
      className="wallet-connection"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Connect Your Wallet</h2>
      <p className="description">
        Connect your MetaMask wallet to start using FynoPay. We'll verify your ownership
        with a one-time signature.
      </p>

      <button 
        className="connect-button"
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="network-info">
        <h3>Supported Networks</h3>
        <ul>
          <li>Ethereum Mainnet</li>
          <li>Polygon Mainnet</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default WalletConnection; 