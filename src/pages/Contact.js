import React from 'react';
import LandingNavbar from '../components/LandingNavbar';

const Contact = () => {
  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: '#eaecef' }}>
      <LandingNavbar />
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ color: '#fcd535', marginBottom: '24px' }}>Contact Us</h1>
            <div style={{ textAlign: 'left' }}>
              <p style={{ color: '#eaecef', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>Email:</strong> support@vaultx.com
              </p>
              <p style={{ color: '#eaecef', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>WhatsApp:</strong> +91 9876543210
              </p>
              <p style={{ color: '#eaecef', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>Support Hours:</strong> 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;