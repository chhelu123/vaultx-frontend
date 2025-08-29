import React, { useState, useEffect } from 'react';
import { tradingAPI, walletAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {
  const [stats, setStats] = useState({ totalTrades: 0, totalVolume: 0, totalDeposits: 0, totalWithdrawals: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const [transactionsRes, depositsRes, withdrawalsRes] = await Promise.all([
        tradingAPI.getTransactions(1, 1000),
        walletAPI.getDeposits(1, 1000),
        walletAPI.getWithdrawals(1, 1000)
      ]);
      
      const transactions = transactionsRes.data.transactions || transactionsRes.data || [];
      const deposits = depositsRes.data.deposits || depositsRes.data || [];
      const withdrawals = withdrawalsRes.data.withdrawals || withdrawalsRes.data || [];
      
      setStats({
        totalTrades: transactions.length,
        totalVolume: transactions.reduce((sum, t) => sum + (t.total || 0), 0),
        totalDeposits: deposits.filter(d => d.status === 'completed').length,
        totalWithdrawals: withdrawals.filter(w => w.status === 'completed').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ color: '#eaecef', fontSize: '24px', marginBottom: '8px' }}>👤 My Profile</h1>
          <p className="text-gray">Complete overview of your VaultX account</p>
        </div>

        {/* Wallet Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, #02c076 0%, #00a66d 100%)', border: 'none', textAlign: 'center' }}>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>💰 INR Balance</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', margin: '0', color: '#fff' }}>₹{user?.wallets?.inr?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="card" style={{ background: 'linear-gradient(135deg, #fcd535 0%, #f0b90b 100%)', border: 'none', textAlign: 'center' }}>
            <h3 style={{ color: '#000', fontSize: '16px', marginBottom: '10px' }}>🪙 USDT Balance</h3>
            <p style={{ fontSize: '28px', fontWeight: '700', margin: '0', color: '#000' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</p>
          </div>
        </div>

        {/* Account Stats */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>📊 Account Statistics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#fcd535', marginBottom: '8px' }}>
                {loading ? '...' : stats.totalTrades}
              </div>
              <div style={{ color: '#848e9c', fontSize: '14px' }}>📈 Total Trades</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#02c076', marginBottom: '8px' }}>
                ₹{loading ? '...' : stats.totalVolume.toFixed(0)}
              </div>
              <div style={{ color: '#848e9c', fontSize: '14px' }}>💹 Trading Volume</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#3498db', marginBottom: '8px' }}>
                {loading ? '...' : stats.totalDeposits}
              </div>
              <div style={{ color: '#848e9c', fontSize: '14px' }}>💳 Deposits</div>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#f84960', marginBottom: '8px' }}>
                {loading ? '...' : stats.totalWithdrawals}
              </div>
              <div style={{ color: '#848e9c', fontSize: '14px' }}>💸 Withdrawals</div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>🔐 Account Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>🆔 User ID</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: '#fcd535',
                fontFamily: 'monospace',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{user?._id || 'Loading...'}</span>
                <button 
                  onClick={() => copyToClipboard(user?._id)}
                  style={{ background: 'none', border: 'none', color: '#fcd535', cursor: 'pointer', fontSize: '16px' }}
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>👤 Full Name</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: '#eaecef' 
              }}>
                {user?.name || 'Loading...'}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>📧 Email Address</label>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#2b3139', 
              border: '1px solid #474d57', 
              borderRadius: '4px', 
              color: '#eaecef',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{user?.email || 'Loading...'}</span>
              <span style={{ color: '#02c076', fontSize: '12px' }}>✅ Verified</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>🛡️ KYC Status</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: user?.kycStatus === 'approved' ? '#02c076' : user?.kycStatus === 'rejected' ? '#f84960' : '#fcd535',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{user?.kycStatus?.toUpperCase() || 'NOT SUBMITTED'}</span>
                {user?.kycStatus !== 'approved' && (
                  <Link to="/kyc" style={{ color: '#fcd535', fontSize: '12px', textDecoration: 'none' }}>Complete →</Link>
                )}
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>📅 Member Since</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: '#eaecef' 
              }}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long', 
                  year: 'numeric'
                }) : 'Loading...'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>⚡ Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <Link to="/trading" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#2b3139', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '1px solid #474d57',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2b3139'}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📈</div>
                <div style={{ color: '#eaecef', fontWeight: '600' }}>Start Trading</div>
                <div style={{ color: '#848e9c', fontSize: '12px' }}>Buy/Sell USDT</div>
              </div>
            </Link>
            
            <Link to="/history" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#2b3139', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '1px solid #474d57',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2b3139'}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📋</div>
                <div style={{ color: '#eaecef', fontWeight: '600' }}>View History</div>
                <div style={{ color: '#848e9c', fontSize: '12px' }}>Transactions & Deposits</div>
              </div>
            </Link>
            
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#2b3139', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '1px solid #474d57',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2b3139'}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
                <div style={{ color: '#eaecef', fontWeight: '600' }}>Manage Wallet</div>
                <div style={{ color: '#848e9c', fontSize: '12px' }}>Deposit & Withdraw</div>
              </div>
            </Link>
            
            <Link to="/kyc" style={{ textDecoration: 'none' }}>
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#2b3139', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '1px solid #474d57',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2b3139'}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🆔</div>
                <div style={{ color: '#eaecef', fontWeight: '600' }}>KYC Verification</div>
                <div style={{ color: '#848e9c', fontSize: '12px' }}>Complete Verification</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div style={{ 
          backgroundColor: '#1e2329', 
          padding: '20px', 
          borderRadius: '8px', 
          border: '1px solid #474d57',
          marginTop: '20px'
        }}>
          <h4 style={{ color: '#fcd535', marginBottom: '15px' }}>🔒 Security Information</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
            <div>
              <p style={{ color: '#848e9c', margin: '0 0 5px 0', fontSize: '14px' }}>
                💡 <strong>Your User ID</strong> is unique and can be used for support requests.
              </p>
            </div>
            <div>
              <p style={{ color: '#848e9c', margin: '0 0 5px 0', fontSize: '14px' }}>
                🛡️ <strong>KYC Verification</strong> is required for higher trading limits.
              </p>
            </div>
            <div>
              <p style={{ color: '#848e9c', margin: '0 0 5px 0', fontSize: '14px' }}>
                📧 <strong>Email Verified</strong> - Your account is secure and verified.
              </p>
            </div>
            <div>
              <p style={{ color: '#848e9c', margin: '0 0 5px 0', fontSize: '14px' }}>
                🔐 <strong>Account Protected</strong> - Your funds are safe with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;