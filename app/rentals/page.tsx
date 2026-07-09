import Header from '../../src/layouts/header';
import Sidebar from '../../src/layouts/sidebar';
import MainContent from '../../src/layouts/main-content';

export default function RentalsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Rentals</h1>
          <p className="text-gray-600 mt-2">This is the rental properties listing page.</p>
        </div>
      </MainContent>
    </div>
  );
}