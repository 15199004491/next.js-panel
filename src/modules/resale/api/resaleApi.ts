import type { ResaleProperty, PaginationResponse } from '@/src/modules/resale/models';
import { mockGetResaleProperties, mockGetResalePropertyById, mockCreateResaleProperty, mockUpdateResaleProperty, mockDeleteResaleProperty } from '@/src/modules/resale/mock';

const isMock = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

export const resaleApi = {
  getList: async (page: number, pageSize: number, keyword?: string, region?: string[]): Promise<PaginationResponse<ResaleProperty>> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGetResaleProperties(page, pageSize, keyword, region);
    }
    
    const params = new URLSearchParams({ page: page.toString(), pageSize: pageSize.toString() });
    if (keyword) params.append('keyword', keyword);
    if (region && region.length > 0) params.append('region', JSON.stringify(region));
    
    const response = await fetch(`/api/resale?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch resale properties');
    return response.json();
  },

  getById: async (id: string): Promise<ResaleProperty> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = mockGetResalePropertyById(id);
      if (!result) throw new Error('Resale property not found');
      return result;
    }
    
    const response = await fetch(`/api/resale/${id}`);
    if (!response.ok) throw new Error('Resale property not found');
    return response.json();
  },

  create: async (data: Omit<ResaleProperty, 'id' | 'createdAt' | 'updatedAt'>): Promise<ResaleProperty> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCreateResaleProperty(data);
    }
    
    const response = await fetch('/api/resale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create resale property');
    return response.json();
  },

  update: async (id: string, data: Partial<ResaleProperty>): Promise<ResaleProperty> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = mockUpdateResaleProperty(id, data);
      if (!result) throw new Error('Resale property not found');
      return result;
    }
    
    const response = await fetch(`/api/resale/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update resale property');
    return response.json();
  },

  delete: async (id: string): Promise<boolean> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDeleteResaleProperty(id);
    }
    
    const response = await fetch(`/api/resale/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete resale property');
    return response.json();
  },
};