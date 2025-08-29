import React, { useState, useEffect } from 'react';
import { tradingAPI } from '../services/api';
import useResponsive from '../hooks/useResponsive';

const TradingPanel = ({ user, onUpdate }) => {
  const [prices, setPrices] = useState({ buyPrice: 92, sellPrice: 89 });
  const r = useResponsive();
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
      <div style={{ 
        backgroundColor: '#2b3139', 
        padding: '32px', 
        borderRadius: '12px', 
        border: '1px solid #f84960',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#f84960', fontSize: '24px', fontWeight: '600', marginBottom: '16px', letterSpacing: '-0.3px' }}>Trading Restricted</h2>
        <p style={{ color: '#b7bdc6', fontSize: '16px', margin: 0, lineHeight: '1.5' }}>
          Complete and get your KYC approved to start trading.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: r.gridCols, 
        gap: r.gap, 
        marginBottom: r.marginBottom 
      }}>
        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: r.cardPadding, 
          borderRadius: '12px', 
          border: '1px solid #474d57'
        }}>
          <h3 style={{ 
            color: '#02c076', 
            fontSize: r.h3Size, 
            fontWeight: '600', 
            marginBottom: '20px', 
            letterSpacing: '-0.2px' 
          }}>Buy USDT</h3>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ color: '#b7bdc6', fontSize: '14px' }}>Buy Price: </span>
            <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600' }}>₹{prices.buyPrice}</span>
          </div>
          {user.wallets?.inr === 0 && (
            <div style={{ backgroundColor: '#fcd535', padding: '12px', borderRadius: '8px', margin: '16px 0' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#000', fontWeight: '500' }}>No INR balance. <button onClick={() => setShowDeposit('inr')} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Add INR</button></p>
            </div>
          )}
          <input
            type="number"
            placeholder="Enter INR amount"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px 16px', 
              margin: '16px 0', 
              border: '1px solid #474d57', 
              borderRadius: '8px',
              backgroundColor: '#1e2329',
              color: '#ffffff',
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          />
          <div style={{ marginBottom: '20px' }}>
            <span style={{ color: '#b7bdc6', fontSize: '14px' }}>You'll receive: </span>
            <span style={{ color: '#02c076', fontSize: '16px', fontWeight: '600' }}>{buyAmount ? (buyAmount / prices.buyPrice).toFixed(6) : '0.000000'} USDT</span>
          </div>
          <button
            onClick={handleBuy}
            disabled={loading || !buyAmount || user.wallets?.inr < buyAmount}
            style={{ 
              width: '100%', 
              padding: '14px', 
              backgroundColor: loading || !buyAmount || user.wallets?.inr < buyAmount ? '#848e9c' : '#02c076', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: loading || !buyAmount || user.wallets?.inr < buyAmount ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            {loading ? 'Processing...' : 'Buy USDT'}
          </button>
        </div>

        <div style={{ 
          backgroundColor: '#2b3139', 
          padding: r.cardPadding, 
          borderRadius: '12px', 
          border: '1px solid #474d57'
        }}>
          <h3 style={{ 
            color: '#f84960', 
            fontSize: r.h3Size, 
            fontWeight: '600', 
            marginBottom: '20px', 
            letterSpacing: '-0.2px' 
          }}>Sell USDT</h3>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ color: '#b7bdc6', fontSize: '14px' }}>Sell Price: </span>
            <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600' }}>₹{prices.sellPrice}</span>
          </div>
          {user.wallets?.usdt === 0 && (
            <div style={{ backgroundColor: '#fcd535', padding: '12px', borderRadius: '8px', margin: '16px 0' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#000', fontWeight: '500' }}>No USDT balance. <button onClick={() => setShowDeposit('usdt')} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Add USDT</button></p>
            </div>
          )}
          <input
            type="number"
            placeholder="Enter USDT amount"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px 16px', 
              margin: '16px 0', 
              border: '1px solid #474d57', 
              borderRadius: '8px',
              backgroundColor: '#1e2329',
              color: '#ffffff',
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          />
          <div style={{ marginBottom: '20px' }}>
            <span style={{ color: '#b7bdc6', fontSize: '14px' }}>You'll receive: </span>
            <span style={{ color: '#f84960', fontSize: '16px', fontWeight: '600' }}>₹{sellAmount ? (sellAmount * prices.sellPrice).toFixed(2) : '0.00'}</span>
          </div>
          <button
            onClick={handleSell}
            disabled={loading || !sellAmount || user.wallets?.usdt < sellAmount}
            style={{ 
              width: '100%', 
              padding: '14px', 
              backgroundColor: loading || !sellAmount || user.wallets?.usdt < sellAmount ? '#848e9c' : '#f84960', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: loading || !sellAmount || user.wallets?.usdt < sellAmount ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            {loading ? 'Processing...' : 'Sell USDT'}
          </button>
        </div>
      </div>

      {showDeposit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ 
            backgroundColor: '#2b3139', 
            padding: '32px', 
            borderRadius: '12px', 
            maxWidth: '450px', 
            width: '90%',
            border: '1px solid #474d57'
          }}>
            <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '600', marginBottom: '20px', letterSpacing: '-0.3px' }}>Add {showDeposit.toUpperCase()}</h3>
            {showDeposit === 'inr' ? (
              <div>
                <p style={{ color: '#b7bdc6', fontSize: '16px', marginBottom: '16px' }}>Pay to our UPI ID:</p>
                <div style={{ 
                  backgroundColor: '#1e2329', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  textAlign: 'center', 
                  margin: '16px 0',
                  border: '1px solid #474d57'
                }}>
                  <strong style={{ color: '#fcd535', fontSize: '18px', fontFamily: 'monospace' }}>chhelu@paytm</strong>
                </div>
                <p style={{ fontSize: '14px', color: '#848e9c', lineHeight: '1.5' }}>After payment, contact us with transaction ID for verification.</p>
              </div>
            ) : (
              <div>
                <p style={{ color: '#b7bdc6', fontSize: '16px', marginBottom: '16px' }}>Send USDT to our wallet:</p>
                <div style={{ 
                  backgroundColor: '#1e2329', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  fontSize: '14px', 
                  wordBreak: 'break-all', 
                  margin: '16px 0',
                  border: '1px solid #474d57',
                  fontFamily: 'monospace'
                }}>
                  <strong style={{ color: '#fcd535' }}>TQn9Y2khEsLMWD5uP5sVxnzeLcEwQQhAvh</strong>
                </div>
                <p style={{ fontSize: '14px', color: '#848e9c', lineHeight: '1.5' }}>Send only USDT (TRC20). Contact us with transaction hash for verification.</p>
              </div>
            )}
            <button 
              onClick={() => setShowDeposit(false)} 
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: '#848e9c', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                marginTop: '24px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingPanel;