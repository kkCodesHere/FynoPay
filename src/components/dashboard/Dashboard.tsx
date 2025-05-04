import React from 'react';
import CardsCenter from './CardsCenter';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <main className="dashboard">
      <div className="dashboard-content">
        <CardsCenter />
        {/* Add other dashboard components here */}
      </div>
    </main>
  );
};

export default Dashboard; 