import { useState, useCallback } from 'react';
import { useRestDevelopers } from '@/src/modules/demo/hooks/useRestDevelopers';
import { DemoTable } from '@/src/modules/demo/components/DemoTable';
import { DeveloperModal } from '@/src/modules/demo/components/DeveloperModal';
import { Card, CardContent } from '@/src/ui/card';
import { CheckCircle2, AlertCircle, Database } from 'lucide-react';

const REST_CODE_SNIPPET = `// REST API Pattern
// 1. Fetch data with async/await
const response = await fetch('/api/developers?page=1&pageSize=10');
const data = await response.json();

// 2. Create
await fetch('/api/developers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

// 3. Update
await fetch(\`/api/developers/\${id}\`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updateData),
});

// 4. Delete
await fetch(\`/api/developers/\${id}\`, {
  method: 'DELETE',
});

// 5. Error handling
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return await res.json();
} catch (err) {
  console.error('API Error:', err);
}`;

export function RestDemo() {
  const {
    developers,
    loading,
    error,
    pagination,
    keyword,
    statusFilter,
    setKeyword,
    setStatusFilter,
    handleSearch,
    handlePageChange,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper,
    fetchDevelopers,
  } = useRestDevelopers();

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
              <Database className="w-4 h-4 text-blue-500" />
              <span className="font-medium">REST API</span>
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
              Endpoint: <code className="bg-muted px-1.5 py-0.5 rounded">/api/developers</code>
            </div>
            <div className="text-muted-foreground">
              Method: <code className="bg-muted px-1.5 py-0.5 rounded">GET / POST / PUT / DELETE</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <DemoTable
        title="REST API Demo"
        description="Standard REST API with HTTP methods (GET, POST, PUT, DELETE), query parameters, and JSON body"
        accentColor="#3b82f6"
        developers={developers}
        loading={loading}
        error={error}
        total={pagination.total}
        page={pagination.page}
        pageSize={pagination.pageSize}
        keyword={keyword}
        statusFilter={statusFilter}
        onKeywordChange={setKeyword}
        onStatusChange={setStatusFilter}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onCreate={handleCreate}
        onUpdate={handleEdit}
        onDelete={handleDelete}
        onRefresh={() => fetchDevelopers()}
        codeSnippet={REST_CODE_SNIPPET}
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