'use client';

import { useParams } from 'next/navigation';
import Header from '../../../src/layouts/header';
import Sidebar from '../../../src/layouts/sidebar';
import MainContent from '../../../src/layouts/main-content';
import DeveloperDetail from '../../../src/modules/newhouse/developer/pages/Detail';

export default function DeveloperDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || '';
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <DeveloperDetail id={id} />
      </MainContent>
    </div>
  );
}