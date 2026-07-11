import type { ResaleProperty, PaginationResponse } from '@/src/modules/resale/models';

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

const mockResaleProperties: ResaleProperty[] = [
  { id: '1', title: 'Sunshine Apartment', address: '88 Jianguo Road, Chaoyang District, Beijing', price: 12500, area: 120, layout: '3-2-1', floor: '15/28', totalFloors: 28, age: 5, buildYear: 2019, orientation: 'south', hasImages: true, source: 'agent', propertyType: 'apartment', houseCategory: 'apartment', decoration: 'luxury', status: 'available', description: 'South-facing, excellent lighting, fully furnished', remark: 'Needs renovation', contactName: 'Zhang Wei', contactPhone: '13812345678', createdAt: now - 30 * day, updatedAt: now - 15 * day },
  { id: '2', title: 'Garden Villa', address: '100 Zhongguancun Street, Haidian District, Beijing', price: 28000, area: 380, layout: '5-3-3', floor: '1/3', totalFloors: 3, age: 8, buildYear: 2016, orientation: 'southwest', hasImages: true, source: 'owner', propertyType: 'villa', houseCategory: 'residential', decoration: 'luxury', status: 'available', description: 'Private garden, swimming pool, garage', remark: 'Negotiable price', contactName: 'Li Ming', contactPhone: '13987654321', createdAt: now - 28 * day, updatedAt: now - 10 * day },
  { id: '3', title: 'City Condo', address: '50 Xizhimen Outer Street, Xicheng District, Beijing', price: 8500, area: 95, layout: '2-1-1', floor: '8/20', totalFloors: 20, age: 3, buildYear: 2021, orientation: 'east', hasImages: false, source: 'agent', propertyType: 'condo', houseCategory: 'apartment', decoration: 'medium', status: 'sold', description: 'City center location, convenient transportation', remark: 'Sold to Mr. Wang', contactName: 'Wang Fang', contactPhone: '15812345678', createdAt: now - 25 * day, updatedAt: now - 5 * day },
  { id: '4', title: 'Commercial Shop', address: '20 Wangfujing Street, Dongcheng District, Beijing', price: 18000, area: 180, layout: '4-2-2', floor: '1/4', totalFloors: 4, age: 6, buildYear: 2018, orientation: 'north', hasImages: true, source: 'owner', propertyType: 'townhouse', houseCategory: 'commercial', decoration: 'medium', status: 'reserved', description: 'Commercial shop in prime location', remark: 'Buyer pending loan approval', contactName: 'Chen Yu', contactPhone: '15987654321', createdAt: now - 20 * day, updatedAt: now - 8 * day },
  { id: '5', title: 'Lakeview Apartment', address: '55 Olympic Park Road, Shanghai', price: 14000, area: 135, layout: '3-2-2', floor: '22/35', totalFloors: 35, age: 2, buildYear: 2022, orientation: 'southeast', hasImages: true, source: 'agent', propertyType: 'apartment', houseCategory: 'apartment', decoration: 'simple', status: 'available', description: 'Lake view, modern design, high floor', remark: 'Includes furniture', contactName: 'Liu Yang', contactPhone: '18812345678', createdAt: now - 18 * day, updatedAt: now - 3 * day },
  { id: '6', title: 'Luxury Penthouse', address: '30 Lujiazui Road, Pudong District, Shanghai', price: 35000, area: 280, layout: '4-3-3', floor: '45/48', totalFloors: 48, age: 1, buildYear: 2023, orientation: 'south', hasImages: true, source: 'owner', propertyType: 'condo', houseCategory: 'apartment', decoration: 'luxury', status: 'available', description: 'Panoramic city view, private terrace', remark: 'Top floor unit', contactName: 'Zhao Qiang', contactPhone: '18987654321', createdAt: now - 15 * day, updatedAt: now - 7 * day },
  { id: '7', title: 'London Townhouse', address: '10 Downing Street, London', price: 42000, area: 220, layout: '5-2-2', floor: '3/4', totalFloors: 4, age: 120, buildYear: 1904, orientation: 'west', hasImages: false, source: 'agent', propertyType: 'townhouse', houseCategory: 'residential', decoration: 'medium', status: 'available', description: 'Historic townhouse in central London', remark: 'Landmark property', contactName: 'John Smith', contactPhone: '+44-20-7946-0958', createdAt: now - 12 * day, updatedAt: now - 6 * day },
  { id: '8', title: 'Warehouse Space', address: '100 Industrial Road, New York', price: 58000, area: 1500, layout: '0-0-0', floor: '1/1', totalFloors: 1, age: 15, buildYear: 2009, orientation: 'northeast', hasImages: true, source: 'owner', propertyType: 'townhouse', houseCategory: 'other', decoration: 'rough', status: 'available', description: 'Large warehouse space with loading dock', remark: 'Industrial zone', contactName: 'Sarah Johnson', contactPhone: '+1-212-123-4567', createdAt: now - 10 * day, updatedAt: now - 2 * day },
  { id: '9', title: 'Tokyo Condo', address: '10 Ginza Street, Tokyo', price: 16500, area: 85, layout: '2-1-1', floor: '12/25', totalFloors: 25, age: 4, buildYear: 2020, orientation: 'east', hasImages: true, source: 'agent', propertyType: 'condo', houseCategory: 'apartment', decoration: 'medium', status: 'sold', description: 'Prime Ginza location, walking distance to station', remark: 'Quick sale', contactName: 'Tanaka Hiroshi', contactPhone: '+81-3-1234-5678', createdAt: now - 8 * day, updatedAt: now - 10 * day },
  { id: '10', title: 'Sydney Villa', address: '100 George Street, Sydney', price: 48000, area: 450, layout: '6-4-4', floor: '2/2', totalFloors: 2, age: 3, buildYear: 2021, orientation: 'south', hasImages: true, source: 'owner', propertyType: 'villa', houseCategory: 'residential', decoration: 'luxury', status: 'available', description: 'Harbour view luxury villa with pool', remark: 'Waterfront property', contactName: 'Michael Brown', contactPhone: '+61-2-9876-5432', createdAt: now - 5 * day, updatedAt: now - 1 * day },
];

export const mockGetResaleProperties = (page: number, pageSize: number, keyword?: string, region?: string[]): PaginationResponse<ResaleProperty> => {
  let filtered = mockResaleProperties;
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(lowerKeyword) || 
      item.address.toLowerCase().includes(lowerKeyword)
    );
  }
  if (region && region.length > 0) {
    const regionLower = region.map(r => r.toLowerCase());
    filtered = filtered.filter(item => {
      const addressLower = item.address.toLowerCase();
      return regionLower.some(r => addressLower.includes(r));
    });
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { list: filtered.slice(start, end), total: filtered.length, page, pageSize };
};

export const mockGetResalePropertyById = (id: string | number): ResaleProperty | undefined => {
  const stringId = String(id);
  return mockResaleProperties.find(item => item.id === stringId);
};

export const mockCreateResaleProperty = (data: Omit<ResaleProperty, 'id' | 'createdAt' | 'updatedAt'>): ResaleProperty => {
  const now = Date.now();
  const newItem: ResaleProperty = { ...data, id: now.toString(), createdAt: now, updatedAt: now };
  mockResaleProperties.push(newItem);
  return newItem;
};

export const mockUpdateResaleProperty = (id: string, data: Partial<ResaleProperty>): ResaleProperty | undefined => {
  const index = mockResaleProperties.findIndex(item => item.id === id);
  if (index !== -1) {
    mockResaleProperties[index] = { ...mockResaleProperties[index], ...data, updatedAt: Date.now() };
    return mockResaleProperties[index];
  }
  return undefined;
};

export const mockDeleteResaleProperty = (id: string): boolean => {
  const index = mockResaleProperties.findIndex(item => item.id === id);
  if (index !== -1) {
    mockResaleProperties.splice(index, 1);
    return true;
  }
  return false;
};

export const generateCode = (id: string): string => {
  const seed = parseInt(id, 10) || 1;
  const random = Math.floor(Math.random() * 90000000) + 10000000;
  return String(random).slice(0, 8);
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

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

export const calculateDaysOnMarket = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day';
  if (diffDays < 30) return `${diffDays} days`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} year${years > 1 ? 's' : ''}`;
};

export const generatePropertyImages = (id: string): string[] => {
  const seed = parseInt(id, 10) || 1;
  
  return [
    `https://picsum.photos/seed/${seed}living/1200/800`,
    `https://picsum.photos/seed/${seed}bed/1200/800`,
    `https://picsum.photos/seed/${seed}kitchen/1200/800`,
  ];
};