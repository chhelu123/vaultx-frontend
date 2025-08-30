import React, { useState, useEffect } from 'react';
import { tradingAPI } from '../services/api';
import useResponsive from '../hooks/useResponsive';

const Dashboard = ({ user, setUser, refreshUser }) => {
  const [transactions, setTransactions] = useState([]);
  const r = useResponsive();
  const [showUSDTModal, setShowUSDTModal] = useState(null);
  const [usdtForm, setUsdtForm] = useState({ amount: '', address: '', transactionHash: '' });

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
          display: 'flex',
          justifyContent: 'center',
          marginBottom: r.marginBottom 
        }}>
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #fcd535 0%, #f0b90b 100%)', 
            borderRadius: '16px',
            border: 'none',
            minWidth: '320px'
          }}>
            <h3 style={{ color: '#000', fontSize: '18px', fontWeight: '600', marginBottom: '20px', letterSpacing: '-0.2px' }}>USDT Balance</h3>
            <p style={{ fontSize: '42px', fontWeight: '700', margin: '0', color: '#000', letterSpacing: '-0.5px' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</p>
            <p style={{ color: '#000', fontSize: '14px', margin: '8px 0 20px 0', opacity: '0.8' }}>Available for trading</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowUSDTModal('deposit')}
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: '#02c076', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#029f6b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#02c076'}
              >
                Deposit
              </button>
              <button
                onClick={() => setShowUSDTModal('withdraw')}
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: '#f84960', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e73c4e'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f84960'}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
        


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
        
        {/* USDT Modal */}
        {showUSDTModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ 
              backgroundColor: '#2b3139', 
              padding: '32px', 
              borderRadius: '12px', 
              maxWidth: '450px', 
              width: '90%',
              border: '1px solid #474d57'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.3px' }}>
                {showUSDTModal === 'deposit' ? 'Deposit USDT' : 'Withdraw USDT'}
              </h3>
              
              {showUSDTModal === 'deposit' ? (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#eaecef', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Amount</label>
                    <input
                      type="number"
                      placeholder="Enter USDT amount"
                      value={usdtForm.amount}
                      onChange={(e) => setUsdtForm(prev => ({ ...prev, amount: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        border: '1px solid #474d57', 
                        borderRadius: '8px', 
                        backgroundColor: '#1e2329', 
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div style={{ 
                    backgroundColor: '#1e2329', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    border: '1px solid #474d57'
                  }}>
                    <p style={{ color: '#fcd535', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Send USDT to:</p>
                    <p style={{ color: '#ffffff', fontSize: '14px', fontFamily: 'monospace', wordBreak: 'break-all' }}>TQn9Y2khEsLMWD5uP5sVxnzeLcEwQQhAvh</p>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', color: '#eaecef', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Transaction Hash</label>
                    <input
                      type="text"
                      placeholder="Enter transaction hash"
                      value={usdtForm.transactionHash}
                      onChange={(e) => setUsdtForm(prev => ({ ...prev, transactionHash: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        border: '1px solid #474d57', 
                        borderRadius: '8px', 
                        backgroundColor: '#1e2329', 
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      // Handle deposit submission
                      setShowUSDTModal(null);
                      setUsdtForm({ amount: '', address: '', transactionHash: '' });
                    }}
                    disabled={!usdtForm.amount || !usdtForm.transactionHash}
                    style={{ 
                      width: '100%', 
                      padding: '14px', 
                      backgroundColor: !usdtForm.amount || !usdtForm.transactionHash ? '#848e9c' : '#02c076', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: !usdtForm.amount || !usdtForm.transactionHash ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '12px'
                    }}
                  >
                    Submit Deposit
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#eaecef', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Amount</label>
                    <input
                      type="number"
                      placeholder="Enter USDT amount"
                      value={usdtForm.amount}
                      onChange={(e) => setUsdtForm(prev => ({ ...prev, amount: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        border: '1px solid #474d57', 
                        borderRadius: '8px', 
                        backgroundColor: '#1e2329', 
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                    <p style={{ color: '#b7bdc6', fontSize: '12px', marginTop: '4px' }}>Available: {user?.wallets?.usdt?.toFixed(6) || '0.000000'} USDT</p>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', color: '#eaecef', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>USDT Address</label>
                    <input
                      type="text"
                      placeholder="Enter your USDT address"
                      value={usdtForm.address}
                      onChange={(e) => setUsdtForm(prev => ({ ...prev, address: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        border: '1px solid #474d57', 
                        borderRadius: '8px', 
                        backgroundColor: '#1e2329', 
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      // Handle withdrawal submission
                      setShowUSDTModal(null);
                      setUsdtForm({ amount: '', address: '', transactionHash: '' });
                    }}
                    disabled={!usdtForm.amount || !usdtForm.address}
                    style={{ 
                      width: '100%', 
                      padding: '14px', 
                      backgroundColor: !usdtForm.amount || !usdtForm.address ? '#848e9c' : '#f84960', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: !usdtForm.amount || !usdtForm.address ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '12px'
                    }}
                  >
                    Submit Withdrawal
                  </button>
                </div>
              )}
              
              <button
                onClick={() => {
                  setShowUSDTModal(null);
                  setUsdtForm({ amount: '', address: '', transactionHash: '' });
                }}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: '#474d57', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;