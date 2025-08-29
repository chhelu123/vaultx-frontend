import React from 'react';

const Profile = ({ user }) => {
  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ color: '#eaecef', fontSize: '24px', marginBottom: '8px' }}>Profile</h1>
          <p className="text-gray">Your account information and details</p>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#eaecef' }}>Account Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>User ID</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: '#fcd535',
                fontFamily: 'monospace',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {user?._id || 'Loading...'}
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Name</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: '#eaecef' 
              }}>
                {user?.name || 'Loading...'}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Email</label>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#2b3139', 
              border: '1px solid #474d57', 
              borderRadius: '4px', 
              color: '#eaecef' 
            }}>
              {user?.email || 'Loading...'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>KYC Status</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: user?.kycStatus === 'approved' ? '#02c076' : user?.kycStatus === 'rejected' ? '#f84960' : '#fcd535'
              }}>
                {user?.kycStatus?.toUpperCase() || 'NOT SUBMITTED'}
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Member Since</label>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#2b3139', 
                border: '1px solid #474d57', 
                borderRadius: '4px', 
                color: '#eaecef' 
              }}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Loading...'}
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#1e2329', 
            padding: '15px', 
            borderRadius: '4px', 
            border: '1px solid #474d57',
            marginTop: '20px'
          }}>
            <p style={{ color: '#848e9c', margin: 0, fontSize: '14px' }}>
              💡 <strong>Your User ID</strong> is unique and can be used for support requests or account verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;