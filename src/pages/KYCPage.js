import React, { useState, useEffect } from 'react';
import KYCForm from '../components/KYCForm';
import { authAPI } from '../services/api';

const KYCPage = ({ user, setUser, refreshUser }) => {
  const handleUpdate = () => {
    refreshUser();
  };

  return (
    <div style={{ 
      padding: '32px 24px', 
      minHeight: 'calc(100vh - 64px)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.5px' }}>KYC Verification</h1>
          <p style={{ color: '#b7bdc6', fontSize: '16px', margin: 0 }}>Complete your identity verification to unlock full trading capabilities</p>
        </div>
        {user && <KYCForm user={user} onUpdate={handleUpdate} />}
      </div>
    </div>
  );
};

export default KYCPage;