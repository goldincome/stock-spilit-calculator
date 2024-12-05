const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Create necessary directories
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Initialize directories
const dataDir = path.join(__dirname, '../data');
const publicDir = path.join(__dirname, '../public');
ensureDirectoryExists(dataDir);
ensureDirectoryExists(publicDir);

// Read and parse CSV
const csvContent = fs.readFileSync(path.join(__dirname, '../data/companies.csv'), 'utf-8');
const companies = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

// Generate content for each company
function generateCompanyContent(company) {
  const name = company['Company Name'];
  const symbol = company['Symbol'];
  const title = `${name} Stock Split Calculator`;
  // Create slug from the full title including "Stock Split Calculator"
  const slug = `${name} Stock Split Calculator`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  return {
    slug,
    name,
    symbol,
    title: `${title} - Historical Splits & Future Predictions`,
    description: `Calculate potential returns from ${name} (${symbol}) stock splits. Access historical split data, future predictions, and investment analysis tools.`,
    content: {
      intro: `Learn about ${name}'s (${symbol}) stock split history and calculate potential investment returns using our comprehensive stock split calculator.`,
      mainContent: `Our ${name} stock split calculator helps investors understand the impact of historical splits and project potential future returns.`,
      features: [
        "Historical split analysis",
        "Future value projections",
        "Investment return calculations",
        "Split ratio comparisons"
      ]
    },
    tags: [
      `${name.toLowerCase()} stock split`,
      `${symbol} stock split`,
      `${name.toLowerCase()} share calculator`,
      `${name.toLowerCase()} investment tools`,
      `${name.toLowerCase()} stock analysis`,
      `${symbol} trading calculator`
    ]
  };
}

// Generate data for all companies
const companyData = companies.map(generateCompanyContent);

// Write generated data
fs.writeFileSync(
  path.join(dataDir, 'generated.json'),
  JSON.stringify(companyData, null, 2)
);

// Generate sitemaps (10 URLs per sitemap)
const URLS_PER_SITEMAP = 10;
const sitemapCount = Math.ceil(companyData.length / URLS_PER_SITEMAP);

for (let i = 0; i < sitemapCount; i++) {
  const sitemapUrls = companyData
    .slice(i * URLS_PER_SITEMAP, (i + 1) * URLS_PER_SITEMAP)
    .map(company => ({
      loc: `https://stocksplitcalculator.xyz/${company.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8
    }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(
    path.join(publicDir, `sitemap-${i + 1}.xml`),
    sitemap
  );
}

// Generate sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Array.from({ length: sitemapCount }, (_, i) => `
  <sitemap>
    <loc>https://stocksplitcalculator.xyz/sitemap-${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  sitemapIndex
);

console.log('Data generation complete!');