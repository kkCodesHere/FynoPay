import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="gradient-text">Web3 Payments</span> Made Simple
        </h1>
        <p className="hero-subtitle">
          Send and receive crypto payments instantly with FynoPay's secure Wallet-Linked Identity system.
          Supporting Ethereum and Polygon networks.
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
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop" 
          alt="Cryptocurrency payment illustration"
        />
      </div>
    </section>
  );
}