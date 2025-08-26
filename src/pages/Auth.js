import React, { useState } from 'react';
import { authAPI } from '../services/api';

const Auth = ({ setUser, defaultTab = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultTab === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

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
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #474d57', borderRadius: '4px', backgroundColor: '#2b3139', color: '#eaecef' }}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #474d57', borderRadius: '4px', backgroundColor: '#2b3139', color: '#eaecef' }}
          />
          
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', backgroundColor: '#fcd535', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#848e9c' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
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