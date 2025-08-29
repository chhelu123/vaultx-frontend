import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/trading', label: 'Trading', icon: '📈' },
    { path: '/history', label: 'History', icon: '📋' },
    { path: '/kyc', label: 'KYC', icon: '🆔' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <>
      <nav className="navbar" style={{ background: '#1e2329', padding: '0', borderBottom: '1px solid #2b3139', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', padding: '0 15px', maxWidth: '100%' }}>
          {/* Logo */}
          <h2 style={{ color: '#fcd535', margin: '0', fontSize: '20px', fontWeight: '600' }}>VaultX</h2>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
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
              style={{ fontSize: '12px', padding: '6px 12px', background: '#f84960', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
          
          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fcd535',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#1e2329',
            borderBottom: '1px solid #2b3139',
            zIndex: 1000,
            display: 'none'
          }}>
            {/* Wallet Info */}
            <div style={{ padding: '15px', borderBottom: '1px solid #2b3139' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#848e9c', fontSize: '12px' }}>User ID: </span>
                <span style={{ color: '#fcd535', fontSize: '12px', fontFamily: 'monospace' }}>{user?._id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#848e9c', fontSize: '14px' }}>INR Balance:</span>
                <span style={{ color: '#eaecef', fontWeight: '600' }}>₹{user?.wallets?.inr?.toFixed(2) || '0'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#848e9c', fontSize: '14px' }}>USDT Balance:</span>
                <span style={{ color: '#eaecef', fontWeight: '600' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</span>
              </div>
            </div>
            
            {/* Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  color: location.pathname === item.path ? '#fcd535' : '#eaecef',
                  textDecoration: 'none',
                  fontSize: '16px',
                  borderBottom: '1px solid #2b3139',
                  background: location.pathname === item.path ? '#2b3139' : 'transparent'
                }}
              >
                <span style={{ marginRight: '12px', fontSize: '18px' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            {/* Logout Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              style={{
                width: '100%',
                padding: '15px',
                background: '#f84960',
                color: 'white',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;