import Link from 'next/link';
import { Calculator } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Stock Split Calculator</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/companies"
              className="text-gray-600 hover:text-gray-900"
            >
              Companies
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}