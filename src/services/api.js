import axios from 'axios';

const API_BASE_URL = 'https://vaultx-backend-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const tradingAPI = {
  getPrice: () => api.get('/trading/price'),
  buyUSDT: (amount) => api.post('/trading/buy', { amount }),
  sellUSDT: (amount) => api.post('/trading/sell', { amount }),
  getTransactions: () => api.get('/trading/transactions'),
};

export const walletAPI = {
  getWalletInfo: () => api.get('/wallet/info'),
  requestDeposit: (data) => api.post('/wallet/deposit', data),
  getDeposits: () => api.get('/wallet/deposits'),
  requestWithdrawal: (data) => api.post('/wallet/withdraw', data),
  getWithdrawals: () => api.get('/wallet/withdrawals'),
  processUSDTWithdrawal: (data) => api.post('/wallet/withdraw-usdt', data),
};

export const kycAPI = {
  submitKYC: (data) => api.post('/kyc/submit', data),
  getStatus: () => api.get('/kyc/status'),
  updateKYC: (data) => api.put('/kyc/update', data),
};

export default api;