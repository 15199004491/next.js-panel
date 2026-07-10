import type { Developer, PaginationResponse } from '../models';
import { mockGetDevelopers, mockGetDeveloperById, mockCreateDeveloper, mockUpdateDeveloper, mockDeleteDeveloper } from '../mock';

const isMock = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

export const developerApi = {
  getList: async (page: number, pageSize: number, keyword?: string, region?: string[]): Promise<PaginationResponse<Developer>> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGetDevelopers(page, pageSize, keyword, region);
    }
    
    const params = new URLSearchParams({ page: page.toString(), pageSize: pageSize.toString() });
    if (keyword) params.append('keyword', keyword);
    if (region && region.length > 0) params.append('region', JSON.stringify(region));
    
    const response = await fetch(`/api/developers?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch developers');
    return response.json();
  },

  getById: async (id: string): Promise<Developer> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = mockGetDeveloperById(id);
      if (!result) throw new Error('Developer not found');
      return result;
    }
    
    const response = await fetch(`/api/developers/${id}`);
    if (!response.ok) throw new Error('Developer not found');
    return response.json();
  },

  create: async (data: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Developer> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCreateDeveloper(data);
    }
    
    const response = await fetch('/api/developers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create developer');
    return response.json();
  },

  update: async (id: string, data: Partial<Developer>): Promise<Developer> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = mockUpdateDeveloper(id, data);
      if (!result) throw new Error('Developer not found');
      return result;
    }
    
    const response = await fetch(`/api/developers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update developer');
    return response.json();
  },

  delete: async (id: string): Promise<boolean> => {
    if (isMock) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDeleteDeveloper(id);
    }
    
    const response = await fetch(`/api/developers/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete developer');
    return response.json();
  },
};