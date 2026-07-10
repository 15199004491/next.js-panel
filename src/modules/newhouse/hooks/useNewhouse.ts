'use client';

import { useState, useCallback } from 'react';
import { newhouseApi } from '../api/newhouseApi';
import type { Newhouse, PaginationResponse } from '../models';

interface UseNewhouseReturn {
  newhouses: Newhouse[];
  newhouse: Newhouse | null;
  pagination: { page: number; pageSize: number; total: number };
  loading: boolean;
  error: string | null;
  selectedIds: Set<string>;
  isAllSelected: boolean;
  fetchNewhouses: (page: number, pageSize: number, keyword?: string) => Promise<void>;
  fetchNewhouseById: (id: string) => Promise<void>;
  createNewhouse: (data: Omit<Newhouse, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Newhouse>;
  updateNewhouse: (id: string, data: Partial<Newhouse>) => Promise<Newhouse>;
  deleteNewhouse: (id: string) => Promise<void>;
  batchDeleteNewhouses: (ids: Set<string>) => Promise<void>;
  selectAll: (checked: boolean) => void;
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
}

export function useNewhouse(): UseNewhouseReturn {
  const [newhouses, setNewhouses] = useState<Newhouse[]>([]);
  const [newhouse, setNewhouse] = useState<Newhouse | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const fetchNewhouses = useCallback(async (page: number, pageSize: number, keyword?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result: PaginationResponse<Newhouse> = await newhouseApi.getList(page, pageSize, keyword);
      setNewhouses(result.list);
      setPagination({ page: result.page, pageSize: result.pageSize, total: result.total });
      setSelectedIds(new Set());
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
      const result = await newhouseApi.getById(id);
      setNewhouse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch newhouse');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewhouse = useCallback(async (data: Omit<Newhouse, 'id' | 'createdAt' | 'updatedAt'>) => {
    return newhouseApi.create(data);
  }, []);

  const updateNewhouse = useCallback(async (id: string, data: Partial<Newhouse>) => {
    return newhouseApi.update(id, data);
  }, []);

  const deleteNewhouse = useCallback(async (id: string) => {
    await newhouseApi.delete(id);
    setNewhouses(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    setPagination(prev => ({ ...prev, total: prev.total - 1 }));
  }, []);

  const batchDeleteNewhouses = useCallback(async (ids: Set<string>) => {
    for (const id of ids) {
      await newhouseApi.delete(id);
    }
    setNewhouses(prev => prev.filter(item => !ids.has(item.id)));
    setSelectedIds(new Set());
    setPagination(prev => ({ ...prev, total: prev.total - ids.size }));
  }, []);

  const isAllSelected = newhouses.length > 0 && selectedIds.size === newhouses.length;

  const selectAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(newhouses.map(item => item.id)));
    } else {
      setSelectedIds(new Set());
    }
  }, [newhouses]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    newhouses,
    newhouse,
    pagination,
    loading,
    error,
    selectedIds,
    isAllSelected,
    fetchNewhouses,
    fetchNewhouseById,
    createNewhouse,
    updateNewhouse,
    deleteNewhouse,
    batchDeleteNewhouses,
    selectAll,
    toggleSelect,
    clearSelection,
  };
}