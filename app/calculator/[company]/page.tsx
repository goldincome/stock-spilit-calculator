import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CompanyIntro } from '@/components/company-intro';
import { Calculator } from '@/components/calculator';
import { StockSplitGuide } from '@/components/stock-split-guide';
import { SplitHistory } from '@/components/split-history';
import { FAQSection } from '@/components/faq-section';
import { RelatedCompanies } from '@/components/related-companies';
import { getCompanyData, getAllCompanies } from '@/lib/data';

interface Props {
  params: { company: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await getCompanyData(params.company);
  
  if (!company) {
    return {
      title: 'Company Not Found',
      description: 'The requested company calculator could not be found.',
    };
  }
  
  return {
    title: `${company.name} Stock Split Calculator | Track ${company.name}'s Stock Splits Easily`,
    description: `Use our ${company.name} Stock Split Calculator to understand your investment better. Learn about ${company.name}'s stock split history and calculate your shares accurately.`,
  };
}

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((company) => ({
    company: company.slug,
  }));
}

export default async function CompanyPage({ params }: Props) {
  const company = await getCompanyData(params.company);
  
  if (!company) {
    notFound();
  }

  const allCompanies = await getAllCompanies();
  const relatedCompanies = allCompanies
    .filter(c => c.slug !== params.company);

  const faqs = [
    {
      question: `Do ${company.name} stock splits change the value of my investment?`,
      answer: 'No, stock splits don\'t change the total value of your investment. They only divide your existing shares into more shares at a proportionally lower price.',
    },
    {
      question: 'How do I calculate the new price per share after a stock split?',
      answer: 'Divide the current share price by the split ratio. For example, in a 2:1 split, if the current price is $100, the new price would be $50 per share.',
    },
    {
      question: `When was ${company.name}'s last stock split?`,
      answer: 'Please refer to our stock split history table above for the most recent split information.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CompanyIntro name={company.name} description={company.content.intro} />
          <Calculator companyName={company.name} />
          <StockSplitGuide companyName={company.name} />
          <SplitHistory 
            companyName={company.name}
            splits={company.splits} 
            source={company.source}
          />
          <FAQSection companyName={company.name} faqs={faqs} />
        </div>
        <div className="space-y-8">
          <RelatedCompanies 
            companies={relatedCompanies}
            currentCompany={company.name} 
          />
        </div>
      </div>
    </div>
  );
}