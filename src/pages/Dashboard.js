import React, { useState, useEffect } from 'react';
import WalletActions from '../components/WalletActions';
import { tradingAPI } from '../services/api';
import useResponsive from '../hooks/useResponsive';

const Dashboard = ({ user, setUser, refreshUser }) => {
  const [transactions, setTransactions] = useState([]);
  const r = useResponsive();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await tradingAPI.getTransactions();
      const transactionsData = response.data.transactions || response.data;
      setTransactions(transactionsData);
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
    <div style={{ 
      padding: r.pagePadding, 
      minHeight: 'calc(100vh - 64px)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: window.innerWidth <= 768 ? '28px' : '32px', 
            fontWeight: '700', 
            marginBottom: '8px', 
            letterSpacing: '-0.5px' 
          }}>Dashboard</h1>
          <p style={{ 
            color: '#b7bdc6', 
            fontSize: window.innerWidth <= 768 ? '14px' : '16px', 
            margin: 0 
          }}>Manage your wallet, deposits, withdrawals and view transaction history</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: r.gridCols, 
          gap: r.gap, 
          marginBottom: r.marginBottom 
        }}>
          <div style={{ 
            padding: '32px', 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #02c076 0%, #00a66d 100%)', 
            borderRadius: '12px',
            border: 'none'
          }}>
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '16px', letterSpacing: '-0.2px' }}>INR Balance</h3>
            <p style={{ fontSize: '36px', fontWeight: '700', margin: '0', color: '#fff', letterSpacing: '-0.5px' }}>₹{user?.wallets?.inr?.toFixed(2) || '0.00'}</p>
          </div>
          <div style={{ 
            padding: '32px', 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #fcd535 0%, #f0b90b 100%)', 
            borderRadius: '12px',
            border: 'none'
          }}>
            <h3 style={{ color: '#000', fontSize: '16px', fontWeight: '600', marginBottom: '16px', letterSpacing: '-0.2px' }}>USDT Balance</h3>
            <p style={{ fontSize: '36px', fontWeight: '700', margin: '0', color: '#000', letterSpacing: '-0.5px' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</p>
          </div>
        </div>
        
        <WalletActions user={user} onUpdate={handleUpdate} />

        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: '32px', 
          borderRadius: '12px', 
          border: '1px solid #474d57'
        }}>
          <h3 style={{ marginBottom: '24px', color: '#ffffff', fontSize: '24px', fontWeight: '600', letterSpacing: '-0.3px' }}>Transaction History</h3>
          {transactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#b7bdc6' }}>
              <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No transactions yet</p>
              <p style={{ fontSize: '16px', margin: 0 }}>Start trading to see your transaction history</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #474d57' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#b7bdc6', fontSize: '14px', letterSpacing: '0.5px' }}>TYPE</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#b7bdc6', fontSize: '14px', letterSpacing: '0.5px' }}>AMOUNT</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#b7bdc6', fontSize: '14px', letterSpacing: '0.5px' }}>PRICE</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#b7bdc6', fontSize: '14px', letterSpacing: '0.5px' }}>TOTAL</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#b7bdc6', fontSize: '14px', letterSpacing: '0.5px' }}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx._id} style={{ borderBottom: '1px solid #474d57' }}>
                      <td data-label="Type" style={{ padding: '16px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#ffffff',
                          backgroundColor: tx.type === 'buy' ? '#02c076' : '#f84960',
                          letterSpacing: '0.5px'
                        }}>
                          {tx.type === 'buy' ? 'BUY' : 'SELL'}
                        </span>
                      </td>
                      <td data-label="Amount" style={{ padding: '16px', fontWeight: '500', color: '#ffffff', fontSize: '15px' }}>{tx.amount.toFixed(6)} USDT</td>
                      <td data-label="Price" style={{ padding: '16px', color: '#b7bdc6', fontSize: '15px' }}>₹{tx.price.toFixed(2)}</td>
                      <td data-label="Total" style={{ padding: '16px', fontWeight: '600', color: '#ffffff', fontSize: '15px' }}>₹{tx.total.toFixed(2)}</td>
                      <td data-label="Date" style={{ padding: '16px', color: '#848e9c', fontSize: '14px' }}>{new Date(tx.createdAt).toLocaleDateString()}</td>
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