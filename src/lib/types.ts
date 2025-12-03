export type jobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type jobItemExpanded = jobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  coverImgURL: string;
  companyURL: string;
  duration: string;
  salary: string;
  location: string;
};