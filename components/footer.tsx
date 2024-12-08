'use client';

import { Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calculator className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">Stock Split Calculator</span>
        </div>
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p className="italic max-w-2xl mx-auto">
            Disclaimer: This calculator is for informational purposes only. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
          <p> {currentYear} Stock Split Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
