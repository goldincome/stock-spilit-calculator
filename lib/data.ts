import fs from 'fs';
import path from 'path';

export async function getAllCompanies() {
  const companiesPath = path.join(process.cwd(), 'data', 'generated.json');
  const splitHistoryPath = path.join(process.cwd(), 'data', 'split-history.json');
  
  const companiesContent = await fs.promises.readFile(companiesPath, 'utf8');
  const splitHistoryContent = await fs.promises.readFile(splitHistoryPath, 'utf8');
  
  const companies = JSON.parse(companiesContent);
  const splitHistory = JSON.parse(splitHistoryContent);

  // Clean up slugs by removing 'calculator/' prefix
  const cleanedCompanies = companies.map((company: any) => ({
    ...company,
    slug: company.slug.replace('calculator/', '')
  }));

  // Merge split history with company data
  const companiesWithSplits = cleanedCompanies.map((company: any) => ({
    ...company,
    splits: splitHistory[company.slug]?.splits || [],
    source: splitHistory[company.slug]?.source || 'Source not available'
  }));
  
  // Sort companies alphabetically by name
  return companiesWithSplits.sort((a: any, b: any) => a.name.localeCompare(b.name));
}

export async function getCompanyData(slug: string) {
  // Remove 'calculator/' prefix if present
  const cleanSlug = slug.replace('calculator/', '');
  const companies = await getAllCompanies();
  return companies.find((company) => company.slug === cleanSlug);
}

export async function searchCompanies(query: string, companies: any[]) {
  const lowercaseQuery = query.toLowerCase();
  return companies.filter((company) => {
    return company.name.toLowerCase().includes(lowercaseQuery) || company.symbol.toLowerCase().includes(lowercaseQuery);
  });
}
