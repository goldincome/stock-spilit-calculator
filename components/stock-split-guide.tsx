'use client';

import { BookOpen, CheckCircle } from 'lucide-react';

interface StockSplitGuideProps {
  companyName: string;
}

export function StockSplitGuide({ companyName }: StockSplitGuideProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">How to Use the {companyName} Stock Split Calculator</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Enter Your Current Shares</h3>
            <p className="text-gray-600">Input the number of shares you currently own</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Select Split Ratio</h3>
            <p className="text-gray-600">Choose the announced split ratio (e.g., 2 for a 2:1 split)</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Input Current Share Price</h3>
            <p className="text-gray-600">Enter the current market price per share</p>
          </div>
        </div>
      </div>
    </div>
  );
}