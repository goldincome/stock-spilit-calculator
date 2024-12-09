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
    alternates: {
      canonical: `/${params.company}`
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    other: {
      'X-Robots-Tag': 'index, follow',
    },
    keywords: `${company.name} Stock Split Calculator, ${company.name} Stock Split History, ${company.name} Stock Split Analysis, ${company.symbol} Stock Split, ${company.name} Share Split Calculator`,
    publisher: 'Stock Split Calculator',
    openGraph: {
      title: `${company.name} Stock Split Calculator`,
      description: `Calculate ${company.name} (${company.symbol}) stock splits and view historical split data.`,
      url: `https://stocksplitcalculator.xyz/${params.company}`,
      siteName: 'Stock Split Calculator',
      type: 'website'
    },
    twitter: {
      card: 'summary',
      title: `${company.name} Stock Split Calculator`,
      description: `Calculate ${company.name} (${company.symbol}) stock splits and view historical split data.`,
      site: '@stocksplitcalc'
    }
  };
}

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  const params = companies.map((company) => ({
    company: company.slug,
  }));

  // Add a param for favicon
  params.push({ company: 'favicon.ico' });

  return params;
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

  // Calculate company-specific metrics
  const hasHistory = company.splits.length > 0;
  const mostRecentSplit = hasHistory ? company.splits[0] : null;
  const averageSplitPrice = hasHistory
    ? company.splits.reduce((acc, split) => acc + split.preSplitPrice, 0) / company.splits.length
    : 0;
  
  // Calculate time between splits if there are at least 2 splits
  let averageDaysBetweenSplits = 0;
  if (company.splits.length >= 2) {
    const daysBetweenSplits = company.splits.slice(0, -1).map((split, index) => {
      const currentDate = new Date(split.date);
      const nextDate = new Date(company.splits[index + 1].date);
      return Math.floor((currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24));
    });
    averageDaysBetweenSplits = daysBetweenSplits.reduce((acc, days) => acc + days, 0) / daysBetweenSplits.length;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CompanyIntro name={company.name} description={company.content.intro} />
          <Calculator companyName={company.name} />
          <p className="text-sm text-gray-500 mt-2 italic">
            Disclaimer: This calculator is for informational purposes only. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
          <StockSplitGuide companyName={company.name} />
          <SplitHistory 
            companyName={company.name}
            splits={company.splits} 
            source={company.source}
          />
          
          {/* Company Understanding Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Understanding {company.name} Stock Splits</h2>
            <div className="prose max-w-none">
              {hasHistory ? (
                <>
                  <p className="mb-4">
                    {company.name} has demonstrated a strategic approach to stock splits, having executed {company.splits.length} split{company.splits.length !== 1 ? 's' : ''} throughout its history. 
                    {mostRecentSplit && ` Their most recent split occurred on ${new Date(mostRecentSplit.date).toLocaleDateString()}, implementing a ${mostRecentSplit.ratio} ratio.`}
                  </p>
                  <p className="mb-4">
                    These splits have played a crucial role in {company.name}'s market strategy, typically occurring when the stock price reached approximately ${averageSplitPrice.toFixed(2)}. 
                    This pattern suggests a deliberate approach to maintaining optimal share price levels for investor accessibility.
                  </p>
                  {company.splits.length >= 2 && (
                    <p className="mb-4">
                      Analysis of {company.name}'s split history reveals a pattern of splits occurring approximately every {Math.round(averageDaysBetweenSplits)} days 
                      ({(averageDaysBetweenSplits / 365).toFixed(1)} years), though this timing has varied based on market conditions and company performance.
                    </p>
                  )}
                </>
              ) : (
                <p>
                  {company.name} has not implemented any stock splits to date. This approach aligns with their corporate strategy and market positioning, 
                  suggesting that the company has maintained what they consider to be an optimal share price range for their investor base.
                </p>
              )}
            </div>
          </div>

          {/* Future Predictions Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Future Predictions for {company.name} Stock Splits</h2>
            <div className="prose max-w-none">
              {hasHistory ? (
                <>
                  <p className="mb-4">
                    Based on {company.name}'s historical patterns and current market dynamics, several factors could influence future split decisions:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      <strong>Historical Price Triggers:</strong> Past splits have typically occurred around ${averageSplitPrice.toFixed(2)}, 
                      providing a potential benchmark for future considerations.
                    </li>
                    <li>
                      <strong>Split Frequency:</strong> With an average interval of {(averageDaysBetweenSplits / 365).toFixed(1)} years between splits, 
                      timing could be a factor in future decisions.
                    </li>
                    <li>
                      <strong>Market Conditions:</strong> {company.name}'s position in the {company.industry || 'market'} and overall market sentiment 
                      will likely influence future split decisions.
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    While {company.name} has not historically implemented stock splits, future split decisions would likely depend on several factors:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Significant share price appreciation beyond industry averages</li>
                    <li>Strategic initiatives to increase market accessibility</li>
                    <li>Changes in investor base or trading patterns</li>
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Factors Influencing Future Splits Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Factors Influencing Future {company.name} Splits</h2>
            <div className="prose max-w-none">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Market and Financial Factors */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Market & Financial Factors</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>
                      <strong>Earnings Performance:</strong> {company.name}'s quarterly and annual earnings reports, 
                      particularly trends in revenue growth and profit margins
                    </li>
                    <li>
                      <strong>Share Price Movement:</strong> Sustained upward momentum in stock price, especially 
                      if it reaches levels that might deter retail investor participation
                    </li>
                    <li>
                      <strong>Market Capitalization:</strong> Overall company valuation and its position 
                      relative to industry peers
                    </li>
                    <li>
                      <strong>Trading Volume:</strong> Changes in daily trading volume and liquidity patterns
                    </li>
                  </ul>
                </div>

                {/* Industry and Strategic Factors */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Industry & Strategic Factors</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>
                      <strong>Industry Trends:</strong> Stock split activities among competitors in the 
                      {company.industry ? ` ${company.industry}` : ''} sector
                    </li>
                    <li>
                      <strong>Market Strategy:</strong> Corporate initiatives to broaden investor base or 
                      enhance stock marketability
                    </li>
                    <li>
                      <strong>Investor Demographics:</strong> Changes in institutional versus retail investor 
                      ownership patterns
                    </li>
                    <li>
                      <strong>Market Conditions:</strong> Overall market sentiment, interest rates, and 
                      economic indicators
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Key Indicators to Watch</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Quarterly Earnings Reports:</strong> Pay attention to {company.name}'s financial 
                    performance and management commentary
                  </li>
                  <li>
                    <strong>Stock Price Thresholds:</strong> Monitor if the stock price approaches or exceeds 
                    historical split trigger levels
                  </li>
                  <li>
                    <strong>Trading Metrics:</strong> Watch for changes in trading volume, price volatility, 
                    and investor participation
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>
                  <strong>Note:</strong> These factors are based on historical market analysis and industry patterns. 
                  The decision to implement a stock split ultimately rests with {company.name}'s board of directors 
                  and management team, taking into account various strategic considerations and market conditions.
                </p>
              </div>
            </div>
          </div>

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