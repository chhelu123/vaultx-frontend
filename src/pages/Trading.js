import React, { useState, useEffect } from 'react';
import { tradingAPI } from '../services/api';

const Trading = ({ user, setUser, refreshUser }) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1); // 1: amount, 2: payment method, 3: payment details, 4: confirmation
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [transactionId, setTransactionId] = useState('');
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState({ buy: 92, sell: 89 });

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const fetchPrices = async () => {
    try {
      const response = await tradingAPI.getPrice();
      setPrices(response.data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const getCalculatedAmount = () => {
    if (!amount) return 0;
    if (activeTab === 'buy') {
      return (parseFloat(amount) / prices.buy).toFixed(6);
    } else {
      return (parseFloat(amount) * prices.sell).toFixed(2);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
    if (step === 2) {
      setTimer(600); // 10 minutes
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    if (step === 3) {
      setTimer(0);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (activeTab === 'buy') {
        await tradingAPI.buyUSDT(parseFloat(amount));
      } else {
        await tradingAPI.sellUSDT(parseFloat(amount));
      }
      setStep(5); // Success step
      refreshUser();
    } catch (error) {
      alert(error.response?.data?.message || 'Transaction failed');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setStep(1);
    setAmount('');
    setPaymentMethod('');
    setPaymentDetails({});
    setTransactionId('');
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const containerStyle = {
    padding: '32px 24px',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#1e2329',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  const cardStyle = {
    background: '#2b3139',
    border: '1px solid #474d57',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '500px',
    margin: '0 auto'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px',
    border: '1px solid #474d57',
    borderRadius: '8px',
    backgroundColor: '#1e2329',
    color: '#eaecef',
    fontSize: '16px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#fcd535',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease'
  };

  if (step === 5) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
            <h2 style={{ color: '#02c076', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
              Transaction Submitted Successfully
            </h2>
            <p style={{ color: '#b7bdc6', fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>
              {activeTab === 'buy' 
                ? 'You will receive USDT in your wallet within a few minutes after payment verification.'
                : 'Your INR will be processed and sent to your bank account within 24 hours.'
              }
            </p>
            <button
              onClick={resetForm}
              style={buttonStyle}
            >
              Make Another Transaction
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            USDT Trading
          </h1>
          <p style={{ color: '#b7bdc6', fontSize: '16px' }}>
            Buy USDT at ₹{prices.buy} • Sell USDT at ₹{prices.sell}
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', backgroundColor: '#2b3139', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => { setActiveTab('buy'); resetForm(); }}
              style={{
                padding: '12px 32px',
                backgroundColor: activeTab === 'buy' ? '#fcd535' : 'transparent',
                color: activeTab === 'buy' ? '#000' : '#b7bdc6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              Buy USDT
            </button>
            <button
              onClick={() => { setActiveTab('sell'); resetForm(); }}
              style={{
                padding: '12px 32px',
                backgroundColor: activeTab === 'sell' ? '#fcd535' : 'transparent',
                color: activeTab === 'sell' ? '#000' : '#b7bdc6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              Sell USDT
            </button>
          </div>
        </div>

        {/* Trading Form */}
        <div style={cardStyle}>
          {step === 1 && (
            <>
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                {activeTab === 'buy' ? 'Buy USDT with INR' : 'Sell USDT for INR'}
              </h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#eaecef', fontSize: '14px', fontWeight: '500' }}>
                  {activeTab === 'buy' ? 'INR Amount' : 'USDT Amount'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder={activeTab === 'buy' ? 'Enter INR amount' : 'Enter USDT amount'}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                  onBlur={(e) => e.target.style.borderColor = '#474d57'}
                />
              </div>

              {amount && (
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: '#1e2329', 
                  borderRadius: '8px', 
                  marginBottom: '24px',
                  border: '1px solid #474d57'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#b7bdc6', fontSize: '14px' }}>You will receive:</span>
                    <span style={{ color: '#fcd535', fontSize: '18px', fontWeight: '600' }}>
                      {activeTab === 'buy' ? `${getCalculatedAmount()} USDT` : `₹${getCalculatedAmount()}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ color: '#b7bdc6', fontSize: '14px' }}>Rate:</span>
                    <span style={{ color: '#eaecef', fontSize: '14px' }}>
                      ₹{activeTab === 'buy' ? prices.buy : prices.sell} per USDT
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={!amount || parseFloat(amount) <= 0}
                style={{
                  ...buttonStyle,
                  backgroundColor: (!amount || parseFloat(amount) <= 0) ? '#848e9c' : '#fcd535',
                  cursor: (!amount || parseFloat(amount) <= 0) ? 'not-allowed' : 'pointer'
                }}
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                Choose Payment Method
              </h3>
              
              <div style={{ marginBottom: '24px' }}>
                {activeTab === 'buy' ? (
                  <>
                    {['UPI', 'Bank Transfer', 'IMPS'].map((method) => (
                      <div
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        style={{
                          padding: '16px',
                          border: `2px solid ${paymentMethod === method ? '#fcd535' : '#474d57'}`,
                          borderRadius: '8px',
                          marginBottom: '12px',
                          cursor: 'pointer',
                          backgroundColor: paymentMethod === method ? 'rgba(252, 213, 53, 0.1)' : '#1e2329',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ color: '#eaecef', fontSize: '16px', fontWeight: '500' }}>{method}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#eaecef', fontSize: '14px', fontWeight: '500' }}>
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.accountNumber || ''}
                      onChange={(e) => setPaymentDetails({...paymentDetails, accountNumber: e.target.value})}
                      placeholder="Enter account number"
                      style={inputStyle}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleBack}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#474d57',
                    color: '#ffffff',
                    flex: 1
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeTab === 'buy' ? !paymentMethod : !paymentDetails.accountNumber}
                  style={{
                    ...buttonStyle,
                    backgroundColor: (activeTab === 'buy' ? !paymentMethod : !paymentDetails.accountNumber) ? '#848e9c' : '#fcd535',
                    flex: 1
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                Payment Details
              </h3>
              
              {timer > 0 && (
                <div style={{ 
                  padding: '12px 16px', 
                  backgroundColor: '#2d1b1b', 
                  border: '1px solid #f84960', 
                  borderRadius: '8px', 
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  <span style={{ color: '#f84960', fontSize: '16px', fontWeight: '600' }}>
                    Time remaining: {formatTime(timer)}
                  </span>
                </div>
              )}

              {activeTab === 'buy' && (
                <div style={{ 
                  padding: '20px', 
                  backgroundColor: '#1e2329', 
                  borderRadius: '8px', 
                  marginBottom: '24px',
                  border: '1px solid #474d57'
                }}>
                  <h4 style={{ color: '#fcd535', marginBottom: '16px' }}>Payment Information</h4>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#b7bdc6' }}>Amount to Pay: </span>
                    <span style={{ color: '#ffffff', fontWeight: '600' }}>₹{amount}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#b7bdc6' }}>Method: </span>
                    <span style={{ color: '#ffffff', fontWeight: '600' }}>{paymentMethod}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#b7bdc6' }}>UPI ID: </span>
                    <span style={{ color: '#ffffff', fontWeight: '600' }}>vaultx@paytm</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleNext}
                style={buttonStyle}
              >
                I Have Made the Payment
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
                Confirm Transaction
              </h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#eaecef', fontSize: '14px', fontWeight: '500' }}>
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#fcd535'}
                  onBlur={(e) => e.target.style.borderColor = '#474d57'}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleBack}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#474d57',
                    color: '#ffffff',
                    flex: 1
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!transactionId || loading}
                  style={{
                    ...buttonStyle,
                    backgroundColor: (!transactionId || loading) ? '#848e9c' : '#fcd535',
                    flex: 1
                  }}
                >
                  {loading ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trading;