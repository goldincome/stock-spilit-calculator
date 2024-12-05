'use client';

import { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

interface CalculatorProps {
  companyName: string;
}

export function Calculator({ companyName }: CalculatorProps) {
  const [shares, setShares] = useState('100');
  const [ratioNumerator, setRatioNumerator] = useState('2');
  const [ratioDenominator, setRatioDenominator] = useState('1');
  const [price, setPrice] = useState('100');

  const calculateSplit = () => {
    const numShares = parseFloat(shares);
    const splitRatio = parseFloat(ratioNumerator) / parseFloat(ratioDenominator);
    const sharePrice = parseFloat(price);

    const newShares = numShares * splitRatio;
    const newPrice = sharePrice / splitRatio;

    return {
      newShares: newShares.toFixed(0),
      newPrice: newPrice.toFixed(2),
      totalValue: (newShares * newPrice).toFixed(2),
    };
  };

  const result = calculateSplit();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center space-x-3">
          <CalcIcon className="h-8 w-8 text-white" />
          <h2 className="text-2xl font-bold text-white">{companyName} Stock Split Calculator</h2>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Current Shares</label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
              placeholder="Enter number of shares"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Split Ratio (e.g., 5:2)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={ratioNumerator}
                onChange={(e) => setRatioNumerator(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                placeholder="Enter numerator"
              />
              <span className="text-gray-700 self-center font-medium text-lg">:</span>
              <input
                type="number"
                value={ratioDenominator}
                onChange={(e) => setRatioDenominator(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
                placeholder="Enter denominator"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Current Share Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 hover:bg-white"
              placeholder="Enter current price"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Calculation Results</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">New Number of Shares</p>
              <p className="text-2xl font-bold text-blue-600">{result.newShares}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">New Share Price</p>
              <p className="text-2xl font-bold text-blue-600">${result.newPrice}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-blue-600">${result.totalValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}