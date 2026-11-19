import { useQuery, useMutation, useApolloClient } from '@apollo/client/react';
import { useCallback } from 'react';
import type { Developer } from '@/src/modules/newhouse/models';
import {
  GET_DEVELOPERS,
  CREATE_DEVELOPER,
  UPDATE_DEVELOPER,
  DELETE_DEVELOPER,
  BATCH_DELETE_DEVELOPERS,
} from '@/src/modules/demo/api/graphql';

interface DevelopersQueryVariables {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: string;
}

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

export function useGraphqlDevelopers() {
  const client = useApolloClient();

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
    refetch,
    fetchMore,
  } = useQuery<{
    developers: {
      list: Developer[];
      total: number;
      page: number;
      pageSize: number;
      hasMore: boolean;
    };
  }, DevelopersQueryVariables>(GET_DEVELOPERS, {
    variables: { page: 1, pageSize: 10 },
    notifyOnNetworkStatusChange: true,
  });

  const [createDeveloperMut, { loading: createLoading }] = useMutation<{
    createDeveloper: Developer;
  }, { input: CreateDeveloperInput }>(CREATE_DEVELOPER);

  const [updateDeveloperMut, { loading: updateLoading }] = useMutation<{
    updateDeveloper: Developer;
  }, { id: string; input: UpdateDeveloperInput }>(UPDATE_DEVELOPER);

  const [deleteDeveloperMut, { loading: deleteLoading }] = useMutation<{
    deleteDeveloper: boolean;
  }, { id: string }>(DELETE_DEVELOPER);

  const [batchDeleteMut, { loading: batchDeleteLoading }] = useMutation<{
    batchDeleteDevelopers: { success: boolean; deletedCount: number };
  }, { ids: string[] }>(BATCH_DELETE_DEVELOPERS);

  const fetchDevelopers = useCallback(
    (page: number, pageSize: number, keyword?: string, status?: string) => {
      return refetch({ page, pageSize, keyword, status });
    },
    [refetch]
  );

  const handleSearch = useCallback(
    (keyword: string, status?: string) => {
      return refetch({ page: 1, pageSize: 10, keyword, status });
    },
    [refetch]
  );

  const handlePageChange = useCallback(
    (page: number, pageSize: number, keyword?: string, status?: string) => {
      return refetch({ page, pageSize, keyword, status });
    },
    [refetch]
  );

  const createDeveloper = useCallback(
    async (input: CreateDeveloperInput) => {
      const result = await createDeveloperMut({
        variables: { input },
        update(cache, { data }) {
          if (!data) return;
          const newDev = data.createDeveloper;
          cache.modify({
            id: cache.identify({ __typename: 'Developer', id: 'ROOT_QUERY' }),
            fields: {
              developers(existingRefs, { readField }) {
                return [newDev, ...existingRefs];
              },
            },
          });
        },
        awaitRefetchQueries: true,
        refetchQueries: [{ query: GET_DEVELOPERS, variables: { page: 1, pageSize: 10 } }],
      });
      return result.data?.createDeveloper;
    },
    [createDeveloperMut]
  );

  const updateDeveloper = useCallback(
    async (id: string, input: UpdateDeveloperInput) => {
      const result = await updateDeveloperMut({
        variables: { id, input },
        update(cache, { data }) {
          if (!data) return;
          cache.writeFragment({
            id: cache.identify({ __typename: 'Developer', id }),
            fragment: null,
            data: data.updateDeveloper,
          });
        },
        refetchQueries: [{ query: GET_DEVELOPERS, variables: { page: 1, pageSize: 10 } }],
      });
      return result.data?.updateDeveloper;
    },
    [updateDeveloperMut]
  );

  const deleteDeveloper = useCallback(
    async (id: string) => {
      const result = await deleteDeveloperMut({
        variables: { id },
        update(cache) {
          cache.evict({ id: cache.identify({ __typename: 'Developer', id }) });
          cache.gc();
        },
        refetchQueries: [{ query: GET_DEVELOPERS, variables: { page: 1, pageSize: 10 } }],
      });
      return result.data?.deleteDeveloper;
    },
    [deleteDeveloperMut]
  );

  const batchDeleteDevelopers = useCallback(
    async (ids: string[]) => {
      const result = await batchDeleteMut({
        variables: { ids },
        update(cache) {
          ids.forEach((id) => {
            cache.evict({ id: cache.identify({ __typename: 'Developer', id }) });
          });
          cache.gc();
        },
        refetchQueries: [{ query: GET_DEVELOPERS, variables: { page: 1, pageSize: 10 } }],
      });
      return result.data?.batchDeleteDevelopers;
    },
    [batchDeleteMut]
  );

  const loading = queryLoading || createLoading || updateLoading || deleteLoading || batchDeleteLoading;

  return {
    developers: queryData?.developers.list ?? [],
    total: queryData?.developers.total ?? 0,
    page: queryData?.developers.page ?? 1,
    pageSize: queryData?.developers.pageSize ?? 10,
    hasMore: queryData?.developers.hasMore ?? false,
    loading,
    error: queryError,
    fetchDevelopers,
    handleSearch,
    handlePageChange,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper,
    batchDeleteDevelopers,
    client,
  };
}