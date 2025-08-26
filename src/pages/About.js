import React from 'react';
import LandingNavbar from '../components/LandingNavbar';

const About = () => {
  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: '#eaecef' }}>
      <LandingNavbar />
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ color: '#fcd535', marginBottom: '24px' }}>About VaultX</h1>
            <p style={{ color: '#848e9c', fontSize: '18px', lineHeight: '1.6' }}>
              VaultX is India's most trusted P2P USDT trading platform, providing secure, fast, and reliable cryptocurrency exchange services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;