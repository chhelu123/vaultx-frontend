import React, { useState, useEffect } from 'react';
import WalletActions from '../components/WalletActions';
import { tradingAPI } from '../services/api';

const Dashboard = ({ user, setUser, refreshUser }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await tradingAPI.getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleUpdate = async (wallets) => {
    fetchTransactions();
    if (wallets) {
      setUser(prev => ({ ...prev, wallets }));
    }
    refreshUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ color: '#eaecef', fontSize: '24px', marginBottom: '8px' }}>Wallet Overview</h1>
          <p className="text-gray">Manage your deposits, withdrawals and view transactions</p>
        </div>
        
        <div className="wallet-balance-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #02c076 0%, #00a66d 100%)', border: 'none' }}>
            <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>INR Balance</h3>
            <p style={{ fontSize: '32px', fontWeight: '700', margin: '0', color: '#fff' }}>₹{user?.wallets?.inr || '0'}</p>
          </div>
          <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #fcd535 0%, #f0b90b 100%)', border: 'none' }}>
            <h3 style={{ color: '#000', fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>USDT Balance</h3>
            <p style={{ fontSize: '32px', fontWeight: '700', margin: '0', color: '#000' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</p>
          </div>
        </div>
        
        <WalletActions user={user} onUpdate={handleUpdate} />

        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>📋 Transaction History</h3>
          {transactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
              <p style={{ fontSize: '18px' }}>No transactions yet</p>
              <p>Start trading to see your transaction history</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Type</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Amount</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Price</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Total</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', color: '#495057' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx._id} style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '15px' }}>
                        <span className={`status-badge ${tx.type === 'buy' ? 'status-success' : 'status-danger'}`}>
                          {tx.type === 'buy' ? '📈 BUY' : '📉 SELL'}
                        </span>
                      </td>
                      <td style={{ padding: '15px', fontWeight: '500' }}>{tx.amount.toFixed(6)} USDT</td>
                      <td style={{ padding: '15px' }}>₹{tx.price.toFixed(2)}</td>
                      <td style={{ padding: '15px', fontWeight: '600' }}>₹{tx.total.toFixed(2)}</td>
                      <td style={{ padding: '15px', color: '#6c757d' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;