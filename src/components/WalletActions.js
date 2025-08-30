import React, { useState, useEffect } from 'react';
import { walletAPI } from '../services/api';
import useResponsive from '../hooks/useResponsive';
import NotificationModal from './NotificationModal';

const WalletActions = ({ user, onUpdate }) => {
  const [showModal, setShowModal] = useState(null);
  const r = useResponsive();
  const [formData, setFormData] = useState({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [depositStep, setDepositStep] = useState(1); // 1: Amount, 2: Payment Details, 3: Transaction ID
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [notification, setNotification] = useState({ isOpen: false, type: '', title: '', message: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, timer]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleDeposit = async (type) => {
    setLoading(true);
    try {
      await walletAPI.requestDeposit({
        type,
        amount: parseFloat(formData.amount),
        paymentMethod: type === 'inr' ? (formData.method === 'upi' ? 'UPI' : 'Bank Transfer') : 'USDT Transfer',
        transactionId: formData.details
      });
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Deposit Submitted',
        message: `Your ${type.toUpperCase()} deposit request has been submitted successfully and is being processed.`
      });
      setShowModal(null);
      setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
      setDepositStep(1);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Deposit Failed',
        message: error.response?.data?.message || 'Unable to submit deposit request. Please try again.'
      });
    }
    setLoading(false);
  };

  const handleWithdraw = async (type) => {
    // Check balance before processing
    const balance = type === 'usdt' ? user.wallets?.usdt : user.wallets?.inr;
    const amount = parseFloat(formData.amount);
    
    if (!balance || balance <= 0) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Insufficient Balance',
        message: `You don't have enough ${type.toUpperCase()} balance to withdraw.`
      });
      return;
    }
    
    if (amount > balance) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Insufficient Balance',
        message: `You can only withdraw up to ${balance.toFixed(type === 'usdt' ? 6 : 2)} ${type.toUpperCase()}.`
      });
      return;
    }
    
    setLoading(true);
    try {
      if (type === 'usdt') {
        const response = await walletAPI.processUSDTWithdrawal({
          amount: parseFloat(formData.amount),
          address: formData.details
        });
        
        if (response.data.success) {
          onUpdate(response.data.wallets);
          setNotification({
            isOpen: true,
            type: 'success',
            title: 'USDT Sent Successfully',
            message: `USDT has been sent to your address. Transaction ID: ${response.data.transaction}`
          });
        }
      } else {
        const withdrawalDetails = formData.method === 'upi' 
          ? formData.details 
          : `Bank: ${formData.bankName}, IFSC: ${formData.ifscCode}, Account: ${formData.accountNumber}`;
        
        await walletAPI.requestWithdrawal({
          type,
          amount: parseFloat(formData.amount),
          withdrawalDetails,
          paymentMethod: formData.method === 'upi' ? 'UPI' : 'Bank Transfer'
        });
        setNotification({
          isOpen: true,
          type: 'success',
          title: 'Withdrawal Submitted',
          message: 'Your INR withdrawal request has been submitted and will be processed within 24 hours.'
        });
      }
      
      setShowModal(null);
      setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
      setDepositStep(1);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Withdrawal Failed',
        message: error.response?.data?.message || 'Unable to process withdrawal request. Please try again.'
      });
    }
    setLoading(false);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const isDeposit = showModal.includes('deposit');
    const type = showModal.replace('deposit-', '').replace('withdraw-', '');

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: r.modalPadding, 
          borderRadius: '12px', 
          maxWidth: r.modalWidth, 
          width: '90%', 
          border: '1px solid #474d57' 
        }}>
          <h3 style={{ 
            color: '#ffffff', 
            fontSize: r.h2Size, 
            fontWeight: '600', 
            marginBottom: '24px', 
            letterSpacing: '-0.3px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>{isDeposit ? 'Deposit' : 'Withdraw'} {type.toUpperCase()}</h3>
          
          {/* Amount Input - Always First */}
          <input
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '14px 16px', 
              margin: '16px 0', 
              background: '#1e2329', 
              border: '1px solid #474d57', 
              borderRadius: '8px', 
              color: '#ffffff',
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          />

          {/* Payment Method Selection for INR */}
          {type === 'inr' && (
            <div style={{ margin: '10px 0' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '600', 
                color: '#ffffff',
                fontSize: '15px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>Payment Method</label>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  background: '#1e2329', 
                  border: '1px solid #474d57', 
                  borderRadius: '8px', 
                  marginBottom: '16px', 
                  color: '#ffffff',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
          )}

          {/* INR Deposit Flow */}
          {isDeposit && type === 'inr' && depositStep === 1 && formData.amount && (
            <div>
              {/* Timer Display */}
              {timerActive && (
                <div style={{ 
                  backgroundColor: timer <= 60 ? '#2d1b1b' : '#1e2329', 
                  border: `1px solid ${timer <= 60 ? '#f84960' : '#474d57'}`, 
                  padding: '12px', 
                  borderRadius: '8px', 
                  margin: '16px 0', 
                  textAlign: 'center' 
                }}>
                  <p style={{ 
                    color: timer <= 60 ? '#f84960' : '#fcd535', 
                    margin: 0, 
                    fontSize: '18px', 
                    fontWeight: '600' 
                  }}>
                    Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </p>
                  {timer <= 60 && (
                    <p style={{ color: '#f84960', margin: '4px 0 0 0', fontSize: '12px' }}>
                      Payment window will expire soon!
                    </p>
                  )}
                </div>
              )}
              
              {/* Payment Details - Only show after timer starts */}
              {timerActive && (
                <div style={{ backgroundColor: '#2b3139', padding: '15px', borderRadius: '4px', margin: '10px 0', fontSize: '14px', border: '1px solid #474d57' }}>
                  {formData.method === 'upi' ? (
                    <div>
                      <p style={{ color: '#fcd535', margin: '5px 0', fontWeight: 'bold' }}>Pay to UPI ID:</p>
                      <p style={{ color: '#eaecef', margin: '5px 0', fontSize: '16px' }}>{settings?.upiId || 'Loading...'}</p>
                      <p style={{ color: '#02c076', margin: '5px 0', fontWeight: 'bold' }}>Amount: ₹{formData.amount}</p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ color: '#fcd535', margin: '5px 0', fontWeight: 'bold' }}>Bank Transfer Details:</p>
                      <p style={{ color: '#eaecef', margin: '5px 0' }}>Account: {settings?.bankAccount || 'Loading...'}</p>
                      <p style={{ color: '#eaecef', margin: '5px 0' }}>IFSC: {settings?.bankIFSC || 'Loading...'}</p>
                      <p style={{ color: '#eaecef', margin: '5px 0' }}>Name: {settings?.bankName || 'Loading...'}</p>
                      <p style={{ color: '#02c076', margin: '5px 0', fontWeight: 'bold' }}>Amount: ₹{formData.amount}</p>
                    </div>
                  )}
                </div>
              )}
              
              {!timerActive ? (
                <button
                  onClick={() => {
                    setTimerActive(true);
                    setTimer(600);
                  }}
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    backgroundColor: '#fcd535', 
                    color: '#000', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: '600', 
                    margin: '16px 0',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    letterSpacing: '-0.1px'
                  }}
                >
                  Click to Make Payment
                </button>
              ) : (
                <button
                  onClick={() => setDepositStep(2)}
                  disabled={timer <= 0}
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    backgroundColor: timer <= 0 ? '#848e9c' : '#02c076', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: timer <= 0 ? 'not-allowed' : 'pointer', 
                    fontWeight: '600', 
                    margin: '16px 0',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    letterSpacing: '-0.1px'
                  }}
                >
                  {timer <= 0 ? 'Payment Expired' : 'I have made the payment'}
                </button>
              )}
            </div>
          )}

          {/* Transaction ID Input */}
          {isDeposit && type === 'inr' && depositStep === 2 && (
            <div>
              <input
                type="text"
                placeholder="Enter Transaction ID/Reference Number"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  margin: '16px 0', 
                  background: '#1e2329', 
                  border: '1px solid #474d57', 
                  borderRadius: '8px', 
                  color: '#ffffff',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={() => handleDeposit(type)}
                  disabled={loading || !formData.details}
                  style={{ 
                    flex: 1, 
                    padding: '14px', 
                    backgroundColor: loading || !formData.details ? '#848e9c' : '#02c076', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: loading || !formData.details ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    letterSpacing: '-0.1px'
                  }}
                >
                  {loading ? 'Processing...' : 'Submit Deposit'}
                </button>
                <button
                  onClick={() => setDepositStep(1)}
                  style={{ 
                    flex: 1, 
                    padding: '14px', 
                    backgroundColor: '#474d57', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    letterSpacing: '-0.1px'
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {/* USDT Deposit */}
          {isDeposit && type === 'usdt' && (
            <div>
              <div style={{ backgroundColor: '#2b3139', padding: '15px', borderRadius: '4px', margin: '10px 0', fontSize: '14px', border: '1px solid #474d57' }}>
                <p style={{ color: '#fcd535', margin: '5px 0', fontWeight: 'bold' }}>Send USDT to:</p>
                <p style={{ wordBreak: 'break-all', color: '#eaecef', margin: '5px 0' }}>{settings?.usdtAddress || 'Loading...'}</p>
                <p style={{ color: '#02c076', margin: '5px 0', fontWeight: 'bold' }}>Amount: {formData.amount} USDT</p>
              </div>
              <input
                type="text"
                placeholder="Enter Transaction Hash"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  margin: '16px 0', 
                  background: '#1e2329', 
                  border: '1px solid #474d57', 
                  borderRadius: '8px', 
                  color: '#ffffff',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              />
              <button
                onClick={() => handleDeposit(type)}
                disabled={loading || !formData.amount || !formData.details}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: loading || !formData.amount || !formData.details ? '#848e9c' : '#02c076', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: loading || !formData.amount || !formData.details ? 'not-allowed' : 'pointer', 
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '-0.1px'
                }}
              >
                {loading ? 'Processing...' : 'Submit Deposit'}
              </button>
            </div>
          )}

          {/* INR Withdrawal */}
          {!isDeposit && type === 'inr' && (
            <div>
              {formData.method === 'upi' ? (
                <input
                  type="text"
                  placeholder="Your UPI ID"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px', 
                    margin: '16px 0', 
                    background: '#1e2329', 
                    border: '1px solid #474d57', 
                    borderRadius: '8px', 
                    color: '#ffffff',
                    fontSize: '16px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                />
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '14px 16px', 
                      margin: '16px 0', 
                      background: '#1e2329', 
                      border: '1px solid #474d57', 
                      borderRadius: '8px', 
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '14px 16px', 
                      margin: '16px 0', 
                      background: '#1e2329', 
                      border: '1px solid #474d57', 
                      borderRadius: '8px', 
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    style={{ 
                      width: '100%', 
                      padding: '14px 16px', 
                      margin: '16px 0', 
                      background: '#1e2329', 
                      border: '1px solid #474d57', 
                      borderRadius: '8px', 
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  />
                </div>
              )}
              <button
                onClick={() => handleWithdraw(type)}
                disabled={loading || !formData.amount || (formData.method === 'upi' ? !formData.details : (!formData.bankName || !formData.ifscCode || !formData.accountNumber))}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: loading || !formData.amount || (formData.method === 'upi' ? !formData.details : (!formData.bankName || !formData.ifscCode || !formData.accountNumber)) ? '#848e9c' : '#f84960', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: loading || !formData.amount || (formData.method === 'upi' ? !formData.details : (!formData.bankName || !formData.ifscCode || !formData.accountNumber)) ? 'not-allowed' : 'pointer', 
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '-0.1px'
                }}
              >
                {loading ? 'Processing...' : 'Submit Withdrawal'}
              </button>
            </div>
          )}

          {/* USDT Withdrawal */}
          {!isDeposit && type === 'usdt' && (
            <div>
              <input
                type="text"
                placeholder="Your USDT Address"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  margin: '16px 0', 
                  background: '#1e2329', 
                  border: '1px solid #474d57', 
                  borderRadius: '8px', 
                  color: '#ffffff',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              />
              <div style={{ backgroundColor: '#2b3139', padding: '15px', borderRadius: '8px', margin: '10px 0', fontSize: '14px', border: '1px solid #474d57' }}>
                <p style={{ color: '#fcd535', margin: '5px 0', fontWeight: 'bold' }}>Instant Withdrawal</p>
                <p style={{ color: '#eaecef', margin: '5px 0' }}>USDT will be sent immediately to your address</p>
              </div>
              <button
                onClick={() => handleWithdraw(type)}
                disabled={loading || !formData.amount || !formData.details}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: loading || !formData.amount || !formData.details ? '#848e9c' : '#f84960', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: loading || !formData.amount || !formData.details ? 'not-allowed' : 'pointer', 
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '-0.1px'
                }}
              >
                {loading ? 'Processing...' : 'Submit Withdrawal'}
              </button>
            </div>
          )}

          {/* Cancel Button */}
          {!(isDeposit && type === 'inr' && depositStep === 2) && (
            <button
              onClick={() => {
                setShowModal(null);
                setDepositStep(1);
                setTimerActive(false);
                setTimer(600);
                setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
              }}
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: '#474d57', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                marginTop: '16px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.1px'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: r.gridCols, 
        gap: r.gap 
      }}>
        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: r.cardPadding, 
          borderRadius: '12px', 
          border: '1px solid #474d57'
        }}>
          <h4 style={{ 
            color: '#ffffff', 
            fontSize: r.h3Size, 
            fontWeight: '600', 
            marginBottom: '20px', 
            letterSpacing: '-0.2px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>INR Wallet</h4>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ 
              color: '#ffffff', 
              fontSize: r.balanceSize, 
              fontWeight: '700', 
              letterSpacing: '-0.3px' 
            }}>₹{user.wallets?.inr?.toFixed(2) || '0.00'}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => { 
                fetchSettings(); 
                setShowModal('deposit-inr'); 
                setDepositStep(1);
                setTimerActive(false);
                setTimer(600);
                setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
              }}
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                backgroundColor: '#02c076', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.1px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#029f6b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#02c076'}
            >
              Deposit
            </button>
            <button
              onClick={() => setShowModal('withdraw-inr')}
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                backgroundColor: '#f84960', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.1px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e73c4e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f84960'}
            >
              Withdraw
            </button>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: r.cardPadding, 
          borderRadius: '12px', 
          border: '1px solid #474d57'
        }}>
          <h4 style={{ 
            color: '#ffffff', 
            fontSize: r.h3Size, 
            fontWeight: '600', 
            marginBottom: '20px', 
            letterSpacing: '-0.2px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>USDT Wallet</h4>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ 
              color: '#ffffff', 
              fontSize: r.balanceSize, 
              fontWeight: '700', 
              letterSpacing: '-0.3px' 
            }}>{user.wallets?.usdt?.toFixed(6) || '0.000000'}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => { 
                fetchSettings(); 
                setShowModal('deposit-usdt'); 
                setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
              }}
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                backgroundColor: '#02c076', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.1px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#029f6b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#02c076'}
            >
              Deposit
            </button>
            <button
              onClick={() => setShowModal('withdraw-usdt')}
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                backgroundColor: '#f84960', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.1px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e73c4e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f84960'}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {renderModal()}
      
      <NotificationModal
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ isOpen: false, type: '', title: '', message: '' })}
      />
    </div>
  );
};

export default WalletActions;