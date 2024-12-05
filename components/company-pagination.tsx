'use client';

import { useState } from 'react';
import { CompanyGrid } from './company-grid';
import { Pagination } from './pagination';

interface CompanyPaginationProps {
  companies: any[];
  itemsPerPage: number;
  totalPages: number;
}

export function CompanyPagination({ companies, itemsPerPage, totalPages }: CompanyPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = companies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <CompanyGrid companies={paginatedCompanies} />
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}