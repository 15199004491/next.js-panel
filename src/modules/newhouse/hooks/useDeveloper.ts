import { useState, useCallback } from 'react';
import type { Developer, PaginationResponse } from '../models';
import { developerApi } from '../api/developerApi';

export function useDeveloper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Fetch developers list
  const fetchDevelopers = useCallback(async (page: number, pageSize: number, keyword?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: PaginationResponse<Developer> = await developerApi.getList(page, pageSize, keyword);
      setDevelopers(response.list);
      setPagination({ page: response.page, pageSize: response.pageSize, total: response.total });
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch developers';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch developer by ID
  const fetchDeveloperById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await developerApi.getById(id);
      setDeveloper(data);
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch developer';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create developer
  const createDeveloper = useCallback(async (data: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const newDeveloper = await developerApi.create(data);
      setDevelopers(prev => [newDeveloper, ...prev]);
      setPagination(prev => ({ ...prev, total: prev.total + 1 }));
      return newDeveloper;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create developer';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update developer
  const updateDeveloper = useCallback(async (id: string, data: Partial<Developer>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await developerApi.update(id, data);
      setDevelopers(prev => prev.map(dev => dev.id === id ? updated : dev));
      return updated;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update developer';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete developer
  const deleteDeveloper = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await developerApi.delete(id);
      if (!success) throw new Error('Delete failed');
      setDevelopers(prev => prev.filter(dev => dev.id !== id));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      setSelectedIds(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(id);
        return newSelected;
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete developer';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Batch delete developers
  const batchDeleteDevelopers = useCallback(async (ids: Set<string>) => {
    setLoading(true);
    setError(null);
    try {
      for (const id of ids) {
        const success = await developerApi.delete(id);
        if (!success) throw new Error(`Failed to delete developer ${id}`);
      }
      setDevelopers(prev => prev.filter(dev => !ids.has(dev.id)));
      setPagination(prev => ({ ...prev, total: prev.total - ids.size }));
      setSelectedIds(new Set());
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Batch delete failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Select all developers
  const selectAll = useCallback(() => {
    if (developers.length > 0 && developers.every(dev => selectedIds.has(dev.id))) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(developers.map(dev => dev.id)));
    }
  }, [developers, selectedIds]);

  // Toggle select single developer
  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  }, []);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    // State
    developers,
    developer,
    loading,
    error,
    pagination,
    selectedIds,
    isAllSelected: developers.length > 0 && developers.every(dev => selectedIds.has(dev.id)),
    
    // Actions
    fetchDevelopers,
    fetchDeveloperById,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper,
    batchDeleteDevelopers,
    selectAll,
    toggleSelect,
    clearSelection,
  };
}