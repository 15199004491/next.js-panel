'use client';

import { useState, useCallback } from 'react';
import { useGraphqlDevelopers } from '@/src/modules/demo/hooks/useGraphqlDevelopers';
import { DemoTable } from '@/src/modules/demo/components/DemoTable';
import { DeveloperModal } from '@/src/modules/demo/components/DeveloperModal';
import { Card, CardContent } from '@/src/ui/card';
import { CheckCircle2, AlertCircle, Hexagon } from 'lucide-react';

const GRAPHQL_CODE_SNIPPET = `// GraphQL with Apollo Client
// Query: Fetch list with pagination and filtering
const { data, loading, error, refetch } = useQuery(GET_DEVELOPERS, {
  variables: { page: 1, pageSize: 10, keyword: 'Vanke' },
  notifyOnNetworkStatusChange: true,
});

// Mutation: Create with cache update
const [createDeveloper] = useMutation(CREATE_DEVELOPER, {
  update(cache, { data }) {
    cache.modify({
      fields: {
        developers(existingRefs) {
          return [data.createDeveloper, ...existingRefs];
        },
      },
    });
  },
  refetchQueries: [{ query: GET_DEVELOPERS }],
});

// Mutation: Delete with cache eviction
const [deleteDeveloper] = useMutation(DELETE_DEVELOPER, {
  update(cache, { id }) {
    cache.evict({ id: cache.identify({ __typename: 'Developer', id }) });
    cache.gc();
  },
  refetchQueries: [{ query: GET_DEVELOPERS }],
});

// In GraphQL, you request EXACTLY the fields you need:
query GetDevelopers($page: Int!, $pageSize: Int!) {
  developers(page: $page, pageSize: $pageSize) {
    list { id name rating status }
    total page pageSize hasMore
  }
}

// Mutations use input types for complex arguments:
mutation CreateDeveloper($input: CreateDeveloperInput!) {
  createDeveloper(input: $input) {
    id name status
  }
}`;

export function GraphqlDemo() {
  const {
    developers,
    total,
    page,
    pageSize,
    loading,
    error,
    fetchDevelopers,
    handleSearch,
    handlePageChange,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper,
  } = useGraphqlDevelopers();

  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editTarget, setEditTarget] = useState<any>(null);

  const handleCreate = useCallback(() => {
    setModalMode('create');
    setEditTarget(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((dev: any) => {
    setModalMode('edit');
    setEditTarget(dev);
    setModalOpen(true);
  }, []);

  const handleSearchClick = useCallback(() => {
    handleSearch(keyword, statusFilter);
  }, [handleSearch, keyword, statusFilter]);

  const handlePageChangeClick = useCallback(
    (p: number) => {
      handlePageChange(p, pageSize, keyword, statusFilter);
    },
    [handlePageChange, pageSize, keyword, statusFilter]
  );

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        if (modalMode === 'create') {
          await createDeveloper({
            name: data.name,
            logo: data.logo,
            description: data.description,
            entryYears: parseInt(data.entryYears) || 0,
            projectsCount: parseInt(data.projectsCount) || 0,
            rating: parseFloat(data.rating) || 0,
            status: data.status,
            remark: data.remark,
          });
        } else if (editTarget) {
          await updateDeveloper(editTarget.id, {
            name: data.name,
            logo: data.logo,
            description: data.description,
            entryYears: parseInt(data.entryYears) || 0,
            projectsCount: parseInt(data.projectsCount) || 0,
            rating: parseFloat(data.rating) || 0,
            status: data.status,
            remark: data.remark,
          });
        }
        setModalOpen(false);
      } catch (err) {
        console.error(err);
      }
    },
    [modalMode, editTarget, createDeveloper, updateDeveloper]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteDeveloper(id);
      } catch (err) {
        console.error(err);
      }
    },
    [deleteDeveloper]
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Hexagon className="w-4 h-4 text-pink-500" />
              <span className="font-medium">GraphQL (Apollo Client)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              {loading ? (
                <span className="text-amber-500">Loading...</span>
              ) : error ? (
                <span className="flex items-center gap-1 text-destructive">
                  <AlertCircle className="w-4 h-4" /> Error
                </span>
              ) : (
                <span className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 className="w-4 h-4" /> Ready
                </span>
              )}
            </div>
            <div className="text-muted-foreground">
              Schema: <code className="bg-muted px-1.5 py-0.5 rounded">SchemaLink (Mock)</code>
            </div>
            <div className="text-muted-foreground">
              Client: <code className="bg-muted px-1.5 py-0.5 rounded">ApolloClient + InMemoryCache</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <DemoTable
        title="GraphQL Demo"
        description="GraphQL with Apollo Client: Queries, Mutations, Cache Management, and Automatic Re-rendering"
        accentColor="#ec4899"
        developers={developers}
        loading={loading}
        error={error?.message || null}
        total={total}
        page={page}
        pageSize={pageSize}
        keyword={keyword}
        statusFilter={statusFilter}
        onKeywordChange={setKeyword}
        onStatusChange={setStatusFilter}
        onSearch={handleSearchClick}
        onPageChange={handlePageChangeClick}
        onCreate={handleCreate}
        onUpdate={handleEdit}
        onDelete={handleDelete}
        onRefresh={() => fetchDevelopers(page, pageSize, keyword, statusFilter)}
        codeSnippet={GRAPHQL_CODE_SNIPPET}
      />

      <DeveloperModal
        open={modalOpen}
        mode={modalMode}
        initialData={editTarget}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}