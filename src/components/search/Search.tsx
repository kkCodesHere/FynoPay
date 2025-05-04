import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Search.css';

interface User {
  username: string;
  address: string;
}

interface SearchProps {
  onUserSelect: (user: User) => void;
}

const Search: React.FC<SearchProps> = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<User[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setIsSearching(true);
      setError(null);

      // For demo purposes, we'll simulate a search
      // In a real app, this would be an API call
      setTimeout(() => {
        setResults([
          {
            username: 'demo_user',
            address: '0x123...456'
          }
        ]);
        setIsSearching(false);
      }, 1000);

    } catch (err) {
      setError('Failed to search users');
      setIsSearching(false);
    }
  };

  return (
    <motion.div 
      className="search-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Find User</h2>
      <p className="description">
        Search by phone number or username to send a payment
      </p>

      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter phone number or username"
            disabled={isSearching}
          />
          <button 
            type="submit"
            disabled={isSearching || !searchTerm.trim()}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}

      {results.length > 0 && (
        <div className="results">
          {results.map((user) => (
            <div 
              key={user.address}
              className="user-card"
              onClick={() => onUserSelect(user)}
            >
              <div className="user-info">
                <span className="username">{user.username}</span>
                <span className="address">{user.address}</span>
              </div>
              <button className="select-button">Select</button>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && !isSearching && searchTerm && (
        <p className="no-results">No users found</p>
      )}
    </motion.div>
  );
};

export default Search; 