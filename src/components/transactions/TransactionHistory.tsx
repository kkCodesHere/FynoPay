import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FiArrowUpRight, FiArrowDownLeft, FiRepeat, FiMoreVertical, FiEdit2, FiTrash2, FiX, FiCopy } from 'react-icons/fi';
import './TransactionHistory.css';

interface Transaction {
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

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionDetails: {
    type: string;
    amount: string;
    token: string;
  };
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, transactionDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Delete Transaction</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this transaction?</p>
          <div className="transaction-details">
            <p>Type: {transactionDetails.type}</p>
            <p>Amount: {transactionDetails.amount} {transactionDetails.token}</p>
          </div>
          <div className="warning-text">
            This action cannot be undone.
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

const TransactionHistory: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    transactionId: string | null;
    details: { type: string; amount: string; token: string; };
  }>({
    isOpen: false,
    transactionId: null,
    details: { type: '', amount: '', token: '' }
  });

  // Initial transaction data
  const initialTransactions: Transaction[] = [
    {
      id: '15',
      timestamp: '2024-04-17T09:45:00Z',
      network: 'ETH',
      type: 'SENT',
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'crypto_artist.fyno',
        walletAddress: '0x7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6g'
      },
      amount: {
        value: -0.7,
        token: 'ETH',
        usdEquivalent: 2100
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 12,
        required: 12
      },
      hash: '0x7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h'
    },
    {
      id: '16',
      timestamp: '2024-04-16T16:20:00Z',
      network: 'POLY',
      type: 'RECEIVED',
      sender: {
        username: 'defi_lender.fyno',
        walletAddress: '0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6g7h'
      },
      receiver: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      amount: {
        value: 1500,
        token: 'MATIC',
        usdEquivalent: 1350
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 15,
        required: 15
      },
      hash: '0x8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i'
    },
    {
      id: '17',
      timestamp: '2024-04-15T11:30:00Z',
      network: 'ETH',
      type: 'SWAP',
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'uniswap_001.fyno',
        walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      },
      amount: {
        value: -0.9,
        token: 'ETH → LINK',
        usdEquivalent: 2700
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 12,
        required: 12
      },
      hash: '0x9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j'
    },
    {
      id: '18',
      timestamp: '2024-04-14T14:15:00Z',
      network: 'POLY',
      type: 'SENT',
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'game_developer.fyno',
        walletAddress: '0x9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6g7h8i'
      },
      amount: {
        value: -400,
        token: 'MATIC',
        usdEquivalent: 360
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 15,
        required: 15
      },
      hash: '0x0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k'
    },
    {
      id: '19',
      timestamp: '2024-04-13T19:40:00Z',
      network: 'ETH',
      type: 'RECEIVED',
      sender: {
        username: 'dao_member.fyno',
        walletAddress: '0x0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6g7h8i9j'
      },
      receiver: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      amount: {
        value: 0.4,
        token: 'ETH',
        usdEquivalent: 1200
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 12,
        required: 12
      },
      hash: '0x1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l'
    },
    {
      id: '20',
      timestamp: '2024-04-12T10:25:00Z',
      network: 'POLY',
      type: 'SWAP',
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'quickswap_001.fyno',
        walletAddress: '0x1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6g7h8i9j0k'
      },
      amount: {
        value: -800,
        token: 'MATIC → USDC',
        usdEquivalent: 720
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 15,
        required: 15
      },
      hash: '0x2t3u4v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1m'
    },
    {
      id: '9',
      timestamp: '2024-04-20T15:30:00Z',
      network: 'ETH',
      type: 'RECEIVED',
      sender: {
        username: 'crypto_trader.fyno',
        walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12'
      },
      receiver: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      amount: {
        value: 3.5,
        token: 'ETH',
        usdEquivalent: 10500
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 12,
        required: 12
      },
      hash: '0x1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b'
    },
    {
      id: '1',
      timestamp: '2024-04-22T14:30:00Z',
      network: 'ETH' as const,
      type: 'RECEIVED' as const,
      sender: {
        username: 'luv_123.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      },
      amount: {
        value: 1.2,
        token: 'ETH',
        usdEquivalent: 3600
      },
      status: 'CONFIRMED' as const,
      confirmations: {
        current: 12,
        required: 12
      },
      hash: '0x3a7b2c8d9e4f5a6b7c8d9e4f5a6b7c8d9e4f5a6b'
    },
    {
      id: '2',
      timestamp: '2024-04-22T12:15:00Z',
      network: 'POLY' as const,
      type: 'SENT' as const,
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      },
      receiver: {
        username: 'sanika_789.fyno',
        walletAddress: '0x9876543210abcdef9876543210abcdef98765432'
      },
      amount: {
        value: -500,
        token: 'MATIC',
        usdEquivalent: 450
      },
      status: 'CONFIRMED' as const,
      confirmations: {
        current: 15,
        required: 15
      },
      hash: '0x4b8c3d9e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c'
    },
    {
      id: '3',
      timestamp: '2024-04-21T18:45:00Z',
      network: 'ETH' as const,
      type: 'SWAP' as const,
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'uniswap_001.fyno',
        walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      },
      amount: {
        value: -2.5,
        token: 'ETH → USDT',
        usdEquivalent: 7500
      },
      status: 'CONFIRMED' as const,
      confirmations: {
        current: 12,
        required: 12
      },
      hash: '0x5c9d4e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u'
    },
    {
      id: '4',
      timestamp: '2024-04-21T16:20:00Z',
      network: 'POLY' as const,
      type: 'RECEIVED' as const,
      sender: {
        username: 'arjun_234.fyno',
        walletAddress: '0x9876543210abcdef9876543210abcdef98765432'
      },
      receiver: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      },
      amount: {
        value: 1000,
        token: 'MATIC',
        usdEquivalent: 900
      },
      status: 'CONFIRMED' as const,
      confirmations: {
        current: 15,
        required: 15
      },
      hash: '0x6d0e5f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v'
    },
    {
      id: '5',
      timestamp: '2024-04-21T14:10:00Z',
      network: 'ETH' as const,
      type: 'SENT' as const,
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'manav_567.fyno',
        walletAddress: '0x9876543210abcdef9876543210abcdef98765432'
      },
      amount: {
        value: -0.8,
        token: 'ETH',
        usdEquivalent: 2400
      },
      status: 'PENDING' as const,
      confirmations: {
        current: 8,
        required: 12
      },
      hash: '0x7e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t5u7v8w'
    },
    {
      id: '6',
      timestamp: '2024-04-21T10:05:00Z',
      network: 'POLY',
      type: 'RECEIVED',
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      },
      receiver: {
        username: 'ritesh_web3.fyno',
        walletAddress: '0x9876543210abcdef9876543210abcdef98765432'
      },
      amount: {
        value: 750,
        token: 'MATIC',
        usdEquivalent: 675
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 15,
        required: 15
      },
      hash: '0x8f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x'
    },
    {
      id: '7',
      timestamp: '2024-04-20T22:30:00Z',
      network: 'ETH',
      type: 'SENT',
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'jako_pays.fyno',
        walletAddress: '0x9876543210abcdef9876543210abcdef98765432'
      },
      amount: {
        value: -1.5,
        token: 'ETH',
        usdEquivalent: 4500
      },
      status: 'FAILED',
      hash: '0x9g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y'
    },
    {
      id: '8',
      timestamp: '2024-04-20T20:15:00Z',
      network: 'ETH',
      type: 'SWAP',
      sender: {
        username: 'kanchan_456.fyno',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      },
      receiver: {
        username: 'uniswap_001.fyno',
        walletAddress: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      },
      amount: {
        value: -1000,
        token: 'USDT → ETH',
        usdEquivalent: 1000
      },
      status: 'CONFIRMED',
      confirmations: {
        current: 12,
        required: 12
      },
      hash: '0x0h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z'
    }
  ];

  // Initialize transactions on component mount
  useEffect(() => {
    setTransactions(initialTransactions);
    
    // Set up event listener for new transactions
    const handleNewTransaction = (event: CustomEvent<Transaction>) => {
      const newTransaction = event.detail;
      setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    };
    
    // Add event listener
    window.addEventListener('newTransaction' as any, handleNewTransaction as EventListener);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('newTransaction' as any, handleNewTransaction as EventListener);
    };
  }, []);

  // Function to add a new transaction (can be called from other components)
  const addNewTransaction = (transaction: Transaction) => {
    setTransactions(prevTransactions => [transaction, ...prevTransactions]);
  };

  // Expose the addNewTransaction function to the window object
  useEffect(() => {
    // @ts-ignore
    window.addTransactionToHistory = addNewTransaction;
  }, []);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'SENT':
        return <FiArrowUpRight className="type-icon sent" />;
      case 'RECEIVED':
        return <FiArrowDownLeft className="type-icon received" />;
      case 'SWAP':
        return <FiRepeat className="type-icon swap" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Transaction['status'], confirmations?: { current: number; required: number }) => {
    const statusClasses = {
      CONFIRMED: 'status-confirmed',
      PENDING: 'status-pending',
      FAILED: 'status-failed'
    };

    const statusIcons = {
      CONFIRMED: '✓',
      PENDING: '⏳',
      FAILED: '✕'
    };

    return (
      <div 
        className={`status-badge ${statusClasses[status]}`}
        title={confirmations ? `${confirmations.current}/${confirmations.required} confirmations` : ''}
      >
        {statusIcons[status]} {status.charAt(0) + status.slice(1).toLowerCase()}
      </div>
    );
  };

  const getNetworkBadge = (network: Transaction['network']) => {
    const badges = {
      ETH: { icon: '○', class: 'network-eth' },
      POLY: { icon: '○', class: 'network-poly' }
    };

    return (
      <div className={`network-badge ${badges[network].class}`}>
        {badges[network].icon} {network}
      </div>
    );
  };

  const handleEditTransaction = (id: string) => {
    console.log('Edit transaction:', id);
    setActiveMenu(null);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setDeleteModal({
      isOpen: true,
      transactionId: transaction.id,
      details: {
        type: transaction.type,
        amount: transaction.amount.value.toString(),
        token: transaction.amount.token
      }
    });
    setActiveMenu(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.transactionId) {
      setTransactions(prevTransactions => 
        prevTransactions.filter(tx => tx.id !== deleteModal.transactionId)
      );
      setDeleteModal({
        isOpen: false,
        transactionId: null,
        details: { type: '', amount: '', token: '' }
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      transactionId: null,
      details: { type: '', amount: '', token: '' }
    });
  };

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const getUserRole = (wli: { username: string }, type: Transaction['type'], isSender: boolean) => {
    const isYourAccount = wli.username === 'kanchan_456.fyno';
    let roleLabel = '';

    if (type === 'SWAP') {
      roleLabel = isSender ? 'From' : 'To';
    } else {
      roleLabel = isSender ? 'Sender' : 'Receiver';
    }

    return (
      <div className="user-role-container">
        <div className={`role-label ${isSender ? 'sender' : 'receiver'}`}>
          {roleLabel}
        </div>
        <div className="wli-info">
          <div className="wli-id">{wli.username}</div>
          {wli.username && (
            <div className={`wli-username ${isYourAccount ? 'your-account' : ''}`}>
              @{wli.username}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="transaction-header">
        <h1>Transaction History</h1>
        <div className="header-actions">
          <button className="download-btn">Download Report</button>
          <button className="filter-btn">Filter Date</button>
        </div>
      </header>

      <section className="transactions-table">
        <header className="table-header">
          <div className="header-cell">Date & Time</div>
          <div className="header-cell">Network</div>
          <div className="header-cell">Type</div>
          <div className="header-cell">Sender</div>
          <div className="header-cell">Receiver</div>
          <div className="header-cell">Amount</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Actions</div>
        </header>

        {transactions.map(tx => (
          <section key={tx.id} className="transaction-row">
            <div className="cell" title={tx.timestamp}>
              {format(new Date(tx.timestamp), 'MMM d, yyyy · HH:mm')}
            </div>
            <div className="cell">
              {getNetworkBadge(tx.network)}
            </div>
            <div className="cell">
              {getTypeIcon(tx.type)}
              <span className="type-label">{tx.type.charAt(0) + tx.type.slice(1).toLowerCase()}</span>
            </div>
            <div className="cell username-cell">
              <div className="username-wrapper">
                <a 
                  href={`/profile/${tx.sender.username}`} 
                  className={`username ${tx.sender.username === 'kanchan_456.fyno' ? 'current-user' : ''}`}
                >
                  @{tx.sender.username}
                </a>
                <div className="wallet-tooltip">
                  <div className="wallet-address">
                    {tx.sender.walletAddress}
                    <button 
                      className="copy-button" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopyAddress(tx.sender.walletAddress);
                      }}
                    >
                      <FiCopy />
                      {copiedAddress === tx.sender.walletAddress && (
                        <span className="copied-tooltip">Copied!</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="cell username-cell">
              <div className="username-wrapper">
                <a 
                  href={`/profile/${tx.receiver.username}`} 
                  className={`username ${tx.receiver.username === 'kanchan_456.fyno' ? 'current-user' : ''}`}
                >
                  @{tx.receiver.username}
                </a>
                <div className="wallet-tooltip">
                  <div className="wallet-address">
                    {tx.receiver.walletAddress}
                    <button 
                      className="copy-button" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopyAddress(tx.receiver.walletAddress);
                      }}
                    >
                      <FiCopy />
                      {copiedAddress === tx.receiver.walletAddress && (
                        <span className="copied-tooltip">Copied!</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`cell amount ${tx.amount.value < 0 ? 'negative' : 'positive'}`}>
              <div className="token-amount">
                {tx.amount.value > 0 ? '+' : ''}{tx.amount.value} {tx.amount.token}
              </div>
              <div className="usd-amount">${tx.amount.usdEquivalent.toLocaleString()}</div>
            </div>
            <div className="cell">
              {getStatusBadge(tx.status, tx.confirmations)}
            </div>
            <div className="cell action-cell">
              <button className="action-btn" onClick={() => toggleMenu(tx.id)}>
                <FiMoreVertical />
              </button>
              {activeMenu === tx.id && (
                <div className="action-menu">
                  <button className="menu-item" onClick={() => handleEditTransaction(tx.id)}>
                    <FiEdit2 className="menu-icon" />
                    Edit
                  </button>
                  <button className="menu-item delete" onClick={() => handleDeleteClick(tx)}>
                    <FiTrash2 className="menu-icon" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </section>
        ))}
      </section>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        transactionDetails={deleteModal.details}
      />
    </>
  );
};

export default TransactionHistory; 