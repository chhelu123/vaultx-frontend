import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      await authAPI.resetPassword({ token, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password');
    }
    setLoading(false);
  };

  if (success) {
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
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#fcd535', fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>VaultX</h1>
          <h2 style={{ color: '#02c076', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Password Reset Successful</h2>
          <p style={{ color: '#b7bdc6', fontSize: '16px', marginBottom: '24px' }}>
            Your password has been reset successfully. Redirecting to login...
          </p>
          <Link to="/login" style={{ color: '#fcd535', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

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
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#fcd535', fontSize: '32px', fontWeight: '600', marginBottom: '8px' }}>VaultX</h1>
          <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Reset Password</h2>
          <p style={{ color: '#b7bdc6', fontSize: '16px', margin: 0 }}>Enter your new password below</p>
        </div>
        
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
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '500' 
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          
          <button
            type="submit"
            disabled={loading || !token}
            style={{ 
              width: '100%', 
              padding: '16px', 
              backgroundColor: loading || !token ? '#b8a429' : '#fcd535', 
              color: '#000', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: loading || !token ? 'not-allowed' : 'pointer', 
              fontSize: '16px', 
              fontWeight: '600',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link 
            to="/login" 
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
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;