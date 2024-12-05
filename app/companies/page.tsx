import type { Metadata } from 'next';
import { CompanyGrid } from '@/components/company-grid';
import { getAllCompanies } from '@/lib/data';
import { CompanyPagination } from '@/components/company-pagination';

const ITEMS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: 'Stock Companies | Stock Split Calculator',
  description: 'Browse our comprehensive list of stock companies. Find and analyze stock splits for major companies listed on NYSE, NASDAQ, and other exchanges.',
  alternates: {
    canonical: '/companies'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    'X-Robots-Tag': 'index, follow',
  },
  keywords: 'Stock Company, Listed Companies, Stock Exchange Companies, Company Stock Splits, Stock Market Companies, NYSE Stocks, NASDAQ Stocks',
  publisher: 'Stock Split Calculator'
};

export default async function CompaniesPage() {
  const companies = await getAllCompanies();
  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Browse Companies</h1>
      <CompanyPagination 
        companies={companies}
        itemsPerPage={ITEMS_PER_PAGE}
        totalPages={totalPages}
      />
    </div>
  );
}