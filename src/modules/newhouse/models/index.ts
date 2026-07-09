export interface Newhouse {
  id: string;
  name: string;
  address: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  status: 'available' | 'sold' | 'reserved';
  images: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewhouseFilter {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  status?: string;
}

export interface Developer {
  id: string;
  name: string;
  logo: string;
  description: string;
  entryYears: number;
  projectsCount: number;
  rating: number;
  status: 'active' | 'inactive';
  remark: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeveloperFilter {
  keyword?: string;
  status?: string;
}

export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}