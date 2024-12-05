'use client';

import { Building } from 'lucide-react';

interface CompanyIntroProps {
  name: string;
  description: string;
}

export function CompanyIntro({ name, description }: CompanyIntroProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">{name} Stock Split Calculator</h1>
      </div>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">{description}</p>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
          <p className="text-blue-900">
            Understanding stock splits is crucial for investors. A stock split occurs when a company 
            divides its existing shares into multiple shares, making them more accessible to investors 
            while maintaining the same market capitalization.
          </p>
        </div>
      </div>
    </div>
  );
}