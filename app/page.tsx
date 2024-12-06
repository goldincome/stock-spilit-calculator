import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from '@/components/calculator';
import { ArrowRight, DollarSign, BarChart2, Users, Calculator as CalcIcon, TrendingUp } from 'lucide-react';
import { getAllCompanies } from '@/lib/data';
import { StockSplitChart } from '@/components/stock-split-chart';

export const metadata: Metadata = {
  title: 'Stock Split Calculator | Calculate Your Shares After Stock Splits',
  description: 'Free online stock split calculator. Calculate your shares and value after stock splits, view historical split data, and get insights into future splits.',
  alternates: {
    canonical: '/'
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
  keywords: 'Stock Split Calculator, Share Split Calculator, Stock Split History, Stock Split Analysis, Stock Split Tool, Share Split Analysis, Stock Split Tracker',
  publisher: 'Stock Split Calculator',
  openGraph: {
    title: 'Stock Split Calculator',
    description: 'Calculate your shares and value after stock splits. View historical split data and get insights into future splits.',
    url: 'https://stocksplitcalculator.xyz',
    siteName: 'Stock Split Calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Stock Split Calculator',
    description: 'Calculate your shares and value after stock splits. View historical split data and get insights into future splits.',
    site: '@stocksplitcalc'
  }
};

export default async function Home() {
  const popularCompanies = await getAllCompanies();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Stock Split Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate potential returns from stock splits with our comprehensive calculator
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <Calculator companyName="Sample Company" />
          <p className="text-sm text-gray-500 mt-2 italic">
            Disclaimer: This calculator is for informational purposes only. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Stock Split Impact Visualization</h2>
            <StockSplitChart />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Popular Companies</h2>
            <div className="space-y-4">
              {popularCompanies.slice(0, 8).map((company) => {
                const cleanSlug = company.slug.replace('calculator/', '');
                return (
                  <Link
                    key={company.slug}
                    href={`/${cleanSlug}`}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{company.name}</span>
                      <span className="text-sm text-gray-500 font-medium ml-2">{company.symbol}</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Why Use Our Calculator?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</span>
                <span className="ml-3">Real-time calculations based on current market data</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</span>
                <span className="ml-3">Historical split data for informed decisions</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</span>
                <span className="ml-3">Easy to use interface with instant results</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-World Scenarios Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
        <h2 className="text-3xl font-bold mb-6">Understanding Stock Splits Through Real Scenarios</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Scenario 1: Growth Investment */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Scenario 1: Long-term Growth Investment
            </h3>
            <div className="space-y-4">
              <p className="font-medium">Meet Sarah: A Long-term Investor</p>
              <div className="pl-4 border-l-2 border-blue-300">
                <p className="mb-2">Initial Investment:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-700">
                  <li>Purchased 50 shares at $100 each</li>
                  <li>Total investment: $5,000</li>
                </ul>
              </div>
              <div className="pl-4 border-l-2 border-blue-300">
                <p className="mb-2">After 2:1 Split:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-700">
                  <li>Now owns 100 shares at $50 each</li>
                  <li>Total value: Still $5,000</li>
                  <li>Benefit: More shares to potentially sell in smaller quantities</li>
                </ul>
              </div>
              <div className="pl-4 border-l-2 border-blue-300">
                <p className="mb-2">After Another 2:1 Split:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-700">
                  <li>Now owns 200 shares at $25 each</li>
                  <li>Total value: Still $5,000</li>
                  <li>Increased trading flexibility with more shares</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scenario 2: New Investor */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Scenario 2: New Market Entrant
            </h3>
            <div className="space-y-4">
              <p className="font-medium">Meet Alex: A First-time Investor</p>
              <div className="pl-4 border-l-2 border-green-300">
                <p className="mb-2">Before Split:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-700">
                  <li>Stock price: $1,000 per share</li>
                  <li>Budget: $800</li>
                  <li>Result: Cannot afford even one share</li>
                </ul>
              </div>
              <div className="pl-4 border-l-2 border-green-300">
                <p className="mb-2">After 5:1 Split:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-700">
                  <li>New price: $200 per share</li>
                  <li>Can now buy 4 shares</li>
                  <li>Total investment: $800</li>
                </ul>
              </div>
              <div className="pl-4 border-l-2 border-green-300">
                <p className="mb-2">Benefits:</p>
                <ul className="list-disc ml-4 space-y-1 text-gray-700">
                  <li>Market accessibility improved</li>
                  <li>Can start building a diversified portfolio</li>
                  <li>Opportunity to invest in preferred companies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Example */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Quick Reference: Common Split Ratios</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="font-bold text-lg mb-2">2:1 Split</p>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>100 shares @ $50 → 200 shares @ $25</li>
                <li>Total value: $5,000 → $5,000</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="font-bold text-lg mb-2">3:1 Split</p>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>100 shares @ $60 → 300 shares @ $20</li>
                <li>Total value: $6,000 → $6,000</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="font-bold text-lg mb-2">4:1 Split</p>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>100 shares @ $80 → 400 shares @ $20</li>
                <li>Total value: $8,000 → $8,000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Sections */}
      <div className="space-y-16">
        {/* What is a Stock Split? */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">What is a Stock Split?</h2>
          </div>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              A stock split is a corporate action where a company multiplies its number of outstanding shares by dividing each share into multiple shares, reducing the price proportionally while maintaining the same market capitalization.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4">
              <p className="font-medium">Example:</p>
              <p>In a 2:1 split, if you owned 100 shares at $100 each ($10,000 total):</p>
              <ul className="list-disc ml-6 mt-2">
                <li>You'll now own 200 shares</li>
                <li>Each share will be worth $50</li>
                <li>Total value remains $10,000</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Do Companies Split Stocks? */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Why Do Companies Split Stocks?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Primary Reasons:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-blue-600 mt-1" />
                  <span>Make shares more accessible to retail investors</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                  <span>Increase stock liquidity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CalcIcon className="h-5 w-5 text-blue-600 mt-1" />
                  <span>Signal company confidence and growth</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Benefits:</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Increased market accessibility</li>
                <li>Higher trading volume</li>
                <li>Greater market flexibility</li>
                <li>Enhanced shareholder value perception</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What Happens During a Stock Split? */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">What Happens During a Stock Split?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Changes:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">1</div>
                  <span>Number of shares increases</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">2</div>
                  <span>Share price decreases proportionally</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">3</div>
                  <span>Market capitalization remains the same</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">4</div>
                  <span>Ownership percentage stays unchanged</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Example Timeline:</h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="font-medium">Announcement Date:</span>
                  <span>Company declares split ratio and dates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-medium">Record Date:</span>
                  <span>Determines eligible shareholders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-medium">Split Date:</span>
                  <span>New shares are distributed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-medium">Trading Date:</span>
                  <span>Shares trade at new split-adjusted price</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* How to Calculate Stock Splits */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">How to Calculate Stock Splits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Calculations:</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium">New Number of Shares:</p>
                  <p className="text-gray-700">Current Shares × Split Ratio</p>
                  <p className="text-sm text-gray-600 mt-2">Example: 100 shares × 2 (2:1 split) = 200 shares</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium">New Share Price:</p>
                  <p className="text-gray-700">Current Price ÷ Split Ratio</p>
                  <p className="text-sm text-gray-600 mt-2">Example: $100 ÷ 2 = $50 per share</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Common Split Ratios:</h3>
              <ul className="space-y-3">
                <li>2:1 - Double the shares, half the price</li>
                <li>3:1 - Triple the shares, one-third the price</li>
                <li>4:1 - Quadruple the shares, one-fourth the price</li>
                <li>5:1 - Five times the shares, one-fifth the price</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium">Important Note:</p>
                <p className="text-sm text-gray-600 mt-2">
                  Total investment value remains unchanged after a split. The number of shares and price per share adjust proportionally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-800">What are the benefits of a stock split for a company?</h3>
                <p className="text-gray-700">
                  Companies benefit from stock splits in several ways:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Increased market liquidity and trading volume</li>
                    <li>Broader investor accessibility</li>
                    <li>Enhanced market perception and visibility</li>
                    <li>Potential inclusion in price-weighted indices</li>
                    <li>Greater appeal to retail investors</li>
                  </ul>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-800">How do stock splits affect dividends?</h3>
                <p className="text-gray-700">
                  Stock splits affect dividends proportionally:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>The dividend per share is reduced by the split ratio</li>
                    <li>Total dividend payout remains the same</li>
                    <li>Example: In a 2:1 split, a $1 dividend becomes $0.50 per share, but you own twice as many shares</li>
                  </ul>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-800">Do I need to take any action when a stock split occurs?</h3>
                <p className="text-gray-700">
                  No action is typically required. Your brokerage will automatically:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Adjust your share count</li>
                    <li>Update the share price</li>
                    <li>Maintain your total investment value</li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-800">What's the difference between forward and reverse splits?</h3>
                <p className="text-gray-700">
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Forward split: Increases shares and decreases price (e.g., 2:1)</li>
                    <li>Reverse split: Decreases shares and increases price (e.g., 1:4)</li>
                    <li>Both maintain the same total market value</li>
                    <li>Different purposes: Growth vs. maintaining exchange requirements</li>
                  </ul>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-800">How do stock splits affect my cost basis?</h3>
                <p className="text-gray-700">
                  Your cost basis adjusts proportionally:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Per-share cost basis is divided by the split ratio</li>
                    <li>Total cost basis remains unchanged</li>
                    <li>Important for tax purposes and calculating gains/losses</li>
                  </ul>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-800">Can stock splits affect my taxes?</h3>
                <p className="text-gray-700">
                  Stock splits are generally not taxable events:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>No immediate tax implications</li>
                    <li>Cost basis is adjusted proportionally</li>
                    <li>Holding period remains unchanged</li>
                    <li>Capital gains/losses are only realized upon sale</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Have More Questions?</h3>
            <p className="text-gray-700">
              Our calculator and historical data can help you understand specific stock splits better. Use the calculator above to analyze different scenarios, or explore our company-specific pages for detailed split histories.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}