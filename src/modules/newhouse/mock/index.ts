import type { Newhouse, Developer, PaginationResponse } from '../models';

const mockNewhouses: Newhouse[] = [
  { id: '1', name: 'Sunshine Garden', address: '88 Jianguo Road, Chaoyang District, Beijing', price: 8500000, area: 120, bedrooms: 3, bathrooms: 2, status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'South-facing, good lighting', createdAt: '2024-01-01 10:00:00', updatedAt: '2024-01-15 14:30:00' },
  { id: '2', name: 'Splendid Home', address: '1 Zhongguancun Street, Haidian District, Beijing', price: 12000000, area: 150, bedrooms: 4, bathrooms: 3, status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'School district house, complete facilities', createdAt: '2024-01-02 11:00:00', updatedAt: '2024-01-14 10:20:00' },
  { id: '3', name: 'Happy Community', address: '20 Xizhimen Outer Street, Xicheng District, Beijing', price: 6800000, area: 90, bedrooms: 2, bathrooms: 1, status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Small apartment, suitable for first-time buyers', createdAt: '2024-01-03 09:00:00', updatedAt: '2024-01-13 16:45:00' },
  { id: '4', name: 'Lijing Bay', address: '100 Wangfujing Street, Dongcheng District, Beijing', price: 25000000, area: 200, bedrooms: 5, bathrooms: 4, status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Luxury penthouse, wide view', createdAt: '2024-01-04 14:00:00', updatedAt: '2024-01-12 09:15:00' },
];

const mockDevelopers: Developer[] = [
  { id: '1', name: 'China Vanke', logo: 'https://via.placeholder.com/100x100', description: 'One of the largest residential property developers in China with strong brand recognition and extensive experience in developing high-quality residential communities across major cities.', entryYears: 10, projectsCount: 500, rating: 4.8, status: 'active', remark: 'Strategic partner with long-term cooperation agreement. Known for sustainable development practices and green building initiatives. Has won numerous industry awards for quality and innovation.', createdAt: '2024-01-01 10:00:00', updatedAt: '2024-01-15 14:30:00' },
  { id: '2', name: 'Evergrande Group', logo: 'https://via.placeholder.com/100x100', description: 'Leading real estate developer with projects nationwide, focusing on large-scale residential complexes and integrated commercial developments.', entryYears: 8, projectsCount: 800, rating: 4.5, status: 'active', remark: 'High volume projects with rapid development capabilities. Specializes in affordable housing projects and has strong presence in tier 2 and tier 3 cities across China.', createdAt: '2024-01-02 11:00:00', updatedAt: '2024-01-14 10:20:00' },
  { id: '3', name: 'Country Garden', logo: 'https://via.placeholder.com/100x100', description: 'Fast-growing property developer focusing on residential projects with emphasis on green and smart living concepts.', entryYears: 7, projectsCount: 1200, rating: 4.6, status: 'active', remark: 'Expanding rapidly into new markets. Known for innovative community designs and comprehensive property management services. Strong financial backing and stable growth trajectory.', createdAt: '2024-01-03 09:00:00', updatedAt: '2024-01-13 16:45:00' },
  { id: '4', name: 'Poly Developments', logo: 'https://via.placeholder.com/100x100', description: 'State-owned enterprise with diversified real estate portfolio including commercial, residential, and industrial properties.', entryYears: 5, projectsCount: 300, rating: 4.7, status: 'active', remark: 'Government-backed with strong policy support. Focuses on quality over quantity, delivering premium properties with excellent craftsmanship and attention to detail.', createdAt: '2024-01-04 14:00:00', updatedAt: '2024-01-12 09:15:00' },
  { id: '5', name: 'Longfor Properties', logo: 'https://via.placeholder.com/100x100', description: 'High-end residential and commercial property developer renowned for luxury projects and exceptional customer service.', entryYears: 9, projectsCount: 200, rating: 4.9, status: 'active', remark: 'Premium brand positioning with focus on high-end market segment. Award-winning designs and superior after-sales service. Strong brand loyalty among affluent buyers.', createdAt: '2024-01-05 10:30:00', updatedAt: '2024-01-11 11:20:00' },
  { id: '6', name: 'Sunac China', logo: 'https://via.placeholder.com/100x100', description: 'Comprehensive real estate development company with diversified business including residential, commercial, and cultural tourism projects.', entryYears: 3, projectsCount: 400, rating: 4.4, status: 'inactive', remark: 'Under restructuring due to financial difficulties. Paused new project development. Awaiting further updates on company status and future plans.', createdAt: '2024-01-06 15:00:00', updatedAt: '2024-01-10 13:40:00' },
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

export const mockGetDevelopers = (page: number, pageSize: number, keyword?: string): PaginationResponse<Developer> => {
  let filtered = mockDevelopers;
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = mockDevelopers.filter(item => item.name.toLowerCase().includes(lowerKeyword) || item.description.toLowerCase().includes(lowerKeyword));
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { list: filtered.slice(start, end), total: filtered.length, page, pageSize };
};

export const mockGetDeveloperById = (id: string | number): Developer | undefined => {
  const stringId = String(id);
  return mockDevelopers.find(item => item.id === stringId);
};

export const mockCreateDeveloper = (data: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>): Developer => {
  const newItem: Developer = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  mockDevelopers.push(newItem);
  return newItem;
};

export const mockUpdateDeveloper = (id: string, data: Partial<Developer>): Developer | undefined => {
  const index = mockDevelopers.findIndex(item => item.id === id);
  if (index !== -1) {
    mockDevelopers[index] = { ...mockDevelopers[index], ...data, updatedAt: new Date().toISOString() };
    return mockDevelopers[index];
  }
  return undefined;
};

export const mockDeleteDeveloper = (id: string): boolean => {
  const index = mockDevelopers.findIndex(item => item.id === id);
  if (index !== -1) {
    mockDevelopers.splice(index, 1);
    return true;
  }
  return false;
};