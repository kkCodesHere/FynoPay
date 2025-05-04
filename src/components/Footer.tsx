import { FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">FynoPay</span>
          <p className="footer-tagline">
            The next generation of Web3 payments
          </p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4 className="link-group-title">Product</h4>
            <a href="/features" className="footer-link">Features</a>
            <a href="/pricing" className="footer-link">Pricing</a>
            <a href="/api" className="footer-link">API</a>
          </div>

          <div className="link-group">
            <h4 className="link-group-title">Company</h4>
            <a href="/about" className="footer-link">About</a>
            <a href="/blog" className="footer-link">Blog</a>
            <a href="/careers" className="footer-link">Careers</a>
          </div>

          <div className="link-group">
            <h4 className="link-group-title">Legal</h4>
            <a href="/privacy" className="footer-link">Privacy</a>
            <a href="/terms" className="footer-link">Terms</a>
            <a href="/cookies" className="footer-link">Cookies</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://twitter.com" className="social-icon">
            <FaTwitter />
          </a>
          <a href="https://github.com" className="social-icon">
            <FaGithub />
          </a>
          <a href="https://discord.com" className="social-icon">
            <FaDiscord />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FynoPay. All rights reserved.</p>
      </div>
    </footer>
  );
}