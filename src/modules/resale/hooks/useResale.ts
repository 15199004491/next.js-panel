import { useState, useCallback, useRef } from 'react';
import type { ResaleProperty, PaginationResponse } from '@/src/modules/resale/models';
import { resaleApi } from '@/src/modules/resale/api/resaleApi';

export function useResale() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<ResaleProperty[]>([]);
  const [property, setProperty] = useState<ResaleProperty | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const fetchIdRef = useRef(0);

  const fetchResaleProperties = useCallback(async (page: number, pageSize: number, keyword?: string, region?: string[]) => {
    const currentFetchId = ++fetchIdRef.current;
    setLoading(true);
    setError(null);
    setProperties([]);
    try {
      const response: PaginationResponse<ResaleProperty> = await resaleApi.getList(page, pageSize, keyword, region);
      if (currentFetchId === fetchIdRef.current) {
        setProperties(response.list);
        setPagination({ page: response.page, pageSize: response.pageSize, total: response.total });
        setSelectedIds(new Set());
      }
      return response;
    } catch (err) {
      if (currentFetchId === fetchIdRef.current) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch resale properties';
        setError(errorMsg);
      }
      throw err;
    } finally {
      if (currentFetchId === fetchIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const fetchResalePropertyById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resaleApi.getById(id);
      setProperty(data);
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch resale property';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createResaleProperty = useCallback(async (data: Omit<ResaleProperty, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const newProperty = await resaleApi.create(data);
      setProperties(prev => [newProperty, ...prev]);
      setPagination(prev => ({ ...prev, total: prev.total + 1 }));
      return newProperty;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create resale property';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateResaleProperty = useCallback(async (id: string, data: Partial<ResaleProperty>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await resaleApi.update(id, data);
      setProperties(prev => prev.map(prop => prop.id === id ? updated : prop));
      return updated;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update resale property';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteResaleProperty = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await resaleApi.delete(id);
      if (!success) throw new Error('Delete failed');
      setProperties(prev => prev.filter(prop => prop.id !== id));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      setSelectedIds(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(id);
        return newSelected;
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete resale property';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const batchDeleteResaleProperties = useCallback(async (ids: Set<string>) => {
    setLoading(true);
    setError(null);
    try {
      for (const id of ids) {
        const success = await resaleApi.delete(id);
        if (!success) throw new Error(`Failed to delete property ${id}`);
      }
      setProperties(prev => prev.filter(prop => !ids.has(prop.id)));
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

  const selectAll = useCallback(() => {
    if (properties.length > 0 && properties.every(prop => selectedIds.has(prop.id))) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(properties.map(prop => prop.id)));
    }
  }, [properties, selectedIds]);

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

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    properties,
    property,
    loading,
    error,
    pagination,
    selectedIds,
    isAllSelected: properties.length > 0 && properties.every(prop => selectedIds.has(prop.id)),
    
    fetchResaleProperties,
    fetchResalePropertyById,
    createResaleProperty,
    updateResaleProperty,
    deleteResaleProperty,
    batchDeleteResaleProperties,
    selectAll,
    toggleSelect,
    clearSelection,
  };
}