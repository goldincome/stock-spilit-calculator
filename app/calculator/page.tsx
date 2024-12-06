import { CompanyGrid } from '@/components/company-grid';
import { SearchBox } from '@/components/search-box';
import { getAllCompanies } from '@/lib/data';
import { CompanyPagination } from '@/components/company-pagination';

const ITEMS_PER_PAGE = 9;

export default async function CompaniesPage() {
  const companies = await getAllCompanies();
  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <SearchBox />
      </div>
      <h1 className="text-3xl font-bold mb-6">Browse Companies</h1>
      <CompanyPagination 
        companies={companies}
        itemsPerPage={ITEMS_PER_PAGE}
        totalPages={totalPages}
      />
    </div>
  );
}