import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#1e2329', color: '#eaecef', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid #2b3139', backgroundColor: '#1e2329' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#fcd535', fontSize: '32px', fontWeight: '600', margin: 0, letterSpacing: '-0.5px' }}>VaultX</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/login" style={{ color: '#eaecef', textDecoration: 'none', padding: '12px 24px', border: '1px solid #474d57', borderRadius: '6px', fontSize: '15px', fontWeight: '500', transition: 'all 0.2s' }}>Sign In</Link>
            <Link to="/register" style={{ color: '#000', textDecoration: 'none', padding: '12px 24px', backgroundColor: '#fcd535', borderRadius: '6px', fontSize: '15px', fontWeight: '600', transition: 'all 0.2s' }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '100px 0 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '700', marginBottom: '24px', color: '#ffffff', lineHeight: '1.1', letterSpacing: '-1px' }}>
            Professional USDT Trading Platform
          </h1>
          <p style={{ fontSize: '22px', color: '#b7bdc6', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px', lineHeight: '1.5', fontWeight: '400' }}>
            Secure, fast, and reliable INR to USDT exchange with institutional-grade security and competitive rates.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ color: '#000', textDecoration: 'none', padding: '16px 32px', backgroundColor: '#fcd535', borderRadius: '8px', fontWeight: '600', fontSize: '16px', transition: 'all 0.2s' }}>Start Trading</Link>
            <Link to="/login" style={{ color: '#eaecef', textDecoration: 'none', padding: '16px 32px', border: '1px solid #474d57', borderRadius: '8px', fontWeight: '500', fontSize: '16px', transition: 'all 0.2s' }}>Sign In</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#2b3139' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>Why Choose VaultX</h2>
            <p style={{ fontSize: '18px', color: '#b7bdc6', maxWidth: '600px', margin: '0 auto' }}>Built for traders who demand security, speed, and reliability in their cryptocurrency transactions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '48px' }}>
            <div style={{ padding: '32px', backgroundColor: '#1e2329', borderRadius: '12px', border: '1px solid #474d57' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Bank-Grade Security</h3>
              <p style={{ color: '#b7bdc6', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>Multi-layer security architecture with cold storage, 2FA authentication, and real-time fraud monitoring to protect your assets.</p>
            </div>
            <div style={{ padding: '32px', backgroundColor: '#1e2329', borderRadius: '12px', border: '1px solid #474d57' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Instant Settlement</h3>
              <p style={{ color: '#b7bdc6', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>Lightning-fast transaction processing with automated settlement and real-time balance updates for seamless trading.</p>
            </div>
            <div style={{ padding: '32px', backgroundColor: '#1e2329', borderRadius: '12px', border: '1px solid #474d57' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Competitive Rates</h3>
              <p style={{ color: '#b7bdc6', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>Best-in-market exchange rates with transparent pricing, no hidden fees, and guaranteed execution at quoted prices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>How It Works</h2>
            <p style={{ fontSize: '18px', color: '#b7bdc6', maxWidth: '600px', margin: '0 auto' }}>Get started with USDT trading in three simple steps.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#fcd535', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: '700', color: '#000' }}>1</div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Create Account</h3>
              <p style={{ color: '#b7bdc6', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>Register with your email and complete KYC verification for secure trading access.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#fcd535', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: '700', color: '#000' }}>2</div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Fund Wallet</h3>
              <p style={{ color: '#b7bdc6', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>Deposit INR via UPI or bank transfer, or add USDT directly to your secure wallet.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#fcd535', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px', fontWeight: '700', color: '#000' }}>3</div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>Trade Instantly</h3>
              <p style={{ color: '#b7bdc6', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>Execute trades instantly at competitive rates with guaranteed settlement and real-time confirmations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#2b3139' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#fcd535', marginBottom: '8px', letterSpacing: '-1px' }}>10,000+</div>
              <div style={{ color: '#b7bdc6', fontSize: '18px', fontWeight: '500' }}>Active Traders</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#fcd535', marginBottom: '8px', letterSpacing: '-1px' }}>₹50Cr+</div>
              <div style={{ color: '#b7bdc6', fontSize: '18px', fontWeight: '500' }}>Trading Volume</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#fcd535', marginBottom: '8px', letterSpacing: '-1px' }}>99.9%</div>
              <div style={{ color: '#b7bdc6', fontSize: '18px', fontWeight: '500' }}>Platform Uptime</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#fcd535', marginBottom: '8px', letterSpacing: '-1px' }}>24/7</div>
              <div style={{ color: '#b7bdc6', fontSize: '18px', fontWeight: '500' }}>Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>Start Trading Today</h2>
          <p style={{ fontSize: '20px', color: '#b7bdc6', marginBottom: '40px', lineHeight: '1.5' }}>Join thousands of professional traders who trust VaultX for secure and efficient USDT trading.</p>
          <Link to="/register" style={{ color: '#000', textDecoration: 'none', padding: '18px 40px', backgroundColor: '#fcd535', borderRadius: '8px', fontWeight: '600', fontSize: '18px', display: 'inline-block', transition: 'all 0.2s' }}>Create Account</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 0', borderTop: '1px solid #2b3139', backgroundColor: '#1e2329' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h3 style={{ color: '#fcd535', fontSize: '24px', fontWeight: '600', margin: '0 0 8px 0' }}>VaultX</h3>
              <p style={{ color: '#848e9c', fontSize: '14px', margin: 0 }}>Professional USDT Trading Platform</p>
            </div>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <Link to="/terms" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Terms of Service</Link>
              <Link to="/privacy" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Privacy Policy</Link>
              <a href="mailto:support@vaultx.com" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Support</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #2b3139', marginTop: '32px', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#848e9c', fontSize: '14px', margin: 0 }}>© 2024 VaultX. All rights reserved. Licensed and regulated financial services.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;