import React, { useState, useEffect } from 'react';
import { kycAPI } from '../services/api';

const KYCForm = ({ user, onUpdate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKycData] = useState({
    fullName: '',
    dateOfBirth: '',
    mobileNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    aadharNumber: '',
    panNumber: '',
    aadharFrontWithSelfie: '',
    aadharBackWithSelfie: '',
    panDocument: ''
  });
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (kycStatus?.kycStatus === 'rejected') {
        await kycAPI.updateKYC(kycData);
      } else {
        await kycAPI.submitKYC(kycData);
      }
      
      setSubmitted(true);
      fetchKYCStatus();
      onUpdate();
      if (window.refreshUser) window.refreshUser();
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting KYC');
    }
    setLoading(false);
  };

  const isStepValid = () => {
    switch(currentStep) {
      case 1: return kycData.fullName && kycData.dateOfBirth;
      case 2: return kycData.mobileNumber;
      case 3: return kycData.streetAddress && kycData.city && kycData.state && kycData.pincode;
      case 4: return kycData.aadharNumber;
      case 5: return kycData.aadharFrontWithSelfie && kycData.aadharBackWithSelfie;
      case 6: return kycData.panNumber;
      case 7: return kycData.panDocument;
      default: return false;
    }
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

  if (submitted) {
    return (
      <div style={{
        background: '#2b3139',
        border: '1px solid #474d57',
        borderRadius: '12px',
        padding: '48px 32px',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
        <h2 style={{ color: '#02c076', fontSize: '24px', fontWeight: '600', marginBottom: '16px', letterSpacing: '-0.3px' }}>
          KYC Submitted Successfully
        </h2>
        <p style={{ color: '#b7bdc6', fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>
          Thank you for submitting your KYC documents. Our team will review your information within 24-48 hours.
        </p>
        <p style={{ color: '#848e9c', fontSize: '14px', lineHeight: '1.4' }}>
          You'll receive an email notification once your verification is complete. Until then, you can continue exploring VaultX with limited features.
        </p>
      </div>
    );
  }

  if (kycStatus?.kycStatus === 'rejected' && !kycStatus?.showForm) {
    return (
      <div style={{ background: '#2b3139', border: '1px solid #f84960', borderRadius: '12px', padding: '32px' }}>
        <h3 style={{ color: '#f84960', marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>KYC Rejected</h3>
        <p style={{ color: '#eaecef', marginBottom: '20px', lineHeight: '1.5' }}>
          <strong>Admin Note:</strong> {kycStatus.kyc?.adminNotes || kycStatus.adminNote || 'Please resubmit with correct documents'}
        </p>
        <button
          onClick={() => setKycStatus({ ...kycStatus, showForm: true })}
          style={{
            padding: '12px 24px',
            backgroundColor: '#fcd535',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Resubmit KYC
        </button>
      </div>
    );
  }

  const renderStep = () => {
    const stepStyle = {
      background: '#2b3139',
      border: '1px solid #474d57',
      borderRadius: '12px',
      padding: '32px',
      maxWidth: '500px',
      margin: '0 auto'
    };

    const inputStyle = {
      width: '100%',
      padding: '14px 16px',
      border: '1px solid #474d57',
      borderRadius: '8px',
      backgroundColor: '#1e2329',
      color: '#eaecef',
      fontSize: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    };

    const labelStyle = {
      display: 'block',
      marginBottom: '8px',
      color: '#eaecef',
      fontSize: '14px',
      fontWeight: '500'
    };

    switch(currentStep) {
      case 1:
        return (
          <div style={stepStyle}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.3px' }}>Personal Information</h2>
            <p style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '32px' }}>Enter your full name as per your government documents</p>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Full Name (as per documents)</label>
              <input
                type="text"
                value={kycData.fullName}
                onChange={(e) => setKycData({ ...kycData, fullName: e.target.value })}
                style={inputStyle}
                placeholder="Enter your full name"
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>Date of Birth</label>
              <input
                type="date"
                value={kycData.dateOfBirth}
                onChange={(e) => setKycData({ ...kycData, dateOfBirth: e.target.value })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div style={stepStyle}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.3px' }}>Contact Information</h2>
            <p style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '32px' }}>Provide your mobile number for verification</p>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>Mobile Number</label>
              <input
                type="tel"
                value={kycData.mobileNumber}
                onChange={(e) => setKycData({ ...kycData, mobileNumber: e.target.value })}
                style={inputStyle}
                placeholder="+91 XXXXXXXXXX"
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div style={stepStyle}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.3px' }}>Address Details</h2>
            <p style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '32px' }}>Enter your current residential address</p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Street Address</label>
              <input
                type="text"
                value={kycData.streetAddress}
                onChange={(e) => setKycData({ ...kycData, streetAddress: e.target.value })}
                style={inputStyle}
                placeholder="House/Flat No., Street Name"
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  value={kycData.city}
                  onChange={(e) => setKycData({ ...kycData, city: e.target.value })}
                  style={inputStyle}
                  placeholder="City"
                  onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                  onBlur={(e) => e.target.style.borderColor = '#474d57'}
                />
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <input
                  type="text"
                  value={kycData.state}
                  onChange={(e) => setKycData({ ...kycData, state: e.target.value })}
                  style={inputStyle}
                  placeholder="State"
                  onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                  onBlur={(e) => e.target.style.borderColor = '#474d57'}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>PIN Code</label>
              <input
                type="text"
                value={kycData.pincode}
                onChange={(e) => setKycData({ ...kycData, pincode: e.target.value })}
                style={inputStyle}
                placeholder="6-digit PIN code"
                maxLength="6"
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div style={stepStyle}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.3px' }}>Aadhar Information</h2>
            <p style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '32px' }}>Enter your 12-digit Aadhar number</p>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>Aadhar Number</label>
              <input
                type="text"
                value={kycData.aadharNumber}
                onChange={(e) => setKycData({ ...kycData, aadharNumber: e.target.value })}
                style={inputStyle}
                placeholder="XXXX XXXX XXXX"
                maxLength="12"
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div style={stepStyle}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.3px' }}>Aadhar Documents</h2>
            <p style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '32px' }}>Upload selfies holding your Aadhar card</p>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Aadhar Front with Selfie</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('aadharFrontWithSelfie', e.target.files[0])}
                style={inputStyle}
              />
              <small style={{ color: '#848e9c', fontSize: '12px', display: 'block', marginTop: '6px' }}>Take a selfie holding your Aadhar card with front side visible</small>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>Aadhar Back with Selfie</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('aadharBackWithSelfie', e.target.files[0])}
                style={inputStyle}
              />
              <small style={{ color: '#848e9c', fontSize: '12px', display: 'block', marginTop: '6px' }}>Take a selfie holding your Aadhar card with back side visible</small>
            </div>
          </div>
        );

      case 6:
        return (
          <div style={stepStyle}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.3px' }}>PAN Information</h2>
            <p style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '32px' }}>Enter your 10-character PAN number</p>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>PAN Number</label>
              <input
                type="text"
                value={kycData.panNumber}
                onChange={(e) => setKycData({ ...kycData, panNumber: e.target.value.toUpperCase() })}
                style={inputStyle}
                placeholder="ABCDE1234F"
                maxLength="10"
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div style={stepStyle}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '8px', letterSpacing: '-0.3px' }}>PAN Document</h2>
            <p style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '32px' }}>Upload a clear image of your PAN card</p>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>PAN Card Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('panDocument', e.target.files[0])}
                style={inputStyle}
              />
              <small style={{ color: '#848e9c', fontSize: '12px', display: 'block', marginTop: '6px' }}>Upload a clear, well-lit image of your PAN card</small>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Progress Bar */}
      <div style={{ marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#b7bdc6', fontSize: '14px', fontWeight: '500' }}>Step {currentStep} of 7</span>
          <span style={{ color: '#b7bdc6', fontSize: '14px', fontWeight: '500' }}>{Math.round((currentStep / 7) * 100)}%</span>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: '#474d57', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${(currentStep / 7) * 100}%`, 
            height: '100%', 
            backgroundColor: '#fcd535', 
            transition: 'width 0.3s ease' 
          }}></div>
        </div>
      </div>

      {renderStep()}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px', maxWidth: '500px', margin: '32px auto 0 auto' }}>
        {currentStep > 1 && (
          <button
            onClick={handlePrev}
            style={{
              flex: 1,
              padding: '14px 24px',
              backgroundColor: '#474d57',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6169'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#474d57'}
          >
            Previous
          </button>
        )}
        
        {currentStep < 7 ? (
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            style={{
              flex: 1,
              padding: '14px 24px',
              backgroundColor: isStepValid() ? '#fcd535' : '#848e9c',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: isStepValid() ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isStepValid() || loading}
            style={{
              flex: 1,
              padding: '14px 24px',
              backgroundColor: (isStepValid() && !loading) ? '#fcd535' : '#848e9c',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: (isStepValid() && !loading) ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Submitting...' : 'Submit KYC'}
          </button>
        )}
      </div>
    </div>
  );
};

export default KYCForm;