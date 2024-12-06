'use client';

import { useState, useEffect, Suspense } from 'react';
import { searchCompanies } from 'lib/data';
import { SearchBox } from 'components/search-box';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CompanyGrid } from 'components/company-grid';
import { CompanyPagination } from 'components/company-pagination';

const ITEMS_PER_PAGE = 9;

function SearchPage() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/companies');
      const allCompanies = await res.json();
      setCompanies(allCompanies);

      const query = searchParams.get('q');
      if (query) {
        const results = await searchCompanies(query, allCompanies);
        setSearchResults(results);
      }
    };

    fetchData();
  }, [searchParams]);

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search Companies</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBox />
      </Suspense>

      <div className="mt-8 mb-12">
        <CompanyGrid companies={searchResults.slice(0, ITEMS_PER_PAGE)} />
        <CompanyPagination companies={searchResults} itemsPerPage={ITEMS_PER_PAGE} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default SearchPage;

export const dynamic = 'force-dynamic';
