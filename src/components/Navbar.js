import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/trading', label: 'Trading' },
    { path: '/history', label: 'History' },
    { path: '/kyc', label: 'KYC' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <>
      <nav className="navbar" style={{ 
        background: '#1e2329', 
        padding: '0', 
        borderBottom: '1px solid #2b3139', 
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', padding: '0 20px', maxWidth: '100%' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo.png" 
              alt="VaultX Logo" 
              style={{ height: '32px', marginRight: '8px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <h2 style={{ color: '#fcd535', margin: '0', fontSize: '24px', fontWeight: '600', letterSpacing: '-0.3px' }}>VaultX</h2>
          </div>
          
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
                    padding: '20px 20px',
                    color: location.pathname === item.path ? '#fcd535' : '#b7bdc6',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                    borderBottom: location.pathname === item.path ? '2px solid #fcd535' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.color = '#fcd535';
                      e.target.style.backgroundColor = 'rgba(252, 213, 53, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.color = '#b7bdc6';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ 
                background: '#2b3139', 
                padding: '10px 16px', 
                borderRadius: '8px', 
                border: '1px solid #474d57'
              }}>
                <span style={{ color: '#b7bdc6', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' }}>INR </span>
                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '15px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>₹{user?.wallets?.inr?.toFixed(2) || '0.00'}</span>
              </div>
              <div style={{ 
                background: '#2b3139', 
                padding: '10px 16px', 
                borderRadius: '8px', 
                border: '1px solid #474d57'
              }}>
                <span style={{ color: '#b7bdc6', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' }}>USDT </span>
                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '15px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</span>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                padding: '10px 20px', 
                background: '#f84960', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.1px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#e73c4e'}
              onMouseLeave={(e) => e.target.style.background = '#f84960'}
            >
              Sign Out
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
          
          <style>{`
            @media (max-width: 768px) {
              .desktop-nav { display: none !important; }
              .mobile-menu-btn { display: block !important; }
              .mobile-menu { display: block !important; }
            }
          `}</style>
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
            zIndex: 1000
          }}>
            {/* Wallet Info */}
            <div style={{ padding: '15px', borderBottom: '1px solid #2b3139' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#b7bdc6', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' }}>USER ID </span>
                <span style={{ color: '#fcd535', fontSize: '13px', fontFamily: 'monospace', fontWeight: '600' }} title={user?._id}>
                  {user?._id ? `${user._id.slice(0, 8)}...${user._id.slice(-4)}` : 'Loading...'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#b7bdc6', fontSize: '15px', fontWeight: '500' }}>INR Balance</span>
                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '15px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>₹{user?.wallets?.inr?.toFixed(2) || '0.00'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#b7bdc6', fontSize: '15px', fontWeight: '500' }}>USDT Balance</span>
                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '15px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{user?.wallets?.usdt?.toFixed(6) || '0.000000'}</span>
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
                  background: location.pathname === item.path ? '#2b3139' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = '#2b3139';
                    e.target.style.color = '#fcd535';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#eaecef';
                  }
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
                padding: '16px 20px',
                background: '#f84960',
                color: '#ffffff',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.1px'
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;