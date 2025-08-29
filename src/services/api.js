import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://vaultx-backend-production.up.railway.app/api';

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
  sendOTP: (data) => api.post('/auth/send-otp', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
};

export const tradingAPI = {
  getPrice: () => api.get('/trading/price'),
  buyUSDT: (amount) => api.post('/trading/buy', { amount }),
  sellUSDT: (amount) => api.post('/trading/sell', { amount }),
  getTransactions: (page = 1, limit = 10) => api.get(`/trading/transactions?page=${page}&limit=${limit}`),
};

export const walletAPI = {
  getWalletInfo: () => api.get('/wallet/info'),
  requestDeposit: (data) => api.post('/wallet/deposit', data),
  getDeposits: (page = 1, limit = 10) => api.get(`/wallet/deposits?page=${page}&limit=${limit}`),
  requestWithdrawal: (data) => api.post('/wallet/withdraw', data),
  getWithdrawals: (page = 1, limit = 10) => api.get(`/wallet/withdrawals?page=${page}&limit=${limit}`),
  processUSDTWithdrawal: (data) => api.post('/wallet/withdraw-usdt', data),
};

export const kycAPI = {
  submitKYC: (data) => api.post('/kyc/submit', data),
  getStatus: () => api.get('/kyc/status'),
  updateKYC: (data) => api.put('/kyc/update', data),
};

export default api;