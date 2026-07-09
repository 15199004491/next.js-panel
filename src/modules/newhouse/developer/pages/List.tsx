'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Star, Plus } from 'lucide-react';
import { useNewhouseStore } from '../../store';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/src/ui/table';
import { Badge } from '@/src/ui/badge';
import { Card, CardContent } from '@/src/ui/card';
import { TableSkeleton } from '@/src/components/table-skeleton';
import { Pagination } from '@/src/components/pagination';
import CreateModal from '../components/CreateModal';

// 列配置
const columns = [
  { key: 'name', label: 'Name', width: 'w-[300px]' },
  { key: 'entryYears', label: 'Entry Years', width: 'w-36' },
  { key: 'projectsCount', label: 'Projects', width: 'w-24' },
  { key: 'rating', label: 'Rating', width: 'w-20' },
  { key: 'status', label: 'Status', width: 'w-20' },
  { key: 'remark', label: 'Remark', width: '' },
  { key: 'actions', label: 'Actions', width: 'w-32' },
];

export default function DeveloperList() {
  const [keyword, setKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { developers, pagination, loading, error, fetchDevelopers } = useNewhouseStore();

  useEffect(() => {
    fetchDevelopers(pagination.page, pagination.pageSize, keyword);
  }, []);

  const handleSearch = () => {
    fetchDevelopers(1, pagination.pageSize, keyword);
  };

  const handlePageChange = (page: number) => {
    fetchDevelopers(page, pagination.pageSize, keyword);
  };

  // 渲染单元格内容
  const renderCell = (developer: typeof developers[0], columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <>
            <div className="font-medium">{developer.name}</div>
            <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
              {developer.description}
            </div>
          </>
        );
      case 'entryYears':
        return <span className="text-sm">{developer.entryYears}</span>;
      case 'projectsCount':
        return (
          <Link
            href="/newhouses"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80"
          >
            {developer.projectsCount}
            <ExternalLink className="w-3 h-3" />
          </Link>
        );
      case 'rating':
        return (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm">{developer.rating}</span>
          </div>
        );
      case 'status':
        return (
          <Badge variant={developer.status === 'active' ? 'success' : 'secondary'}>
            {developer.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        );
      case 'remark':
        return (
          <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
            {developer.remark}
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0 h-auto">
              Detail
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80 p-0 h-auto">
              Delete
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

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
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Card with Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton columns={columns} />
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key} className={column.width}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {developers.map((developer) => (
                  <TableRow key={developer.id}>
                    {columns.map((column) => (
                      <TableCell key={column.key} className={column.key === 'actions' ? 'whitespace-nowrap' : ''}>
                        {renderCell(developer, column.key)}
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

      {/* Create Modal */}
      <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}