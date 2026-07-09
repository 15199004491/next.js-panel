import { useState, useCallback } from 'react';
import type { Newhouse } from '../models';
import { mockGetNewhouses, mockGetNewhouseById, mockCreateNewhouse, mockUpdateNewhouse, mockDeleteNewhouse } from '../mock';

export const useNewhouseStore = () => {
  const [newhouses, setNewhouses] = useState<Newhouse[]>([]);
  const [newhouse, setNewhouse] = useState<Newhouse | null>(null);
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
      setError(err instanceof Error ? err.message : '获取新房列表失败');
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
      if (!item) throw new Error('新房不存在');
      setNewhouse(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取新房失败');
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
      setError(err instanceof Error ? err.message : '创建新房失败');
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
      if (!updated) throw new Error('新房不存在');
      setNewhouses(prev => prev.map(item => item.id === id ? updated : item));
      if (newhouse?.id === id) setNewhouse(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新新房失败');
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
      if (!success) throw new Error('删除失败');
      setNewhouses(prev => prev.filter(item => item.id !== id));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除新房失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearNewhouse = useCallback(() => setNewhouse(null), []);

  return {
    newhouses, newhouse, pagination, loading, error,
    fetchNewhouses, fetchNewhouseById, handleCreateNewhouse, handleUpdateNewhouse, handleDeleteNewhouse, clearNewhouse,
  };
};