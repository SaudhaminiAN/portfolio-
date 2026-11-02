export interface AiExperiment {
  id: string;
  category: 'Tools Exploration' | 'Prompt Engineering' | 'Vibe Coding' | 'Prototypes & Demos';
  title: string;
  description: string;
  toolsUsed: string[];
  findings: string;
  demoSnippet?: string;
  date: string;
  status: 'Completed' | 'Active Exploration';
}
