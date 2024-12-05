'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Stock Split Impact Visualization',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: 'Share Price ($)',
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: 'Number of Shares',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['Pre-Split', 'Post 2:1 Split', 'Post 3:1 Split', 'Post 4:1 Split'];

export function StockSplitChart() {
  const data = {
    labels,
    datasets: [
      {
        label: 'Share Price',
        data: [100, 50, 16.67, 4.17],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Number of Shares',
        data: [100, 200, 600, 2400],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Line options={options} data={data} />
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">This chart demonstrates how stock splits affect:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Share price decreases proportionally with each split</li>
          <li>Number of shares increases proportionally</li>
          <li>Total investment value remains the same</li>
        </ul>
      </div>
    </div>
  );
}
