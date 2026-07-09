import { Skeleton } from '@/src/ui/skeleton';

interface TableSkeletonProps {
  columns: { key: string; width: string }[];
  rowCount?: number;
}

export function TableSkeleton({ columns, rowCount = 5 }: TableSkeletonProps) {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: rowCount }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {columns.map((column) => (
            <Skeleton
              key={column.key}
              className={`h-10 ${column.width || 'flex-1'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}