import type { Developer, PaginationResponse } from '@/src/modules/newhouse/models';
import { mockGetDevelopers, mockGetDeveloperById, mockCreateDeveloper, mockUpdateDeveloper, mockDeleteDeveloper } from '@/src/modules/newhouse/mock';

const SIMULATED_DELAY = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const restClient = {
  getDevelopers: async (
    page: number,
    pageSize: number,
    keyword?: string,
    status?: string
  ): Promise<PaginationResponse<Developer>> => {
    await delay(SIMULATED_DELAY);
    let filtered = mockGetDevelopers(1, 1000, keyword);

    if (status) {
      filtered = {
        ...filtered,
        list: filtered.list.filter((d) => d.status === status),
      };
    }

    const start = (page - 1) * pageSize;
    const pagedList = filtered.list.slice(start, start + pageSize);

    return {
      list: pagedList,
      total: filtered.list.length,
      page,
      pageSize,
    };
  },

  getDeveloperById: async (id: string): Promise<Developer | null> => {
    await delay(200);
    const result = mockGetDeveloperById(id);
    if (!result) throw new Error('Developer not found');
    return result;
  },

  createDeveloper: async (
    data: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Developer> => {
    await delay(400);
    return mockCreateDeveloper(data);
  },

  updateDeveloper: async (id: string, data: Partial<Developer>): Promise<Developer> => {
    await delay(300);
    const result = mockUpdateDeveloper(id, data);
    if (!result) throw new Error('Developer not found');
    return result;
  },

  deleteDeveloper: async (id: string): Promise<boolean> => {
    await delay(300);
    return mockDeleteDeveloper(id);
  },
};