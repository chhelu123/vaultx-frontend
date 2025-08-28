import React, { useState } from 'react';
import { authAPI } from '../services/api';

const Auth = ({ setUser, defaultTab = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultTab === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const sendOTP = async () => {
    if (!formData.email) {
      alert('Please enter email first');
      return;
    }
    
    setOtpLoading(true);
    const apiUrl = 'https://vaultx-backend-production.up.railway.app/api/auth/send-otp';
    console.log('Sending OTP to:', apiUrl);
    
    try {
      // Test if backend is reachable
      const testResponse = await fetch('https://vaultx-backend-production.up.railway.app/');
      console.log('Backend test:', testResponse.status);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      });
      
      console.log('OTP Response status:', response.status);
      const data = await response.json();
      console.log('OTP Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      setOtpSent(true);
      alert(`OTP sent to ${formData.email}. Check Railway logs for OTP.`);
      
    } catch (error) {
      console.error('OTP Error:', error);
      alert(`Error: ${error.message}. Check console for details.`);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = isLogin 
        ? await authAPI.login({ email: formData.email, password: formData.password })
        : await authAPI.register(formData);
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0e11' }}>
      <div style={{ width: '400px', padding: '40px', backgroundColor: '#1e2329', borderRadius: '8px', border: '1px solid #2b3139' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#eaecef' }}>
          {isLogin ? 'Login' : 'Register'} - <span style={{ color: '#fcd535' }}>VaultX</span>
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #474d57', borderRadius: '4px', backgroundColor: '#2b3139', color: '#eaecef' }}
            />
          )}
          
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '4px', backgroundColor: '#2b3139', color: '#eaecef' }}
            />
            {!isLogin && (
              <button
                type="button"
                onClick={sendOTP}
                disabled={otpLoading || !formData.email}
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '5px',
                  padding: '7px 12px',
                  backgroundColor: '#fcd535',
                  color: '#000',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                {otpLoading ? 'Sending...' : 'Send OTP'}
              </button>
            )}
          </div>
          
          {!isLogin && otpSent && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              maxLength="6"
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #474d57', borderRadius: '4px', backgroundColor: '#2b3139', color: '#eaecef' }}
            />
          )}
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #474d57', borderRadius: '4px', backgroundColor: '#2b3139', color: '#eaecef' }}
          />
          
          <button
            type="submit"
            disabled={loading || (!isLogin && (!otpSent || !formData.otp))}
            style={{ width: '100%', padding: '12px', backgroundColor: '#fcd535', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#848e9c' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setOtpSent(false);
              setFormData({ name: '', email: '', password: '', otp: '' });
            }}
            style={{ background: 'none', border: 'none', color: '#fcd535', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;