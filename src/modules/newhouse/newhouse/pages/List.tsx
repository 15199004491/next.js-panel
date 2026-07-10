'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, DollarSign, Plus, Trash2 } from 'lucide-react';
import { useNewhouse } from '@/src/modules/newhouse/hooks/useNewhouse';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { Checkbox } from '@/src/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/src/ui/table';
import { Badge } from '@/src/ui/badge';
import { Card, CardContent } from '@/src/ui/card';
import { TableSkeleton } from '@/src/components/table-skeleton';
import { Pagination } from '@/src/components/pagination';
import CreateModal from '../components/CreateModal';
import { ConfirmDialog } from '@/src/components/confirm-dialog';
import type { Newhouse } from '@/src/modules/newhouse/models';

const getDeveloperId = (developerName: string): string => {
  const developerMap: Record<string, string> = {
    'China Vanke': '1',
    'Evergrande Group': '2',
    'Country Garden': '3',
    'Poly Developments': '4',
    'Longfor Properties': '5',
    'Sunac China': '6',
  };
  return developerMap[developerName] || '1';
};

const columns = [
  { 
    key: 'name', 
    label: 'Name', 
    width: 'w-[200px]',
    render: (house: Newhouse) => (
      <div className="font-medium">{house.name}</div>
    ),
  },
  { 
    key: 'price', 
    label: 'Paid', 
    width: 'w-36',
    render: (house: Newhouse) => (
      <div className="flex items-center gap-1">
        <DollarSign className="w-3 h-3 text-muted-foreground" />
        <span className="text-sm font-medium">{house.price.toLocaleString()}</span>
      </div>
    ),
  },
  { 
    key: 'address', 
    label: 'Address', 
    width: 'w-[350px]',
    render: (house: Newhouse) => (
      <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
        {house.address}
      </div>
    ),
  },
  { 
    key: 'developer', 
    label: 'Developer', 
    width: 'w-[250px]',
    render: (house: Newhouse) => (
      <Link 
        href={`/developers/${getDeveloperId(house.developer)}/edit?readonly=true`}
        className="text-sm text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors cursor-pointer"
      >
        {house.developer}
      </Link>
    ),
  },
  { 
    key: 'contactPhone', 
    label: 'Contact Phone', 
    width: 'w-40',
    render: (house: Newhouse) => (
      <span className="text-sm">{house.contactPhone}</span>
    ),
  },
  { 
    key: 'status', 
    label: 'Status', 
    width: 'w-24',
    render: (house: Newhouse) => (
      <Badge 
        variant={house.status === 'available' ? 'success' : house.status === 'sold' ? 'destructive' : 'secondary'}
      >
        {house.status === 'available' ? 'Available' : house.status === 'sold' ? 'Sold' : 'Reserved'}
      </Badge>
    ),
  },
  { 
    key: 'description', 
    label: 'Description', 
    width: 'w-[250px]',
    render: (house: Newhouse) => (
      <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
        {house.description}
      </div>
    ),
  },
];

export default function NewhouseList() {
  const [keyword, setKeyword] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [batchDeleteConfirm, setBatchDeleteConfirm] = useState(false);
  
  const {
    newhouses,
    pagination,
    loading,
    error,
    selectedIds,
    isAllSelected,
    fetchNewhouses,
    deleteNewhouse,
    batchDeleteNewhouses,
    selectAll,
    toggleSelect,
    clearSelection,
  } = useNewhouse();

  useEffect(() => {
    fetchNewhouses(pagination.page, pagination.pageSize, keyword);
  }, []);

  const handleSearch = () => {
    fetchNewhouses(1, pagination.pageSize, keyword);
  };

  const handlePageChange = (page: number) => {
    fetchNewhouses(page, pagination.pageSize, keyword);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirm({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteNewhouse(deleteConfirm.id);
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
      await batchDeleteNewhouses(selectedIds);
      setBatchDeleteConfirm(false);
    } catch (err) {
      console.error('Batch delete failed:', err);
    }
  };

  const handleCancelBatchDelete = () => {
    setBatchDeleteConfirm(false);
  };

  const handleCreateSuccess = () => {
    fetchNewhouses(pagination.page, pagination.pageSize, keyword);
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
      render: (house: Newhouse) => (
        <div className="flex items-center gap-2">
          <Link 
            href={`/newhouses/${house.id}/edit?readonly=true`}
            className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
          >
            Detail
          </Link>
          <Link 
            href={`/newhouses/${house.id}/edit`}
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
              handleDeleteClick(house.id, house.name);
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
        <h2 className="text-2xl font-bold tracking-tight">Newhouses</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search newhouses..."
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
                {newhouses.map((house) => (
                  <TableRow key={house.id}>
                    <TableCell className="w-12">
                      <Checkbox checked={selectedIds.has(house.id)} onCheckedChange={() => toggleSelect(house.id)} />
                    </TableCell>
                    {columnsWithActions.map((column) => (
                      <TableCell key={column.key} className={column.key === 'actions' ? 'whitespace-nowrap' : ''}>
                        {column.render?.(house)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>
                Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{' '}
                {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
                {pagination.total} newhouses
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

      <CreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}