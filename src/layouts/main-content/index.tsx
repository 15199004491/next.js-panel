'use client';

import { useAppStore } from '@/src/core/store';
import { Card } from '@/src/ui/card';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { state } = useAppStore();
  const { sidebarOpen } = state;

  return (
    <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <Card className="m-2 p-2 border-0 shadow-none">{children}</Card>
    </main>
  );
}