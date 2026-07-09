export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              © {currentYear} Admin Panel. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}