'use client';

import { AppProvider } from '@/src/core/store';
import { ToastProvider } from '@/src/components/toast';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <ToastProvider>{children}</ToastProvider>
    </AppProvider>
  );
}