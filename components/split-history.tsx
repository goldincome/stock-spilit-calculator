'use client';

import { History } from 'lucide-react';

interface SplitHistoryProps {
  companyName: string;
  splits?: {
    date: string;
    ratio: string;
    preSplitPrice?: string;
    postSplitPrice?: string;
  }[];
  source?: string;
}

export function SplitHistory({ companyName, splits = [], source }: SplitHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <History className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">{companyName} Stock Split History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Split Ratio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pre-Split Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post-Split Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {splits.map((split, index) => (
              <tr key={split.date} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{split.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{split.ratio}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {split.preSplitPrice ? `$${Number(split.preSplitPrice).toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {split.postSplitPrice ? `$${Number(split.postSplitPrice).toFixed(2)}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source && (
        <div className="mt-4 text-sm text-gray-600 italic">
          Source: {source}
        </div>
      )}
    </div>
  );
}