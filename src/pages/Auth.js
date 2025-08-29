import React, { useState } from 'react';
import { authAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Auth = ({ setUser, defaultTab = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultTab === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = isLogin 
        ? await authAPI.login({ email: formData.email, password: formData.password })
        : await authAPI.register(formData);
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed');
    }
    setLoading(false);
  };

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
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ 
            color: '#b7bdc6', 
            fontSize: '16px', 
            margin: 0,
            fontWeight: '400'
          }}>
            {isLogin ? 'Sign in to your VaultX account' : 'Join thousands of traders on VaultX'}
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
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        
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