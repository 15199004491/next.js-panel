'use client';

import dynamic from 'next/dynamic';
import Header from '@/src/layouts/header';
import Sidebar from '@/src/layouts/sidebar';
import MainContent from '@/src/layouts/main-content';

const NewhouseList = dynamic(() => import('@/src/modules/newhouse/pages/newhouse/List'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function NewhousesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <NewhouseList />
      </MainContent>
    </div>
  );
}