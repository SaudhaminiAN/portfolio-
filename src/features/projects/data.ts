import { ProjectItem } from './types';

export const SELECTED_PROJECTS: ProjectItem[] = [
  {
    id: 'enterprise-rag-assistant',
    number: '01',
    title: 'Enterprise Knowledge Assistant using RAG',
    subtitle: 'Contextual Document Retrieval & Grounded Enterprise Intelligence',
    category: 'Generative AI & Agentic Systems',
    overview:
      'A production-grade Retrieval-Augmented Generation (RAG) assistant engineered to ingest enterprise knowledge bases, perform high-dimensional vector similarity indexing, and deliver strictly grounded answers with verifiable source citations.',
    problemStatement:
      'Enterprise teams struggle with fragmented documentation across PDFs, technical manuals, and internal wikis. Standard keyword search lacks semantic context, while general-purpose LLMs hallucinate or lack domain-specific proprietary knowledge.',
    proposedSolution:
      'Architected an end-to-end RAG system integrating document parsing, semantic chunking with overlap, dense vector embeddings, vector database retrieval, and contextual reranking before generating answers with citation tags.',
    architecture: [
      {
        title: 'Document Ingestion & Extraction',
        description:
          'Automated ingestion pipeline supporting multi-format documentation (PDF, DOCX, Markdown) with layout preservation and metadata extraction.',
      },
      {
        title: 'Semantic Chunking & Embedding Generation',
        description:
          'Dynamic text chunking based on header hierarchies and token thresholds, transformed into high-dimensional vector representations via embedding models.',
      },
      {
        title: 'Vector Indexing & Hybrid Retrieval',
        description:
          'Indexed in ChromaDB / FAISS with hybrid retrieval combining dense vector similarity search and sparse lexical keyword matching.',
      },
      {
        title: 'Prompt Injection & Hallucination Guardrails',
        description:
          'Constructed structured prompt templates enforcing strict source grounding, preventing out-of-context fabrication and embedding citation anchors.',
      },
    ],
    techStack: [
      'Python',
      'LangChain',
      'FastAPI',
      'ChromaDB',
      'FAISS',
      'OpenAI / Hugging Face',
      'Docker',
    ],
    keyImplementations: [
      'Hybrid semantic dense and sparse keyword retrieval',
      'Source attribution with inline citation anchors',
      'Prompt guardrails to reject out-of-domain queries',
      'Asynchronous FastAPI REST endpoints for high-throughput client querying',
      'Configurable chunk size and similarity threshold controls',
    ],
    githubUrl: 'https://github.com/saudhaminian',
    demoUrl: '#',
    image: '/assets/images/project_rag.jpg',
    tags: ['RAG', 'LangChain', 'FastAPI', 'Vector DB', 'Enterprise AI'],
  },
  {
    id: 'academic-copilot',
    number: '02',
    title: 'AI-Powered Academic Copilot',
    subtitle: 'Curriculum-Aligned Learning Assistant & Code Debugger',
    category: 'EdTech AI & Technical Mentoring',
    overview:
      'An intelligent academic copilot designed to support learners and engineering students in mastering Python, machine learning workflows, and data structures through guided Socratic explanations and code debugging.',
    problemStatement:
      'Learners in large technical cohorts often face blocking bugs or conceptual roadblocks when mentors are unavailable. Standard code generators provide direct answers without fostering foundational conceptual understanding.',
    proposedSolution:
      'Developed an academic copilot utilizing LangGraph and fine-tuned prompt structures that assess learner queries, identify underlying misconceptions, provide step-by-step conceptual hints, and guide the learner toward resolving code issues independently.',
    architecture: [
      {
        title: 'Query & Intent Classification',
        description:
          'Categorizes incoming student prompts into theoretical questions, syntax errors, logic bugs, or exercise clarification.',
      },
      {
        title: 'Curriculum Context Retrieval',
        description:
          'Matches student queries against the active syllabus syllabus level, ensuring explanations do not exceed or lag the student current module.',
      },
      {
        title: 'Socratic Prompt Chain',
        description:
          'Guides the learner by asking targeted diagnostic questions and highlighting conceptual principles rather than outputting immediate copy-paste solutions.',
      },
      {
        title: 'Code Analysis Sandbox',
        description:
          'Analyzes code snippets for syntax errors, common edge-case omissions, and computational complexity concerns.',
      },
    ],
    techStack: [
      'Python',
      'LangGraph',
      'FastAPI',
      'Streamlit / React',
      'Hugging Face Transformers',
      'Pydantic',
    ],
    keyImplementations: [
      'Socratic guidance prompt pipeline preventing direct code copying',
      'Curriculum boundary validation based on student learning level',
      'Automated code syntax linting and logical flaw detection',
      'Session memory tracking student recurring questions and weak concepts',
      'Exportable learning summaries for student revision',
    ],
    githubUrl: 'https://github.com/saudhaminian',
    demoUrl: '#',
    image: '/assets/images/project_copilot.jpg',
    tags: ['EdTech', 'LangGraph', 'Mentoring', 'Code Review', 'Python'],
  },
  {
    id: 'enterprise-web-suite',
    number: '03',
    title: 'Enterprise Web Application Suite',
    subtitle: 'Modular Operational Platform, API Engine & Analytics Dashboard',
    category: 'Full-Stack & Backend Systems',
    overview:
      'A robust, modular enterprise web platform designed for administrative operations, data pipeline monitoring, role-based resource access, and operational analytics reporting.',
    problemStatement:
      'Internal organizational workflows were divided across fragmented spreadsheets and disparate legacy tools, resulting in data inconsistency, lack of auditability, and delayed reporting.',
    proposedSolution:
      'Built a centralized web suite featuring a decoupled REST API backend, relational database schema with referential integrity, secure role-based authorization, and a responsive analytics frontend.',
    architecture: [
      {
        title: 'Decoupled API Service Architecture',
        description:
          'FastAPI and Python REST backend structured with dependency injection, repository patterns, and Pydantic schema validation.',
      },
      {
        title: 'Relational Database Schema & Migrations',
        description:
          'PostgreSQL / MySQL database with normalized relational entities, foreign key constraints, and indexed audit logs.',
      },
      {
        title: 'Role-Based Access Control (RBAC)',
        description:
          'JWT token authentication enforcing distinct role permissions across administrators, operators, and viewers.',
      },
      {
        title: 'Analytics & Visualization Engine',
        description:
          'Interactive dashboard rendering operational metrics, pipeline status counters, and exportable report summaries.',
      },
    ],
    techStack: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'MySQL',
      'React',
      'Tailwind CSS',
      'Pandas',
    ],
    keyImplementations: [
      'Role-based access control with granular permission checks',
      'Automated database migrations and transactional operations',
      'Dynamic dashboard visualizers for real-time pipeline status',
      'Standardized JSON REST API specifications with OpenAPI auto-docs',
      'Responsive editorial interface engineered for cross-device desktop and tablet use',
    ],
    githubUrl: 'https://github.com/saudhaminian',
    demoUrl: '#',
    image: '/assets/images/project_enterprise.jpg',
    tags: ['FastAPI', 'PostgreSQL', 'RBAC', 'REST APIs', 'React'],
  },
];
