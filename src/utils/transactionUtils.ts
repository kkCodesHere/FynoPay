import { Transaction } from '../types/Transaction';

/**
 * Adds a new transaction to the transaction history
 * @param transaction The transaction to add
 */
export const addTransactionToHistory = (transaction: Transaction): void => {
  // Dispatch a custom event that the TransactionHistory component listens for
  const event = new CustomEvent('newTransaction', { detail: transaction });
  window.dispatchEvent(event);
  
  // Alternative method using the exposed function
  if (window.addTransactionToHistory) {
    // @ts-ignore
    window.addTransactionToHistory(transaction);
  }
};

/**
 * Creates a new transaction object
 * @param type The transaction type (SENT, RECEIVED, SWAP)
 * @param sender The sender's information
 * @param receiver The receiver's information
 * @param amount The transaction amount
 * @param network The blockchain network
 * @returns A new Transaction object
 */
export const createTransaction = (
  type: 'SENT' | 'RECEIVED' | 'SWAP',
  sender: { username: string; walletAddress: string },
  receiver: { username: string; walletAddress: string },
  amount: { value: number; token: string; usdEquivalent: number },
  network: 'ETH' | 'POLY' = 'ETH'
): Transaction => {
  return {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    network,
    type,
    sender,
    receiver,
    amount,
    status: 'PENDING',
    confirmations: {
      current: 0,
      required: 12
    },
    hash: `0x${Math.random().toString(16).substring(2, 42)}`
  };
};

// Add TypeScript declaration for the window object
declare global {
  interface Window {
    addTransactionToHistory?: (transaction: Transaction) => void;
  }
} 