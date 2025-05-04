import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import './Payment.css';
import { createTransaction, addTransactionToHistory } from '../../utils/transactionUtils';

interface Token {
  symbol: string;
  balance: string;
  decimals: number;
}

interface PaymentProps {
  receiver: {
    username: string;
    address: string;
  };
  walletAddress: string;
  onTransactionComplete: (txHash: string) => void;
}

const Payment: React.FC<PaymentProps> = ({ 
  receiver, 
  walletAddress,
  onTransactionComplete 
}) => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [gasEstimate, setGasEstimate] = useState<string>('0');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');

  useEffect(() => {
    // Fetch tokens from wallet
    fetchWalletTokens();
  }, [walletAddress]);

  const fetchWalletTokens = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(walletAddress);
      const formattedBalance = ethers.formatEther(balance);
      
      const accounts = await provider.listAccounts();
      const address = accounts ? accounts[0] : null;
      
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      setTokens([{
        symbol: chainId === 137 ? 'MATIC' : 'ETH',
        balance: formattedBalance,
        decimals: 18
      }]);
      
      setSelectedToken({
        symbol: chainId === 137 ? 'MATIC' : 'ETH',
        balance: formattedBalance,
        decimals: 18
      });
    } catch (err) {
      setError('Failed to fetch tokens');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    // Estimate gas here
    setGasEstimate('0.001'); // Placeholder
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      if (!window.ethereum || !selectedToken) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = {
        to: receiver.address,
        value: ethers.parseEther(amount)
      };

      const transaction = await signer.sendTransaction(tx);
      const receipt = await transaction.wait();
      
      // Create a new transaction record
      const newTransaction = createTransaction(
        'SENT',
        { 
          username: 'kanchan_456.fyno', // Current user
          walletAddress: walletAddress 
        },
        { 
          username: receiver.username,
          walletAddress: receiver.address 
        },
        { 
          value: -parseFloat(amount), // Negative for sent transactions
          token: selectedToken.symbol,
          usdEquivalent: parseFloat(amount) * 3000 // Approximate USD value
        },
        selectedToken.symbol === 'ETH' ? 'ETH' : 'POLY'
      );
      
      // Add the transaction to the history
      addTransactionToHistory(newTransaction);

      onTransactionComplete(transaction.hash);
      setShowPinInput(false);
      setPin('');
      setAmount('');
    } catch (err) {
      setError('Transaction failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      className="payment-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Send Payment</h2>
      <p className="receiver-info">To: {receiver.username}</p>

      <div className="amount-input">
        <label htmlFor="amount">Amount</label>
        <div className="input-group">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            min="0"
            step="0.000000000000000001"
          />
          <select 
            value={selectedToken?.symbol}
            onChange={(e) => {
              const token = tokens.find(t => t.symbol === e.target.value);
              if (token) handleTokenSelect(token);
            }}
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} (Balance: {token.balance})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="transaction-details">
        <div className="detail-row">
          <span>Amount</span>
          <span>{amount} {selectedToken?.symbol}</span>
        </div>
        <div className="detail-row">
          <span>Gas Fee (Estimated)</span>
          <span>{gasEstimate} {selectedToken?.symbol}</span>
        </div>
        <div className="detail-row total">
          <span>Total</span>
          <span>{(parseFloat(amount) + parseFloat(gasEstimate)).toFixed(6)} {selectedToken?.symbol}</span>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {showPinInput ? (
        <div className="pin-input">
          <label htmlFor="pin">Enter 4-digit PIN</label>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          <button 
            onClick={handlePinSubmit}
            disabled={isProcessing || pin.length !== 4}
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      ) : (
        <button 
          className="send-button"
          onClick={() => setShowPinInput(true)}
          disabled={!amount || isProcessing}
        >
          Send Payment
        </button>
      )}
    </motion.div>
  );
};

export default Payment; 