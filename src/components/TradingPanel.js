import React, { useState, useEffect } from 'react';
import { tradingAPI } from '../services/api';

const TradingPanel = ({ user, onUpdate }) => {
  const [prices, setPrices] = useState({ buyPrice: 92, sellPrice: 89 });
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Check if user can trade
  const canTrade = user?.canTrade && user?.kycStatus === 'approved';
  const [showDeposit, setShowDeposit] = useState(false);

  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async () => {
    try {
      const response = await tradingAPI.getPrice();
      setPrices(response.data);
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

  const handleBuy = async () => {
    if (!buyAmount || buyAmount <= 0) return;
    setLoading(true);
    try {
      const response = await tradingAPI.buyUSDT(parseFloat(buyAmount));
      setBuyAmount('');
      // Update user wallets immediately with response data
      if (response.data.wallets) {
        onUpdate(response.data.wallets);
      } else {
        onUpdate();
      }
      alert('USDT purchased successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error buying USDT');
    }
    setLoading(false);
  };

  const handleSell = async () => {
    if (!sellAmount || sellAmount <= 0) return;
    setLoading(true);
    try {
      const response = await tradingAPI.sellUSDT(parseFloat(sellAmount));
      setSellAmount('');
      // Update user wallets immediately with response data
      if (response.data.wallets) {
        onUpdate(response.data.wallets);
      } else {
        onUpdate();
      }
      alert('USDT sold successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error selling USDT');
    }
    setLoading(false);
  };

  if (!canTrade) {
    return (
      <div style={{ backgroundColor: '#f8d7da', padding: '25px', borderRadius: '10px', border: '1px solid #f5c6cb', marginBottom: '20px' }}>
        <h2 style={{ color: '#721c24', marginBottom: '15px' }}>🚫 Trading Restricted</h2>
        <p style={{ color: '#721c24', margin: 0 }}>
          Complete and get your KYC approved to start trading.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>Buy USDT</h3>
          <p>Buy Price: ₹{prices.buyPrice}</p>
          {user.wallets?.inr === 0 && (
            <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px', margin: '10px 0' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>No INR balance. <button onClick={() => setShowDeposit('inr')} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>Add INR</button></p>
            </div>
          )}
          <input
            type="number"
            placeholder="INR Amount"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <p>You'll get: {buyAmount ? (buyAmount / prices.buyPrice).toFixed(6) : '0'} USDT</p>
          <button
            onClick={handleBuy}
            disabled={loading || !buyAmount || user.wallets?.inr < buyAmount}
            style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Processing...' : 'Buy USDT'}
          </button>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>Sell USDT</h3>
          <p>Sell Price: ₹{prices.sellPrice}</p>
          {user.wallets?.usdt === 0 && (
            <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '4px', margin: '10px 0' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>No USDT balance. <button onClick={() => setShowDeposit('usdt')} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>Add USDT</button></p>
            </div>
          )}
          <input
            type="number"
            placeholder="USDT Amount"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <p>You'll get: ₹{sellAmount ? (sellAmount * prices.sellPrice).toFixed(2) : '0'}</p>
          <button
            onClick={handleSell}
            disabled={loading || !sellAmount || user.wallets?.usdt < sellAmount}
            style={{ width: '100%', padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Processing...' : 'Sell USDT'}
          </button>
        </div>
      </div>

      {showDeposit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '90%' }}>
            <h3>Add {showDeposit.toUpperCase()}</h3>
            {showDeposit === 'inr' ? (
              <div>
                <p>Pay to our UPI ID:</p>
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', textAlign: 'center', margin: '10px 0' }}>
                  <strong>chhelu@paytm</strong>
                </div>
                <p style={{ fontSize: '14px', color: '#666' }}>After payment, contact us with transaction ID for verification.</p>
              </div>
            ) : (
              <div>
                <p>Send USDT to our wallet:</p>
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', fontSize: '12px', wordBreak: 'break-all', margin: '10px 0' }}>
                  <strong>TQn9Y2khEsLMWD5uP5sVxnzeLcEwQQhAvh</strong>
                </div>
                <p style={{ fontSize: '14px', color: '#666' }}>Send only USDT (TRC20). Contact us with transaction hash for verification.</p>
              </div>
            )}
            <button onClick={() => setShowDeposit(false)} style={{ width: '100%', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '15px' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingPanel;