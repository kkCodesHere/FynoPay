/**
 * Represents a blockchain transaction
 */
export interface Transaction {
  id: string;
  timestamp: string;
  network: 'ETH' | 'POLY';
  type: 'SENT' | 'RECEIVED' | 'SWAP';
  sender: {
    username: string;
    walletAddress: string;
  };
  receiver: {
    username: string;
    walletAddress: string;
  };
  amount: {
    value: number;
    token: string;
    usdEquivalent: number;
  };
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
  confirmations?: {
    current: number;
    required: number;
  };
  hash: string;
} 