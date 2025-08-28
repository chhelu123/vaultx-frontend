import React, { useState, useEffect } from 'react';
import { walletAPI } from '../services/api';

const WalletActions = ({ user, onUpdate }) => {
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [depositStep, setDepositStep] = useState(1); // 1: Amount, 2: Payment Details, 3: Transaction ID

  useEffect(() => {
    fetchSettings();
  }, []);

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
      alert(`${type.toUpperCase()} deposit request submitted!`);
      setShowModal(null);
      setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
      setDepositStep(1);
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting deposit');
    }
    setLoading(false);
  };

  const handleWithdraw = async (type) => {
    setLoading(true);
    try {
      if (type === 'usdt') {
        const response = await walletAPI.processUSDTWithdrawal({
          amount: parseFloat(formData.amount),
          address: formData.details
        });
        
        if (response.data.success) {
          onUpdate(response.data.wallets);
          alert(`USDT sent successfully! TX: ${response.data.transaction}`);
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
        alert('INR withdrawal request submitted!');
      }
      
      setShowModal(null);
      setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
      setDepositStep(1);
    } catch (error) {
      alert(error.response?.data?.message || 'Error processing withdrawal');
    }
    setLoading(false);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const isDeposit = showModal.includes('deposit');
    const type = showModal.replace('deposit-', '').replace('withdraw-', '');

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ backgroundColor: '#1e2329', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '90%', border: '1px solid #2b3139' }}>
          <h3 style={{ color: '#eaecef', marginBottom: '20px' }}>{isDeposit ? 'Deposit' : 'Withdraw'} {type.toUpperCase()}</h3>
          
          {/* Amount Input - Always First */}
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
          />

          {/* Payment Method Selection for INR */}
          {type === 'inr' && (
            <div style={{ margin: '10px 0' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#eaecef' }}>Payment Method:</label>
              <select
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                style={{ width: '100%', padding: '12px', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', marginBottom: '10px', color: '#eaecef' }}
              >
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
          )}

          {/* INR Deposit Flow */}
          {isDeposit && type === 'inr' && depositStep === 1 && formData.amount && (
            <div>
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
              <button
                onClick={() => setDepositStep(2)}
                style={{ width: '100%', padding: '12px', backgroundColor: '#fcd535', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', margin: '10px 0' }}
              >
                I have made the payment
              </button>
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
                style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={() => handleDeposit(type)}
                  disabled={loading || !formData.details}
                  style={{ flex: 1, padding: '12px', backgroundColor: '#02c076', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {loading ? 'Processing...' : 'Submit Deposit'}
                </button>
                <button
                  onClick={() => setDepositStep(1)}
                  style={{ flex: 1, padding: '12px', backgroundColor: '#474d57', color: '#eaecef', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
                style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
              />
              <button
                onClick={() => handleDeposit(type)}
                disabled={loading || !formData.amount || !formData.details}
                style={{ width: '100%', padding: '12px', backgroundColor: '#02c076', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
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
                  style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
                />
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
                  />
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
                  />
                </div>
              )}
              <button
                onClick={() => handleWithdraw(type)}
                disabled={loading || !formData.amount || (formData.method === 'upi' ? !formData.details : (!formData.bankName || !formData.ifscCode || !formData.accountNumber))}
                style={{ width: '100%', padding: '12px', backgroundColor: '#f84960', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
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
                style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
              />
              <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '4px', margin: '10px 0', fontSize: '14px' }}>
                <p><strong>Instant Withdrawal</strong></p>
                <p>USDT will be sent immediately to your address</p>
              </div>
              <button
                onClick={() => handleWithdraw(type)}
                disabled={loading || !formData.amount || !formData.details}
                style={{ width: '100%', padding: '12px', backgroundColor: '#f84960', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
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
                setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
              }}
              style={{ width: '100%', padding: '12px', backgroundColor: '#474d57', color: '#eaecef', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="wallet-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h4>INR Wallet: ₹{user.wallets?.inr?.toFixed(2) || '0.00'}</h4>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button
              onClick={() => { 
                fetchSettings(); 
                setShowModal('deposit-inr'); 
                setDepositStep(1);
                setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
              }}
              style={{ flex: 1, padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Deposit
            </button>
            <button
              onClick={() => setShowModal('withdraw-inr')}
              disabled={!user.wallets?.inr || user.wallets.inr <= 0}
              style={{ flex: 1, padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Withdraw
            </button>
          </div>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h4>USDT Wallet: {user.wallets?.usdt?.toFixed(6) || '0.000000'}</h4>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button
              onClick={() => { 
                fetchSettings(); 
                setShowModal('deposit-usdt'); 
                setFormData({ amount: '', details: '', method: 'upi', bankName: '', ifscCode: '', accountNumber: '' });
              }}
              style={{ flex: 1, padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Deposit
            </button>
            <button
              onClick={() => setShowModal('withdraw-usdt')}
              disabled={!user.wallets?.usdt || user.wallets.usdt <= 0}
              style={{ flex: 1, padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};

export default WalletActions;