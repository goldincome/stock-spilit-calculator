'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface Company {
  name: string;
  slug: string;
  symbol?: string;
  industry?: string;
}

export function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch companies data
  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  // Filter companies based on query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCompanies([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const matches = companies
      .filter(company => 
        company.name.toLowerCase().includes(searchQuery) ||
        company.symbol?.toLowerCase().includes(searchQuery) ||
        company.industry?.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3); // Only take top 3 matches

    setFilteredCompanies(matches);
  }, [query, companies]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search for companies..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </form>

      {/* Dropdown Results */}
      {showDropdown && filteredCompanies.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          {filteredCompanies.map((company) => (
            <Link
              key={company.slug}
              href={`/${company.slug}`}
              onClick={() => setShowDropdown(false)}
              className="block px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {company.name}
                  {company.symbol && (
                    <span className="text-gray-500 ml-2">({company.symbol})</span>
                  )}
                </span>
                {company.industry && (
                  <span className="text-sm text-gray-500">{company.industry}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
