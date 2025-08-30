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
  const [errors, setErrors] = useState({});

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Puducherry',
    'Andaman and Nicobar Islands'
  ];

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

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch(field) {
      case 'fullName':
        if (!value || value.trim().length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'mobileNumber':
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!value) {
          newErrors.mobileNumber = 'Mobile number is required';
        } else if (!mobileRegex.test(value)) {
          newErrors.mobileNumber = 'Enter valid 10-digit mobile number';
        } else {
          delete newErrors.mobileNumber;
        }
        break;
      case 'pincode':
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        if (!value) {
          newErrors.pincode = 'PIN code is required';
        } else if (!pincodeRegex.test(value)) {
          newErrors.pincode = 'Enter valid 6-digit PIN code';
        } else {
          delete newErrors.pincode;
        }
        break;
      case 'aadharNumber':
        const aadharRegex = /^[2-9]{1}[0-9]{11}$/;
        const cleanAadhar = value.replace(/\s/g, '');
        if (!value) {
          newErrors.aadharNumber = 'Aadhar number is required';
        } else if (!aadharRegex.test(cleanAadhar)) {
          newErrors.aadharNumber = 'Enter valid 12-digit Aadhar number';
        } else {
          delete newErrors.aadharNumber;
        }
        break;
      case 'panNumber':
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!value) {
          newErrors.panNumber = 'PAN number is required';
        } else if (!panRegex.test(value)) {
          newErrors.panNumber = 'Enter valid PAN number (e.g., ABCDE1234F)';
        } else {
          delete newErrors.panNumber;
        }
        break;
      default:
        if (!value || value.trim() === '') {
          newErrors[field] = 'This field is required';
        } else {
          delete newErrors[field];
        }
    }
    
    setErrors(newErrors);
    return !newErrors[field];
  };

  const isStepValid = () => {
    switch(currentStep) {
      case 1: return kycData.fullName && kycData.dateOfBirth && !errors.fullName;
      case 2: return kycData.mobileNumber && !errors.mobileNumber;
      case 3: return kycData.streetAddress && kycData.city && kycData.state && kycData.pincode && !errors.pincode;
      case 4: return kycData.aadharNumber && !errors.aadharNumber;
      case 5: return kycData.aadharFrontWithSelfie && kycData.aadharBackWithSelfie;
      case 6: return kycData.panNumber && !errors.panNumber;
      case 7: return kycData.panDocument;
      default: return false;
    }
  };

  const handleInputChange = (field, value) => {
    setKycData({ ...kycData, [field]: value });
    validateField(field, value);
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
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: errors.fullName ? '#f84960' : '#474d57'
                }}
                placeholder="Enter your full name"
                onFocus={(e) => e.target.style.borderColor = errors.fullName ? '#f84960' : '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = errors.fullName ? '#f84960' : '#474d57'}
              />
              {errors.fullName && (
                <small style={{ color: '#f84960', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.fullName}
                </small>
              )}
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>Date of Birth</label>
              <input
                type="date"
                value={kycData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                style={inputStyle}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = '#474d57'}
              />
              <small style={{ color: '#848e9c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                You must be at least 18 years old
              </small>
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleInputChange('mobileNumber', value);
                }}
                style={{
                  ...inputStyle,
                  borderColor: errors.mobileNumber ? '#f84960' : '#474d57'
                }}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                onFocus={(e) => e.target.style.borderColor = errors.mobileNumber ? '#f84960' : '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = errors.mobileNumber ? '#f84960' : '#474d57'}
              />
              {errors.mobileNumber && (
                <small style={{ color: '#f84960', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.mobileNumber}
                </small>
              )}
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
                <select
                  value={kycData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                  onBlur={(e) => e.target.style.borderColor = '#474d57'}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state} style={{ backgroundColor: '#1e2329', color: '#eaecef' }}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>PIN Code</label>
              <input
                type="text"
                value={kycData.pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  handleInputChange('pincode', value);
                }}
                style={{
                  ...inputStyle,
                  borderColor: errors.pincode ? '#f84960' : '#474d57'
                }}
                placeholder="6-digit PIN code"
                maxLength="6"
                onFocus={(e) => e.target.style.borderColor = errors.pincode ? '#f84960' : '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = errors.pincode ? '#f84960' : '#474d57'}
              />
              {errors.pincode && (
                <small style={{ color: '#f84960', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.pincode}
                </small>
              )}
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
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '').slice(0, 12);
                  if (value.length > 4 && value.length <= 8) {
                    value = value.slice(0, 4) + ' ' + value.slice(4);
                  } else if (value.length > 8) {
                    value = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8);
                  }
                  handleInputChange('aadharNumber', value);
                }}
                style={{
                  ...inputStyle,
                  borderColor: errors.aadharNumber ? '#f84960' : '#474d57'
                }}
                placeholder="XXXX XXXX XXXX"
                maxLength="14"
                onFocus={(e) => e.target.style.borderColor = errors.aadharNumber ? '#f84960' : '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = errors.aadharNumber ? '#f84960' : '#474d57'}
              />
              {errors.aadharNumber && (
                <small style={{ color: '#f84960', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.aadharNumber}
                </small>
              )}
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
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().slice(0, 10);
                  handleInputChange('panNumber', value);
                }}
                style={{
                  ...inputStyle,
                  borderColor: errors.panNumber ? '#f84960' : '#474d57'
                }}
                placeholder="ABCDE1234F"
                maxLength="10"
                onFocus={(e) => e.target.style.borderColor = errors.panNumber ? '#f84960' : '#fcd535'}
                onBlur={(e) => e.target.style.borderColor = errors.panNumber ? '#f84960' : '#474d57'}
              />
              {errors.panNumber && (
                <small style={{ color: '#f84960', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.panNumber}
                </small>
              )}
              <small style={{ color: '#848e9c', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                Format: 5 letters + 4 digits + 1 letter
              </small>
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