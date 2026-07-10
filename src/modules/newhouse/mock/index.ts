import type { Newhouse, Developer, PaginationResponse } from '../models';

const mockNewhouses: Newhouse[] = [
  { id: '1', name: 'Sunshine Garden', address: '88 Jianguo Road, Chaoyang District, Beijing, China', price: 8500000, developer: 'China Vanke', contactPhone: '0991-5831310', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'South-facing, good lighting', createdAt: '2024-01-01 10:00:00', updatedAt: '2024-01-15 14:30:00' },
  { id: '2', name: 'Splendid Home', address: '1 Zhongguancun Street, Haidian District, Beijing, China', price: 12000000, developer: 'Evergrande Group', contactPhone: '0991-5831311', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'School district house, complete facilities', createdAt: '2024-01-02 11:00:00', updatedAt: '2024-01-14 10:20:00' },
  { id: '3', name: 'Happy Community', address: '20 Xizhimen Outer Street, Xicheng District, Beijing, China', price: 6800000, developer: 'Country Garden', contactPhone: '0991-5831312', status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Small apartment, suitable for first-time buyers', createdAt: '2024-01-03 09:00:00', updatedAt: '2024-01-13 16:45:00' },
  { id: '4', name: 'Lijing Bay', address: '100 Wangfujing Street, Dongcheng District, Beijing, China', price: 25000000, developer: 'Poly Developments', contactPhone: '0991-5831313', status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Luxury penthouse, wide view', createdAt: '2024-01-04 14:00:00', updatedAt: '2024-01-12 09:15:00' },
  { id: '5', name: 'Green Valley', address: '55 Olympic Park Road, Shanghai, China', price: 9500000, developer: 'Longfor Properties', contactPhone: '0991-5831314', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Near Olympic Park, excellent environment', createdAt: '2024-01-05 10:30:00', updatedAt: '2024-01-11 11:20:00' },
  { id: '6', name: 'Blue Sky Mansion', address: '30 Lujiazui Road, Pudong District, Shanghai, China', price: 18000000, developer: 'China Vanke', contactPhone: '0991-5831315', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'CBD core area, convenient transportation', createdAt: '2024-01-06 15:00:00', updatedAt: '2024-01-10 13:40:00' },
  { id: '7', name: 'London Tower', address: '10 Downing Street, London, United Kingdom, Europe', price: 35000000, developer: 'Poly Developments', contactPhone: '+44-20-7946-0958', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Prime central London location', createdAt: '2024-01-07 09:30:00', updatedAt: '2024-01-09 16:15:00' },
  { id: '8', name: 'Manchester Gardens', address: '100 Oxford Road, Manchester, United Kingdom, Europe', price: 12000000, developer: 'Country Garden', contactPhone: '+44-161-236-7890', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Modern residential complex', createdAt: '2024-01-08 14:00:00', updatedAt: '2024-01-08 15:30:00' },
  { id: '9', name: 'Berlin Residence', address: '50 Kurfuerstendamm, Berlin, Germany, Europe', price: 18500000, developer: 'Evergrande Group', contactPhone: '+49-30-1234-5678', status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Luxury apartments near Tiergarten', createdAt: '2024-01-09 11:00:00', updatedAt: '2024-01-07 12:00:00' },
  { id: '10', name: 'Munich Heights', address: '20 Marienplatz, Munich, Germany, Europe', price: 22000000, developer: 'Longfor Properties', contactPhone: '+49-89-8765-4321', status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Premium penthouse with Alps view', createdAt: '2024-01-10 10:00:00', updatedAt: '2024-01-06 14:20:00' },
  { id: '11', name: 'Paris Elegance', address: '10 Avenue des Champs-Élysées, Paris, France, Europe', price: 45000000, developer: 'China Vanke', contactPhone: '+33-1-4234-5678', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Historic Haussmannian building', createdAt: '2024-01-11 16:00:00', updatedAt: '2024-01-05 10:10:00' },
  { id: '12', name: 'Lyon Plaza', address: '5 Place Bellecour, Lyon, France, Europe', price: 15000000, developer: 'Poly Developments', contactPhone: '+33-4-7890-1234', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Modern city center apartments', createdAt: '2024-01-12 09:00:00', updatedAt: '2024-01-04 17:45:00' },
  { id: '13', name: 'New York Towers', address: '100 Fifth Avenue, Manhattan, New York, United States, North America', price: 85000000, developer: 'Country Garden', contactPhone: '+1-212-123-4567', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Iconic skyscraper residences', createdAt: '2024-01-13 13:30:00', updatedAt: '2024-01-03 09:30:00' },
  { id: '14', name: 'California Dream', address: '50 Sunset Boulevard, Los Angeles, California, United States, North America', price: 65000000, developer: 'Evergrande Group', contactPhone: '+1-310-987-6543', status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Hollywood Hills luxury villa', createdAt: '2024-01-14 11:30:00', updatedAt: '2024-01-02 15:00:00' },
  { id: '15', name: 'Toronto Heights', address: '100 Bay Street, Toronto, Ontario, Canada, North America', price: 28000000, developer: 'Longfor Properties', contactPhone: '+1-416-555-1234', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Downtown condo with CN Tower view', createdAt: '2024-01-15 10:00:00', updatedAt: '2024-01-16 09:00:00' },
  { id: '16', name: 'Vancouver Gardens', address: '50 Robson Street, Vancouver, British Columbia, Canada, North America', price: 32000000, developer: 'China Vanke', contactPhone: '+1-604-555-5678', status: 'reserved', images: ['https://via.placeholder.com/300x200'], description: 'Waterfront luxury apartments', createdAt: '2024-01-16 14:00:00', updatedAt: '2024-01-17 11:00:00' },
  { id: '17', name: 'Tokyo Sky', address: '10 Ginza Street, Tokyo, Japan, Asia', price: 42000000, developer: 'Poly Developments', contactPhone: '+81-3-1234-5678', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Prime Ginza location', createdAt: '2024-01-17 09:30:00', updatedAt: '2024-01-18 14:30:00' },
  { id: '18', name: 'Osaka Residence', address: '50 Shinsaibashi Street, Osaka, Japan, Asia', price: 25000000, developer: 'Country Garden', contactPhone: '+81-6-8765-4321', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'Modern urban living', createdAt: '2024-01-18 15:00:00', updatedAt: '2024-01-19 10:00:00' },
  { id: '19', name: 'Sydney Harbour', address: '100 George Street, Sydney, Australia, Oceania', price: 55000000, developer: 'Evergrande Group', contactPhone: '+61-2-9876-5432', status: 'sold', images: ['https://via.placeholder.com/300x200'], description: 'Harbour view penthouse', createdAt: '2024-01-19 11:00:00', updatedAt: '2024-01-20 16:00:00' },
  { id: '20', name: 'Melbourne Central', address: '50 Bourke Street, Melbourne, Australia, Oceania', price: 38000000, developer: 'Longfor Properties', contactPhone: '+61-3-1234-5678', status: 'available', images: ['https://via.placeholder.com/300x200'], description: 'CBD luxury apartments', createdAt: '2024-01-20 10:00:00', updatedAt: '2024-01-21 09:30:00' },
];

const mockDevelopers: Developer[] = [
  { id: '1', name: 'China Vanke', logo: 'https://via.placeholder.com/100x100', description: 'One of the largest residential property developers in China with strong brand recognition and extensive experience in developing high-quality residential communities across major cities.', entryYears: 10, projectsCount: 500, rating: 4.8, status: 'active', remark: 'Strategic partner with long-term cooperation agreement. Known for sustainable development practices and green building initiatives. Has won numerous industry awards for quality and innovation.', createdAt: '2024-01-01 10:00:00', updatedAt: '2024-01-15 14:30:00' },
  { id: '2', name: 'Evergrande Group', logo: 'https://via.placeholder.com/100x100', description: 'Leading real estate developer with projects nationwide, focusing on large-scale residential complexes and integrated commercial developments.', entryYears: 8, projectsCount: 800, rating: 4.5, status: 'active', remark: 'High volume projects with rapid development capabilities. Specializes in affordable housing projects and has strong presence in tier 2 and tier 3 cities across China.', createdAt: '2024-01-02 11:00:00', updatedAt: '2024-01-14 10:20:00' },
  { id: '3', name: 'Country Garden', logo: 'https://via.placeholder.com/100x100', description: 'Fast-growing property developer focusing on residential projects with emphasis on green and smart living concepts.', entryYears: 7, projectsCount: 1200, rating: 4.6, status: 'active', remark: 'Expanding rapidly into new markets. Known for innovative community designs and comprehensive property management services. Strong financial backing and stable growth trajectory.', createdAt: '2024-01-03 09:00:00', updatedAt: '2024-01-13 16:45:00' },
  { id: '4', name: 'Poly Developments', logo: 'https://via.placeholder.com/100x100', description: 'State-owned enterprise with diversified real estate portfolio including commercial, residential, and industrial properties.', entryYears: 5, projectsCount: 300, rating: 4.7, status: 'active', remark: 'Government-backed with strong policy support. Focuses on quality over quantity, delivering premium properties with excellent craftsmanship and attention to detail.', createdAt: '2024-01-04 14:00:00', updatedAt: '2024-01-12 09:15:00' },
  { id: '5', name: 'Longfor Properties', logo: 'https://via.placeholder.com/100x100', description: 'High-end residential and commercial property developer renowned for luxury projects and exceptional customer service.', entryYears: 9, projectsCount: 200, rating: 4.9, status: 'active', remark: 'Premium brand positioning with focus on high-end market segment. Award-winning designs and superior after-sales service. Strong brand loyalty among affluent buyers.', createdAt: '2024-01-05 10:30:00', updatedAt: '2024-01-11 11:20:00' },
  { id: '6', name: 'Sunac China', logo: 'https://via.placeholder.com/100x100', description: 'Comprehensive real estate development company with diversified business including residential, commercial, and cultural tourism projects.', entryYears: 3, projectsCount: 400, rating: 4.4, status: 'inactive', remark: 'Under restructuring due to financial difficulties. Paused new project development. Awaiting further updates on company status and future plans.', createdAt: '2024-01-06 15:00:00', updatedAt: '2024-01-10 13:40:00' },
  { id: '7', name: 'New York Developers Inc.', logo: 'https://via.placeholder.com/100x100', description: 'Premier real estate development company based in Manhattan, specializing in luxury residential towers and mixed-use developments across New York City.', entryYears: 25, projectsCount: 150, rating: 4.9, status: 'active', remark: 'Iconic projects include several landmark skyscrapers in Manhattan. Renowned for innovative designs and exceptional quality standards.', createdAt: '2024-01-07 09:30:00', updatedAt: '2024-01-16 14:00:00' },
  { id: '8', name: 'London Properties Group', logo: 'https://via.placeholder.com/100x100', description: 'Established property developer with extensive portfolio in prime London locations, focusing on luxury apartments and commercial properties.', entryYears: 30, projectsCount: 120, rating: 4.8, status: 'active', remark: 'Specializes in high-end residential developments in Mayfair, Knightsbridge and Chelsea. Strong reputation for delivering exceptional properties.', createdAt: '2024-01-08 11:00:00', updatedAt: '2024-01-17 10:30:00' },
  { id: '9', name: 'NYC Luxury Homes', logo: 'https://via.placeholder.com/100x100', description: 'Exclusive developer focusing on ultra-luxury residential properties in New Yorks most prestigious neighborhoods.', entryYears: 15, projectsCount: 80, rating: 5.0, status: 'active', remark: 'Developer of some of the most expensive residential properties in Manhattan. Known for bespoke designs and premium finishes.', createdAt: '2024-01-09 14:00:00', updatedAt: '2024-01-18 16:00:00' },
  { id: '10', name: 'London Capital Developments', logo: 'https://via.placeholder.com/100x100', description: 'Leading developer in Central London, delivering high-quality residential and commercial projects across the city.', entryYears: 20, projectsCount: 95, rating: 4.7, status: 'active', remark: 'Strong track record in regeneration projects and mixed-use developments. Committed to sustainable building practices.', createdAt: '2024-01-10 10:30:00', updatedAt: '2024-01-19 09:15:00' },
];

export const mockGetNewhouses = (page: number, pageSize: number, keyword?: string, region?: string[]): PaginationResponse<Newhouse> => {
  let filtered = mockNewhouses;
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter(item => item.name.toLowerCase().includes(lowerKeyword) || item.address.toLowerCase().includes(lowerKeyword));
  }
  if (region && region.length > 0) {
    filtered = filtered.filter(item => {
      const addressLower = item.address.toLowerCase();
      return region.some(r => {
        const regionLower = r.toLowerCase();
        const regex = new RegExp(`\\b${regionLower}\\b`, 'gi');
        return regex.test(addressLower);
      });
    });
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

export const mockGetDevelopers = (page: number, pageSize: number, keyword?: string, region?: string[]): PaginationResponse<Developer> => {
  let filtered = mockDevelopers;
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = mockDevelopers.filter(item => item.name.toLowerCase().includes(lowerKeyword) || item.description.toLowerCase().includes(lowerKeyword));
  }
  if (region && region.length > 0) {
    const regionLower = region.map(r => r.toLowerCase());
    filtered = filtered.filter(item => {
      const nameLower = item.name.toLowerCase();
      return regionLower.some(r => nameLower.includes(r));
    });
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