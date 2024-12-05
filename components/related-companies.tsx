import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Company {
  name: string;
  slug: string;
  symbol: string;
}

interface RelatedCompaniesProps {
  companies: Company[];
  currentCompany: string;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function RelatedCompanies({ companies, currentCompany }: RelatedCompaniesProps) {
  const filteredCompanies = companies.filter(
    (company) => company.name !== currentCompany
  );

  // Shuffle all filtered companies using Fisher-Yates algorithm
  const randomCompanies = shuffleArray(filteredCompanies);

  // Limit to 10 companies
  const displayCompanies = randomCompanies.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Related Companies</h2>
      <div className="space-y-4">
        {displayCompanies.map((company) => (
          <Link
            key={company.slug}
            href={`/${company.slug.replace('calculator/', '')}`}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              <span>{company.name}</span>
              <span className="text-sm text-gray-500 font-medium ml-2">{company.symbol}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}