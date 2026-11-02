export interface ProjectArchitectureStep {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  architecture: ProjectArchitectureStep[];
  techStack: string[];
  keyImplementations: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  tags: string[];
}
