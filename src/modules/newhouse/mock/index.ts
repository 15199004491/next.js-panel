import type { Newhouse, Developer, PaginationResponse } from '../models';

const mockNewhouses: Newhouse[] = [
  { id: '1', name: 'Sunshine Garden', address: '88 Jianguo Road, Chaoyang District, Beijing', price: 8500000, developer: 'China Vanke', contactPhone: '0991-5831310', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'South-facing, good lighting', createdAt: '2024-01-01 10:00:00', updatedAt: '2024-01-15 14:30:00' },
  { id: '2', name: 'Splendid Home', address: '1 Zhongguancun Street, Haidian District, Beijing', price: 12000000, developer: 'Evergrande Group', contactPhone: '0991-5831311', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'School district house, complete facilities', createdAt: '2024-01-02 11:00:00', updatedAt: '2024-01-14 10:20:00' },
  { id: '3', name: 'Happy Community', address: '20 Xizhimen Outer Street, Xicheng District, Beijing', price: 6800000, developer: 'Country Garden', contactPhone: '0991-5831312', status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Small apartment, suitable for first-time buyers', createdAt: '2024-01-03 09:00:00', updatedAt: '2024-01-13 16:45:00' },
  { id: '4', name: 'Lijing Bay', address: '100 Wangfujing Street, Dongcheng District, Beijing', price: 25000000, developer: 'Poly Developments', contactPhone: '0991-5831313', status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Luxury penthouse, wide view', createdAt: '2024-01-04 14:00:00', updatedAt: '2024-01-12 09:15:00' },
  { id: '5', name: 'Green Valley', address: '55 Olympic Park Road, Chaoyang District, Beijing', price: 9500000, developer: 'Longfor Properties', contactPhone: '0991-5831314', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Near Olympic Park, excellent environment', createdAt: '2024-01-05 10:30:00', updatedAt: '2024-01-11 11:20:00' },
  { id: '6', name: 'Blue Sky Mansion', address: '30 Financial Street, Xicheng District, Beijing', price: 18000000, developer: 'China Vanke', contactPhone: '0991-5831315', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'CBD core area, convenient transportation', createdAt: '2024-01-06 15:00:00', updatedAt: '2024-01-10 13:40:00' },
  { id: '7', name: 'Cloud Nine Residence', address: '123 West Third Ring Road, Haidian District, Beijing', price: 7200000, developer: 'Evergrande Group', contactPhone: '0991-5831316', status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Close to universities, cultural atmosphere', createdAt: '2024-01-07 09:30:00', updatedAt: '2024-01-09 16:15:00' },
  { id: '8', name: 'Golden Palace', address: '77 East Second Ring Road, Dongcheng District, Beijing', price: 32000000, developer: 'Country Garden', contactPhone: '0991-5831317', status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Top-tier luxury villa with private garden', createdAt: '2024-01-08 14:00:00', updatedAt: '2024-01-08 15:30:00' },
  { id: '9', name: 'City Oasis', address: '44 North Fourth Ring Road, Chaoyang District, Beijing', price: 8800000, developer: 'Poly Developments', contactPhone: '0991-5831318', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Modern design, smart home features', createdAt: '2024-01-09 11:00:00', updatedAt: '2024-01-07 12:00:00' },
  { id: '10', name: 'Harmony Heights', address: '99 South Third Ring Road, Fengtai District, Beijing', price: 5600000, developer: 'Longfor Properties', contactPhone: '0991-5831319', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Affordable housing, family friendly', createdAt: '2024-01-10 10:00:00', updatedAt: '2024-01-06 14:20:00' },
  { id: '11', name: 'Royal Garden', address: '22 Chang\'an Avenue, Dongcheng District, Beijing', price: 22000000, developer: 'China Vanke', contactPhone: '0991-5831320', status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Historic area, elegant architecture', createdAt: '2024-01-11 16:00:00', updatedAt: '2024-01-05 10:10:00' },
  { id: '12', name: 'Starlight Plaza', address: '66 Wangjing Street, Chaoyang District, Beijing', price: 9200000, developer: 'Evergrande Group', contactPhone: '0991-5831321', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'High-rise apartment with city view', createdAt: '2024-01-12 09:00:00', updatedAt: '2024-01-04 17:45:00' },
  { id: '13', name: 'Maple Leaf Villa', address: '88 Fragrant Hill Road, Haidian District, Beijing', price: 45000000, developer: 'Country Garden', contactPhone: '0991-5831322', status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Mountain view villa, quiet neighborhood', createdAt: '2024-01-13 13:30:00', updatedAt: '2024-01-03 09:30:00' },
  { id: '14', name: 'Diamond Court', address: '10 Financial Street, Xicheng District, Beijing', price: 15000000, developer: 'Poly Developments', contactPhone: '0991-5831323', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Prime business location, investment value', createdAt: '2024-01-14 11:30:00', updatedAt: '2024-01-02 15:00:00' },
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

export const generateCode = (id: string): string => {
  const seed = parseInt(id, 10) || 1;
  const random = Math.floor(Math.random() * 90000000) + 10000000;
  return String(random).slice(0, 8);
};

export const generateContactPhone = (id: string): string => {
  const areaCode = ['138', '139', '158', '159', '188', '189'][Math.floor(Math.random() * 6)];
  const middle = String(Math.floor(Math.random() * 9000) + 1000);
  const last = String(Math.floor(Math.random() * 9000) + 1000);
  return `${areaCode}${middle}${last}`;
};

export const generateTotalPayment = (id: string): string => {
  const seed = parseInt(id, 10) || 1;
  const amount = (Math.random() * 99999999 + 100000).toFixed(2);
  const [integerPart, decimalPart] = amount.split('.');
  const formattedInteger = parseInt(integerPart).toLocaleString();
  return `${formattedInteger}.${decimalPart}`;
};

export const generateUpdatedBy = (id: string): string => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 30);
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);
  
  const date = new Date(now);
  date.setDate(date.getDate() - randomDays);
  date.setHours(date.getHours() - randomHours);
  date.setMinutes(date.getMinutes() - randomMinutes);
  date.setSeconds(date.getSeconds() - randomSeconds);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};