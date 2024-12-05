'use client';

import { HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  companyName: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export function FAQSection({ companyName, faqs }: FAQSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <HelpCircle className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">FAQs about {companyName} Stock Splits</h2>
      </div>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}