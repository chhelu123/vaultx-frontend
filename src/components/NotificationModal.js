import React from 'react';

const NotificationModal = ({ isOpen, onClose, type, title, message, onConfirm }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: '✅',
          color: '#02c076',
          bgColor: 'rgba(2, 192, 118, 0.1)',
          borderColor: '#02c076'
        };
      case 'error':
        return {
          icon: '❌',
          color: '#f84960',
          bgColor: 'rgba(248, 73, 96, 0.1)',
          borderColor: '#f84960'
        };
      case 'warning':
        return {
          icon: '⚠️',
          color: '#fcd535',
          bgColor: 'rgba(252, 213, 53, 0.1)',
          borderColor: '#fcd535'
        };
      case 'info':
        return {
          icon: 'ℹ️',
          color: '#3498db',
          bgColor: 'rgba(52, 152, 219, 0.1)',
          borderColor: '#3498db'
        };
      case 'confirm':
        return {
          icon: '❓',
          color: '#fcd535',
          bgColor: 'rgba(252, 213, 53, 0.1)',
          borderColor: '#fcd535'
        };
      default:
        return {
          icon: 'ℹ️',
          color: '#3498db',
          bgColor: 'rgba(52, 152, 219, 0.1)',
          borderColor: '#3498db'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#2b3139',
        borderRadius: '12px',
        border: `2px solid ${styles.borderColor}`,
        padding: '32px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{styles.icon}</div>
          <h3 style={{
            color: styles.color,
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '12px',
            letterSpacing: '-0.2px'
          }}>
            {title}
          </h3>
          <p style={{
            color: '#eaecef',
            fontSize: '16px',
            lineHeight: '1.5',
            margin: 0
          }}>
            {message}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {type === 'confirm' ? (
            <>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  backgroundColor: '#474d57',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6169'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#474d57'}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  backgroundColor: styles.color,
                  color: type === 'warning' ? '#000' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                Confirm
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '14px 20px',
                backgroundColor: styles.color,
                color: type === 'warning' ? '#000' : '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;