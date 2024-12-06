import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
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
  const sortedCompanies = companiesWithSplits.sort((a: any, b: any) => a.name.localeCompare(b.name));

  return NextResponse.json(sortedCompanies);
}
