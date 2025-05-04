import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './CardsCenter.css';

interface NetworkCard {
  id: string;
  network: 'ETH' | 'POLY';
  balance: string;
  cardNumber: string;
  validThru: string;
  cardHolder: string;
  stats: {
    totalTransactions: number;
    totalVolume: number;
    avgTransactionValue: number;
    successRate: number;
  };
}

const networkOptions = [
  { label: 'All', value: 'ALL' },
  { label: 'Ethereum', value: 'ETH' },
  { label: 'Polygon', value: 'POLY' }
];

type NetworkFilter = 'ALL' | 'ETH' | 'POLY';

const CardsCenter: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<NetworkCard | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [networkFilter, setNetworkFilter] = useState<NetworkFilter>('ALL');

  const networkCards: NetworkCard[] = [
    {
      id: 'eth_card',
      network: 'ETH',
      balance: '340.00',
      cardNumber: '1234',
      validThru: '08/21',
      cardHolder: 'Franklin Jr.',
      stats: {
        totalTransactions: 156,
        totalVolume: 450000,
        avgTransactionValue: 2884.62,
        successRate: 98.7
      }
    },
    {
      id: 'poly_card',
      network: 'POLY',
      balance: '673,412.66',
      cardNumber: '1234',
      validThru: '08/21',
      cardHolder: 'Franklin Jr.',
      stats: {
        totalTransactions: 243,
        totalVolume: 890000,
        avgTransactionValue: 3662.55,
        successRate: 99.2
      }
    }
  ];

  const filteredCards = networkFilter === 'ALL'
    ? networkCards
    : networkCards.filter(card => card.network === networkFilter);

  const handleCardClick = (card: NetworkCard) => {
    setSelectedCard(card);
    setShowStats(true);
  };

  const handleBackClick = () => {
    setShowStats(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  return (
    <div className="cards-center">
      <h1>Cards Center</h1>
      <div className="network-tabs">
        {networkOptions.map(option => (
          <button
            key={option.value}
            className={`network-tab${networkFilter === option.value ? ' active' : ''}`}
            onClick={() => setNetworkFilter(option.value as NetworkFilter)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="cards-container-horizontal">
        {!showStats ? (
          <>
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                className={`network-card ${card.network.toLowerCase()}`}
                onClick={() => handleCardClick(card)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="card-network">
                  {card.network === 'ETH' ? 'Ethereum Card' : 'Polygon Card'}
                </div>
                <div className="card-balance">
                  ${card.balance}
                </div>
                <div className="card-details">
                  <div className="card-circles" />
                  <div className="card-number">
                    **** **** **** {card.cardNumber}
                  </div>
                </div>
                <div className="card-footer">
                  <div className="valid-thru">
                    <span>VALID THRU</span>
                    <div>{card.validThru}</div>
                  </div>
                  <div className="card-holder">
                    <span>CARD HOLDER</span>
                    <div>{card.cardHolder}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        ) : selectedCard && (
          <motion.div
            className="card-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="back-button" onClick={handleBackClick}>
              ← Back to Cards
            </button>
            <h2>{selectedCard.network === 'ETH' ? 'Ethereum' : 'Polygon'} Network Stats</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Transactions</h3>
                <p>{selectedCard.stats.totalTransactions}</p>
              </div>
              <div className="stat-card">
                <h3>Total Volume</h3>
                <p>${selectedCard.stats.totalVolume.toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h3>Average Transaction</h3>
                <p>${selectedCard.stats.avgTransactionValue.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Success Rate</h3>
                <p>{selectedCard.stats.successRate}%</p>
              </div>
            </div>
            <div className="view-all-button">
              <button>
                View All Transactions
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CardsCenter; 