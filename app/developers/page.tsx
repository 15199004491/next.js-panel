import Header from '@/src/layouts/header';
import Sidebar from '@/src/layouts/sidebar';
import MainContent from '@/src/layouts/main-content';
import DeveloperList from '@/src/modules/newhouse/pages/developer/List';

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <DeveloperList />
      </MainContent>
    </div>
  );
}