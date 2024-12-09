import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { Footer } from 'components/footer';
import { SearchBox } from 'components/search-box';

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  title: 'Stock Split Calculator',
  description: 'Calculate the impact of stock splits on your investment',
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://stocksplitcalculator.xyz'),
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between gap-4">
                <Link href="/" className="flex items-center space-x-2 group shrink-0">
                  <Calculator className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                  <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                    Stock Split Calculator
                  </span>
                </Link>
                <div className="flex-1 max-w-2xl">
                  <SearchBox />
                </div>
                <Link
                  href="/companies"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Browse Companies
                </Link>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
