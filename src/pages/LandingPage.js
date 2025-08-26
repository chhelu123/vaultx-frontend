import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';

const LandingPage = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: '#eaecef' }}>
      <LandingNavbar />

      {/* Hero Section */}
      <section style={{ padding: '100px 24px', textAlign: 'center', background: 'linear-gradient(135deg, #1e2329 0%, #2b3139 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '700', marginBottom: '24px', color: '#eaecef' }}>
            Buy & Sell USDT <span style={{ color: '#fcd535' }}>Instantly</span>
          </h1>
          <p style={{ fontSize: '24px', color: '#848e9c', marginBottom: '16px' }}>
            Safe. Secure. Transparent.
          </p>
          <p style={{ fontSize: '18px', color: '#848e9c', marginBottom: '48px' }}>
            India's trusted P2P platform for INR ↔ USDT transactions
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '18px', fontWeight: '600' }}>
              Get Started
            </Link>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="btn" 
              style={{ backgroundColor: 'transparent', border: '1px solid #474d57', color: '#eaecef', padding: '16px 32px', fontSize: '18px' }}
            >
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Why VaultX Section */}
      <section id="why-vaultx" style={{ padding: '80px 24px', background: '#0b0e11' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '60px', color: '#eaecef' }}>
            Why Choose VaultX?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚡</div>
              <h3 style={{ color: '#fcd535', marginBottom: '16px', fontSize: '20px' }}>Instant Transfers</h3>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                Fast INR ↔ USDT transactions completed within minutes
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
              <h3 style={{ color: '#fcd535', marginBottom: '16px', fontSize: '20px' }}>Secure & Verified</h3>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                Aadhar & PAN-based KYC with bank-level encryption
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎧</div>
              <h3 style={{ color: '#fcd535', marginBottom: '16px', fontSize: '20px' }}>24/7 Support</h3>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                We've got your back, anytime with dedicated support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '80px 24px', background: '#1e2329' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '60px', color: '#eaecef' }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', color: '#fcd535' }}>1</div>
              <h3 style={{ color: '#eaecef', marginBottom: '16px', fontSize: '20px' }}>Sign Up & Verify</h3>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                Complete quick KYC with Aadhar & PAN verification
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', color: '#fcd535' }}>2</div>
              <h3 style={{ color: '#eaecef', marginBottom: '16px', fontSize: '20px' }}>Choose Buy or Sell</h3>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                Select amount & payment method (UPI/Bank Transfer)
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', color: '#fcd535' }}>3</div>
              <h3 style={{ color: '#eaecef', marginBottom: '16px', fontSize: '20px' }}>Complete Transaction</h3>
              <p style={{ color: '#848e9c', lineHeight: '1.6' }}>
                Instant INR ↔ USDT transfer to your wallet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section style={{ padding: '60px 24px', background: '#2b3139' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <div style={{ color: '#fcd535', fontSize: '36px', fontWeight: '700' }}>₹15Cr+</div>
              <div style={{ color: '#848e9c', fontSize: '16px' }}>Total Volume</div>
            </div>
            <div>
              <div style={{ color: '#02c076', fontSize: '36px', fontWeight: '700' }}>1000+</div>
              <div style={{ color: '#848e9c', fontSize: '16px' }}>Active Users</div>
            </div>
            <div>
              <div style={{ color: '#f84960', fontSize: '36px', fontWeight: '700' }}>5000+</div>
              <div style={{ color: '#848e9c', fontSize: '16px' }}>Transactions</div>
            </div>
            <div>
              <div style={{ color: '#fcd535', fontSize: '36px', fontWeight: '700' }}>24/7</div>
              <div style={{ color: '#848e9c', fontSize: '16px' }}>Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section style={{ padding: '80px 24px', background: '#0b0e11' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '60px', color: '#eaecef' }}>
            VaultX Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚡</div>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>Transaction Speed</h3>
              <p style={{ color: '#02c076', fontSize: '20px', fontWeight: '600', margin: '0' }}>{'< 5 minutes'}</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>KYC Verification</h3>
              <p style={{ color: '#02c076', fontSize: '20px', fontWeight: '600', margin: '0' }}>Instant</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎧</div>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>Support</h3>
              <p style={{ color: '#02c076', fontSize: '20px', fontWeight: '600', margin: '0' }}>24/7 Live</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>💳</div>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>Payment Methods</h3>
              <p style={{ color: '#02c076', fontSize: '20px', fontWeight: '600', margin: '0' }}>UPI + Bank</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚫</div>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>No Bank Freeze</h3>
              <p style={{ color: '#02c076', fontSize: '20px', fontWeight: '600', margin: '0' }}>100% Safe</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔒</div>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>Zero Risk</h3>
              <p style={{ color: '#02c076', fontSize: '20px', fontWeight: '600', margin: '0' }}>Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 24px', background: '#1e2329' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '60px', color: '#eaecef' }}>
            What Our Users Say
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            <div className="card" style={{ padding: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#fcd535', fontSize: '20px' }}>★★★★★</div>
              </div>
              <p style={{ color: '#eaecef', marginBottom: '20px', fontStyle: 'italic' }}>
                "Fastest USDT trading platform I've used. KYC was done in minutes and transactions are instant!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fcd535', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', color: '#000', fontWeight: 'bold' }}>R</div>
                <div>
                  <div style={{ color: '#eaecef', fontWeight: '600' }}>Rahul S.</div>
                  <div style={{ color: '#848e9c', fontSize: '14px' }}>Crypto Trader</div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#fcd535', fontSize: '20px' }}>★★★★★</div>
              </div>
              <p style={{ color: '#eaecef', marginBottom: '20px', fontStyle: 'italic' }}>
                "Best rates and transparent process. No hidden charges, exactly what they promise!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#02c076', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', color: '#fff', fontWeight: 'bold' }}>P</div>
                <div>
                  <div style={{ color: '#eaecef', fontWeight: '600' }}>Priya M.</div>
                  <div style={{ color: '#848e9c', fontSize: '14px' }}>Business Owner</div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#fcd535', fontSize: '20px' }}>★★★★★</div>
              </div>
              <p style={{ color: '#eaecef', marginBottom: '20px', fontStyle: 'italic' }}>
                "24/7 support is amazing. Had an issue at midnight and got instant help on WhatsApp!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f84960', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', color: '#fff', fontWeight: 'bold' }}>A</div>
                <div>
                  <div style={{ color: '#eaecef', fontWeight: '600' }}>Amit K.</div>
                  <div style={{ color: '#848e9c', fontSize: '14px' }}>Software Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 24px', background: '#0b0e11' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '60px', color: '#eaecef' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>How long does KYC verification take?</h3>
              <p style={{ color: '#848e9c', margin: '0' }}>KYC verification is usually completed within 5-10 minutes. In rare cases, it may take up to 24 hours.</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>What are the transaction limits?</h3>
              <p style={{ color: '#848e9c', margin: '0' }}>Minimum: ₹100, Maximum: ₹10,00,000 per transaction. Daily limit: ₹50,00,000 for verified users.</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>Is my money safe on VaultX?</h3>
              <p style={{ color: '#848e9c', margin: '0' }}>Yes, we use bank-level encryption and never store your funds. All transactions are processed instantly.</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ color: '#fcd535', marginBottom: '12px', fontSize: '18px' }}>Which payment methods do you support?</h3>
              <p style={{ color: '#848e9c', margin: '0' }}>We support UPI, IMPS, NEFT, and RTGS for INR transactions. USDT is transferred via TRC20 network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section style={{ padding: '80px 24px', background: '#1e2329' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '600', textAlign: 'center', marginBottom: '60px', color: '#eaecef' }}>
            Why Users Trust VaultX
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#02c076', marginRight: '12px', fontSize: '20px' }}>🔐</span>
                  <span style={{ color: '#eaecef', fontSize: '18px' }}>Bank-level encryption</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#02c076', marginRight: '12px', fontSize: '20px' }}>🛡️</span>
                  <span style={{ color: '#eaecef', fontSize: '18px' }}>Funds never at risk</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#02c076', marginRight: '12px', fontSize: '20px' }}>✅</span>
                  <span style={{ color: '#eaecef', fontSize: '18px' }}>Verified merchants only</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ color: '#02c076', marginRight: '12px', fontSize: '20px' }}>🆔</span>
                  <span style={{ color: '#eaecef', fontSize: '18px' }}>PAN/Aadhar verified users</span>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <h3 style={{ color: '#fcd535', marginBottom: '24px', fontSize: '24px' }}>Trust Stats</h3>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#02c076', fontSize: '32px', fontWeight: '700' }}>500+</div>
                <div style={{ color: '#848e9c' }}>Verified Traders</div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#fcd535', fontSize: '32px', fontWeight: '700' }}>₹10Cr+</div>
                <div style={{ color: '#848e9c' }}>Volume Traded</div>
              </div>
              <div>
                <div style={{ color: '#f84960', fontSize: '32px', fontWeight: '700' }}>99.9%</div>
                <div style={{ color: '#848e9c' }}>Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #fcd535 0%, #f0b90b 100%)', color: '#000' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '24px' }}>
            Start Trading Now
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '40px', opacity: '0.8' }}>
            Join thousands of traders who trust VaultX for secure USDT trading
          </p>
          <Link to="/register" className="btn" style={{ backgroundColor: '#000', color: '#fcd535', padding: '16px 32px', fontSize: '18px', fontWeight: '600', border: 'none', marginRight: '16px' }}>
            Create Account
          </Link>
          <a href="https://wa.me/1234567890" className="btn" style={{ backgroundColor: 'transparent', border: '2px solid #000', color: '#000', padding: '14px 32px', fontSize: '18px', fontWeight: '600', textDecoration: 'none' }}>
            WhatsApp Support
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1e2329', padding: '60px 24px 40px', borderTop: '1px solid #2b3139' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h3 style={{ color: '#fcd535', marginBottom: '20px' }}>VaultX</h3>
              <p style={{ color: '#848e9c', marginBottom: '20px' }}>
                India's most trusted P2P USDT trading platform
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#" style={{ color: '#848e9c', fontSize: '20px' }}>📧</a>
                <a href="#" style={{ color: '#848e9c', fontSize: '20px' }}>📱</a>
                <a href="#" style={{ color: '#848e9c', fontSize: '20px' }}>💬</a>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#eaecef', marginBottom: '20px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/" style={{ color: '#848e9c', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
                <button 
                  onClick={() => document.getElementById('why-vaultx')?.scrollIntoView({ behavior: 'smooth' })} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#848e9c', 
                    textAlign: 'left', 
                    padding: '0', 
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Features
                </button>
                <Link to="/terms" style={{ color: '#848e9c', textDecoration: 'none', fontSize: '14px' }}>Terms & Conditions</Link>
                <Link to="/privacy" style={{ color: '#848e9c', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#eaecef', marginBottom: '20px' }}>Support</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="mailto:support@vaultx.com" style={{ color: '#848e9c', textDecoration: 'none' }}>support@vaultx.com</a>
                <a href="https://wa.me/1234567890" style={{ color: '#848e9c', textDecoration: 'none' }}>WhatsApp Support</a>
                <span style={{ color: '#848e9c' }}>24/7 Live Chat</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #2b3139', paddingTop: '20px', textAlign: 'center', color: '#474d57', fontSize: '14px' }}>
            © 2024 VaultX. All rights reserved. | Secure USDT Trading Platform
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;