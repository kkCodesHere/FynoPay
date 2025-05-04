import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import './SettingsPage.css';

export default function SettingsPage() {
  const { address } = useWallet();

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>Settings</h1>
        
        <section className="settings-section">
          <h2>Account</h2>
          <div className="setting-item">
            <label>Wallet Address</label>
            <p className="wallet-address">{address}</p>
          </div>
        </section>

        <section className="settings-section">
          <h2>Preferences</h2>
          <div className="setting-item">
            <label>Theme</label>
            <p>System default</p>
          </div>
          <div className="setting-item">
            <label>Currency</label>
            <p>USD</p>
          </div>
        </section>

        <section className="settings-section">
          <h2>Security</h2>
          <div className="setting-item">
            <label>Two-Factor Authentication</label>
            <button className="toggle-button">Enable</button>
          </div>
          <div className="setting-item">
            <label>Transaction Notifications</label>
            <button className="toggle-button">Enable</button>
          </div>
        </section>
      </div>
    </div>
  );
} 