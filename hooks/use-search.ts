'use client';

import { useState, useEffect } from 'react';
import type { Company } from '@/lib/types';

export function useSearch(query: string, companies: Company[]) {
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const filtered = companies
      .filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.symbol.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
    setFilteredCompanies(filtered);
  }, [query, companies]);

  return { filteredCompanies };
}