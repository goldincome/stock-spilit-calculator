export interface Company {
  name: string;
  symbol: string;
  slug: string;
  title: string;
  description: string;
  content: {
    intro: string;
    mainContent: string;
    features: string[];
  };
  tags: string[];
}