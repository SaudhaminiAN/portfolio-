export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
  mediumUrl?: string;
  coverImage?: string;
}

