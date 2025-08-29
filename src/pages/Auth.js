import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Auth = ({ setUser, defaultTab = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultTab === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpLoading, setOtpLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const response = await authAPI.login({ email: formData.email, password: formData.password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      } else {
        // Send OTP for registration
        await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, name: formData.name })
        });
        setStep(2);
        setCountdown(600); // 10 minutes
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed');
    }
    setLoading(false);
  };
  
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setError('');
    
    try {
      const otpString = otp.join('');
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          otp: otpString, 
          name: formData.name, 
          password: formData.password 
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      setError(error.message || 'OTP verification failed');
    }
    setOtpLoading(false);
  };
  
  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const resendOTP = async () => {
    try {
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, name: formData.name })
      });
      setCountdown(600);
      setOtp(['', '', '', '', '', '']);
    } catch (error) {
      setError('Failed to resend OTP');
    }
  };
  
  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#1e2329',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '440px', 
        padding: '48px 40px', 
        backgroundColor: '#2b3139', 
        borderRadius: '12px', 
        border: '1px solid #474d57',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ 
              color: '#fcd535', 
              fontSize: '32px', 
              fontWeight: '600', 
              margin: '0 0 8px 0', 
              letterSpacing: '-0.5px' 
            }}>
              VaultX
            </h1>
          </Link>
          <h2 style={{ 
            color: '#ffffff', 
            fontSize: '24px', 
            fontWeight: '600', 
            margin: '0 0 8px 0',
            letterSpacing: '-0.3px'
          }}>
            {isLogin ? 'Welcome Back' : (step === 1 ? 'Create Account' : 'Verify Email')}
          </h2>
          <p style={{ 
            color: '#b7bdc6', 
            fontSize: '16px', 
            margin: 0,
            fontWeight: '400'
          }}>
            {isLogin ? 'Sign in to your VaultX account' : (step === 1 ? 'Join thousands of traders on VaultX' : `Enter the 6-digit code sent to ${formData.email}`)}
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#2d1b1b',
            border: '1px solid #f84960',
            borderRadius: '8px',
            marginBottom: '24px',
            color: '#f84960',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        {step === 1 ? (
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#eaecef', 
                fontSize: '14px', 
                fontWeight: '500' 
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  border: '1px solid #474d57', 
                  borderRadius: '8px', 
                  backgroundColor: '#1e2329', 
                  color: '#eaecef',
                  fontSize: '16px',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                border: '1px solid #474d57', 
                borderRadius: '8px', 
                backgroundColor: '#1e2329', 
                color: '#eaecef',
                fontSize: '16px',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#fcd535'}
              onBlur={(e) => e.target.style.borderColor = '#474d57'}
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder={isLogin ? "Enter your password" : "Create a strong password"}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                border: '1px solid #474d57', 
                borderRadius: '8px', 
                backgroundColor: '#1e2329', 
                color: '#eaecef',
                fontSize: '16px',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#fcd535'}
              onBlur={(e) => e.target.style.borderColor = '#474d57'}
            />
            {!isLogin && (
              <p style={{ 
                color: '#848e9c', 
                fontSize: '12px', 
                margin: '6px 0 0 0',
                lineHeight: '1.4'
              }}>
                Password must be at least 6 characters long
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '16px', 
              backgroundColor: loading ? '#b8a429' : '#fcd535', 
              color: '#000', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              fontSize: '16px', 
              fontWeight: '600',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(252, 213, 53, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Send OTP')}
          </button>
        </form>
        ) : (
        <form onSubmit={handleOTPSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '16px', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '500',
              textAlign: 'center'
            }}>
              Enter OTP Code
            </label>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  style={{
                    width: '48px',
                    height: '48px',
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: '600',
                    border: '2px solid #474d57',
                    borderRadius: '8px',
                    backgroundColor: '#1e2329',
                    color: '#fcd535',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                  onBlur={(e) => e.target.style.borderColor = '#474d57'}
                />
              ))}
            </div>
            {countdown > 0 && (
              <p style={{ 
                color: '#848e9c', 
                fontSize: '14px', 
                textAlign: 'center',
                margin: '12px 0 0 0'
              }}>
                Code expires in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={otpLoading || otp.some(digit => !digit)}
            style={{ 
              width: '100%', 
              padding: '16px', 
              backgroundColor: (otpLoading || otp.some(digit => !digit)) ? '#b8a429' : '#fcd535', 
              color: '#000', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: (otpLoading || otp.some(digit => !digit)) ? 'not-allowed' : 'pointer', 
              fontSize: '16px', 
              fontWeight: '600',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              marginBottom: '16px'
            }}
          >
            {otpLoading ? 'Verifying...' : 'Verify & Create Account'}
          </button>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => { setStep(1); setOtp(['', '', '', '', '', '']); setError(''); }}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#474d57',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={resendOTP}
              disabled={countdown > 0}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: countdown > 0 ? '#848e9c' : '#02c076',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: countdown > 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Resend OTP
            </button>
          </div>
        </form>
        )}
        
        {/* Divider */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '32px 0',
          color: '#848e9c',
          fontSize: '14px'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#474d57' }}></div>
          <span style={{ padding: '0 16px' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#474d57' }}></div>
        </div>
        
        {/* Switch Auth Mode */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#b7bdc6', fontSize: '15px', margin: '0 0 8px 0' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '' });
              setError('');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#fcd535', 
              cursor: 'pointer', 
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: 'inherit',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>
        
        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link 
            to="/" 
            style={{ 
              color: '#848e9c', 
              textDecoration: 'none', 
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#fcd535'}
            onMouseLeave={(e) => e.target.style.color = '#848e9c'}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;