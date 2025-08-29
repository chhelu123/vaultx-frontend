import React, { useState, useEffect } from 'react';
import { walletAPI } from '../services/api';

const History = ({ user }) => {
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [activeTab, setActiveTab] = useState('deposits');
  const [depositsPagination, setDepositsPagination] = useState({});
  const [withdrawalsPagination, setWithdrawalsPagination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory(1);
  }, []);

  const fetchHistory = async (page = 1) => {
    setLoading(true);
    try {
      const [depositsRes, withdrawalsRes] = await Promise.all([
        walletAPI.getDeposits(page),
        walletAPI.getWithdrawals(page)
      ]);
      
      if (page === 1) {
        setDeposits(depositsRes.data.deposits || depositsRes.data);
        setWithdrawals(withdrawalsRes.data.withdrawals || withdrawalsRes.data);
      } else {
        setDeposits(prev => [...prev, ...(depositsRes.data.deposits || depositsRes.data)]);
        setWithdrawals(prev => [...prev, ...(withdrawalsRes.data.withdrawals || withdrawalsRes.data)]);
      }
      
      setDepositsPagination(depositsRes.data.pagination || {});
      setWithdrawalsPagination(withdrawalsRes.data.pagination || {});
    } catch (error) {
      console.error('Error fetching history:', error);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#02c076';
      case 'pending': return '#fcd535';
      case 'rejected': return '#f84960';
      default: return '#848e9c';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ 
      padding: window.innerWidth <= 768 ? '20px 16px' : '32px 24px', 
      minHeight: 'calc(100vh - 64px)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: window.innerWidth <= 768 ? '28px' : '32px', 
            fontWeight: '700', 
            marginBottom: '8px', 
            letterSpacing: '-0.5px' 
          }}>Transaction History</h1>
          <p style={{ 
            color: '#b7bdc6', 
            fontSize: window.innerWidth <= 768 ? '14px' : '16px', 
            margin: 0 
          }}>View your complete deposit and withdrawal history</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: '32px', borderBottom: '1px solid #474d57' }}>
          <button
            onClick={() => setActiveTab('deposits')}
            style={{
              padding: '16px 24px',
              background: 'none',
              border: 'none',
              color: activeTab === 'deposits' ? '#fcd535' : '#b7bdc6',
              borderBottom: activeTab === 'deposits' ? '2px solid #fcd535' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            Deposits ({deposits.length})
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            style={{
              padding: '16px 24px',
              background: 'none',
              border: 'none',
              color: activeTab === 'withdrawals' ? '#fcd535' : '#b7bdc6',
              borderBottom: activeTab === 'withdrawals' ? '2px solid #fcd535' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            Withdrawals ({withdrawals.length})
          </button>
        </div>

        {/* Deposits Tab */}
        {activeTab === 'deposits' && (
          <div style={{ 
            backgroundColor: '#2b3139', 
            padding: window.innerWidth <= 768 ? '20px' : '32px', 
            borderRadius: '12px', 
            border: '1px solid #474d57'
          }}>
            <h2 style={{ 
              color: '#ffffff', 
              fontSize: window.innerWidth <= 768 ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '24px', 
              letterSpacing: '-0.3px' 
            }}>Deposit History</h2>
            {deposits.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', color: '#b7bdc6' }}>
                <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No deposits found</p>
                <p style={{ fontSize: '16px', margin: 0 }}>Your deposit history will appear here</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #474d57' }}>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>DATE</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>TYPE</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>AMOUNT</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>METHOD</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>STATUS</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>TRANSACTION ID</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>NOTE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.map((deposit) => (
                      <tr key={deposit._id} style={{ borderBottom: '1px solid #474d57' }}>
                        <td data-label="Date" style={{ color: '#ffffff', padding: '16px', fontSize: '15px' }}>
                          {formatDate(deposit.createdAt)}
                        </td>
                        <td data-label="Type" style={{ color: '#ffffff', padding: '16px', fontSize: '15px', fontWeight: '500' }}>
                          {deposit.type.toUpperCase()}
                        </td>
                        <td data-label="Amount" style={{ color: '#ffffff', padding: '16px', fontSize: '15px', fontWeight: '600' }}>
                          {deposit.type === 'inr' ? '₹' : ''}{deposit.amount}
                        </td>
                        <td data-label="Method" style={{ color: '#b7bdc6', padding: '16px', fontSize: '15px' }}>
                          {deposit.paymentMethod || 'N/A'}
                        </td>
                        <td data-label="Status" style={{ padding: '16px' }}>
                          <span style={{
                            color: getStatusColor(deposit.status),
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: getStatusColor(deposit.status) + '20',
                            fontSize: '12px',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                          }}>
                            {deposit.status.toUpperCase()}
                          </span>
                        </td>
                        <td data-label="Transaction ID" style={{ color: '#848e9c', padding: '16px', fontSize: '13px', fontFamily: 'monospace' }}>
                          {deposit.transactionId || 'N/A'}
                        </td>
                        <td data-label="Note" style={{ color: '#848e9c', padding: '16px', fontSize: '13px' }}>
                          {(deposit.adminNote || deposit.adminNotes || deposit.note) ? (
                            <div style={{ 
                              backgroundColor: deposit.status === 'rejected' ? '#f84960' : '#02c076',
                              color: 'white',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              maxWidth: '200px',
                              wordWrap: 'break-word',
                              fontWeight: '500'
                            }}>
                              {deposit.adminNote || deposit.adminNotes || deposit.note}
                            </div>
                          ) : (
                            <span style={{ color: '#474d57' }}>-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {depositsPagination.hasNext && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <button
                  onClick={() => fetchHistory(depositsPagination.page + 1)}
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: loading ? '#848e9c' : '#fcd535',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div style={{ 
            backgroundColor: '#2b3139', 
            padding: window.innerWidth <= 768 ? '20px' : '32px', 
            borderRadius: '12px', 
            border: '1px solid #474d57'
          }}>
            <h2 style={{ 
              color: '#ffffff', 
              fontSize: window.innerWidth <= 768 ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '24px', 
              letterSpacing: '-0.3px' 
            }}>Withdrawal History</h2>
            {withdrawals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', color: '#b7bdc6' }}>
                <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No withdrawals found</p>
                <p style={{ fontSize: '16px', margin: 0 }}>Your withdrawal history will appear here</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #474d57' }}>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>DATE</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>TYPE</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>AMOUNT</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>DETAILS</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>STATUS</th>
                      <th style={{ color: '#b7bdc6', padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>NOTE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((withdrawal) => (
                      <tr key={withdrawal._id} style={{ borderBottom: '1px solid #474d57' }}>
                        <td data-label="Date" style={{ color: '#ffffff', padding: '16px', fontSize: '15px' }}>
                          {formatDate(withdrawal.createdAt)}
                        </td>
                        <td data-label="Type" style={{ color: '#ffffff', padding: '16px', fontSize: '15px', fontWeight: '500' }}>
                          {withdrawal.type.toUpperCase()}
                        </td>
                        <td data-label="Amount" style={{ color: '#ffffff', padding: '16px', fontSize: '15px', fontWeight: '600' }}>
                          {withdrawal.type === 'inr' ? '₹' : ''}{withdrawal.amount}
                        </td>
                        <td data-label="Details" style={{ color: '#b7bdc6', padding: '16px', fontSize: '13px' }}>
                          {typeof withdrawal.withdrawalDetails === 'string' 
                            ? withdrawal.withdrawalDetails 
                            : JSON.stringify(withdrawal.withdrawalDetails)}
                        </td>
                        <td data-label="Status" style={{ padding: '16px' }}>
                          <span style={{
                            color: getStatusColor(withdrawal.status),
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: getStatusColor(withdrawal.status) + '20',
                            fontSize: '12px',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                          }}>
                            {withdrawal.status.toUpperCase()}
                          </span>
                        </td>
                        <td data-label="Note" style={{ color: '#848e9c', padding: '16px', fontSize: '13px' }}>
                          {(withdrawal.adminNote || withdrawal.adminNotes || withdrawal.note) ? (
                            <div style={{ 
                              backgroundColor: withdrawal.status === 'rejected' ? '#f84960' : '#02c076',
                              color: 'white',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              maxWidth: '200px',
                              wordWrap: 'break-word',
                              fontWeight: '500'
                            }}>
                              {withdrawal.adminNote || withdrawal.adminNotes || withdrawal.note}
                            </div>
                          ) : (
                            <span style={{ color: '#474d57' }}>-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {withdrawalsPagination.hasNext && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <button
                  onClick={() => fetchHistory(withdrawalsPagination.page + 1)}
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: loading ? '#848e9c' : '#fcd535',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '15px',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;