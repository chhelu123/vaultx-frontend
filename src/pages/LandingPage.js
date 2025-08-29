import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#1e2329', color: '#eaecef', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid #2b3139', backgroundColor: '#1e2329', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#fcd535', fontSize: '32px', fontWeight: '600', margin: 0, letterSpacing: '-0.5px' }}>VaultX</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link 
              to="/login" 
              style={{ 
                color: '#eaecef', 
                textDecoration: 'none', 
                padding: '12px 24px', 
                border: '1px solid #474d57', 
                borderRadius: '6px', 
                fontSize: '15px', 
                fontWeight: '500', 
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#fcd535';
                e.target.style.color = '#fcd535';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#474d57';
                e.target.style.color = '#eaecef';
              }}
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              style={{ 
                color: '#000', 
                textDecoration: 'none', 
                padding: '12px 24px', 
                backgroundColor: '#fcd535', 
                borderRadius: '6px', 
                fontSize: '15px', 
                fontWeight: '600', 
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(252, 213, 53, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '120px 0 100px', textAlign: 'center', background: 'linear-gradient(135deg, #1e2329 0%, #2b3139 100%)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '700', marginBottom: '24px', color: '#ffffff', lineHeight: '1.1', letterSpacing: '-1px' }}>
            Professional USDT Trading Platform
          </h1>
          <p style={{ fontSize: '22px', color: '#b7bdc6', marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px', lineHeight: '1.5', fontWeight: '400' }}>
            Secure, fast, and reliable INR to USDT exchange with institutional-grade security and competitive rates.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
            <span style={{ padding: '8px 16px', backgroundColor: '#02c076', color: '#ffffff', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>Bank-Grade Security</span>
            <span style={{ padding: '8px 16px', backgroundColor: '#f84960', color: '#ffffff', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>Instant Settlement</span>
            <span style={{ padding: '8px 16px', backgroundColor: '#fcd535', color: '#000000', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>24/7 Support</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/register" 
              style={{ 
                color: '#000', 
                textDecoration: 'none', 
                padding: '16px 32px', 
                backgroundColor: '#fcd535', 
                borderRadius: '8px', 
                fontWeight: '600', 
                fontSize: '16px', 
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(252, 213, 53, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Start Trading
            </Link>
            <Link 
              to="/login" 
              style={{ 
                color: '#eaecef', 
                textDecoration: 'none', 
                padding: '16px 32px', 
                border: '1px solid #474d57', 
                borderRadius: '8px', 
                fontWeight: '500', 
                fontSize: '16px', 
                transition: 'all 0.3s ease',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#474d57';
                e.target.style.borderColor = '#fcd535';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#474d57';
              }}
            >
              Sign In
            </Link>
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
            {[
              {
                title: 'Bank-Grade Security',
                description: 'Multi-layer security architecture with cold storage, 2FA authentication, and real-time fraud monitoring to protect your assets.',
                features: ['256-bit SSL encryption', 'Cold wallet storage', 'Real-time monitoring', '2FA authentication']
              },
              {
                title: 'Instant Settlement',
                description: 'Lightning-fast transaction processing with automated settlement and real-time balance updates for seamless trading.',
                features: ['Sub-second execution', 'Real-time updates', 'Automated settlement', '99.9% uptime']
              },
              {
                title: 'Competitive Rates',
                description: 'Best-in-market exchange rates with transparent pricing, no hidden fees, and guaranteed execution at quoted prices.',
                features: ['Zero hidden fees', 'Live market rates', 'Price guarantee', 'Transparent pricing']
              }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '32px', 
                  backgroundColor: '#1e2329', 
                  borderRadius: '12px', 
                  border: '1px solid #474d57',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === index ? '0 12px 24px rgba(0,0,0,0.2)' : 'none',
                  borderColor: hoveredCard === index ? '#fcd535' : '#474d57'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: hoveredCard === index ? '#fcd535' : '#ffffff', transition: 'color 0.3s ease' }}>{feature.title}</h3>
                <p style={{ color: '#b7bdc6', lineHeight: '1.6', fontSize: '16px', marginBottom: '20px' }}>{feature.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {feature.features.map((item, i) => (
                    <li key={i} style={{ color: '#848e9c', fontSize: '14px', marginBottom: '8px', paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#fcd535' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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

      {/* Trading Rates Section */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>Live Trading Rates</h2>
            <p style={{ fontSize: '18px', color: '#b7bdc6', maxWidth: '600px', margin: '0 auto' }}>Real-time USDT exchange rates with guaranteed execution at quoted prices.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '64px' }}>
            <div style={{ 
              padding: '32px', 
              backgroundColor: '#2b3139', 
              borderRadius: '12px', 
              border: '2px solid #02c076',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(2, 192, 118, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#02c076' }}>Buy USDT</h3>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>₹92.00</div>
              <p style={{ color: '#b7bdc6', fontSize: '14px', margin: 0 }}>per USDT • Live Rate</p>
            </div>
            <div style={{ 
              padding: '32px', 
              backgroundColor: '#2b3139', 
              borderRadius: '12px', 
              border: '2px solid #f84960',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(248, 73, 96, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#f84960' }}>Sell USDT</h3>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>₹89.00</div>
              <p style={{ color: '#b7bdc6', fontSize: '14px', margin: 0 }}>per USDT • Live Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#2b3139' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', textAlign: 'center' }}>
            {[
              { number: '10,000+', label: 'Active Traders', color: '#fcd535' },
              { number: '₹50Cr+', label: 'Trading Volume', color: '#02c076' },
              { number: '99.9%', label: 'Platform Uptime', color: '#f84960' },
              { number: '24/7', label: 'Customer Support', color: '#fcd535' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '24px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e2329';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '48px', fontWeight: '700', color: stat.color, marginBottom: '8px', letterSpacing: '-1px' }}>{stat.number}</div>
                <div style={{ color: '#b7bdc6', fontSize: '18px', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
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

      {/* Security & Compliance Section */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>Security & Compliance</h2>
            <p style={{ fontSize: '18px', color: '#b7bdc6', maxWidth: '600px', margin: '0 auto' }}>Your security is our priority. We maintain the highest standards of protection and regulatory compliance.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              { title: 'KYC Verified', desc: 'All users undergo thorough identity verification', icon: '🛡️' },
              { title: 'Regulatory Compliance', desc: 'Fully compliant with Indian financial regulations', icon: '📋' },
              { title: 'Secure Infrastructure', desc: 'Enterprise-grade security with 24/7 monitoring', icon: '🔒' },
              { title: 'Instant Support', desc: 'Dedicated customer support available round the clock', icon: '💬' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '32px', 
                  backgroundColor: '#2b3139', 
                  borderRadius: '12px', 
                  border: '1px solid #474d57',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#fcd535';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#474d57';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#ffffff' }}>{item.title}</h3>
                <p style={{ color: '#b7bdc6', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '64px 0 32px', borderTop: '1px solid #2b3139', backgroundColor: '#1e2329' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', marginBottom: '48px' }}>
            <div>
              <h3 style={{ color: '#fcd535', fontSize: '28px', fontWeight: '600', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>VaultX</h3>
              <p style={{ color: '#b7bdc6', fontSize: '16px', margin: '0 0 24px 0', lineHeight: '1.6' }}>India's most trusted professional USDT trading platform with institutional-grade security.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="mailto:support@vaultx.com" style={{ color: '#848e9c', fontSize: '24px', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#fcd535'} onMouseLeave={(e) => e.target.style.color = '#848e9c'}>📧</a>
                <a href="tel:+911234567890" style={{ color: '#848e9c', fontSize: '24px', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#fcd535'} onMouseLeave={(e) => e.target.style.color = '#848e9c'}>📞</a>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', margin: '0 0 20px 0' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['How It Works', 'Security', 'Pricing', 'Support'].map((link, index) => (
                  <a key={index} href="#" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#fcd535'} onMouseLeave={(e) => e.target.style.color = '#b7bdc6'}>{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', margin: '0 0 20px 0' }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/terms" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#fcd535'} onMouseLeave={(e) => e.target.style.color = '#b7bdc6'}>Terms of Service</Link>
                <Link to="/privacy" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#fcd535'} onMouseLeave={(e) => e.target.style.color = '#b7bdc6'}>Privacy Policy</Link>
                <a href="#" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#fcd535'} onMouseLeave={(e) => e.target.style.color = '#b7bdc6'}>Compliance</a>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', margin: '0 0 20px 0' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="mailto:support@vaultx.com" style={{ color: '#b7bdc6', textDecoration: 'none', fontSize: '15px', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#fcd535'} onMouseLeave={(e) => e.target.style.color = '#b7bdc6'}>support@vaultx.com</a>
                <span style={{ color: '#b7bdc6', fontSize: '15px' }}>24/7 Customer Support</span>
                <span style={{ color: '#b7bdc6', fontSize: '15px' }}>Response within 5 minutes</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #2b3139', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ color: '#848e9c', fontSize: '14px', margin: 0 }}>© 2024 VaultX. All rights reserved. Licensed and regulated financial services.</p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <span style={{ color: '#848e9c', fontSize: '12px' }}>🔒 SSL Secured</span>
              <span style={{ color: '#848e9c', fontSize: '12px' }}>🛡️ KYC Verified</span>
              <span style={{ color: '#848e9c', fontSize: '12px' }}>📋 Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;