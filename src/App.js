import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import KYCPage from './pages/KYCPage';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import Navbar from './components/Navbar';
import { authAPI } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refreshUser = () => {
    fetchUserData();
  };

  // Make refresh function globally available
  window.refreshUser = refreshUser;

  return (
    <div className="App">
      <Router>
        {user ? (
          <>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} refreshUser={refreshUser} />} />
              <Route path="/trading" element={<Trading user={user} setUser={setUser} refreshUser={refreshUser} />} />
              <Route path="/kyc" element={<KYCPage user={user} setUser={setUser} refreshUser={refreshUser} />} />
              <Route path="/profile" element={<Profile user={user} setUser={setUser} refreshUser={refreshUser} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Auth setUser={setUser} defaultTab="login" />} />
            <Route path="/register" element={<Auth setUser={setUser} defaultTab="register" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;