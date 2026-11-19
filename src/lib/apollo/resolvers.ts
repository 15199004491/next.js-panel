import type { Developer } from '@/src/modules/newhouse/models';

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

const mockDevelopers: Developer[] = [
  { id: '1', name: 'China Vanke', logo: 'https://via.placeholder.com/100x100', description: 'One of the largest residential property developers in China with strong brand recognition.', entryYears: 10, projectsCount: 4, rating: 4.8, status: 'active', remark: 'Strategic partner with long-term cooperation agreement.', createdAt: now - 30 * day, updatedAt: now - 15 * day },
  { id: '2', name: 'Evergrande Group', logo: 'https://via.placeholder.com/100x100', description: 'Leading real estate developer with projects nationwide.', entryYears: 8, projectsCount: 3, rating: 4.5, status: 'active', remark: 'High volume projects with rapid development capabilities.', createdAt: now - 28 * day, updatedAt: now - 10 * day },
  { id: '3', name: 'Country Garden', logo: 'https://via.placeholder.com/100x100', description: 'Fast-growing property developer focusing on residential projects.', entryYears: 7, projectsCount: 4, rating: 4.6, status: 'active', remark: 'Expanding rapidly into new markets.', createdAt: now - 25 * day, updatedAt: now - 5 * day },
  { id: '4', name: 'Poly Developments', logo: 'https://via.placeholder.com/100x100', description: 'State-owned enterprise with diversified real estate portfolio.', entryYears: 5, projectsCount: 4, rating: 4.7, status: 'active', remark: 'Government-backed with strong policy support.', createdAt: now - 20 * day, updatedAt: now - 8 * day },
  { id: '5', name: 'Longfor Properties', logo: 'https://via.placeholder.com/100x100', description: 'High-end residential and commercial property developer.', entryYears: 9, projectsCount: 3, rating: 4.9, status: 'active', remark: 'Premium brand positioning with focus on high-end market.', createdAt: now - 18 * day, updatedAt: now - 3 * day },
  { id: '6', name: 'Sunac China', logo: 'https://via.placeholder.com/100x100', description: 'Comprehensive real estate development company.', entryYears: 3, projectsCount: 0, rating: 4.4, status: 'inactive', remark: 'Under restructuring due to financial difficulties.', createdAt: now - 15 * day, updatedAt: now - 7 * day },
  { id: '7', name: 'New York Developers Inc.', logo: 'https://via.placeholder.com/100x100', description: 'Premier real estate development company based in Manhattan.', entryYears: 25, projectsCount: 1, rating: 4.9, status: 'active', remark: 'Iconic projects include several landmark skyscrapers.', createdAt: now - 12 * day, updatedAt: now - 6 * day },
  { id: '8', name: 'London Properties Group', logo: 'https://via.placeholder.com/100x100', description: 'Established property developer with extensive portfolio.', entryYears: 30, projectsCount: 1, rating: 4.8, status: 'active', remark: 'Specializes in high-end residential developments.', createdAt: now - 10 * day, updatedAt: now - 2 * day },
  { id: '9', name: 'Tokyo Luxury Homes', logo: 'https://via.placeholder.com/100x100', description: 'Exclusive developer focusing on ultra-luxury residential properties.', entryYears: 15, projectsCount: 0, rating: 5.0, status: 'active', remark: 'Known for bespoke designs and premium finishes.', createdAt: now - 8 * day, updatedAt: now - 10 * day },
  { id: '10', name: 'Berlin Capital Developments', logo: 'https://via.placeholder.com/100x100', description: 'Leading developer delivering high-quality residential and commercial projects.', entryYears: 20, projectsCount: 0, rating: 4.7, status: 'active', remark: 'Strong track record in regeneration projects.', createdAt: now - 5 * day, updatedAt: now - 12 * day },
];

interface CreateDeveloperInput {
  name: string;
  logo?: string;
  description?: string;
  entryYears?: number;
  projectsCount?: number;
  rating?: number;
  status?: 'active' | 'inactive';
  remark?: string;
}

interface UpdateDeveloperInput {
  name?: string;
  logo?: string;
  description?: string;
  entryYears?: number;
  projectsCount?: number;
  rating?: number;
  status?: 'active' | 'inactive';
  remark?: string;
}

export const createResolvers = () => ({
  Query: {
    developers: async (_parent: unknown, args: { page?: number; pageSize?: number; keyword?: string; status?: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const { page = 1, pageSize = 10, keyword, status } = args;

      let filtered = [...mockDevelopers];

      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filtered = filtered.filter(
          (d) =>
            d.name.toLowerCase().includes(lowerKeyword) ||
            d.description.toLowerCase().includes(lowerKeyword)
        );
      }

      if (status) {
        filtered = filtered.filter((d) => d.status === status);
      }

      const total = filtered.length;
      const start = (page - 1) * pageSize;
      const paged = filtered.slice(start, start + pageSize);

      return {
        list: paged,
        total,
        page,
        pageSize,
        hasMore: start + pageSize < total,
      };
    },

    developer: async (_parent: unknown, args: { id: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockDevelopers.find((d) => d.id === args.id) || null;
    },
  },

  Mutation: {
    createDeveloper: async (_parent: unknown, args: { input: CreateDeveloperInput }) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const { input } = args;
      const nowTs = Date.now();
      const newDeveloper: Developer = {
        id: String(nowTs),
        name: input.name,
        logo: input.logo || '',
        description: input.description || '',
        entryYears: input.entryYears || 0,
        projectsCount: input.projectsCount || 0,
        rating: input.rating || 0,
        status: input.status || 'active',
        remark: input.remark || '',
        createdAt: nowTs,
        updatedAt: nowTs,
      };
      mockDevelopers.unshift(newDeveloper);
      return newDeveloper;
    },

    updateDeveloper: async (_parent: unknown, args: { id: string; input: UpdateDeveloperInput }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const index = mockDevelopers.findIndex((d) => d.id === args.id);
      if (index === -1) {
        throw new Error(`Developer with id ${args.id} not found`);
      }
      mockDevelopers[index] = {
        ...mockDevelopers[index],
        ...args.input,
        updatedAt: Date.now(),
      };
      return mockDevelopers[index];
    },

    deleteDeveloper: async (_parent: unknown, args: { id: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const index = mockDevelopers.findIndex((d) => d.id === args.id);
      if (index === -1) {
        throw new Error(`Developer with id ${args.id} not found`);
      }
      mockDevelopers.splice(index, 1);
      return true;
    },

    batchDeleteDevelopers: async (_parent: unknown, args: { ids: string[] }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let deletedCount = 0;
      for (const id of args.ids) {
        const index = mockDevelopers.findIndex((d) => d.id === id);
        if (index !== -1) {
          mockDevelopers.splice(index, 1);
          deletedCount++;
        }
      }
      return { success: true, deletedCount };
    },
  },

  Subscription: {
    developerCreated: {
      subscribe: () => {
        throw new Error('Subscriptions require a real WebSocket server. This is a mock.');
      },
    },
    developerUpdated: {
      subscribe: () => {
        throw new Error('Subscriptions require a real WebSocket server. This is a mock.');
      },
    },
    developerDeleted: {
      subscribe: () => {
        throw new Error('Subscriptions require a real WebSocket server. This is a mock.');
      },
    },
  },
});