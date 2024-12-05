import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCompanies } from '@/lib/data';

interface Props {
  searchParams: { q?: string }
}

export const metadata: Metadata = {
  title: 'Search Results - Stock Split Calculator',
  description: 'Search results for stock split calculators',
  alternates: {
    canonical: '/search'
  }
};

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.toLowerCase() || '';
  const companies = await getAllCompanies();
  
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(query) || 
    company.description?.toLowerCase().includes(query) ||
    company.industry?.toLowerCase().includes(query)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {filteredCompanies.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Link
              key={company.slug}
              href={`/${company.slug}`}
              className="group block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {company.name} {company.symbol && <span className="text-gray-500">({company.symbol})</span>}
                </h2>
                {company.description && (
                  <p className="text-gray-600 mb-4 flex-grow">
                    {company.description}
                  </p>
                )}
                <div className="space-y-2">
                  {company.industry && (
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Industry:</span> {company.industry}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Stock Splits:</span> {company.splits?.length || 0}
                  </p>
                  {company.splits?.[0] && (
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Latest Split:</span>{' '}
                      {new Date(company.splits[0].date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-700">
                  View →
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">No results found for "{query}"</h2>
          <p className="text-gray-600 mb-6">
            Try searching with different keywords or browse all available companies.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Companies
            <span className="ml-2">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
