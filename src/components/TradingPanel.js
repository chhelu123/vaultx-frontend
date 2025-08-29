import React, { useState, useEffect } from 'react';
import { tradingAPI } from '../services/api';
import useResponsive from '../hooks/useResponsive';

const TradingPanel = ({ user, onUpdate }) => {
  const [prices, setPrices] = useState({ buyPrice: 92, sellPrice: 89 });
  const r = useResponsive();
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  
  // Check if user can trade
  const canTrade = user?.canTrade && user?.kycStatus === 'approved';
  const [showDeposit, setShowDeposit] = useState(false);

  useEffect(() => {
    fetchPrice();
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setTransactionsLoading(true);
    try {
      const response = await tradingAPI.getTransactions(1, 10);
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
    setTransactionsLoading(false);
  };

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
      fetchTransactions();
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
      fetchTransactions();
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
      {/* Toggle Tabs */}
      <div style={{ 
        display: 'flex', 
        backgroundColor: '#2b3139', 
        borderRadius: '12px', 
        padding: '4px', 
        marginBottom: '24px',
        border: '1px solid #474d57'
      }}>
        <button
          onClick={() => setActiveTab('buy')}
          style={{
            flex: 1,
            padding: '14px 20px',
            backgroundColor: activeTab === 'buy' ? '#02c076' : 'transparent',
            color: activeTab === 'buy' ? '#ffffff' : '#b7bdc6',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          Buy USDT
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          style={{
            flex: 1,
            padding: '14px 20px',
            backgroundColor: activeTab === 'sell' ? '#f84960' : 'transparent',
            color: activeTab === 'sell' ? '#ffffff' : '#b7bdc6',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          Sell USDT
        </button>
      </div>

      {/* Trading Panel */}
      <div style={{ 
        backgroundColor: '#2b3139', 
        padding: r.cardPadding, 
        borderRadius: '12px', 
        border: '1px solid #474d57'
      }}>
        {activeTab === 'buy' && (
          <div>
            <h3 style={{ 
              color: '#02c076', 
              fontSize: r.h3Size, 
              fontWeight: '600', 
              marginBottom: '20px', 
              letterSpacing: '-0.2px' 
            }}>Buy USDT</h3>

          {user.wallets?.inr === 0 && (
            <div style={{ backgroundColor: '#fcd535', padding: '12px', borderRadius: '8px', margin: '16px 0' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#000', fontWeight: '500' }}>No INR balance. <button onClick={() => setShowDeposit('inr')} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Add INR</button></p>
            </div>
          )}
          
          {/* Spend Amount */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '8px',
              letterSpacing: '-0.1px'
            }}>Spend</label>
            <input
              type="number"
              placeholder="0.00"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '16px 20px', 
                border: '2px solid #474d57', 
                borderRadius: '12px',
                backgroundColor: '#1e2329',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#02c076'}
              onBlur={(e) => e.target.style.borderColor = '#474d57'}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '8px' 
            }}>
              <span style={{ color: '#b7bdc6', fontSize: '14px' }}>INR</span>
              <span style={{ color: '#b7bdc6', fontSize: '12px' }}>Balance: ₹{user.wallets?.inr?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
          
          {/* Receive Amount */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '8px',
              letterSpacing: '-0.1px'
            }}>Receive</label>
            <div style={{ 
              width: '100%', 
              padding: '16px 20px', 
              border: '2px solid #474d57', 
              borderRadius: '12px',
              backgroundColor: '#0f1419',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: '#02c076'
            }}>
              {buyAmount ? (buyAmount / prices.buyPrice).toFixed(6) : '0.000000'}
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '8px' 
            }}>
              <span style={{ color: '#b7bdc6', fontSize: '14px' }}>USDT</span>

            </div>
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
        )}

        {activeTab === 'sell' && (
          <div>
            <h3 style={{ 
              color: '#f84960', 
              fontSize: r.h3Size, 
              fontWeight: '600', 
              marginBottom: '20px', 
              letterSpacing: '-0.2px' 
            }}>Sell USDT</h3>

          {user.wallets?.usdt === 0 && (
            <div style={{ backgroundColor: '#fcd535', padding: '12px', borderRadius: '8px', margin: '16px 0' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#000', fontWeight: '500' }}>No USDT balance. <button onClick={() => setShowDeposit('usdt')} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}>Add USDT</button></p>
            </div>
          )}
          
          {/* Spend Amount */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '8px',
              letterSpacing: '-0.1px'
            }}>Spend</label>
            <input
              type="number"
              placeholder="0.000000"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '16px 20px', 
                border: '2px solid #474d57', 
                borderRadius: '12px',
                backgroundColor: '#1e2329',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#f84960'}
              onBlur={(e) => e.target.style.borderColor = '#474d57'}
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '8px' 
            }}>
              <span style={{ color: '#b7bdc6', fontSize: '14px' }}>USDT</span>
              <span style={{ color: '#b7bdc6', fontSize: '12px' }}>Balance: {user.wallets?.usdt?.toFixed(6) || '0.000000'}</span>
            </div>
          </div>
          
          {/* Receive Amount */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              color: '#eaecef', 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '8px',
              letterSpacing: '-0.1px'
            }}>Receive</label>
            <div style={{ 
              width: '100%', 
              padding: '16px 20px', 
              border: '2px solid #474d57', 
              borderRadius: '12px',
              backgroundColor: '#0f1419',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: '#f84960'
            }}>
              ₹{sellAmount ? (sellAmount * prices.sellPrice).toFixed(2) : '0.00'}
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '8px' 
            }}>
              <span style={{ color: '#b7bdc6', fontSize: '14px' }}>INR</span>

            </div>
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
        )}
      </div>

      {/* Transaction History */}
      <div style={{ 
        backgroundColor: '#2b3139', 
        padding: r.cardPadding, 
        borderRadius: '12px', 
        border: '1px solid #474d57',
        marginTop: '24px'
      }}>
        <h3 style={{ 
          color: '#ffffff', 
          fontSize: r.h3Size, 
          fontWeight: '600', 
          marginBottom: '20px', 
          letterSpacing: '-0.2px' 
        }}>Recent Transactions</h3>
        
        {transactionsLoading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#b7bdc6' }}>Loading...</div>
        ) : transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#b7bdc6' }}>No transactions yet</div>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {transactions.map((tx, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < transactions.length - 1 ? '1px solid #474d57' : 'none'
              }}>
                <div>
                  <div style={{ 
                    color: tx.type === 'buy' ? '#02c076' : '#f84960', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    {tx.type === 'buy' ? 'Bought' : 'Sold'} {(tx.usdtAmount || tx.amount)?.toFixed(6)} USDT
                  </div>
                  <div style={{ color: '#b7bdc6', fontSize: '12px' }}>
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>
                    {(tx.usdtAmount || tx.amount)?.toFixed(6)} USDT
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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