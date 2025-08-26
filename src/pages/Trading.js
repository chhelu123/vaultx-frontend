import React, { useState, useEffect } from 'react';
import TradingPanel from '../components/TradingPanel';
import { authAPI } from '../services/api';

const Trading = ({ user, setUser, refreshUser }) => {
  const handleUpdate = (wallets) => {
    if (wallets) {
      setUser({ ...user, wallets });
    }
    refreshUser();
  };

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ color: '#eaecef', fontSize: '24px', marginBottom: '8px' }}>Spot Trading</h1>
          <p className="text-gray">Buy and sell USDT at competitive rates</p>
        </div>
        {user && <TradingPanel user={user} onUpdate={handleUpdate} />}
      </div>
    </div>
  );
};

export default Trading;