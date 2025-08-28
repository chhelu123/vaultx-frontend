import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="landing-navbar" style={{ background: '#1e2329', padding: '0', borderBottom: '1px solid #2b3139', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', padding: '0 15px', maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ color: '#fcd535', margin: '0', fontSize: '20px', fontWeight: '600' }}>VaultX</h2>
          </Link>
          
          {/* Desktop Menu */}
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/" style={{ color: '#848e9c', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
              Home
            </Link>
            <button onClick={() => document.getElementById('why-vaultx')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: '#848e9c', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
              Features
            </button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: '#848e9c', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
              How It Works
            </button>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/login" className="btn" style={{ backgroundColor: 'transparent', border: '1px solid #474d57', color: '#eaecef', padding: '8px 16px' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Mobile Hamburger */}
          <button
            className="mobile-hamburger"
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
          <div className="mobile-dropdown" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#1e2329',
            borderBottom: '1px solid #2b3139',
            zIndex: 1000,
            display: 'none'
          }}>
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '15px',
                color: '#eaecef',
                textDecoration: 'none',
                borderBottom: '1px solid #2b3139'
              }}
            >
              Home
            </Link>
            <button 
              onClick={() => {
                document.getElementById('why-vaultx')?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '15px',
                background: 'none',
                border: 'none',
                color: '#eaecef',
                textAlign: 'left',
                borderBottom: '1px solid #2b3139',
                cursor: 'pointer'
              }}
            >
              Features
            </button>
            <button 
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '15px',
                background: 'none',
                border: 'none',
                color: '#eaecef',
                textAlign: 'left',
                borderBottom: '1px solid #2b3139',
                cursor: 'pointer'
              }}
            >
              How It Works
            </button>
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid #474d57',
                  color: '#eaecef',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: '4px'
                }}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px',
                  backgroundColor: '#fcd535',
                  color: '#000',
                  textDecoration: 'none',
                  textAlign: 'center',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default LandingNavbar;