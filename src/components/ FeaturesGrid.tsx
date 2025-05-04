import { FiZap, FiShield, FiGlobe, FiDollarSign } from 'react-icons/fi';
import './FeaturesGrid.css';

const features = [
  {
    icon: <FiZap className="feature-icon" />,
    title: "Lightning Fast",
    description: "Transactions completed in seconds with our optimized blockchain routing"
  },
  {
    icon: <FiShield className="feature-icon" />,
    title: "Bank-Grade Security",
    description: "Non-custodial WLI system ensures you always control your funds"
  },
  {
    icon: <FiGlobe className="feature-icon" />,
    title: "Multi-Chain",
    description: "Support for Ethereum and Polygon with more networks coming soon"
  },
  {
    icon: <FiDollarSign className="feature-icon" />,
    title: "Low Fees",
    description: "Pay minimal gas fees with our optimized transaction bundling"
  }
];

export default function FeaturesGrid() {
  return (
    <section className="features-section">
      <h2 className="section-title">Why Choose FynoPay</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-container">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}