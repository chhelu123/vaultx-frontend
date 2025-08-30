import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, index) => {
    if (el) sectionRefs.current[index] = el;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1e2329', color: '#eaecef', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid #2b3139', backgroundColor: '#1e2329', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img 
            src="/image.png" 
            alt="VaultX Logo" 
            style={{ height: '40px', cursor: 'pointer' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
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
          <p style={{ fontSize: '22px', color: '#b7bdc6', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px', lineHeight: '1.5', fontWeight: '400' }}>
            Secure, fast, and reliable INR to USDT exchange with institutional-grade security and competitive rates.
          </p>
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
      <section 
        ref={(el) => addToRefs(el, 0)}
        data-section="features"
        style={{ 
          padding: '80px 0', 
          backgroundColor: '#2b3139',
          transform: visibleSections.has('features') ? 'translateY(0)' : 'translateY(50px)',
          opacity: visibleSections.has('features') ? 1 : 0,
          transition: 'all 0.8s ease'
        }}
      >
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
      <section 
        ref={(el) => addToRefs(el, 1)}
        data-section="howItWorks"
        style={{ 
          padding: '80px 0',
          transform: visibleSections.has('howItWorks') ? 'translateY(0)' : 'translateY(50px)',
          opacity: visibleSections.has('howItWorks') ? 1 : 0,
          transition: 'all 0.8s ease 0.2s'
        }}
      >
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
      <section 
        ref={(el) => addToRefs(el, 2)}
        data-section="stats"
        style={{ 
          padding: '80px 0', 
          backgroundColor: '#2b3139',
          transform: visibleSections.has('stats') ? 'translateY(0)' : 'translateY(50px)',
          opacity: visibleSections.has('stats') ? 1 : 0,
          transition: 'all 0.8s ease 0.4s'
        }}
      >
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

      {/* Customer Reviews Section */}
      <section 
        ref={(el) => addToRefs(el, 3)}
        data-section="reviews"
        style={{ 
          padding: '80px 0',
          transform: visibleSections.has('reviews') ? 'translateY(0)' : 'translateY(50px)',
          opacity: visibleSections.has('reviews') ? 1 : 0,
          transition: 'all 0.8s ease 0.6s'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>What Our Customers Say</h2>
            <p style={{ fontSize: '18px', color: '#b7bdc6', maxWidth: '600px', margin: '0 auto' }}>Trusted by thousands of traders across India for secure and reliable USDT transactions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Crypto Trader',
                review: 'VaultX has been my go-to platform for USDT trading. The process is seamless, and transactions are completed within minutes. Highly recommended for serious traders.',
                rating: 5,
                initial: 'R'
              },
              {
                name: 'Priya Sharma',
                role: 'Business Owner',
                review: 'Excellent platform with transparent pricing and no hidden fees. The KYC process was quick, and customer support is very responsive. Great experience overall.',
                rating: 5,
                initial: 'P'
              },
              {
                name: 'Amit Patel',
                role: 'Software Engineer',
                review: 'Professional platform with institutional-grade security. I have been using VaultX for over a year now, and never faced any issues. Trustworthy and reliable.',
                rating: 5,
                initial: 'A'
              }
            ].map((review, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '32px', 
                  backgroundColor: '#2b3139', 
                  borderRadius: '12px', 
                  border: '1px solid #474d57',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#fcd535';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(252, 213, 53, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#474d57';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#fcd535', fontSize: '18px' }}>★</span>
                  ))}
                </div>
                <p style={{ color: '#eaecef', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px', fontStyle: 'italic' }}>
                  "{review.review}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    backgroundColor: '#fcd535', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '16px', 
                    color: '#000', 
                    fontWeight: '600',
                    fontSize: '18px'
                  }}>
                    {review.initial}
                  </div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px' }}>{review.name}</div>
                    <div style={{ color: '#b7bdc6', fontSize: '14px' }}>{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={(el) => addToRefs(el, 4)}
        data-section="faq"
        style={{ 
          padding: '80px 0', 
          backgroundColor: '#2b3139',
          transform: visibleSections.has('faq') ? 'translateY(0)' : 'translateY(50px)',
          opacity: visibleSections.has('faq') ? 1 : 0,
          transition: 'all 0.8s ease 0.8s'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.5px' }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: '18px', color: '#b7bdc6', maxWidth: '600px', margin: '0 auto' }}>Get answers to common questions about trading USDT on VaultX platform.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                question: 'How long does the KYC verification process take?',
                answer: 'KYC verification is typically completed within 10-15 minutes during business hours. In some cases, it may take up to 24 hours for manual review.'
              },
              {
                question: 'What are the minimum and maximum transaction limits?',
                answer: 'Minimum transaction amount is ₹500. Maximum limits depend on your KYC status: ₹1,00,000 per transaction for basic KYC and ₹10,00,000 for complete verification.'
              },
              {
                question: 'Which payment methods are supported for INR transactions?',
                answer: 'We support UPI, IMPS, NEFT, and RTGS for INR deposits and withdrawals. All major banks and UPI apps are accepted.'
              },
              {
                question: 'How secure is my money and personal information?',
                answer: 'We use bank-grade encryption and security protocols. Your funds are processed through secure channels, and we never store sensitive financial information.'
              },
              {
                question: 'What are the trading fees and charges?',
                answer: 'VaultX charges competitive trading fees with transparent pricing. There are no hidden charges, and all fees are clearly displayed before transaction confirmation.'
              },
              {
                question: 'How can I contact customer support?',
                answer: 'Our customer support is available 24/7 via email at support@vaultx.com. You can also reach us through the in-app chat feature for immediate assistance.'
              }
            ].map((faq, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '24px', 
                  backgroundColor: '#1e2329', 
                  borderRadius: '12px', 
                  border: '1px solid #474d57',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#fcd535';
                  e.currentTarget.style.backgroundColor = '#252a32';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#474d57';
                  e.currentTarget.style.backgroundColor = '#1e2329';
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#fcd535' }}>{faq.question}</h3>
                <p style={{ color: '#b7bdc6', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>{faq.answer}</p>
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