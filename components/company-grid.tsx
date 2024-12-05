import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Company {
  name: string;
  slug: string;
  description: string;
  symbol: string;
}

export function CompanyGrid({ companies }: { companies: Company[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <Link
          key={company.slug}
          href={`/${company.slug}`}
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{company.name} <span className="ml-2 text-sm text-gray-500">{company.symbol}</span></h2>
            <ArrowRight className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-gray-600 line-clamp-2">{company.description}</p>
        </Link>
      ))}
    </div>
  );
}