import type { Newhouse, PaginationResponse } from '../models';

const mockNewhouses: Newhouse[] = [
  { id: '1', name: 'Sunshine Garden', address: '88 Jianguo Road, Chaoyang District, Beijing', price: 8500000, area: 120, bedrooms: 3, bathrooms: 2, status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'South-facing, good lighting', createdAt: '2024-01-01 10:00:00', updatedAt: '2024-01-15 14:30:00' },
  { id: '2', name: 'Splendid Home', address: '1 Zhongguancun Street, Haidian District, Beijing', price: 12000000, area: 150, bedrooms: 4, bathrooms: 3, status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'School district house, complete facilities', createdAt: '2024-01-02 11:00:00', updatedAt: '2024-01-14 10:20:00' },
  { id: '3', name: 'Happy Community', address: '20 Xizhimen Outer Street, Xicheng District, Beijing', price: 6800000, area: 90, bedrooms: 2, bathrooms: 1, status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Small apartment, suitable for first-time buyers', createdAt: '2024-01-03 09:00:00', updatedAt: '2024-01-13 16:45:00' },
  { id: '4', name: 'Lijing Bay', address: '100 Wangfujing Street, Dongcheng District, Beijing', price: 25000000, area: 200, bedrooms: 5, bathrooms: 4, status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Luxury penthouse, wide view', createdAt: '2024-01-04 14:00:00', updatedAt: '2024-01-12 09:15:00' },
];

export const mockGetNewhouses = (page: number, pageSize: number, keyword?: string): PaginationResponse<Newhouse> => {
  let filtered = mockNewhouses;
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = mockNewhouses.filter(item => item.name.toLowerCase().includes(lowerKeyword) || item.address.toLowerCase().includes(lowerKeyword));
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { list: filtered.slice(start, end), total: filtered.length, page, pageSize };
};

export const mockGetNewhouseById = (id: string): Newhouse | undefined => mockNewhouses.find(item => item.id === id);

export const mockCreateNewhouse = (data: Omit<Newhouse, 'id' | 'createdAt' | 'updatedAt'>): Newhouse => {
  const newItem: Newhouse = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  mockNewhouses.push(newItem);
  return newItem;
};

export const mockUpdateNewhouse = (id: string, data: Partial<Newhouse>): Newhouse | undefined => {
  const index = mockNewhouses.findIndex(item => item.id === id);
  if (index !== -1) {
    mockNewhouses[index] = { ...mockNewhouses[index], ...data, updatedAt: new Date().toISOString() };
    return mockNewhouses[index];
  }
  return undefined;
};

export const mockDeleteNewhouse = (id: string): boolean => {
  const index = mockNewhouses.findIndex(item => item.id === id);
  if (index !== -1) {
    mockNewhouses.splice(index, 1);
    return true;
  }
  return false;
};