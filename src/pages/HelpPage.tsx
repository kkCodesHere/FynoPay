import React from 'react';
import { FiHelpCircle, FiMail, FiMessageSquare } from 'react-icons/fi';
import './HelpPage.css';

export default function HelpPage() {
  return (
    <div className="help-page">
      <div className="help-container">
        <h1>Help & Support</h1>
        
        <section className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How do I send a payment?</h3>
              <p>To send a payment, go to the Send page, enter the recipient's address and the amount you want to send, then confirm the transaction.</p>
            </div>
            <div className="faq-item">
              <h3>How do I receive payments?</h3>
              <p>Share your wallet address or scan the QR code from the Receive page. You can also copy your address to share it easily.</p>
            </div>
            <div className="faq-item">
              <h3>What cryptocurrencies are supported?</h3>
              <p>Currently, we support Ethereum (ETH) and ERC-20 tokens. More cryptocurrencies will be added soon.</p>
            </div>
          </div>
        </section>

        <section className="help-section">
          <h2>Contact Support</h2>
          <div className="contact-options">
            <div className="contact-option">
              <FiMail className="contact-icon" />
              <h3>Email Support</h3>
              <p>support@fynopay.com</p>
            </div>
            <div className="contact-option">
              <FiMessageSquare className="contact-icon" />
              <h3>Live Chat</h3>
              <p>Available 24/7</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 