import { useState, useCallback, useRef, useEffect } from 'react';
import type { Developer, PaginationResponse } from '@/src/modules/newhouse/models';
import { restClient } from '@/src/modules/demo/api/restClient';

export function useRestDevelopers() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const fetchIdRef = useRef(0);

  const fetchDevelopers = useCallback(
    async (page?: number, pageSize?: number, kw?: string, status?: string) => {
      const currentFetchId = ++fetchIdRef.current;
      setLoading(true);
      setError(null);

      try {
        const targetPage = page ?? pagination.page;
        const targetPageSize = pageSize ?? pagination.pageSize;
        const targetKw = kw ?? keyword;
        const targetStatus = status ?? statusFilter;

        const response: PaginationResponse<Developer> = await restClient.getDevelopers(
          targetPage,
          targetPageSize,
          targetKw,
          targetStatus
        );

        if (currentFetchId === fetchIdRef.current) {
          setDevelopers(response.list);
          setPagination({
            page: response.page,
            pageSize: response.pageSize,
            total: response.total,
          });
        }
        return response;
      } catch (err) {
        if (currentFetchId === fetchIdRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to fetch developers');
        }
        throw err;
      } finally {
        if (currentFetchId === fetchIdRef.current) {
          setLoading(false);
        }
      }
    },
    [pagination.page, pagination.pageSize, keyword, statusFilter]
  );

  useEffect(() => {
    fetchDevelopers(1, 10);
  }, []);

  const handleSearch = useCallback(() => {
    fetchDevelopers(1, pagination.pageSize, keyword, statusFilter);
  }, [fetchDevelopers, pagination.pageSize, keyword, statusFilter]);

  const handlePageChange = useCallback(
    (page: number) => {
      fetchDevelopers(page, pagination.pageSize, keyword, statusFilter);
    },
    [fetchDevelopers, pagination.pageSize, keyword, statusFilter]
  );

  const createDeveloper = useCallback(
    async (data: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>) => {
      setLoading(true);
      setError(null);
      try {
        const newDev = await restClient.createDeveloper(data);
        setDevelopers((prev) => [newDev, ...prev]);
        setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
        return newDev;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to create developer';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateDeveloper = useCallback(
    async (id: string, data: Partial<Developer>) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await restClient.updateDeveloper(id, data);
        setDevelopers((prev) => prev.map((d) => (d.id === id ? updated : d)));
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to update developer';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteDeveloper = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await restClient.deleteDeveloper(id);
        setDevelopers((prev) => prev.filter((d) => d.id !== id));
        setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to delete developer';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    developers,
    loading,
    error,
    pagination,
    keyword,
    statusFilter,
    setKeyword,
    setStatusFilter,
    fetchDevelopers,
    handleSearch,
    handlePageChange,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper,
  };
}