import React, { useState, useEffect } from 'react';
import { tradingAPI, walletAPI } from '../services/api';
import useResponsive from '../hooks/useResponsive';
import NotificationModal from './NotificationModal';

const TradingPanel = ({ user, onUpdate }) => {
  const [prices, setPrices] = useState({ buyPrice: 92, sellPrice: 89 });
  const r = useResponsive();
  const [activeTab, setActiveTab] = useState('buy');
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [notification, setNotification] = useState({ isOpen: false, type: '', title: '', message: '' });
  
  // Trading flow states
  const [buyFlow, setBuyFlow] = useState({ step: 1, amount: '', paymentMethod: 'upi', transactionId: '', loading: false });
  const [sellFlow, setSellFlow] = useState({ step: 1, amount: '', paymentMethod: 'upi', bankDetails: '', loading: false });
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [settings, setSettings] = useState(null);
  
  // Check if user can trade
  const canTrade = user?.canTrade && user?.kycStatus === 'approved';

  useEffect(() => {
    fetchPrice();
    fetchTransactions();
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

  const handleBuySubmit = async () => {
    setBuyFlow(prev => ({ ...prev, loading: true }));
    try {
      await walletAPI.requestDeposit({
        type: 'inr',
        amount: parseFloat(buyFlow.amount) * prices.buyPrice,
        paymentMethod: buyFlow.paymentMethod === 'upi' ? 'UPI' : 'Bank Transfer',
        transactionId: buyFlow.transactionId,
        usdtAmount: parseFloat(buyFlow.amount)
      });
      
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Purchase Request Submitted',
        message: `Your request to buy ${buyFlow.amount} USDT has been submitted. You will receive USDT once payment is verified.`
      });
      
      setBuyFlow({ step: 1, amount: '', paymentMethod: 'upi', transactionId: '', loading: false });
      setTimerActive(false);
      setTimer(0);
      fetchTransactions();
    } catch (error) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Submission Failed',
        message: 'Unable to submit purchase request. Please try again.'
      });
    }
    setBuyFlow(prev => ({ ...prev, loading: false }));
  };
  
  const handleSellSubmit = async () => {
    setSellFlow(prev => ({ ...prev, loading: true }));
    try {
      const balance = user.wallets?.usdt || 0;
      if (parseFloat(sellFlow.amount) > balance) {
        setNotification({
          isOpen: true,
          type: 'error',
          title: 'Insufficient Balance',
          message: `You can only sell up to ${balance.toFixed(6)} USDT.`
        });
        setSellFlow(prev => ({ ...prev, loading: false }));
        return;
      }
      
      await walletAPI.requestWithdrawal({
        type: 'inr',
        amount: parseFloat(sellFlow.amount) * prices.sellPrice,
        withdrawalDetails: sellFlow.paymentMethod === 'upi' ? sellFlow.bankDetails : sellFlow.bankDetails,
        paymentMethod: sellFlow.paymentMethod === 'upi' ? 'UPI' : 'Bank Transfer',
        usdtAmount: parseFloat(sellFlow.amount)
      });
      
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Sale Request Submitted',
        message: `Your request to sell ${sellFlow.amount} USDT has been submitted. You will receive INR once approved.`
      });
      
      setSellFlow({ step: 1, amount: '', paymentMethod: 'upi', bankDetails: '', loading: false });
      fetchTransactions();
    } catch (error) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Submission Failed',
        message: 'Unable to submit sale request. Please try again.'
      });
    }
    setSellFlow(prev => ({ ...prev, loading: false }));
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
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '24px', 
              letterSpacing: '-0.3px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Buy USDT</h3>
            
            {/* Step 1: Amount & Payment Method */}
            {buyFlow.step === 1 && (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#eaecef', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>USDT Amount</label>
                  <input
                    type="number"
                    placeholder="Enter USDT amount"
                    value={buyFlow.amount}
                    onChange={(e) => setBuyFlow(prev => ({ ...prev, amount: e.target.value }))}
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
                  {buyFlow.amount && (
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '16px', 
                      backgroundColor: '#0f1419', 
                      borderRadius: '8px',
                      border: '1px solid #02c076'
                    }}>
                      <div style={{ color: '#02c076', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>You will pay</div>
                      <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700' }}>₹{(parseFloat(buyFlow.amount) * prices.buyPrice).toFixed(2)}</div>
                      <div style={{ color: '#b7bdc6', fontSize: '14px', marginTop: '4px' }}>Rate: ₹{prices.buyPrice} per USDT</div>
                    </div>
                  )}
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#eaecef', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>Payment Method</label>
                  <select
                    value={buyFlow.paymentMethod}
                    onChange={(e) => setBuyFlow(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    style={{ 
                      width: '100%', 
                      padding: '16px 20px', 
                      border: '2px solid #474d57', 
                      borderRadius: '12px',
                      backgroundColor: '#1e2329',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      outline: 'none'
                    }}
                  >
                    <option value="upi">UPI</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    if (buyFlow.amount && parseFloat(buyFlow.amount) > 0) {
                      setBuyFlow(prev => ({ ...prev, step: 2 }));
                      setTimer(600);
                      setTimerActive(true);
                    }
                  }}
                  disabled={!buyFlow.amount || parseFloat(buyFlow.amount) <= 0}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    backgroundColor: !buyFlow.amount || parseFloat(buyFlow.amount) <= 0 ? '#848e9c' : '#fcd535', 
                    color: '#000', 
                    border: 'none', 
                    borderRadius: '12px', 
                    cursor: !buyFlow.amount || parseFloat(buyFlow.amount) <= 0 ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  Click to Make Payment
                </button>
              </div>
            )}
            
            {/* Step 2: Payment Details */}
            {buyFlow.step === 2 && (
              <div>
                {/* Timer */}
                <div style={{ 
                  backgroundColor: timer <= 60 ? '#2d1b1b' : '#1e2329', 
                  border: `2px solid ${timer <= 60 ? '#f84960' : '#fcd535'}`, 
                  padding: '16px', 
                  borderRadius: '12px', 
                  margin: '0 0 24px 0', 
                  textAlign: 'center' 
                }}>
                  <div style={{ 
                    color: timer <= 60 ? '#f84960' : '#fcd535', 
                    fontSize: '20px', 
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}>
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </div>
                  <div style={{ color: '#b7bdc6', fontSize: '14px' }}>Time remaining to complete payment</div>
                </div>
                
                {/* Payment Details */}
                <div style={{ 
                  backgroundColor: '#0f1419', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  margin: '0 0 24px 0',
                  border: '1px solid #474d57'
                }}>
                  <div style={{ color: '#fcd535', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Payment Details</div>
                  {buyFlow.paymentMethod === 'upi' ? (
                    <div>
                      <div style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '8px' }}>Pay to UPI ID:</div>
                      <div style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', fontFamily: 'monospace', marginBottom: '16px' }}>{settings?.upiId || 'Loading...'}</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ color: '#b7bdc6', fontSize: '14px', marginBottom: '8px' }}>Bank Transfer Details:</div>
                      <div style={{ color: '#ffffff', fontSize: '14px', marginBottom: '4px' }}>Account: {settings?.bankAccount || 'Loading...'}</div>
                      <div style={{ color: '#ffffff', fontSize: '14px', marginBottom: '4px' }}>IFSC: {settings?.bankIFSC || 'Loading...'}</div>
                      <div style={{ color: '#ffffff', fontSize: '14px', marginBottom: '16px' }}>Name: {settings?.bankName || 'Loading...'}</div>
                    </div>
                  )}
                  <div style={{ color: '#02c076', fontSize: '18px', fontWeight: '700' }}>Amount: ₹{(parseFloat(buyFlow.amount) * prices.buyPrice).toFixed(2)}</div>
                </div>
                
                <button
                  onClick={() => setBuyFlow(prev => ({ ...prev, step: 3 }))}
                  disabled={timer <= 0}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    backgroundColor: timer <= 0 ? '#848e9c' : '#02c076', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '12px', 
                    cursor: timer <= 0 ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  {timer <= 0 ? 'Payment Expired' : 'I have made the payment'}
                </button>
              </div>
            )}
            
            {/* Step 3: Transaction ID */}
            {buyFlow.step === 3 && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#eaecef', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>Transaction ID / Reference Number</label>
                  <input
                    type="text"
                    placeholder="Enter transaction ID"
                    value={buyFlow.transactionId}
                    onChange={(e) => setBuyFlow(prev => ({ ...prev, transactionId: e.target.value }))}
                    style={{ 
                      width: '100%', 
                      padding: '16px 20px', 
                      border: '2px solid #474d57', 
                      borderRadius: '12px',
                      backgroundColor: '#1e2329',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#02c076'}
                    onBlur={(e) => e.target.style.borderColor = '#474d57'}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleBuySubmit}
                    disabled={buyFlow.loading || !buyFlow.transactionId}
                    style={{ 
                      flex: 1, 
                      padding: '16px', 
                      backgroundColor: buyFlow.loading || !buyFlow.transactionId ? '#848e9c' : '#02c076', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      cursor: buyFlow.loading || !buyFlow.transactionId ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    {buyFlow.loading ? 'Submitting...' : 'Submit Purchase'}
                  </button>
                  <button
                    onClick={() => setBuyFlow(prev => ({ ...prev, step: 2 }))}
                    style={{ 
                      flex: 1, 
                      padding: '16px', 
                      backgroundColor: '#474d57', 
                      color: '#ffffff', 
                      border: 'none', 
                      borderRadius: '12px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sell' && (
          <div>
            <h3 style={{ 
              color: '#f84960', 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '24px', 
              letterSpacing: '-0.3px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Sell USDT</h3>
            
            {/* Step 1: Amount & Payment Details */}
            {sellFlow.step === 1 && (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#eaecef', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>USDT Amount to Sell</label>
                  <input
                    type="number"
                    placeholder="Enter USDT amount"
                    value={sellFlow.amount}
                    onChange={(e) => setSellFlow(prev => ({ ...prev, amount: e.target.value }))}
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
                    <span style={{ color: '#b7bdc6', fontSize: '14px' }}>Available: {user.wallets?.usdt?.toFixed(6) || '0.000000'} USDT</span>
                  </div>
                  {sellFlow.amount && (
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '16px', 
                      backgroundColor: '#0f1419', 
                      borderRadius: '8px',
                      border: '1px solid #f84960'
                    }}>
                      <div style={{ color: '#f84960', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>You will receive</div>
                      <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700' }}>₹{(parseFloat(sellFlow.amount) * prices.sellPrice).toFixed(2)}</div>
                      <div style={{ color: '#b7bdc6', fontSize: '14px', marginTop: '4px' }}>Rate: ₹{prices.sellPrice} per USDT</div>
                    </div>
                  )}
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#eaecef', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>Payment Method</label>
                  <select
                    value={sellFlow.paymentMethod}
                    onChange={(e) => setSellFlow(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    style={{ 
                      width: '100%', 
                      padding: '16px 20px', 
                      border: '2px solid #474d57', 
                      borderRadius: '12px',
                      backgroundColor: '#1e2329',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      outline: 'none'
                    }}
                  >
                    <option value="upi">UPI</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    color: '#eaecef', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>{sellFlow.paymentMethod === 'upi' ? 'UPI ID' : 'Bank Details'}</label>
                  <input
                    type="text"
                    placeholder={sellFlow.paymentMethod === 'upi' ? 'Enter your UPI ID' : 'Bank Name, IFSC, Account Number'}
                    value={sellFlow.bankDetails}
                    onChange={(e) => setSellFlow(prev => ({ ...prev, bankDetails: e.target.value }))}
                    style={{ 
                      width: '100%', 
                      padding: '16px 20px', 
                      border: '2px solid #474d57', 
                      borderRadius: '12px',
                      backgroundColor: '#1e2329',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f84960'}
                    onBlur={(e) => e.target.style.borderColor = '#474d57'}
                  />
                </div>
                
                <button
                  onClick={handleSellSubmit}
                  disabled={sellFlow.loading || !sellFlow.amount || !sellFlow.bankDetails || parseFloat(sellFlow.amount) <= 0}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    backgroundColor: sellFlow.loading || !sellFlow.amount || !sellFlow.bankDetails || parseFloat(sellFlow.amount) <= 0 ? '#848e9c' : '#f84960', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '12px', 
                    cursor: sellFlow.loading || !sellFlow.amount || !sellFlow.bankDetails || parseFloat(sellFlow.amount) <= 0 ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  {sellFlow.loading ? 'Submitting...' : 'Sell USDT'}
                </button>
              </div>
            )}
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

export default TradingPanel;