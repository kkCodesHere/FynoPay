import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { FiSend, FiShield, FiGlobe, FiZap, FiLink, FiUser, FiCheck, FiArrowRight, FiCreditCard, FiUsers, FiSend as FiSendPayment } from 'react-icons/fi';
import { BackgroundBeams } from '../components/ui/background-beams';
import './HomePage.css';

export default function HomePage() {
  const { isConnected, connect } = useWallet();

  return (
    <div className="home-page">
      <div className="background-container">
        <BackgroundBeams />
      </div>
      <div className="content-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Secure Crypto Payments with Wallet-Linked Identities</h1>
            <p className="hero-subtitle">
              Send and receive crypto payments instantly using your wallet identity.
              No more long addresses, just simple usernames.
            </p>
            {!isConnected ? (
              <button className="connect-wallet-btn" onClick={connect}>
                Connect Wallet
              </button>
            ) : (
              <div className="hero-actions">
                <Link to="/send" className="action-btn primary">
                  <FiSend className="btn-icon" />
                  Send Payment
                </Link>
                <Link to="/receive" className="action-btn secondary">
                  Receive Payment
                </Link>
              </div>
            )}
          </div>
          <div className="hero-image">
            <div className="wallet-illustration">
              <div className="wallet-card">
                <div className="wallet-header">
                  <span className="wallet-name">FynoPay Wallet</span>
                  <span className="wallet-balance">$1,234.56</span>
                </div>
                <div className="wallet-address">
                  0x1234...5678
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Why Choose FynoPay?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FiShield className="feature-icon" />
              <h3>Secure & Private</h3>
              <p>Your transactions are encrypted and secure with blockchain technology.</p>
            </div>
            <div className="feature-card">
              <FiGlobe className="feature-icon" />
              <h3>Global Payments</h3>
              <p>Send and receive payments anywhere in the world instantly.</p>
            </div>
            <div className="feature-card">
              <FiZap className="feature-icon" />
              <h3>Lightning Fast</h3>
              <p>Transactions are processed in seconds with minimal fees.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <FiCreditCard className="step-icon" />
              <h3>Connect Your Wallet</h3>
              <p>Securely connect your cryptocurrency wallet to start using our platform. Your assets remain in your control at all times.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <FiUsers className="step-icon" />
              <h3>Choose Recipient</h3>
              <p>Select the recipient from your contacts or enter their wallet address. We support multiple cryptocurrencies and networks.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <FiSendPayment className="step-icon" />
              <h3>Send Payment</h3>
              <p>Enter the amount and confirm the transaction. Our platform ensures fast and secure transfers with minimal fees.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 