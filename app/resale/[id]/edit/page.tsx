'use client';

import Header from '@/src/layouts/header';
import Sidebar from '@/src/layouts/sidebar';
import MainContent from '@/src/layouts/main-content';
import ResaleEdit from '@/src/modules/resale/pages/resale/Edit';

export default function ResaleDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <ResaleEdit />
      </MainContent>
    </div>
  );
}