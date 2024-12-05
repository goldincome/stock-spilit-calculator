interface CompanyHistoryProps {
  company: {
    name: string;
    content: {
      intro: string;
      mainContent: string;
      features: string[];
    };
  };
}

export function CompanyHistory({ company }: CompanyHistoryProps) {
  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{company.name} Stock Split History</h2>
      <div className="prose max-w-none">
        <p className="mb-4">{company.content.intro}</p>
        <p className="mb-6">{company.content.mainContent}</p>
        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
        <ul className="space-y-2">
          {company.content.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="h-2 w-2 bg-blue-600 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}