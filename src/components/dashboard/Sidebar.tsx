import React, { useState } from 'react';
import { FiServer, FiChevronDown, FiMenu, FiX, FiCreditCard, FiUser, FiFileText, FiRepeat, FiList } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Sidebar.css';

const sidebarLinks = [
  { label: 'My Wallet', path: '/wallet', icon: <FiUser /> },
  { label: 'Invoices', path: '/invoices', icon: <FiFileText /> },
  { label: 'Cards Center', path: '/cards-center', icon: <FiCreditCard /> },
  { label: 'Transactions', path: '/transactions', icon: <FiRepeat /> },
  { label: 'Transactions Details', path: '/transactions/details', icon: <FiList /> },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('My Wallet');

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={() => setOpen(!open)}>
        {open ? <FiX /> : <FiMenu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="sidebar"
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -260, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="sidebar-logo">
              <FiServer style={{ fontSize: '1.5em' }} />
              FynoPay
            </div>
            <div className="sidebar-section-label">Main Menu</div>
            <nav className="sidebar-links">
              {sidebarLinks.map(link => (
                <div
                  key={link.label}
                  className={`sidebar-link${active === link.label ? ' active' : ''}`}
                  onClick={() => setActive(link.label)}
                >
                  <span className="sidebar-link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar; 