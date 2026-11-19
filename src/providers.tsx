'use client';

import { AppProvider } from '@/src/core/store';
import { ToastProvider } from '@/src/components/toast';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/src/lib/apollo/client';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <ToastProvider>{children}</ToastProvider>
      </AppProvider>
    </ApolloProvider>
  );
}