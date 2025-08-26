import React from 'react';
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
  return (
    <nav style={{ background: '#1e2329', padding: '0', borderBottom: '1px solid #2b3139', height: '64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ color: '#fcd535', margin: '0', fontSize: '20px', fontWeight: '600' }}>VaultX</h2>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
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
      </div>
    </nav>
  );
};

export default LandingNavbar;