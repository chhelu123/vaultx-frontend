import React, { useState, useEffect } from 'react';
import { kycAPI } from '../services/api';

const KYCForm = ({ user, onUpdate }) => {
  const [kycData, setKycData] = useState({
    fullName: '',
    dateOfBirth: '',
    mobileNumber: '',
    aadharNumber: '',
    panNumber: '',
    aadharFrontWithSelfie: '',
    aadharBackWithSelfie: '',
    panDocument: ''
  });
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchKYCStatus();
  }, []);

  const fetchKYCStatus = async () => {
    try {
      const response = await kycAPI.getStatus();
      setKycStatus(response.data);
    } catch (error) {
      console.error('Error fetching KYC status:', error);
    }
  };

  const handleFileUpload = (field, file) => {
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Only allow image files
    if (file && !file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setKycData({ ...kycData, [field]: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (kycStatus?.kycStatus === 'rejected') {
        await kycAPI.updateKYC(kycData);
        alert('KYC documents updated successfully!');
      } else {
        await kycAPI.submitKYC(kycData);
        alert('KYC documents submitted successfully!');
      }
      
      fetchKYCStatus();
      onUpdate();
      // Refresh parent user data
      if (window.refreshUser) window.refreshUser();
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting KYC');
    }
    setLoading(false);
  };

  if (kycStatus?.kycStatus === 'approved') {
    return (
      <div className="card" style={{ background: 'linear-gradient(135deg, #02c076 0%, #00a66d 100%)', border: 'none' }}>
        <h3 style={{ color: '#fff', marginBottom: '10px' }}>✅ KYC Verified</h3>
        <p style={{ color: '#fff', margin: 0 }}>Your KYC has been approved. You can now trade freely!</p>
      </div>
    );
  }

  if (kycStatus?.kycStatus === 'pending') {
    return (
      <div className="card" style={{ background: 'linear-gradient(135deg, #fcd535 0%, #f0b90b 100%)', border: 'none' }}>
        <h3 style={{ color: '#000', marginBottom: '10px' }}>⏳ KYC Under Review</h3>
        <p style={{ color: '#000', margin: 0 }}>Your KYC documents are being reviewed. You'll be notified once approved.</p>
      </div>
    );
  }

  if (kycStatus?.kycStatus === 'rejected' && !kycStatus?.showForm) {
    return (
      <div className="card" style={{ background: 'linear-gradient(135deg, #f84960 0%, #e8334a 100%)', border: 'none' }}>
        <h3 style={{ color: '#fff', marginBottom: '10px' }}>❌ KYC Rejected</h3>
        <p style={{ color: '#fff', marginBottom: '15px' }}>
          <strong>Admin Note:</strong> {kycStatus.kyc?.adminNotes || kycStatus.adminNote || 'Please resubmit with correct documents'}
        </p>
        <button
          onClick={() => setKycStatus({ ...kycStatus, showForm: true })}
          className="btn"
          style={{ backgroundColor: '#fff', color: '#f84960', fontWeight: '600' }}
        >
          Resubmit KYC
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: '#eaecef' }}>KYC Verification Required</h2>
      <p style={{ marginBottom: '25px', color: '#848e9c' }}>
        Complete your KYC verification to start trading. All information is secure and encrypted.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Full Name</label>
            <input
              type="text"
              value={kycData.fullName}
              onChange={(e) => setKycData({ ...kycData, fullName: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Date of Birth</label>
            <input
              type="date"
              value={kycData.dateOfBirth}
              onChange={(e) => setKycData({ ...kycData, dateOfBirth: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Mobile Number</label>
          <input
            type="tel"
            value={kycData.mobileNumber}
            onChange={(e) => setKycData({ ...kycData, mobileNumber: e.target.value })}
            style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
            placeholder="+91 XXXXXXXXXX"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Aadhar Number</label>
            <input
              type="text"
              value={kycData.aadharNumber}
              onChange={(e) => setKycData({ ...kycData, aadharNumber: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
              placeholder="XXXX XXXX XXXX"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>PAN Number</label>
            <input
              type="text"
              value={kycData.panNumber}
              onChange={(e) => setKycData({ ...kycData, panNumber: e.target.value.toUpperCase() })}
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
              placeholder="ABCDE1234F"
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ color: '#eaecef', marginBottom: '15px', fontSize: '18px' }}>Document Upload</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#eaecef' }}>Aadhar Front with Selfie</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload('aadharFrontWithSelfie', e.target.files[0])}
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
              required
            />
            <small style={{ color: '#b7bdc6', display: 'block', marginTop: '4px' }}>Upload a selfie holding your Aadhar card (front side visible). Max 5MB</small>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#eaecef' }}>Aadhar Back with Selfie</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload('aadharBackWithSelfie', e.target.files[0])}
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
              required
            />
            <small style={{ color: '#b7bdc6', display: 'block', marginTop: '4px' }}>Upload a selfie holding your Aadhar card (back side visible). Max 5MB</small>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#eaecef' }}>PAN Card</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload('panDocument', e.target.files[0])}
              style={{ width: '100%', padding: '12px', border: '1px solid #474d57', borderRadius: '6px', backgroundColor: '#1e2329', color: '#eaecef' }}
              required
            />
            <small style={{ color: '#b7bdc6', display: 'block', marginTop: '4px' }}>Upload clear image of your PAN card. Max 5MB</small>
          </div>
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
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? 'Submitting...' : 'Submit KYC Documents'}
        </button>
      </form>
    </div>
  );
};

export default KYCForm;