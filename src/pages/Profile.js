import React, { useState, useEffect } from 'react';
import { authAPI, kycAPI } from '../services/api';

const Profile = ({ user }) => {
  const [kycData, setKycData] = useState(null);

  useEffect(() => {
    if (user?.kycStatus === 'approved') {
      fetchKYCData();
    }
  }, [user]);

  const fetchKYCData = async () => {
    try {
      const response = await kycAPI.getStatus();
      setKycData(response.data.kyc);
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    }
  };

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ color: '#eaecef', fontSize: '24px', marginBottom: '8px' }}>Profile</h1>
          <p className="text-gray">Manage your account information and settings</p>
        </div>
      
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>Personal Information</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#848e9c' }}>Name:</label>
              <p style={{ margin: '5px 0', fontSize: '16px', color: '#eaecef' }}>{user?.name}</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#848e9c' }}>Email:</label>
              <p style={{ margin: '5px 0', fontSize: '16px', color: '#eaecef' }}>{user?.email}</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#848e9c' }}>Member Since:</label>
              <p style={{ margin: '5px 0', fontSize: '16px', color: '#eaecef' }}>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', color: '#848e9c' }}>KYC Status:</label>
              <p style={{ margin: '5px 0', fontSize: '16px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px',
                  backgroundColor: user?.kycStatus === 'approved' ? '#02c076' : user?.kycStatus === 'pending' ? '#fcd535' : '#f84960'
                }}>
                  {user?.kycStatus?.toUpperCase() || 'NOT SUBMITTED'}
                </span>
              </p>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>Wallet Balance</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', color: '#848e9c' }}>INR Balance:</label>
              <p style={{ margin: '5px 0', fontSize: '24px', fontWeight: 'bold', color: '#02c076' }}>
                ₹{user?.wallets?.inr || '0'}
              </p>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', color: '#848e9c' }}>USDT Balance:</label>
              <p style={{ margin: '5px 0', fontSize: '24px', fontWeight: 'bold', color: '#fcd535' }}>
                {user?.wallets?.usdt?.toFixed(6) || '0.000000'} USDT
              </p>
            </div>
          </div>
        </div>

        {user?.kycStatus === 'approved' && kycData && (
          <div className="card">
            <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>Verified Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 'bold', color: '#848e9c' }}>Full Name:</label>
                <p style={{ margin: '5px 0', fontSize: '16px', color: '#eaecef' }}>{kycData.fullName}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#848e9c' }}>Date of Birth:</label>
                <p style={{ margin: '5px 0', fontSize: '16px', color: '#eaecef' }}>{new Date(kycData.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#848e9c' }}>Mobile Number:</label>
                <p style={{ margin: '5px 0', fontSize: '16px', color: '#eaecef' }}>{kycData.mobileNumber}</p>
              </div>
              <div>
                <label style={{ fontWeight: 'bold', color: '#848e9c' }}>PAN Number:</label>
                <p style={{ margin: '5px 0', fontSize: '16px', color: '#eaecef' }}>{kycData.panNumber}</p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>Account Status</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#eaecef' }}>Trading Status</h4>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: user?.canTrade ? '#02c076' : '#f84960' }}>
                {user?.canTrade ? '✅ Enabled' : '❌ Disabled'}
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#2b3139', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#eaecef' }}>Account Type</h4>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#fcd535' }}>
                Standard User
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;