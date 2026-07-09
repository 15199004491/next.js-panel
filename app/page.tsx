import Header from '../src/layouts/header';
import Sidebar from '../src/layouts/sidebar';
import MainContent from '../src/layouts/main-content';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <MainContent>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Real Estate Panel</h1>
          <p className="text-gray-600">Select a menu item from the sidebar to get started.</p>
        </div>
      </MainContent>
    </div>
  );
}