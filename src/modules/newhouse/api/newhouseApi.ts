import type { Newhouse, PaginationResponse } from '@/src/modules/newhouse/models';
import { mockGetNewhouses, mockGetNewhouseById, mockCreateNewhouse, mockUpdateNewhouse, mockDeleteNewhouse } from '@/src/modules/newhouse/mock';

const isMock = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

export const newhouseApi = {
  getList: async (page: number, pageSize: number, keyword?: string, region?: string[]): Promise<PaginationResponse<Newhouse>> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGetNewhouses(page, pageSize, keyword, region);
    }
    
    const params = new URLSearchParams({ page: page.toString(), pageSize: pageSize.toString() });
    if (keyword) params.append('keyword', keyword);
    if (region && region.length > 0) params.append('region', JSON.stringify(region));
    
    const response = await fetch(`/api/newhouses?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch newhouses');
    return response.json();
  },

  getById: async (id: string): Promise<Newhouse> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = mockGetNewhouseById(id);
      if (!result) throw new Error('Newhouse not found');
      return result;
    }
    
    const response = await fetch(`/api/newhouses/${id}`);
    if (!response.ok) throw new Error('Newhouse not found');
    return response.json();
  },

  create: async (data: Omit<Newhouse, 'id' | 'createdAt' | 'updatedAt'>): Promise<Newhouse> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCreateNewhouse(data);
    }
    
    const response = await fetch('/api/newhouses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create newhouse');
    return response.json();
  },

  update: async (id: string, data: Partial<Newhouse>): Promise<Newhouse> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = mockUpdateNewhouse(id, data);
      if (!result) throw new Error('Newhouse not found');
      return result;
    }
    
    const response = await fetch(`/api/newhouses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update newhouse');
    return response.json();
  },

  delete: async (id: string): Promise<boolean> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDeleteNewhouse(id);
    }
    
    const response = await fetch(`/api/newhouses/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete newhouse');
    return response.json();
  },
};