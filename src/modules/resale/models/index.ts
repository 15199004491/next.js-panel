export interface ResaleProperty {
  id: string;
  title: string;
  address: string;
  price: number;
  area: number;
  layout: string;
  floor: string;
  totalFloors: number;
  age: number;
  buildYear: number;
  orientation: 'east' | 'west' | 'south' | 'north' | 'southeast' | 'southwest' | 'northeast' | 'northwest';
  hasImages: boolean;
  source: 'agent' | 'owner';
  propertyType: 'apartment' | 'villa' | 'townhouse' | 'condo';
  houseCategory: 'apartment' | 'residential' | 'commercial' | 'other';
  decoration: 'luxury' | 'medium' | 'simple' | 'rough';
  status: 'available' | 'sold' | 'reserved';
  description: string;
  remark: string;
  contactName: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResaleFilter {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  propertyType?: string;
  status?: string;
}

export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}