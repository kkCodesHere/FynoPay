import { Link } from 'react-router-dom';
import './HomePage.css';
import { FiZap, FiShield, FiGlobe, FiDollarSign, FiUsers, FiClock } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Secure Web3 Payments Made Simple
          </h1>
          <p className="hero-subtitle">
            Send and receive crypto payments instantly with FynoPay's secure Wallet-Linked Identity system.
            Supporting Ethereum and Polygon networks with lightning-fast transactions.
          </p>
          <div className="hero-actions">
            <Link to="/auth/signup" className="primary-btn">
              Get Started - It's Free
            </Link>
            <Link to="/auth/login" className="secondary-btn">
              Existing User? Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose FynoPay</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FiZap className="feature-icon" />
            <h3>Lightning Fast</h3>
            <p>Transactions completed in seconds with our optimized blockchain routing</p>
          </div>
          <div className="feature-card">
            <FiShield className="feature-icon" />
            <h3>Bank-Grade Security</h3>
            <p>Non-custodial WLI system ensures you always control your funds</p>
          </div>
          <div className="feature-card">
            <FiGlobe className="feature-icon" />
            <h3>Multi-Chain</h3>
            <p>Support for Ethereum and Polygon with more networks coming soon</p>
          </div>
          <div className="feature-card">
            <FiDollarSign className="feature-icon" />
            <h3>Low Fees</h3>
            <p>Pay minimal gas fees with our optimized transaction bundling</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">10M+</div>
            <div className="stat-label">Transactions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2</div>
            <div className="stat-label">Supported Networks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      </section>
    </div>
  );
}