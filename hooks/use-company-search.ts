'use client';

import { useState, useEffect } from 'react';
import { Company } from '@/lib/types';

export function useCompanySearch(query: string) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function searchCompanies() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/companies/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Search request failed');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error searching companies:', error);
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      searchCompanies();
    } else {
      setCompanies([]);
      setIsLoading(false);
    }
  }, [query]);

  return { companies, isLoading };
}