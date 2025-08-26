import React, { useState, useEffect } from 'react';
import KYCForm from '../components/KYCForm';
import { authAPI } from '../services/api';

const KYCPage = ({ user, setUser, refreshUser }) => {
  const handleUpdate = () => {
    refreshUser();
  };

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ color: '#eaecef', fontSize: '24px', marginBottom: '8px' }}>KYC Verification</h1>
          <p className="text-gray">Complete your identity verification to start trading</p>
        </div>
        {user && <KYCForm user={user} onUpdate={handleUpdate} />}
      </div>
    </div>
  );
};

export default KYCPage;