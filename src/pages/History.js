import React, { useState, useEffect } from 'react';
import { walletAPI } from '../services/api';

const History = ({ user }) => {
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [activeTab, setActiveTab] = useState('deposits');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const [depositsRes, withdrawalsRes] = await Promise.all([
        walletAPI.getDeposits(),
        walletAPI.getWithdrawals()
      ]);
      setDeposits(depositsRes.data);
      setWithdrawals(withdrawalsRes.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
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
    <div style={{ padding: '24px', background: '#0b0e11', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#eaecef', marginBottom: '24px' }}>Transaction History</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '1px solid #2b3139' }}>
          <button
            onClick={() => setActiveTab('deposits')}
            style={{
              padding: '12px 24px',
              background: 'none',
              border: 'none',
              color: activeTab === 'deposits' ? '#fcd535' : '#848e9c',
              borderBottom: activeTab === 'deposits' ? '2px solid #fcd535' : 'none',
              cursor: 'pointer'
            }}
          >
            Deposits ({deposits.length})
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            style={{
              padding: '12px 24px',
              background: 'none',
              border: 'none',
              color: activeTab === 'withdrawals' ? '#fcd535' : '#848e9c',
              borderBottom: activeTab === 'withdrawals' ? '2px solid #fcd535' : 'none',
              cursor: 'pointer'
            }}
          >
            Withdrawals ({withdrawals.length})
          </button>
        </div>

        {/* Deposits Tab */}
        {activeTab === 'deposits' && (
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ color: '#eaecef', marginBottom: '20px' }}>Deposit History</h2>
            {deposits.length === 0 ? (
              <p style={{ color: '#848e9c', textAlign: 'center', padding: '40px' }}>
                No deposits found
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #2b3139' }}>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Date</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Type</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Amount</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Method</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Status</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Transaction ID</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Admin Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.map((deposit) => (
                      <tr key={deposit._id} style={{ borderBottom: '1px solid #1a1d23' }}>
                        <td data-label="Date" style={{ color: '#eaecef', padding: '12px' }}>
                          {formatDate(deposit.createdAt)}
                        </td>
                        <td data-label="Type" style={{ color: '#eaecef', padding: '12px' }}>
                          {deposit.type.toUpperCase()}
                        </td>
                        <td data-label="Amount" style={{ color: '#eaecef', padding: '12px' }}>
                          {deposit.type === 'inr' ? '₹' : ''}{deposit.amount}
                        </td>
                        <td data-label="Method" style={{ color: '#eaecef', padding: '12px' }}>
                          {deposit.paymentMethod || 'N/A'}
                        </td>
                        <td data-label="Status" style={{ padding: '12px' }}>
                          <span style={{
                            color: getStatusColor(deposit.status),
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: getStatusColor(deposit.status) + '20',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {deposit.status.toUpperCase()}
                          </span>
                        </td>
                        <td data-label="Transaction ID" style={{ color: '#848e9c', padding: '12px', fontSize: '12px' }}>
                          {deposit.transactionId || 'N/A'}
                        </td>
                        <td data-label="Admin Note" style={{ color: '#848e9c', padding: '12px', fontSize: '12px' }}>
                          {deposit.adminNote && (
                            <div style={{ 
                              backgroundColor: deposit.status === 'rejected' ? '#f84960' : '#02c076',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '11px'
                            }}>
                              {deposit.adminNote}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ color: '#eaecef', marginBottom: '20px' }}>Withdrawal History</h2>
            {withdrawals.length === 0 ? (
              <p style={{ color: '#848e9c', textAlign: 'center', padding: '40px' }}>
                No withdrawals found
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #2b3139' }}>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Date</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Type</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Amount</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Details</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Status</th>
                      <th style={{ color: '#848e9c', padding: '12px', textAlign: 'left' }}>Admin Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((withdrawal) => (
                      <tr key={withdrawal._id} style={{ borderBottom: '1px solid #1a1d23' }}>
                        <td data-label="Date" style={{ color: '#eaecef', padding: '12px' }}>
                          {formatDate(withdrawal.createdAt)}
                        </td>
                        <td data-label="Type" style={{ color: '#eaecef', padding: '12px' }}>
                          {withdrawal.type.toUpperCase()}
                        </td>
                        <td data-label="Amount" style={{ color: '#eaecef', padding: '12px' }}>
                          {withdrawal.type === 'inr' ? '₹' : ''}{withdrawal.amount}
                        </td>
                        <td data-label="Details" style={{ color: '#848e9c', padding: '12px', fontSize: '12px' }}>
                          {typeof withdrawal.withdrawalDetails === 'string' 
                            ? withdrawal.withdrawalDetails 
                            : JSON.stringify(withdrawal.withdrawalDetails)}
                        </td>
                        <td data-label="Status" style={{ padding: '12px' }}>
                          <span style={{
                            color: getStatusColor(withdrawal.status),
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: getStatusColor(withdrawal.status) + '20',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {withdrawal.status.toUpperCase()}
                          </span>
                        </td>
                        <td data-label="Admin Note" style={{ color: '#848e9c', padding: '12px', fontSize: '12px' }}>
                          {withdrawal.adminNote && (
                            <div style={{ 
                              backgroundColor: withdrawal.status === 'rejected' ? '#f84960' : '#02c076',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '11px'
                            }}>
                              {withdrawal.adminNote}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;