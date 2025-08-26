import React from 'react';
import LandingNavbar from '../components/LandingNavbar';

const Terms = () => {
  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: '#eaecef' }}>
      <LandingNavbar />
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '40px' }}>
            <h1 style={{ color: '#fcd535', marginBottom: '32px', textAlign: 'center' }}>Terms & Conditions</h1>
            
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                By accessing and using VaultX platform, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>2. User Registration</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                Users must provide accurate, complete, and current information during registration. KYC verification with valid Aadhar and PAN is mandatory for trading.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>3. Trading Rules</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                • Minimum transaction: ₹100<br/>
                • Maximum transaction: ₹10,00,000<br/>
                • Daily limit: ₹50,00,000 for verified users<br/>
                • All transactions are final and irreversible
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>4. Security & Compliance</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                VaultX implements bank-level security measures. Users are responsible for maintaining account security. We comply with all Indian cryptocurrency regulations.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>5. Prohibited Activities</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                • Money laundering or terrorist financing<br/>
                • Fraudulent transactions<br/>
                • Using multiple accounts<br/>
                • Violation of Indian laws
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>6. Fees & Charges</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                VaultX maintains transparent pricing with no hidden charges. All applicable fees are displayed before transaction confirmation.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>7. Dispute Resolution</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                All disputes will be resolved through arbitration in accordance with Indian law. Users can contact our 24/7 support for assistance.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>8. Limitation of Liability</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                VaultX shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>9. Contact Information</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                For questions about these terms, contact us at:<br/>
                Email: legal@vaultx.com<br/>
                WhatsApp: +91 9876543210
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <p style={{ color: '#fcd535', margin: '0', fontSize: '14px' }}>
                Last updated: December 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;