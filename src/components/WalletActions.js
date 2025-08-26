import React, { useState, useEffect } from 'react';
import { walletAPI } from '../services/api';

const WalletActions = ({ user, onUpdate }) => {
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({ amount: '', details: '', method: 'upi' });
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);

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
    await fetchSettings(); // Get latest settings
    try {
      await walletAPI.requestDeposit({
        type,
        amount: parseFloat(formData.amount),
        paymentMethod: type === 'inr' ? (formData.method === 'upi' ? 'UPI' : 'Bank Transfer') : 'USDT Transfer',
        transactionId: formData.details
      });
      alert(`${type.toUpperCase()} deposit request submitted!`);
      setShowModal(null);
      setFormData({ amount: '', details: '', method: 'upi' });
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
        await walletAPI.requestWithdrawal({
          type,
          amount: parseFloat(formData.amount),
          withdrawalDetails: formData.details,
          paymentMethod: formData.method === 'upi' ? 'UPI' : 'Bank Transfer'
        });
        alert('INR withdrawal request submitted!');
      }
      
      setShowModal(null);
      setFormData({ amount: '', details: '', method: 'upi' });
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
          
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
          />

          <input
            type="text"
            placeholder={isDeposit ? 
              (type === 'inr' ? 'Transaction ID/Reference' : 'Transaction Hash') : 
              (type === 'inr' ? (formData.method === 'upi' ? 'Your UPI ID' : 'Account Number') : 'Your USDT Address')
            }
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            style={{ width: '100%', padding: '12px', margin: '10px 0', background: '#2b3139', border: '1px solid #474d57', borderRadius: '4px', color: '#eaecef' }}
          />

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

          {isDeposit && type === 'inr' && (
            <div style={{ backgroundColor: '#2b3139', padding: '15px', borderRadius: '4px', margin: '10px 0', fontSize: '14px', border: '1px solid #474d57' }}>
              {formData.method === 'upi' ? (
                <div>
                  <p style={{ color: '#eaecef', margin: '5px 0' }}><strong style={{ color: '#fcd535' }}>UPI ID:</strong> {settings?.upiId || 'Loading...'}</p>
                  <p style={{ color: '#848e9c', margin: '5px 0' }}>Enter transaction ID after payment</p>
                </div>
              ) : (
                <div>
                  <p style={{ color: '#fcd535', margin: '5px 0', fontWeight: 'bold' }}>Bank Details:</p>
                  <p style={{ color: '#eaecef', margin: '5px 0' }}>Account: {settings?.bankAccount || 'Loading...'}</p>
                  <p style={{ color: '#eaecef', margin: '5px 0' }}>IFSC: {settings?.bankIFSC || 'Loading...'}</p>
                  <p style={{ color: '#eaecef', margin: '5px 0' }}>Name: {settings?.bankName || 'Loading...'}</p>
                  <p style={{ color: '#848e9c', margin: '5px 0' }}>Enter transaction reference after transfer</p>
                </div>
              )}
            </div>
          )}

          {isDeposit && type === 'usdt' && (
            <div style={{ backgroundColor: '#2b3139', padding: '15px', borderRadius: '4px', margin: '10px 0', fontSize: '14px', border: '1px solid #474d57' }}>
              <p style={{ color: '#fcd535', margin: '5px 0', fontWeight: 'bold' }}>Send to:</p>
              <p style={{ wordBreak: 'break-all', color: '#eaecef', margin: '5px 0' }}>{settings?.usdtAddress || 'Loading...'}</p>
              <p style={{ color: '#848e9c', margin: '5px 0' }}>Enter transaction hash after sending</p>
            </div>
          )}

          {!isDeposit && type === 'inr' && (
            <div style={{ backgroundColor: '#2b3139', padding: '15px', borderRadius: '4px', margin: '10px 0', fontSize: '14px', border: '1px solid #474d57' }}>
              <p style={{ color: '#fcd535', margin: '5px 0', fontWeight: 'bold' }}>Withdrawal Method: {formData.method === 'upi' ? 'UPI' : 'Bank Transfer'}</p>
              <p style={{ color: '#848e9c', margin: '5px 0' }}>Enter your {formData.method === 'upi' ? 'UPI ID' : 'bank account details'}</p>
            </div>
          )}

          {!isDeposit && type === 'usdt' && (
            <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '4px', margin: '10px 0', fontSize: '14px' }}>
              <p><strong>Instant Withdrawal</strong></p>
              <p>USDT will be sent immediately to your address</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={() => isDeposit ? handleDeposit(type) : handleWithdraw(type)}
              disabled={loading || !formData.amount || !formData.details}
              className="btn btn-primary"
              style={{ flex: 1, padding: '12px', marginRight: '8px' }}
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
            <button
              onClick={() => setShowModal(null)}
              className="btn"
              style={{ flex: 1, padding: '12px', backgroundColor: '#474d57', color: '#eaecef' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h4>INR Wallet: ₹{user.wallets?.inr?.toFixed(2) || '0.00'}</h4>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button
              onClick={() => { fetchSettings(); setShowModal('deposit-inr'); }}
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
              onClick={() => { fetchSettings(); setShowModal('deposit-usdt'); }}
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