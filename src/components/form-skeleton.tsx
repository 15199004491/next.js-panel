'use client';

interface FormSkeletonProps {
  rows?: number;
  columns?: number;
}

export function FormSkeleton({ rows = 5, columns = 2 }: FormSkeletonProps) {
  return (
    <div className="animate-pulse space-y-6">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const cols = rowIndex === 2 ? 1 : rowIndex === 4 ? 3 : columns;
        const height = rowIndex === 2 ? 'h-24' : rowIndex === 4 ? 'h-20' : 'h-10';
        
        return cols === 1 ? (
          <div key={rowIndex} className={`${height} bg-gray-200 rounded`} />
        ) : (
          <div key={rowIndex} className={`grid grid-cols-${cols} gap-4`}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex} className={`${height} bg-gray-200 rounded`} />
            ))}
          </div>
        );
      })}
    </div>
  );
}