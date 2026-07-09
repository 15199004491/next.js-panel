export const appConfig = {
  name: 'Admin Panel',
  version: '1.0.0',
  description: 'Admin Panel System',
};

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 20000,
  useMock: process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true,
};

export const routeConfig = {
  dashboard: '/',
  login: '/login',
  users: '/users',
  products: '/products',
  orders: '/orders',
  analytics: '/analytics',
  settings: '/settings',
};

export const paginationConfig = {
  defaultPage: 1,
  defaultPageSize: 10,
  pageSizes: [5, 10, 20, 50],
};

export const colorConfig = {
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
};