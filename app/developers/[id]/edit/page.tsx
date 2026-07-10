'use client';

import Header from '../../../../src/layouts/header';
import Sidebar from '../../../../src/layouts/sidebar';
import MainContent from '../../../../src/layouts/main-content';
import DeveloperEdit from '../../../../src/modules/newhouse/pages/developer/Edit';

export default function EditPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <DeveloperEdit />
      </MainContent>
    </div>
  );
}