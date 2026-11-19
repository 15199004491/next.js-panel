import { Search, Star, Plus, Trash2, RefreshCw, Play } from 'lucide-react';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { Badge } from '@/src/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/ui/table';
import { Pagination } from '@/src/components/pagination';
import type { Developer } from '@/src/modules/newhouse/models';
import { formatTimestamp } from '@/src/lib/format';

interface DemoTableProps {
  title: string;
  description: string;
  accentColor: string;
  developers: Developer[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  keyword: string;
  statusFilter: string | undefined;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: string | undefined) => void;
  onSearch: () => void;
  onPageChange: (page: number) => void;
  onCreate: () => void;
  onUpdate: (dev: Developer) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  codeSnippet: string;
}

export function DemoTable({
  title,
  description,
  accentColor,
  developers,
  loading,
  error,
  total,
  page,
  pageSize,
  keyword,
  statusFilter,
  onKeywordChange,
  onStatusChange,
  onSearch,
  onPageChange,
  onCreate,
  onUpdate,
  onDelete,
  onRefresh,
  codeSnippet,
}: DemoTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button size="sm" onClick={onCreate}>
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <details className="mb-4 group">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors select-none">
            <span className="inline-flex items-center gap-2">
              <Play className="w-4 h-4 group-open:rotate-90 transition-transform" />
              View Code Snippet
            </span>
          </summary>
          <pre className="mt-3 p-4 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto">
            <code>{codeSnippet}</code>
          </pre>
        </details>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search developers..."
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              className="pl-10"
            />
          </div>
          <select
            className="flex h-10 w-auto rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter || ''}
            onChange={(e) => onStatusChange(e.target.value || undefined)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button onClick={onSearch} variant="outline">
            Search
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
            Loading...
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-destructive font-medium">Error: {error}</p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Entry Years</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {developers.map((dev) => (
                  <TableRow key={dev.id}>
                    <TableCell className="font-medium">{dev.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        {dev.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={dev.status === 'active' ? 'success' : 'secondary'}>
                        {dev.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{dev.entryYears}</TableCell>
                    <TableCell>{dev.projectsCount}</TableCell>
                    <TableCell>{formatTimestamp(dev.updatedAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onUpdate(dev)}>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/80"
                          onClick={() => onDelete(dev.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {developers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No developers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} />
        </div>
      </CardContent>
    </Card>
  );
}