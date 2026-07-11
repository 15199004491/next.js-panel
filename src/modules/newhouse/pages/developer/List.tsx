'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Star, Plus, Trash2 } from 'lucide-react';
import { useDeveloper } from '@/src/modules/newhouse/hooks/useDeveloper';
import { useAppStore } from '@/src/core/store';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { Checkbox } from '@/src/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/src/ui/table';
import { Badge } from '@/src/ui/badge';
import { Card, CardContent } from '@/src/ui/card';
import { TableSkeleton } from '@/src/components/table-skeleton';
import { Pagination } from '@/src/components/pagination';
import DeveloperCreateModal from '@/src/modules/newhouse/components/DeveloperCreateModal';
import { ConfirmDialog } from '@/src/components/confirm-dialog';
import { generateCode, generateContactPhone, generateTotalPayment } from '@/src/modules/newhouse/mock';
import { formatTimestamp } from '@/src/lib/format';
import type { Developer } from '@/src/modules/newhouse/models';

const columns = [
  { 
    key: 'code', 
    label: 'Code', 
    width: 'w-28',
    render: (dev: Developer) => (
      <span className="text-sm text-muted-foreground">{generateCode(dev.id)}</span>
    ),
  },
  { 
    key: 'name', 
    label: 'Name', 
    width: 'w-[300px]',
    render: (dev: Developer) => (
      <>
        <div className="font-medium">{dev.name}</div>
        <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
          {dev.description}
        </div>
      </>
    ),
  },
  { 
    key: 'entryYears', 
    label: 'Years', 
    width: 'w-52',
    render: (dev: Developer) => <span className="text-sm">{dev.entryYears}</span>,
  },
  { 
    key: 'projectsCount', 
    label: 'Projects', 
    width: 'w-24',
    render: (dev: Developer) => (
      <Link href={`/newhouses?developer=${encodeURIComponent(dev.name)}`} className="inline-flex items-center gap-1 text-primary hover:text-primary/80">
        {dev.projectsCount}
        <ExternalLink className="w-3 h-3" />
      </Link>
    ),
  },
  { 
    key: 'rating', 
    label: 'Rating', 
    width: 'w-20',
    render: (dev: Developer) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="text-sm">{dev.rating}</span>
      </div>
    ),
  },
  { 
    key: 'status', 
    label: 'Status', 
    width: 'w-20',
    render: (dev: Developer) => (
      <Badge variant={dev.status === 'active' ? 'success' : 'secondary'}>
        {dev.status === 'active' ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  { 
    key: 'contactPhone', 
    label: 'Contact Phone', 
    width: 'w-44',
    render: (dev: Developer) => (
      <span className="text-sm text-muted-foreground">{generateContactPhone(dev.id)}</span>
    ),
  },
  { 
    key: 'totalPayment', 
    label: 'Total Payment', 
    width: 'w-36',
    render: (dev: Developer) => (
      <span className="text-sm text-muted-foreground">${generateTotalPayment(dev.id)}</span>
    ),
  },
  { 
    key: 'updatedAt', 
    label: 'Updated', 
    width: 'w-[200px]',
    render: (dev: Developer) => (
      <span className="text-sm whitespace-nowrap">{formatTimestamp(dev.updatedAt)}</span>
    ),
  },
  { 
    key: 'remark', 
    label: 'Remark', 
    width: 'w-[400px]',
    render: (dev: Developer) => (
      <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
        {dev.remark}
      </div>
    ),
  },
];

export default function DeveloperList() {
  const [keyword, setKeyword] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [batchDeleteConfirm, setBatchDeleteConfirm] = useState(false);
  
  const { state } = useAppStore();
  const { selectedRegion } = state;
  
  const {
    developers,
    pagination,
    loading,
    error,
    selectedIds,
    isAllSelected,
    fetchDevelopers,
    deleteDeveloper,
    batchDeleteDevelopers,
    selectAll,
    toggleSelect,
    clearSelection,
  } = useDeveloper();

  useEffect(() => {
    fetchDevelopers(pagination.page, pagination.pageSize, keyword, selectedRegion);
  }, []);

  useEffect(() => {
    fetchDevelopers(1, pagination.pageSize, keyword, selectedRegion);
  }, [selectedRegion]);

  const handleSearch = () => {
    fetchDevelopers(1, pagination.pageSize, keyword, selectedRegion);
  };

  const handlePageChange = (page: number) => {
    fetchDevelopers(page, pagination.pageSize, keyword, selectedRegion);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirm({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteDeveloper(deleteConfirm.id);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleBatchDeleteClick = () => {
    if (selectedIds.size > 0) {
      setBatchDeleteConfirm(true);
    }
  };

  const handleConfirmBatchDelete = async () => {
    try {
      await batchDeleteDevelopers(selectedIds);
      setBatchDeleteConfirm(false);
    } catch (err) {
      console.error('Batch delete failed:', err);
    }
  };

  const handleCancelBatchDelete = () => {
    setBatchDeleteConfirm(false);
  };

  const handleCreateSuccess = () => {
    fetchDevelopers(pagination.page, pagination.pageSize, keyword, selectedRegion);
    setIsCreateModalOpen(false);
  };

  const getDeleteDescription = () => {
    const target = <span className="font-medium">{deleteConfirm ? deleteConfirm.name : selectedIds.size}</span>;
    return (
      <>
        Are you sure you want to delete {target}?
        <span className="block mt-2">This action cannot be undone.</span>
      </>
    );
  };

  const columnsWithActions = [
    ...columns,
    {
      key: 'actions',
      label: 'Actions',
      width: 'w-32',
      render: (dev: Developer) => (
        <div className="flex items-center gap-2">
          <Link 
            href={`/developers/${dev.id}/edit?readonly=true`}
            className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
          >
            Detail
          </Link>
          <Link 
            href={`/developers/${dev.id}/edit`}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive/80 p-0 h-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(dev.id, dev.name);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Developers</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search developers..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-64 pl-10"
            />
          </div>
          <Button onClick={handleSearch} variant="outline">
            <Search className="w-4 h-4" />
            Search
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Create
          </Button>
          <Button 
            onClick={handleBatchDeleteClick} 
            variant="destructive"
            disabled={selectedIds.size === 0}
          >
            <Trash2 className="w-4 h-4" />
            Delete ({selectedIds.size})
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <TableSkeleton columns={columnsWithActions} />
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <div className="flex items-center h-full">
                      <Checkbox checked={isAllSelected} onCheckedChange={selectAll} />
                    </div>
                  </TableHead>
                  {columnsWithActions.map((column) => (
                    <TableHead key={column.key} className={`${column.width} whitespace-nowrap`}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {developers.map((developer) => (
                  <TableRow key={developer.id}>
                    <TableCell className="w-12">
                      <Checkbox checked={selectedIds.has(developer.id)} onCheckedChange={() => toggleSelect(developer.id)} />
                    </TableCell>
                    {columnsWithActions.map((column) => (
                      <TableCell key={column.key} className={column.key === 'actions' ? 'whitespace-nowrap' : ''}>
                        {column.render?.(developer)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>
                Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{' '}
                {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
                {pagination.total} developers
              </TableCaption>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Pagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmDialog
        open={!!deleteConfirm || batchDeleteConfirm}
        onClose={() => {
          setDeleteConfirm(null);
          setBatchDeleteConfirm(false);
        }}
        title={deleteConfirm ? 'Confirm Delete' : 'Confirm Batch Delete'}
        description={getDeleteDescription()}
        confirmText={deleteConfirm ? 'Delete' : 'Delete All'}
        onConfirm={deleteConfirm ? handleConfirmDelete : handleConfirmBatchDelete}
      />

      <DeveloperCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}