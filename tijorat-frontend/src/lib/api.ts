import axios from 'axios';

// Backend server url
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async (businessId?: string) => {
  const url = businessId ? `/products?businessId=${businessId}` : '/products';
  const response = await api.get(url);
  return response.data;
};

// Orders API
export const getOrders = async (businessId?: string) => {
  const url = businessId ? `/orders?businessId=${businessId}` : '/orders';
  const response = await api.get(url);
  return response.data;
};

// Dashboard Stats (Mock / Future implementation)
export const getDashboardStats = async (businessId: string) => {
  // Backend da bu uchun maxsus route qilinganda shu ulanadi
  // const response = await api.get(`/stats?businessId=${businessId}`);
  // return response.data;
  return {
    sales: "2,450,000",
    orders: 124,
    customers: 32,
    visits: 840
  };
};

export default api;