import Header from '@/src/layouts/header';
import Sidebar from '@/src/layouts/sidebar';
import MainContent from '@/src/layouts/main-content';
import NewhouseList from '@/src/modules/newhouse/pages/newhouse/List';

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