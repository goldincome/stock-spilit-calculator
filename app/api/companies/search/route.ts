import { NextResponse } from 'next/server';
import { getAllCompanies } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const companies = await getAllCompanies();
  const searchResults = companies.filter(company => 
    company.name.toLowerCase().includes(query.toLowerCase()) ||
    company.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(searchResults);
}