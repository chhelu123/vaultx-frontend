import React from 'react';
import LandingNavbar from '../components/LandingNavbar';

const Privacy = () => {
  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: '#eaecef' }}>
      <LandingNavbar />
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '40px' }}>
            <h1 style={{ color: '#fcd535', marginBottom: '32px', textAlign: 'center' }}>Privacy Policy</h1>
            
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>1. Information We Collect</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>Personal Information:</strong><br/>
                • Full name, email address, phone number<br/>
                • Aadhar and PAN details for KYC verification<br/>
                • Bank account and UPI information<br/>
                • Transaction history and wallet balances
              </p>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>Technical Information:</strong><br/>
                • IP address, device information<br/>
                • Browser type and version<br/>
                • Usage patterns and preferences
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                • <strong style={{ color: '#02c076' }}>Account Management:</strong> Creating and maintaining your VaultX account<br/>
                • <strong style={{ color: '#02c076' }}>KYC Verification:</strong> Complying with Indian regulatory requirements<br/>
                • <strong style={{ color: '#02c076' }}>Transaction Processing:</strong> Facilitating USDT trading and transfers<br/>
                • <strong style={{ color: '#02c076' }}>Security:</strong> Preventing fraud and unauthorized access<br/>
                • <strong style={{ color: '#02c076' }}>Customer Support:</strong> Providing 24/7 assistance
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>3. Data Security</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>Bank-Level Encryption:</strong><br/>
                • All data encrypted using AES-256 encryption<br/>
                • Secure SSL/TLS connections for all communications<br/>
                • Multi-factor authentication for account access<br/>
                • Regular security audits and penetration testing
              </p>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>Data Storage:</strong><br/>
                • Servers located in secure Indian data centers<br/>
                • Regular backups with encryption<br/>
                • Access controls and monitoring systems
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>4. Information Sharing</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                We <strong style={{ color: '#f84960' }}>DO NOT</strong> sell, trade, or rent your personal information to third parties.
              </p>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                <strong style={{ color: '#fcd535' }}>Limited Sharing Only For:</strong><br/>
                • Legal compliance and regulatory requirements<br/>
                • Fraud prevention and security purposes<br/>
                • Service providers under strict confidentiality agreements
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>5. Your Rights</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                • <strong style={{ color: '#02c076' }}>Access:</strong> Request copies of your personal data<br/>
                • <strong style={{ color: '#02c076' }}>Correction:</strong> Update incorrect or incomplete information<br/>
                • <strong style={{ color: '#02c076' }}>Deletion:</strong> Request deletion of your data (subject to legal requirements)<br/>
                • <strong style={{ color: '#02c076' }}>Portability:</strong> Export your data in a structured format<br/>
                • <strong style={{ color: '#02c076' }}>Objection:</strong> Object to certain data processing activities
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>6. Cookies & Tracking</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                We use essential cookies for platform functionality and security. You can control cookie preferences in your browser settings.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>7. Data Retention</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                We retain your data for as long as your account is active or as required by Indian law. KYC documents are retained for 5 years as per RBI guidelines.
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>8. International Transfers</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6', marginBottom: '16px' }}>
                Your data is processed and stored within India. We do not transfer personal data outside India without explicit consent and adequate safeguards.
              </p>
            </div>

            <div>
              <h2 style={{ color: '#eaecef', fontSize: '20px', marginBottom: '16px' }}>9. Contact Us</h2>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                For privacy-related questions or to exercise your rights:<br/>
                <strong style={{ color: '#fcd535' }}>Data Protection Officer:</strong><br/>
                Email: privacy@vaultx.com<br/>
                WhatsApp: +91 9876543210<br/>
                Address: VaultX Technologies Pvt Ltd, Bangalore, India
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <p style={{ color: '#fcd535', margin: '0', fontSize: '14px' }}>
                Last updated: December 2024 | Compliant with Indian Data Protection Laws
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;