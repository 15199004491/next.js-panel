'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Star, Plus, Trash2 } from 'lucide-react';
import { useNewhouseStore } from '@/src/modules/newhouse/store';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { Checkbox } from '@/src/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/src/ui/table';
import { Badge } from '@/src/ui/badge';
import { Card, CardContent } from '@/src/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/src/ui/dialog';
import { TableSkeleton } from '@/src/components/table-skeleton';
import { Pagination } from '@/src/components/pagination';
import CreateModal from '../components/CreateModal';
import { generateCode, generateContactPhone, generateTotalPayment, generateUpdatedBy } from '@/src/modules/newhouse/mock';

// Column configuration with cell renderers
const columns = [
  { 
    key: 'code', 
    label: 'Code', 
    width: 'w-28',
    render: (dev: typeof developers[0]) => (
      <span className="text-sm text-muted-foreground">{generateCode(dev.id)}</span>
    ),
  },
  { 
    key: 'name', 
    label: 'Name', 
    width: 'w-[300px]',
    render: (dev: typeof developers[0]) => (
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
    render: (dev: typeof developers[0]) => <span className="text-sm">{dev.entryYears}</span>,
  },
  { 
    key: 'projectsCount', 
    label: 'Projects', 
    width: 'w-24',
    render: (dev: typeof developers[0]) => (
      <Link href="/newhouses" className="inline-flex items-center gap-1 text-primary hover:text-primary/80">
        {dev.projectsCount}
        <ExternalLink className="w-3 h-3" />
      </Link>
    ),
  },
  { 
    key: 'rating', 
    label: 'Rating', 
    width: 'w-20',
    render: (dev: typeof developers[0]) => (
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
    render: (dev: typeof developers[0]) => (
      <Badge variant={dev.status === 'active' ? 'success' : 'secondary'}>
        {dev.status === 'active' ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  { 
    key: 'contactPhone', 
    label: 'Contact Phone', 
    width: 'w-44',
    render: (dev: typeof developers[0]) => (
      <span className="text-sm text-muted-foreground">{generateContactPhone(dev.id)}</span>
    ),
  },
  { 
    key: 'totalPayment', 
    label: 'Total Payment', 
    width: 'w-36',
    render: (dev: typeof developers[0]) => (
      <span className="text-sm text-muted-foreground">${generateTotalPayment(dev.id)}</span>
    ),
  },
  { 
    key: 'updatedBy', 
    label: 'Updated', 
    width: 'w-[450px]',
    render: (dev: typeof developers[0]) => (
      <span className="text-sm text-muted-foreground">{generateUpdatedBy(dev.id)}</span>
    ),
  },
  { 
    key: 'remark', 
    label: 'Remark', 
    width: 'w-[400px]',
    render: (dev: typeof developers[0]) => (
      <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
        {dev.remark}
      </div>
    ),
  },
];

export default function DeveloperList() {
  const [keyword, setKeyword] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [batchDeleteConfirm, setBatchDeleteConfirm] = useState(false);
  const { developers, pagination, loading, error, fetchDevelopers, handleDeleteDeveloper } = useNewhouseStore();

  const isAllSelected = developers.length > 0 && developers.every(dev => selectedIds.has(dev.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(developers.map(dev => dev.id)));
    }
  };

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  useEffect(() => {
    fetchDevelopers(pagination.page, pagination.pageSize, keyword);
  }, []);

  const handleSearch = () => {
    fetchDevelopers(1, pagination.pageSize, keyword);
  };

  const handlePageChange = (page: number) => {
    fetchDevelopers(page, pagination.pageSize, keyword);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirm({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await handleDeleteDeveloper(deleteConfirm.id);
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
      for (const id of selectedIds) {
        await handleDeleteDeveloper(id);
      }
      setSelectedIds(new Set());
      setBatchDeleteConfirm(false);
    } catch (err) {
      console.error('Batch delete failed:', err);
    }
  };

  const handleCancelBatchDelete = () => {
    setBatchDeleteConfirm(false);
  };

  const columnsWithActions = [
    ...columns,
    {
      key: 'actions',
      label: 'Actions',
      width: 'w-32',
      render: (dev: typeof developers[0]) => (
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
      {/* Header */}
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

      {/* Card with Table */}
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
                      <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
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
                      <Checkbox checked={selectedIds.has(developer.id)} onCheckedChange={() => handleSelect(developer.id)} />
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

      {/* Pagination */}
      <div className="flex justify-end">
        <Pagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Delete Confirm Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && handleCancelDelete()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium">{deleteConfirm?.name}</span>?
              <span className="block mt-2">This action cannot be undone.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Delete Confirm Modal */}
      <Dialog open={batchDeleteConfirm} onOpenChange={(open) => !open && handleCancelBatchDelete()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Batch Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium">{selectedIds.size}</span> developers?
              <span className="block mt-2">This action cannot be undone.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={handleCancelBatchDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmBatchDelete}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Modal */}
      <CreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}