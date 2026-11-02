import { AiExperiment } from './types';

export const AI_EXPERIMENTS: AiExperiment[] = [
  {
    id: 'exp-tools-1',
    category: 'Tools Exploration',
    title: 'Benchmarking Local LLM Tooling: Ollama vs LM Studio for Developer Workflows',
    description:
      'Evaluated latency, memory footprint, and OpenAI-compatible API endpoints running quantized open models (Llama 3, Mistral, Qwen) on local hardware.',
    toolsUsed: ['Ollama', 'LM Studio', 'Llama 3 8B', 'Mistral 7B', 'FastAPI'],
    findings:
      'Ollama provides superior headless CLI integration and Docker containerization for local automated pipelines, while LM Studio excels in interactive prompt parameter tuning and context window inspection.',
    date: '2026',
    status: 'Completed',
  },
  {
    id: 'exp-prompt-1',
    category: 'Prompt Engineering',
    title: 'Deterministic JSON Extraction via Pydantic & Constrained System Prompting',
    description:
      'Engineered few-shot prompt patterns combined with JSON schema constraints to guarantee 100% parseable structured outputs from unstructured messy data.',
    toolsUsed: ['Pydantic v2', 'LangChain', 'OpenAI Function Calling', 'Few-Shot Prompts'],
    findings:
      'Constrained system prompting with explicit negative schema examples reduces type coercion errors by eliminating markdown wrap and conversational boilerplate.',
    date: '2026',
    status: 'Completed',
  },
  {
    id: 'exp-vibe-1',
    category: 'Vibe Coding',
    title: 'Rapid Architectural Prototyping: Concept-to-Production in Hours',
    description:
      'Explored AI-assisted rapid coding workflows using modern AI-first IDEs (Cursor, Windsurf) to synthesize full-stack functional utilities from specification docs.',
    toolsUsed: ['Cursor', 'Windsurf', 'TypeScript', 'Tailwind CSS', 'Vite'],
    findings:
      'Vibe coding is most effective when paired with rigorous architectural mental models. Defining explicit TypeScript interfaces and clear modular boundaries before generating UI accelerates development tenfold without technical debt.',
    date: '2026',
    status: 'Active Exploration',
  },
  {
    id: 'exp-proto-1',
    category: 'Prototypes & Demos',
    title: 'Vector Similarity Distance & Semantic Chunking Visualizer',
    description:
      'Constructed a lightweight interactive prototype to visualize cosine similarity distances between chunked document segments and synthetic user queries.',
    toolsUsed: ['ChromaDB', 'Sentence Transformers', 'NumPy', 'React'],
    findings:
      'Semantic chunking with 15% sliding window overlap consistently preserves contextual cross-boundary references far better than rigid fixed-character splitting.',
    date: '2026',
    status: 'Completed',
  },
];

export const EXPLORED_AI_TOOLS = [
  { name: 'Cursor & Windsurf', role: 'AI-First Development IDEs', tag: 'Vibe Coding' },
  { name: 'Claude Artifacts & v0', role: 'Instant UI/UX Prototyping', tag: 'Rapid Prototyping' },
  { name: 'Ollama & LM Studio', role: 'Local Model Inference & Quantization', tag: 'Local AI' },
  { name: 'LangChain & LangGraph', role: 'Multi-Agent State Machines', tag: 'Agentic Frameworks' },
  { name: 'ChromaDB & FAISS', role: 'High-Dimensional Vector Indices', tag: 'Vector Storage' },
  { name: 'n8n Workflow Automation', role: 'Low-Code Agent Orchestration', tag: 'Automation' },
];
