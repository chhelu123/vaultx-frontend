import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/trading', label: 'Trading', icon: '📈' },
    { path: '/history', label: 'History', icon: '📋' },
    { path: '/kyc', label: 'KYC', icon: '🆔' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav style={{ background: '#1e2329', padding: '0', borderBottom: '1px solid #2b3139', height: '64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 24px', maxWidth: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: '#fcd535', margin: '0 40px 0 0', fontSize: '20px', fontWeight: '600' }}>VaultX</h2>
          <div style={{ display: 'flex' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 16px',
                  color: location.pathname === item.path ? '#fcd535' : '#848e9c',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderBottom: location.pathname === item.path ? '2px solid #fcd535' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ marginRight: '8px' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: '#2b3139', padding: '8px 12px', borderRadius: '4px', fontSize: '14px' }}>
              <span style={{ color: '#848e9c' }}>INR: </span>
              <span style={{ color: '#eaecef', fontWeight: '600' }}>₹{user?.wallets?.inr?.toFixed(2) || '0'}</span>
            </div>
            <div style={{ background: '#2b3139', padding: '8px 12px', borderRadius: '4px', fontSize: '14px' }}>
              <span style={{ color: '#848e9c' }}>USDT: </span>
              <span style={{ color: '#eaecef', fontWeight: '600' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="btn btn-danger"
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;