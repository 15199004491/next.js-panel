'use client';

import { AppProvider } from '@/src/core/store';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}