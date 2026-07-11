'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Trash2, Image, User } from 'lucide-react';
import { useResale } from '@/src/modules/resale/hooks/useResale';
import { useAppStore } from '@/src/core/store';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { Checkbox } from '@/src/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/src/ui/table';
import { Badge } from '@/src/ui/badge';
import { Card, CardContent } from '@/src/ui/card';
import { TableSkeleton } from '@/src/components/table-skeleton';
import { Pagination } from '@/src/components/pagination';
import ResaleCreateModal from '@/src/modules/resale/components/ResaleCreateModal';
import { ConfirmDialog } from '@/src/components/confirm-dialog';
import ImageViewer from '@/src/modules/resale/components/ImageViewer';
import { generateCode, formatPhoneNumber, generatePropertyImages } from '@/src/modules/resale/mock';
import { formatTimestamp, calculateDaysOnMarket } from '@/src/lib/format';
import type { ResaleProperty } from '@/src/modules/resale/models';

interface Column {
  key: string;
  label: string;
  width: string;
  render?: (prop: ResaleProperty, onImageClick?: (id: string) => void) => React.ReactNode;
}

const columns: Column[] = [
  { 
    key: 'code', 
    label: 'Code', 
    width: 'w-24',
    render: (prop) => (
      <span className="text-sm text-muted-foreground">{generateCode(prop.id)}</span>
    ),
  },
  { 
    key: 'title', 
    label: 'Community Name', 
    width: 'w-[280px]',
    render: (prop) => (
      <span className="font-medium whitespace-nowrap">{prop.title}</span>
    ),
  },
  { 
    key: 'price', 
    label: 'Price', 
    width: 'w-32',
    render: (prop) => (
      <span className="font-medium">${prop.price.toLocaleString()}</span>
    ),
  },
  { 
    key: 'area', 
    label: 'Area', 
    width: 'w-36',
    render: (prop) => (
      <span className="text-sm whitespace-nowrap">{prop.area} m²</span>
    ),
  },
  { 
    key: 'layout', 
    label: 'Layout', 
    width: 'w-20',
    render: (prop) => (
      <span className="text-sm font-medium">{prop.layout}</span>
    ),
  },
  { 
    key: 'floor', 
    label: 'Floor', 
    width: 'w-20',
    render: (prop) => (
      <span className="text-sm">{prop.floor}</span>
    ),
  },
  { 
    key: 'buildYear', 
    label: 'Build Year', 
    width: 'w-24',
    render: (prop) => (
      <span className="text-sm">{prop.buildYear}</span>
    ),
  },
  { 
    key: 'orientation', 
    label: 'Orientation', 
    width: 'w-24',
    render: (prop) => (
      <span className="text-sm">{prop.orientation}</span>
    ),
  },
  { 
    key: 'hasImages', 
    label: 'Images', 
    width: 'w-16',
    render: (prop, onImageClick) => (
      <button
        onClick={() => prop.hasImages && onImageClick?.(prop.id)}
        className={`flex items-center gap-1 text-sm ${prop.hasImages ? 'text-green-500 hover:text-green-600 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
      >
        <Image className="w-4 h-4" />
        <span>{prop.hasImages ? 'View' : '-'}</span>
      </button>
    ),
  },
  { 
    key: 'source', 
    label: 'Source', 
    width: 'w-20',
    render: (prop: ResaleProperty) => (
      <Badge variant={prop.source === 'agent' ? 'secondary' : 'success'}>
        {prop.source === 'agent' ? 'Agent' : 'Owner'}
      </Badge>
    ),
  },
  { 
    key: 'propertyType', 
    label: 'Type', 
    width: 'w-24',
    render: (prop: ResaleProperty) => (
      <span className="text-sm">{prop.propertyType}</span>
    ),
  },
  { 
    key: 'houseCategory', 
    label: 'Category', 
    width: 'w-28',
    render: (prop: ResaleProperty) => (
      <span className="text-sm">{prop.houseCategory}</span>
    ),
  },
  { 
    key: 'decoration', 
    label: 'Decoration', 
    width: 'w-24',
    render: (prop: ResaleProperty) => (
      <span className="text-sm">{prop.decoration}</span>
    ),
  },
  { 
    key: 'status', 
    label: 'Status', 
    width: 'w-20',
    render: (prop: ResaleProperty) => (
      <Badge variant={prop.status === 'available' ? 'success' : prop.status === 'reserved' ? 'warning' : 'secondary'}>
        {prop.status.charAt(0).toUpperCase() + prop.status.slice(1)}
      </Badge>
    ),
  },
  { 
    key: 'daysOnMarket', 
    label: 'Days on Market', 
    width: 'w-28',
    render: (prop: ResaleProperty) => (
      <span className="text-sm text-muted-foreground">{calculateDaysOnMarket(prop.createdAt)}</span>
    ),
  },
  { 
    key: 'remark', 
    label: 'Remark', 
    width: 'w-[150px]',
    render: (prop: ResaleProperty) => (
      <span className="text-sm text-muted-foreground">{prop.remark}</span>
    ),
  },
  { 
    key: 'contact', 
    label: 'Contact', 
    width: 'w-[180px]',
    render: (prop: ResaleProperty) => (
      <div className="text-sm text-muted-foreground flex flex-col gap-0.5">
        <span className="whitespace-nowrap">{formatPhoneNumber(prop.contactPhone)}</span>
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {prop.contactName}
        </span>
      </div>
    ),
  },
  { 
    key: 'updatedAt', 
    label: 'Updated', 
    width: 'w-[200px]',
    render: (prop: ResaleProperty) => (
      <span className="text-sm whitespace-nowrap">{formatTimestamp(prop.updatedAt)}</span>
    ),
  },
];

export default function ResaleList() {
  const [keyword, setKeyword] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [batchDeleteConfirm, setBatchDeleteConfirm] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);
  
  const { state } = useAppStore();
  const { selectedRegion } = state;
  
  const {
    properties,
    pagination,
    loading,
    error,
    selectedIds,
    isAllSelected,
    fetchResaleProperties,
    deleteResaleProperty,
    batchDeleteResaleProperties,
    selectAll,
    toggleSelect,
    clearSelection,
  } = useResale();

  useEffect(() => {
    fetchResaleProperties(pagination.page, pagination.pageSize, keyword, selectedRegion);
  }, []);

  useEffect(() => {
    fetchResaleProperties(1, pagination.pageSize, keyword, selectedRegion);
  }, [selectedRegion]);

  const handleSearch = () => {
    fetchResaleProperties(1, pagination.pageSize, keyword, selectedRegion);
  };

  const handlePageChange = (page: number) => {
    fetchResaleProperties(page, pagination.pageSize, keyword, selectedRegion);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirm({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteResaleProperty(deleteConfirm.id);
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
      await batchDeleteResaleProperties(selectedIds);
      setBatchDeleteConfirm(false);
    } catch (err) {
      console.error('Batch delete failed:', err);
    }
  };

  const handleCancelBatchDelete = () => {
    setBatchDeleteConfirm(false);
  };

  const handleCreateSuccess = () => {
    fetchResaleProperties(pagination.page, pagination.pageSize, keyword, selectedRegion);
    setIsCreateModalOpen(false);
  };

  const handleImageClick = (propertyId: string) => {
    setCurrentPropertyId(propertyId);
    setImageViewerOpen(true);
  };

  const getCurrentImages = () => {
    if (!currentPropertyId) return [];
    return generatePropertyImages(currentPropertyId);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Resale Properties</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search properties..."
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
        <CardContent className="p-0">
          <div className="relative">
            <div className="overflow-x-auto">
              {loading ? (
                <TableSkeleton columns={[...columns.map(col => ({ key: col.key, width: col.width })), { key: 'actions', width: 'w-[220px]' }]} />
              ) : error ? (
                <div className="p-6 text-center">
                  <p className="text-destructive">{error}</p>
                </div>
              ) : (
                <Table className="min-w-[1400px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 sticky left-0 z-10">
                        <div className="flex items-center h-full">
                          <Checkbox checked={isAllSelected} onCheckedChange={selectAll} />
                        </div>
                      </TableHead>
                      {columns.map((column) => (
                        <TableHead key={column.key} className={`${column.width} whitespace-nowrap`}>
                          {column.label}
                        </TableHead>
                      ))}
                      <TableHead className="w-[220px] sticky right-0 inset-y-0 z-10 bg-white shadow-[inset_1px_0_0_#e5e7eb]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="w-12 sticky left-0 z-10">
                          <Checkbox checked={selectedIds.has(property.id)} onCheckedChange={() => toggleSelect(property.id)} />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell key={column.key} className={column.key === 'contact' ? 'whitespace-nowrap' : ''}>
                            {column.render?.(property, handleImageClick)}
                          </TableCell>
                        ))}
                        <TableCell className="w-[220px] sticky right-0 inset-y-0 z-10 whitespace-nowrap bg-white shadow-[inset_1px_0_0_#e5e7eb]">
                          <div className="flex items-center gap-2">
                            <Link href={`/resale/${property.id}/edit?readonly=true`} className="text-green-600">Detail</Link>
                            <Link href={`/resale/${property.id}/edit`} className="text-blue-600">Edit</Link>
                            <Button 
                              variant="ghost" 
                              className="text-destructive" 
                              onClick={(e) => handleDeleteClick(property.id, property.title)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>
                    Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{' '}
                    {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
                    {pagination.total} resale properties
                  </TableCaption>
                </Table>
              )}
            </div>
          </div>
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

      <ResaleCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={handleCreateSuccess}
      />

      <ImageViewer
        open={imageViewerOpen}
        onOpenChange={setImageViewerOpen}
        images={getCurrentImages()}
      />
    </div>
  );
}