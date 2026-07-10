import { useState, useCallback } from 'react';
import type { Newhouse, Developer } from '../models';
import { mockGetNewhouses, mockGetNewhouseById, mockCreateNewhouse, mockUpdateNewhouse, mockDeleteNewhouse, mockGetDevelopers, mockGetDeveloperById, mockCreateDeveloper, mockUpdateDeveloper, mockDeleteDeveloper } from '../mock';

export const useNewhouseStore = () => {
  const [newhouses, setNewhouses] = useState<Newhouse[]>([]);
  const [newhouse, setNewhouse] = useState<Newhouse | null>(null);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewhouses = useCallback(async (page: number, pageSize: number, keyword?: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = mockGetNewhouses(page, pageSize, keyword);
      setNewhouses(response.list);
      setPagination({ total: response.total, page: response.page, pageSize: response.pageSize });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch newhouses');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNewhouseById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const item = mockGetNewhouseById(id);
      if (!item) throw new Error('Newhouse not found');
      setNewhouse(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch newhouse');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateNewhouse = useCallback(async (data: Omit<Newhouse, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newItem = mockCreateNewhouse(data);
      setNewhouses(prev => [newItem, ...prev]);
      setPagination(prev => ({ ...prev, total: prev.total + 1 }));
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create newhouse');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateNewhouse = useCallback(async (id: string, data: Partial<Newhouse>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const updated = mockUpdateNewhouse(id, data);
      if (!updated) throw new Error('Newhouse not found');
      setNewhouses(prev => prev.map(item => item.id === id ? updated : item));
      if (newhouse?.id === id) setNewhouse(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update newhouse');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [newhouse]);

  const handleDeleteNewhouse = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const success = mockDeleteNewhouse(id);
      if (!success) throw new Error('Delete failed');
      setNewhouses(prev => prev.filter(item => item.id !== id));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete newhouse');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearNewhouse = useCallback(() => setNewhouse(null), []);

  const fetchDevelopers = useCallback(async (page: number, pageSize: number, keyword?: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = mockGetDevelopers(page, pageSize, keyword);
      setDevelopers(response.list);
      setPagination({ total: response.total, page: response.page, pageSize: response.pageSize });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch developers');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDeveloperById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const item = mockGetDeveloperById(id);
      if (!item) throw new Error('Developer not found');
      setDeveloper(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch developer');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateDeveloper = useCallback(async (data: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newItem = mockCreateDeveloper(data);
      setDevelopers(prev => [newItem, ...prev]);
      setPagination(prev => ({ ...prev, total: prev.total + 1 }));
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create developer');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateDeveloper = useCallback(async (id: string, data: Partial<Developer>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const updated = mockUpdateDeveloper(id, data);
      if (!updated) throw new Error('Developer not found');
      setDevelopers(prev => prev.map(item => item.id === id ? updated : item));
      if (developer?.id === id) setDeveloper(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update developer');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [developer]);

  const handleDeleteDeveloper = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const success = mockDeleteDeveloper(id);
      if (!success) throw new Error('Delete failed');
      setDevelopers(prev => prev.filter(item => item.id !== id));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete developer');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearDeveloper = useCallback(() => setDeveloper(null), []);

  return {
    newhouses, newhouse, developers, developer, pagination, loading, error,
    fetchNewhouses, fetchNewhouseById, handleCreateNewhouse, handleUpdateNewhouse, handleDeleteNewhouse, clearNewhouse,
    fetchDevelopers, fetchDeveloperById, handleCreateDeveloper, addDeveloper: handleCreateDeveloper, handleUpdateDeveloper, handleDeleteDeveloper, clearDeveloper,
  };
};