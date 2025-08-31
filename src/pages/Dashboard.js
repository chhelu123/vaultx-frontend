import React, { useState, useEffect } from 'react';
import { tradingAPI, walletAPI } from '../services/api';
import useResponsive from '../hooks/useResponsive';
import NotificationModal from '../components/NotificationModal';

const Dashboard = ({ user, setUser, refreshUser }) => {
  const [transactions, setTransactions] = useState([]);
  const r = useResponsive();
  const [showUSDTModal, setShowUSDTModal] = useState(null);
  const [usdtForm, setUsdtForm] = useState({ amount: '', address: '', transactionHash: '', chain: 'trc20' });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ isOpen: false, type: '', title: '', message: '' });
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchTransactions();
    fetchSettings();
  }, []);
  
  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

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
        {/* Welcome Message */}
        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: '24px', 
          borderRadius: '12px', 
          border: '1px solid #474d57',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ 
                color: '#ffffff', 
                fontSize: window.innerWidth <= 768 ? '24px' : '28px', 
                fontWeight: '700', 
                marginBottom: '8px', 
                letterSpacing: '-0.5px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>Welcome back, {user?.name?.split(' ')[0] || 'Trader'}</h1>
              <p style={{ 
                color: '#b7bdc6', 
                fontSize: window.innerWidth <= 768 ? '14px' : '16px', 
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>Ready to trade USDT? Your secure trading dashboard awaits.</p>
            </div>
            <div 
              style={{ 
                padding: '12px 20px', 
                backgroundColor: user?.kycStatus === 'approved' ? '#fcd535' : '#02c076', 
                borderRadius: '8px', 
                color: user?.kycStatus === 'approved' ? '#000' : '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                cursor: user?.kycStatus !== 'approved' ? 'pointer' : 'default'
              }}
              onClick={() => {
                if (user?.kycStatus !== 'approved') {
                  window.location.href = '/trading';
                }
              }}
            >
              {user?.kycStatus === 'approved' ? 'Verified Trader' : 'Start Trading'}
            </div>
          </div>
        </div>
        
        {/* USDT Wallet */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          <div style={{ 
            padding: window.innerWidth <= 768 ? '32px 24px' : '40px', 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #2b3139 0%, #1e2329 100%)', 
            borderRadius: '16px',
            border: '2px solid #474d57',
            width: '100%',
            maxWidth: window.innerWidth <= 768 ? '100%' : '400px'
          }}>
            <h3 style={{ color: '#ffffff', fontSize: window.innerWidth <= 768 ? '16px' : '18px', fontWeight: '600', marginBottom: window.innerWidth <= 768 ? '16px' : '20px', letterSpacing: '-0.2px' }}>USDT Balance</h3>
            <p style={{ fontSize: window.innerWidth <= 768 ? '32px' : '42px', fontWeight: '700', margin: '0', color: '#fcd535', letterSpacing: '-0.5px' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</p>
            <p style={{ color: '#b7bdc6', fontSize: window.innerWidth <= 768 ? '12px' : '14px', margin: window.innerWidth <= 768 ? '6px 0 16px 0' : '8px 0 20px 0' }}>Available for trading</p>
            <div style={{ display: 'flex', gap: window.innerWidth <= 768 ? '12px' : '16px', justifyContent: 'center', flexDirection: window.innerWidth <= 480 ? 'column' : 'row' }}>
              <button
                onClick={() => setShowUSDTModal('deposit')}
                style={{ 
                  padding: window.innerWidth <= 768 ? '12px 20px' : '14px 28px', 
                  backgroundColor: '#02c076', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: window.innerWidth <= 768 ? '10px' : '12px', 
                  cursor: 'pointer',
                  fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '-0.1px',
                  transform: 'translateY(0)',
                  flex: window.innerWidth <= 480 ? '1' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#029f6b';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#02c076';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {window.innerWidth <= 768 ? 'Deposit' : 'Deposit USDT'}
              </button>
              <button
                onClick={() => setShowUSDTModal('withdraw')}
                style={{ 
                  padding: window.innerWidth <= 768 ? '12px 20px' : '14px 28px', 
                  backgroundColor: '#f84960', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: window.innerWidth <= 768 ? '10px' : '12px', 
                  cursor: 'pointer',
                  fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '-0.1px',
                  transform: 'translateY(0)',
                  flex: window.innerWidth <= 480 ? '1' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e73c4e';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f84960';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {window.innerWidth <= 768 ? 'Withdraw' : 'Withdraw USDT'}
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
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#eaecef', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Blockchain Network</label>
                    <select
                      value={usdtForm.chain || 'trc20'}
                      onChange={(e) => setUsdtForm(prev => ({ ...prev, chain: e.target.value }))}
                      style={{ 
                        width: '100%', 
                        padding: '14px 16px', 
                        border: '1px solid #474d57', 
                        borderRadius: '8px', 
                        backgroundColor: '#1e2329', 
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    >
                      <option value="trc20">TRC-20 (Tron)</option>
                      <option value="bep20">BEP-20 (BSC)</option>
                      <option value="aptos">Aptos Network</option>
                    </select>
                  </div>
                  <div style={{ 
                    backgroundColor: '#1e2329', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    border: '1px solid #474d57'
                  }}>
                    <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Deposit Address ({usdtForm.chain?.toUpperCase() || 'TRC-20'}):</p>
                    <p style={{ color: '#fcd535', fontSize: '14px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {usdtForm.chain === 'bep20' ? (settings?.bep20Address || 'Loading...') :
                       usdtForm.chain === 'aptos' ? (settings?.aptosAddress || 'Loading...') :
                       (settings?.trc20Address || settings?.usdtAddress || 'TQn9Y2khEsLMWD5uP5sVxnzeLcEwQQhAvh')}
                    </p>
                    <p style={{ color: '#b7bdc6', fontSize: '12px', marginTop: '8px' }}>Only send USDT on {usdtForm.chain?.toUpperCase() || 'TRC-20'} network</p>
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
                    onClick={async () => {
                      setLoading(true);
                      try {
                        await walletAPI.requestDeposit({
                          type: 'usdt',
                          amount: parseFloat(usdtForm.amount),
                          paymentMethod: 'USDT Transfer',
                          transactionId: usdtForm.transactionHash
                        });
                        setNotification({
                          isOpen: true,
                          type: 'success',
                          title: 'Deposit Request Submitted',
                          message: 'Your USDT deposit request has been submitted successfully. Your balance will be updated within a few minutes after admin approval.'
                        });
                        setShowUSDTModal(null);
                        setUsdtForm({ amount: '', address: '', transactionHash: '', chain: 'trc20' });
                      } catch (error) {
                        setNotification({
                          isOpen: true,
                          type: 'error',
                          title: 'Deposit Failed',
                          message: 'Unable to submit deposit request. Please try again.'
                        });
                      }
                      setLoading(false);
                    }}
                    disabled={loading || !usdtForm.amount || !usdtForm.transactionHash}
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      backgroundColor: loading || !usdtForm.amount || !usdtForm.transactionHash ? '#848e9c' : '#02c076', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      cursor: loading || !usdtForm.amount || !usdtForm.transactionHash ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      letterSpacing: '-0.1px'
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Deposit Request'}
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
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const balance = user.wallets?.usdt || 0;
                        if (parseFloat(usdtForm.amount) > balance) {
                          setNotification({
                            isOpen: true,
                            type: 'error',
                            title: 'Insufficient Balance',
                            message: `You can only withdraw up to ${balance.toFixed(6)} USDT.`
                          });
                          setLoading(false);
                          return;
                        }
                        await walletAPI.requestWithdrawal({
                          type: 'usdt',
                          amount: parseFloat(usdtForm.amount),
                          withdrawalDetails: usdtForm.address
                        });
                        setNotification({
                          isOpen: true,
                          type: 'success',
                          title: 'Withdrawal Request Submitted',
                          message: 'Your USDT withdrawal request has been submitted successfully. Your USDT will be sent to your address within a few minutes after admin approval.'
                        });
                        setShowUSDTModal(null);
                        setUsdtForm({ amount: '', address: '', transactionHash: '', chain: 'trc20' });
                        refreshUser();
                      } catch (error) {
                        setNotification({
                          isOpen: true,
                          type: 'error',
                          title: 'Withdrawal Failed',
                          message: 'Unable to submit withdrawal request. Please try again.'
                        });
                      }
                      setLoading(false);
                    }}
                    disabled={loading || !usdtForm.amount || !usdtForm.address}
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      backgroundColor: loading || !usdtForm.amount || !usdtForm.address ? '#848e9c' : '#f84960', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      cursor: loading || !usdtForm.amount || !usdtForm.address ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      letterSpacing: '-0.1px'
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Withdrawal Request'}
                  </button>
                </div>
              )}
              
              <button
                onClick={() => {
                  setShowUSDTModal(null);
                  setUsdtForm({ amount: '', address: '', transactionHash: '', chain: 'trc20' });
                }}
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  backgroundColor: '#474d57', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '12px', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '-0.1px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <NotificationModal
          isOpen={notification.isOpen}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification({ isOpen: false, type: '', title: '', message: '' })}
        />
      </div>
    </div>
  );
};

export default Dashboard;