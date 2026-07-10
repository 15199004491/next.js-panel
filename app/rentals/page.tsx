import Header from '@/src/layouts/header';
import Sidebar from '@/src/layouts/sidebar';
import MainContent from '@/src/layouts/main-content';

export default function RentalsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Rental Properties</h1>
          <p className="text-gray-500">This page is under construction.</p>
        </div>
      </MainContent>
    </div>
  );
}