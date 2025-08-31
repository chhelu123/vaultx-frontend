import React, { useState, useEffect } from 'react';
import { tradingAPI, walletAPI } from '../services/api';
import { Link } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';

const Profile = ({ user }) => {
  const [stats, setStats] = useState({ totalTrades: 0, totalVolume: 0, totalDeposits: 0, totalWithdrawals: 0 });
  const [loading, setLoading] = useState(true);
  const r = useResponsive();

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
    <div style={{ 
      padding: r.pagePadding, 
      minHeight: 'calc(100vh - 64px)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: r.marginBottom }}>
          <h1 style={{ color: '#ffffff', fontSize: r.h1Size, fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.5px' }}>My Profile</h1>
          <p style={{ color: '#b7bdc6', fontSize: r.bodySize, margin: 0 }}>Complete overview of your VaultX account and trading statistics</p>
        </div>



        {/* Account Stats */}
        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: '32px', 
          borderRadius: '12px', 
          border: '1px solid #474d57',
          marginBottom: '32px'
        }}>
          <h3 style={{ marginBottom: '24px', color: '#ffffff', fontSize: '24px', fontWeight: '600', letterSpacing: '-0.3px' }}>Account Statistics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: r.isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: r.gap }}>
            <div style={{ textAlign: 'center', padding: r.isMobile ? '16px' : '24px', backgroundColor: '#1e2329', borderRadius: '12px' }}>
              <div style={{ fontSize: r.isMobile ? '24px' : '32px', fontWeight: '700', color: '#fcd535', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {loading ? '...' : stats.totalTrades}
              </div>
              <div style={{ color: '#b7bdc6', fontSize: r.smallSize, fontWeight: '500' }}>Total Trades</div>
            </div>
            <div style={{ textAlign: 'center', padding: r.isMobile ? '16px' : '24px', backgroundColor: '#1e2329', borderRadius: '12px' }}>
              <div style={{ fontSize: r.isMobile ? '20px' : '28px', fontWeight: '700', color: '#02c076', marginBottom: '8px', letterSpacing: '-0.5px', wordBreak: 'break-all' }}>
                ₹{loading ? '...' : stats.totalVolume.toFixed(0)}
              </div>
              <div style={{ color: '#b7bdc6', fontSize: r.smallSize, fontWeight: '500' }}>Trading Volume</div>
            </div>
            <div style={{ textAlign: 'center', padding: r.isMobile ? '16px' : '24px', backgroundColor: '#1e2329', borderRadius: '12px' }}>
              <div style={{ fontSize: r.isMobile ? '24px' : '32px', fontWeight: '700', color: '#3498db', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {loading ? '...' : stats.totalDeposits}
              </div>
              <div style={{ color: '#b7bdc6', fontSize: r.smallSize, fontWeight: '500' }}>Deposits</div>
            </div>
            <div style={{ textAlign: 'center', padding: r.isMobile ? '16px' : '24px', backgroundColor: '#1e2329', borderRadius: '12px' }}>
              <div style={{ fontSize: r.isMobile ? '24px' : '32px', fontWeight: '700', color: '#f84960', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {loading ? '...' : stats.totalWithdrawals}
              </div>
              <div style={{ color: '#b7bdc6', fontSize: r.smallSize, fontWeight: '500' }}>Withdrawals</div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: '32px', 
          borderRadius: '12px', 
          border: '1px solid #474d57',
          marginBottom: '32px'
        }}>
          <h3 style={{ marginBottom: '24px', color: '#ffffff', fontSize: '24px', fontWeight: '600', letterSpacing: '-0.3px' }}>Account Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#eaecef', fontSize: '14px' }}>User ID</label>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#1e2329', 
                border: '1px solid #474d57', 
                borderRadius: '8px', 
                color: '#fcd535',
                fontFamily: 'monospace',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span title={user?._id}>{user?._id ? `${user._id.slice(0, 8)}...${user._id.slice(-4)}` : 'Loading...'}</span>
                <button 
                  onClick={() => copyToClipboard(user?._id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#fcd535', 
                    cursor: 'pointer', 
                    fontSize: '14px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease'
                  }}
                  title="Copy full ID to clipboard"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#474d57'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#eaecef', fontSize: '14px' }}>Full Name</label>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#1e2329', 
                border: '1px solid #474d57', 
                borderRadius: '8px', 
                color: '#eaecef',
                fontSize: r.bodySize,
                wordBreak: 'break-word',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span>{user?.name || 'Loading...'}</span>
                {user?.kycStatus === 'approved' && (
                  <span style={{
                    backgroundColor: '#02c076',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    letterSpacing: '0.5px'
                  }}>
                    VERIFIED
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#eaecef', fontSize: r.smallSize }}>Email Address</label>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#1e2329', 
              border: '1px solid #474d57', 
              borderRadius: '8px', 
              color: '#eaecef',
              fontSize: r.bodySize,
              wordBreak: 'break-all',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{user?.email || 'Loading...'}</span>
              <span style={{ color: '#02c076', fontSize: '14px', fontWeight: '500' }}>Verified</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: r.gridCols, gap: r.gap }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#eaecef', fontSize: r.smallSize }}>KYC Status</label>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#1e2329', 
                border: '1px solid #474d57', 
                borderRadius: '8px', 
                color: user?.kycStatus === 'approved' ? '#02c076' : user?.kycStatus === 'rejected' ? '#f84960' : '#fcd535',
                fontSize: r.bodySize,
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{user?.kycStatus?.toUpperCase() || 'NOT SUBMITTED'}</span>
                {user?.kycStatus !== 'approved' && (
                  <Link to="/kyc" style={{ color: '#fcd535', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Complete</Link>
                )}
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#eaecef', fontSize: r.smallSize }}>Member Since</label>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#1e2329', 
                border: '1px solid #474d57', 
                borderRadius: '8px', 
                color: '#eaecef',
                fontSize: '15px'
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
        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: r.cardPadding, 
          borderRadius: '12px', 
          border: '1px solid #474d57'
        }}>
          <h3 style={{ marginBottom: '24px', color: '#ffffff', fontSize: r.h2Size, fontWeight: '600', letterSpacing: '-0.3px' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: r.isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: r.gap }}>
            {[
              { to: '/trading', title: 'Start Trading', desc: 'Buy/Sell USDT' },
              { to: '/history', title: 'View History', desc: 'Transactions & Deposits' },
              { to: '/dashboard', title: 'Manage Wallet', desc: 'Deposit & Withdraw' },
              { to: '/kyc', title: 'KYC Verification', desc: 'Complete Verification' }
            ].map((action, index) => (
              <Link key={index} to={action.to} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: r.isMobile ? '16px' : '24px', 
                  backgroundColor: '#1e2329', 
                  borderRadius: '12px', 
                  textAlign: 'center',
                  border: '1px solid #474d57',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#252a32';
                  e.currentTarget.style.borderColor = '#fcd535';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e2329';
                  e.currentTarget.style.borderColor = '#474d57';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: r.bodySize, marginBottom: '8px' }}>{action.title}</div>
                  <div style={{ color: '#b7bdc6', fontSize: r.smallSize }}>{action.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;