-- ==============================================================================
-- SAUDHAMINI A N — PROFESSIONAL AI ENGINEERING PORTFOLIO PLATFORM
-- INITIAL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) MIGRATION
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLE DEFINITIONS
-- ==============================================================================

-- 2.1 PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL,
    overview TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    proposed_solution TEXT NOT NULL,
    architecture JSONB NOT NULL DEFAULT '[]'::jsonb,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    key_implementations TEXT[] NOT NULL DEFAULT '{}',
    github_url TEXT,
    demo_url TEXT,
    image TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.2 EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    period TEXT NOT NULL,
    duration TEXT NOT NULL DEFAULT '',
    is_current BOOLEAN NOT NULL DEFAULT false,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    technologies TEXT[] NOT NULL DEFAULT '{}',
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.3 SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL,
    category_title TEXT NOT NULL,
    items TEXT[] NOT NULL DEFAULT '{}',
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.4 EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id TEXT PRIMARY KEY,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT '',
    period TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL,
    key_modules TEXT[] NOT NULL DEFAULT '{}',
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.5 CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    year TEXT NOT NULL DEFAULT '',
    credential_id TEXT,
    credential_url TEXT,
    skills_covered TEXT[] NOT NULL DEFAULT '{}',
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.6 AI EXPERIMENTS TABLE (AI LAB)
CREATE TABLE IF NOT EXISTS public.ai_experiments (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Completed',
    description TEXT NOT NULL,
    findings TEXT[] NOT NULL DEFAULT '{}',
    tools_used TEXT[] NOT NULL DEFAULT '{}',
    code_snippet TEXT,
    demo_link TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.7 BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.8 CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.9 SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.10 MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL DEFAULT 0,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- 3.1 Public Read Policies (Allow anyone to read published content)
DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
CREATE POLICY "Public read published projects" ON public.projects
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read published experiences" ON public.experiences;
CREATE POLICY "Public read published experiences" ON public.experiences
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read published skills" ON public.skills;
CREATE POLICY "Public read published skills" ON public.skills
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read published education" ON public.education;
CREATE POLICY "Public read published education" ON public.education
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read published certifications" ON public.certifications;
CREATE POLICY "Public read published certifications" ON public.certifications
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read published ai_experiments" ON public.ai_experiments;
CREATE POLICY "Public read published ai_experiments" ON public.ai_experiments
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read published blog_posts" ON public.blog_posts;
CREATE POLICY "Public read published blog_posts" ON public.blog_posts
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read media_assets" ON public.media_assets;
CREATE POLICY "Public read media_assets" ON public.media_assets
    FOR SELECT USING (true);

-- 3.2 Contact Form Submission & Admin Inbox Management
DROP POLICY IF EXISTS "Anon public can submit contact messages" ON public.contact_messages;
CREATE POLICY "Anon public can submit contact messages" ON public.contact_messages
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- 3.3 Authenticated Admin Full Access Policies
DROP POLICY IF EXISTS "Admin full access projects" ON public.projects;
CREATE POLICY "Admin full access projects" ON public.projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access experiences" ON public.experiences;
CREATE POLICY "Admin full access experiences" ON public.experiences
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access skills" ON public.skills;
CREATE POLICY "Admin full access skills" ON public.skills
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access education" ON public.education;
CREATE POLICY "Admin full access education" ON public.education
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access certifications" ON public.certifications;
CREATE POLICY "Admin full access certifications" ON public.certifications
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access ai_experiments" ON public.ai_experiments;
CREATE POLICY "Admin full access ai_experiments" ON public.ai_experiments
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access blog_posts" ON public.blog_posts;
CREATE POLICY "Admin full access blog_posts" ON public.blog_posts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access contact_messages" ON public.contact_messages;
CREATE POLICY "Admin full access contact_messages" ON public.contact_messages
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access site_settings" ON public.site_settings;
CREATE POLICY "Admin full access site_settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access media_assets" ON public.media_assets;
CREATE POLICY "Admin full access media_assets" ON public.media_assets
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 4. SEED DATA (AUTHENTIC SAUDHAMINI A N PORTFOLIO RECORDS)
-- ==============================================================================

-- 4.1 SEED SITE SETTINGS
INSERT INTO public.site_settings (key, value)
VALUES
    ('profile', '{
        "name": "Saudhamini A N",
        "designation": "AI/ML Engineer | Generative AI Developer | Technical Lead",
        "experience_years": "6+",
        "specialization_years": "4+",
        "learners_trained": "2000+",
        "projects_mentored": "500+",
        "status": "Available for Select Technical Consulting & AI Leadership"
    }'::jsonb),
    ('contact', '{
        "email": "saudhamini.an@gmail.com",
        "location": "Kerala, India",
        "github": "https://github.com/saudhaminian",
        "linkedin": "https://linkedin.com/in/saudhaminian"
    }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

-- 4.2 SEED FLAGSHIP PROJECTS
INSERT INTO public.projects (
    id, number, title, subtitle, category, overview, problem_statement, proposed_solution,
    architecture, tech_stack, key_implementations, github_url, demo_url, image, tags, display_order, is_published
)
VALUES
(
    'enterprise-rag-assistant',
    '01',
    'Enterprise Knowledge Assistant using RAG',
    'Contextual Document Retrieval & Grounded Enterprise Intelligence',
    'Generative AI & Agentic Systems',
    'A production-grade Retrieval-Augmented Generation (RAG) assistant engineered to ingest enterprise knowledge bases, perform high-dimensional vector similarity indexing, and deliver strictly grounded answers with verifiable source citations.',
    'Enterprise teams struggle with fragmented documentation across PDFs, technical manuals, and internal wikis. Standard keyword search lacks semantic context, while general-purpose LLMs hallucinate or lack domain-specific proprietary knowledge.',
    'Architected an end-to-end RAG system integrating document parsing, semantic chunking with overlap, dense vector embeddings, vector database retrieval, and contextual reranking before generating answers with citation tags.',
    '[
        {"title": "Document Ingestion & Extraction", "description": "Automated ingestion pipeline supporting multi-format documentation (PDF, DOCX, Markdown) with layout preservation and metadata extraction."},
        {"title": "Semantic Chunking & Embedding Generation", "description": "Dynamic text chunking based on header hierarchies and token thresholds, transformed into high-dimensional vector representations via embedding models."},
        {"title": "Vector Indexing & Hybrid Retrieval", "description": "Indexed in ChromaDB / FAISS with hybrid retrieval combining dense vector similarity search and sparse lexical keyword matching."},
        {"title": "Prompt Injection & Hallucination Guardrails", "description": "Constructed structured prompt templates enforcing strict source grounding, preventing out-of-context fabrication and embedding citation anchors."}
    ]'::jsonb,
    ARRAY['Python', 'LangChain', 'FastAPI', 'ChromaDB', 'FAISS', 'OpenAI / Hugging Face', 'Docker'],
    ARRAY[
        'Hybrid semantic dense and sparse keyword retrieval',
        'Source attribution with inline citation anchors',
        'Prompt guardrails to reject out-of-domain queries',
        'Asynchronous FastAPI REST endpoints for high-throughput client querying',
        'Configurable chunk size and similarity threshold controls'
    ],
    'https://github.com/saudhaminian',
    '#',
    '/assets/images/generative_ai_agentic.jpg',
    ARRAY['RAG', 'LangChain', 'FastAPI', 'Vector DB', 'Enterprise AI'],
    1,
    true
),
(
    'academic-copilot',
    '02',
    'AI-Powered Academic Copilot',
    'Intelligent Pedagogy, Structured Evaluation & Curriculum Guidance',
    'Pedagogical AI & Agentic Systems',
    'An interactive educational copilot engineered to assist engineering students with conceptual AI understanding, algorithmic debugging, syntax resolution and structured laboratory guidance.',
    'Instructors often lack the bandwidth to provide immediate personalized code debugging and foundational theoretical explanations for hundreds of simultaneous students during laboratory sessions.',
    'Designed an agentic learning copilot powered by constrained system prompting, few-shot syntax heuristics, and multi-turn state memory that acts as a 24/7 technical teaching assistant.',
    '[
        {"title": "Student Query Parsing & Intent Classification", "description": "Classifies incoming queries into syntax errors, algorithmic logic gaps, conceptual definitions, or project architectural queries."},
        {"title": "Pedagogical Prompt Guardrails", "description": "Enforces Socratic guidance rather than giving raw assignment answers, encouraging deep understanding through structured hints."},
        {"title": "Code Linting & Syntax Correction Engine", "description": "Parses student code submissions, highlights anomalous lines, and provides targeted correction explanations."},
        {"title": "Session Memory & Learning Continuity", "description": "Maintains context-aware student dialogue state across extended problem-solving sessions."}
    ]'::jsonb,
    ARRAY['Python', 'LangChain', 'LangGraph', 'FastAPI', 'React', 'Tailwind CSS'],
    ARRAY[
        'Socratic pedagogy enforcement preventing direct code copying',
        'Multi-turn conversation state preservation using memory buffers',
        'Integrated Python syntax parser and diagnostic hints',
        'Admin telemetry for instructors to track common student misconceptions'
    ],
    'https://github.com/saudhaminian',
    '#',
    '/assets/images/ai_ml_engineering.jpg',
    ARRAY['EdTech', 'Agentic AI', 'LangGraph', 'Python', 'Teaching Assistant'],
    2,
    true
),
(
    'enterprise-web-suite',
    '03',
    'Enterprise Web Application Suite',
    'High-Throughput Microservices & Scalable Cloud Integration',
    'Backend Engineering & Distributed Systems',
    'A robust, modular enterprise software suite integrating high-throughput REST APIs, relational database transactions, automated data pipelines, and responsive management dashboards.',
    'Legacy enterprise operations suffered from fragmented transactional data, manual spreadsheet reconciliations, and slow reporting cycles across cross-functional teams.',
    'Engineered an integrated web application ecosystem with decoupled FastAPI microservices, secure authentication, relational schema normalization, and automated ETL pipelines.',
    '[
        {"title": "Asynchronous REST Microservices", "description": "High-throughput asynchronous endpoints engineered with FastAPI and Pydantic validation schemas."},
        {"title": "Normalized Relational Data Architecture", "description": "Designed performant relational schemas in PostgreSQL / MySQL with indexed foreign keys and ACID transactional integrity."},
        {"title": "Automated Analytical Pipelines", "description": "Background worker tasks orchestrating data transformations, reconciliation checks, and automated summary reports."},
        {"title": "Unified Frontend Dashboard", "description": "Modular web interface delivering real-time operational metrics, granular role-based permissions, and data export features."}
    ]'::jsonb,
    ARRAY['Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'Docker', 'REST APIs', 'Pandas'],
    ARRAY[
        'Decoupled microservice architecture with Swagger OpenAPI contracts',
        'Role-based access control (RBAC) and JWT token authentication',
        'Optimized SQL queries reducing analytical report generation times',
        'Docker containerized deployment ready for cloud orchestration'
    ],
    'https://github.com/saudhaminian',
    '#',
    '/assets/images/vibe_coding_innovation.jpg',
    ARRAY['Backend', 'FastAPI', 'PostgreSQL', 'Microservices', 'Enterprise'],
    3,
    true
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    overview = EXCLUDED.overview,
    problem_statement = EXCLUDED.problem_statement,
    proposed_solution = EXCLUDED.proposed_solution,
    architecture = EXCLUDED.architecture,
    tech_stack = EXCLUDED.tech_stack,
    key_implementations = EXCLUDED.key_implementations,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url,
    image = EXCLUDED.image,
    tags = EXCLUDED.tags,
    updated_at = now();

-- 4.3 SEED PROFESSIONAL EXPERIENCES (8 CAREER ROLES)
INSERT INTO public.experiences (
    id, role, company, location, period, duration, is_current, responsibilities, technologies, display_order, is_published
)
VALUES
(
    'exp-1',
    'Territory Technical Lead',
    'IPCS Global',
    'Kerala, India',
    '2023 — Present',
    'Current Role',
    true,
    ARRAY[
        'Lead territory-wide academic delivery and quality assurance across AI and Machine Learning programs.',
        'Mentor and upskill technical trainers in modern LLMs, Generative AI frameworks, LangChain, and deep learning architectures.',
        'Supervise capstone student projects, guiding architecture choices, data preprocessing pipelines, and model evaluation metrics.',
        'Design structured curricula, project rubrics, and industry-oriented laboratory experiments.'
    ],
    ARRAY['Generative AI', 'Python', 'LangChain', 'Deep Learning', 'Technical Leadership'],
    1,
    true
),
(
    'exp-2',
    'Academic Operations Lead cum Developer',
    'Freelance & Institutional Advisory',
    'Remote / Hybrid',
    '2022 — 2023',
    '1 Year',
    false,
    ARRAY[
        'Developed tailored automation scripts and web tools to streamline academic tracking, student submissions, and automated code review.',
        'Mentored over 100+ final-year engineering students on AI, ML, computer vision, and NLP capstone projects.',
        'Conducted technical workshops on modern Python frameworks, API development, and data visualization tools.'
    ],
    ARRAY['FastAPI', 'Python', 'React', 'Machine Learning', 'Workflow Automation'],
    2,
    true
),
(
    'exp-3',
    'Trainer cum Data Scientist',
    'Global India Techno Hub',
    'Kerala, India',
    '2021 — 2022',
    '1 Year',
    false,
    ARRAY[
        'Delivered hands-on training sessions covering Supervised/Unsupervised Learning, Neural Networks, CNN, RNN, and NLP.',
        'Mentored students through end-to-end data science projects from data scraping and EDA to model deployment.',
        'Engineered demonstration machine learning models and interactive dashboards using Streamlit and Flask.'
    ],
    ARRAY['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NLP', 'Data Science'],
    3,
    true
),
(
    'exp-4',
    'Junior Data Analyst',
    'Scipy Technologies',
    'Kerala, India',
    '2020 — 2021',
    '1 Year',
    false,
    ARRAY[
        'Cleaned, transformed, and engineered features across structured datasets using Pandas and NumPy.',
        'Built automated business intelligence reports and visual dashboards using Power BI and Matplotlib.',
        'Conducted hypothesis testing, correlation studies, and regression modeling to identify actionable operational trends.'
    ],
    ARRAY['Python', 'SQL', 'Pandas', 'Power BI', 'Statistical Analysis'],
    4,
    true
),
(
    'exp-5',
    'Data Science Intern',
    'Scipy Technologies',
    'Kerala, India',
    '2020',
    '6 Months',
    false,
    ARRAY[
        'Assisted senior data scientists in data preprocessing, missing value imputation, and feature selection.',
        'Implemented classification and regression algorithms using Scikit-learn and evaluated performance metrics (Precision, Recall, ROC-AUC).',
        'Documented experimentation logs and prepared analytical presentations.'
    ],
    ARRAY['Python', 'Scikit-learn', 'Jupyter', 'EDA', 'Data Cleaning'],
    5,
    true
),
(
    'exp-6',
    'Customer Support Associate',
    'Tech Mahindra',
    'India',
    '2019 — 2020',
    '1 Year',
    false,
    ARRAY[
        'Diagnosed customer queries and routed escalations through structured CRM service workflows.',
        'Maintained high customer satisfaction standards while resolving technical inquiries under tight SLAs.',
        'Collaborated with cross-functional support teams to improve first-call resolution rates.'
    ],
    ARRAY['CRM Systems', 'Technical Communication', 'Client SLA Management'],
    6,
    true
),
(
    'exp-7',
    'Accountant',
    'SIM M SAND',
    'Kerala, India',
    '2018 — 2019',
    '1 Year',
    false,
    ARRAY[
        'Maintained day-to-day general ledger records, accounts payable/receivable, and cash flow reconciliations.',
        'Compiled monthly financial statements, inventory reports, and audit-ready commercial documentation.',
        'Utilized accounting software and spreadsheet modeling for precise numerical audits.'
    ],
    ARRAY['Financial Accounting', 'Spreadsheet Modeling', 'Ledger Reconciliation', 'Tally'],
    7,
    true
),
(
    'exp-8',
    'Senior Telecaller',
    'HDB Financial Services',
    'Kerala, India',
    '2017 — 2018',
    '1 Year',
    false,
    ARRAY[
        'Communicated with institutional and retail clients regarding financial products and loan servicing details.',
        'Maintained updated CRM records, verified customer documentation, and monitored portfolio timelines.',
        'Consistently met organizational benchmarks for customer engagement and verification accuracy.'
    ],
    ARRAY['Client Engagement', 'Financial Services', 'Database Records'],
    8,
    true
)
ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    company = EXCLUDED.company,
    location = EXCLUDED.location,
    period = EXCLUDED.period,
    duration = EXCLUDED.duration,
    is_current = EXCLUDED.is_current,
    responsibilities = EXCLUDED.responsibilities,
    technologies = EXCLUDED.technologies,
    updated_at = now();

-- 4.4 SEED SKILLS (9 CATEGORIES)
INSERT INTO public.skills (
    id, category_id, category_title, items, display_order, is_published
)
VALUES
(
    'cat-genai',
    'genai',
    'Generative AI & LLMs',
    ARRAY['LLMs', 'Generative AI', 'Prompt Engineering', 'RAG', 'AI Agents', 'Agentic AI', 'Embeddings', 'Semantic Search', 'Function Calling', 'Structured Outputs', 'LLM Evaluation'],
    1,
    true
),
(
    'cat-frameworks',
    'frameworks',
    'AI Frameworks & Libraries',
    ARRAY['LangChain', 'LangGraph', 'Hugging Face Transformers', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn'],
    2,
    true
),
(
    'cat-ml',
    'ml',
    'Machine Learning & Deep Learning',
    ARRAY['Machine Learning', 'Deep Learning', 'CNN', 'RNN', 'LSTM', 'GRU', 'Transfer Learning', 'Feature Engineering', 'NLP'],
    3,
    true
),
(
    'cat-programming',
    'programming',
    'Programming & Web Standards',
    ARRAY['Python', 'SQL', 'R', 'JavaScript (Basic)', 'HTML'],
    4,
    true
),
(
    'cat-backend',
    'backend',
    'Backend & API Integration',
    ARRAY['FastAPI', 'REST APIs', 'API Integration', 'JSON'],
    5,
    true
),
(
    'cat-databases',
    'databases',
    'Databases & Vector Storage',
    ARRAY['MySQL', 'MongoDB (Basic)', 'ChromaDB', 'FAISS', 'Vector Databases'],
    6,
    true
),
(
    'cat-analytics',
    'analytics',
    'Data Analytics & Visualization',
    ARRAY['Pandas', 'NumPy', 'Power BI', 'Excel', 'Matplotlib', 'Seaborn', 'Statistical Analysis'],
    7,
    true
),
(
    'cat-devops',
    'devops',
    'DevOps & Workflow Automation',
    ARRAY['Git', 'GitHub', 'Docker (Basic)', 'n8n', 'Workflow Automation'],
    8,
    true
),
(
    'cat-cloud',
    'cloud',
    'Cloud Computing',
    ARRAY['Microsoft Azure (Fundamentals)', 'AWS (Fundamentals)'],
    9,
    true
)
ON CONFLICT (id) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    category_title = EXCLUDED.category_title,
    items = EXCLUDED.items,
    updated_at = now();

-- 4.5 SEED EDUCATION & ACADEMIC BACKGROUND
INSERT INTO public.education (
    id, degree, institution, location, period, description, key_modules, display_order, is_published
)
VALUES
(
    'edu-1',
    'M.Sc. Data Analytics',
    'Mar Thoma College',
    'Kerala, India',
    'Graduated',
    'Rigorous postgraduate curriculum emphasizing advanced statistical modeling, multivariate data analysis, big data processing, and applied machine learning frameworks.',
    ARRAY['Advanced Statistical Inference', 'Multivariate Data Analysis', 'Machine Learning Models', 'Big Data Engineering'],
    1,
    true
),
(
    'edu-2',
    'B.Sc. Mathematics',
    'SAS SNDP Yogam College, Konni',
    'Kerala, India',
    'Graduated',
    'Rigorous mathematical foundations in linear algebra, differential calculus, discrete mathematics, and numerical methods that underpin neural networks and vector spaces.',
    ARRAY['Linear Algebra', 'Differential Calculus', 'Numerical Analysis', 'Probability Theory', 'Abstract Algebra'],
    2,
    true
),
(
    'edu-3',
    'Higher Secondary',
    'GHSS Konni',
    'Kerala, India',
    'Completed',
    'Foundational scientific curriculum with an intensive focus on physics, chemistry, and higher mathematics.',
    ARRAY['Physics', 'Chemistry', 'Mathematics', 'Computer Science Foundations'],
    3,
    true
)
ON CONFLICT (id) DO UPDATE SET
    degree = EXCLUDED.degree,
    institution = EXCLUDED.institution,
    location = EXCLUDED.location,
    period = EXCLUDED.period,
    description = EXCLUDED.description,
    key_modules = EXCLUDED.key_modules,
    updated_at = now();

-- 4.6 SEED CERTIFICATIONS
INSERT INTO public.certifications (
    id, title, issuer, year, skills_covered, display_order, is_published
)
VALUES
(
    'cert-1',
    'Google Data Analytics Professional Certificate',
    'Google',
    '2023',
    ARRAY['Data Cleaning', 'SQL', 'R Programming', 'Tableau', 'Statistical Analysis'],
    1,
    true
),
(
    'cert-2',
    'Machine Learning & Deep Learning Certification',
    'Specialized Technical Institute',
    '2022',
    ARRAY['Supervised Learning', 'Neural Networks', 'CNN', 'RNN', 'Scikit-learn', 'TensorFlow'],
    2,
    true
),
(
    'cert-3',
    'Google Certification in Generative AI',
    'Google Cloud / Google',
    '2024',
    ARRAY['LLMs', 'Prompt Engineering', 'Generative Models', 'Embeddings', 'AI Safety'],
    3,
    true
),
(
    'cert-4',
    'Ethical Hacking & Cybersecurity Certification',
    'Cybersecurity Education Body',
    '2022',
    ARRAY['Network Security', 'Vulnerability Assessment', 'API Security', 'Threat Modeling'],
    4,
    true
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    issuer = EXCLUDED.issuer,
    year = EXCLUDED.year,
    skills_covered = EXCLUDED.skills_covered,
    updated_at = now();

-- 4.7 SEED AI EXPERIMENTS (AI LAB)
INSERT INTO public.ai_experiments (
    id, number, title, category, status, description, findings, tools_used, display_order, is_published
)
VALUES
(
    'exp-tools-1',
    '01',
    'Benchmarking Local LLM Tooling: Ollama vs LM Studio for Developer Workflows',
    'Tools Exploration',
    'Completed',
    'Evaluated latency, memory footprint, and OpenAI-compatible API endpoints running quantized open models (Llama 3, Mistral, Qwen) on local hardware.',
    ARRAY[
        'Ollama provides superior headless CLI integration and Docker containerization for local automated pipelines.',
        'LM Studio excels in interactive prompt parameter tuning and context window inspection.'
    ],
    ARRAY['Ollama', 'LM Studio', 'Llama 3 8B', 'Mistral 7B', 'FastAPI'],
    1,
    true
),
(
    'exp-prompt-1',
    '02',
    'Deterministic JSON Extraction via Pydantic & Constrained System Prompting',
    'Prompt Engineering',
    'Completed',
    'Engineered few-shot prompt patterns combined with JSON schema constraints to guarantee 100% parseable structured outputs from unstructured messy data.',
    ARRAY[
        'Constrained system prompting with explicit negative schema examples reduces type coercion errors.',
        'Eliminating markdown wrap and conversational boilerplate increases JSON parser pass rates.'
    ],
    ARRAY['Pydantic v2', 'LangChain', 'OpenAI Function Calling', 'Few-Shot Prompts'],
    2,
    true
),
(
    'exp-vibe-1',
    '03',
    'Rapid Architectural Prototyping: Concept-to-Production in Hours',
    'Vibe Coding',
    'Active Exploration',
    'Explored AI-assisted rapid coding workflows using modern AI-first IDEs (Cursor, Windsurf) to synthesize full-stack functional utilities from specification docs.',
    ARRAY[
        'Vibe coding is most effective when paired with rigorous architectural mental models.',
        'Defining explicit TypeScript interfaces and clear modular boundaries before generating UI accelerates development tenfold without technical debt.'
    ],
    ARRAY['Cursor', 'Windsurf', 'TypeScript', 'Tailwind CSS', 'Vite'],
    3,
    true
),
(
    'exp-proto-1',
    '04',
    'Vector Similarity Distance & Semantic Chunking Visualizer',
    'Prototypes & Demos',
    'Completed',
    'Constructed a lightweight interactive prototype to visualize cosine similarity distances between chunked document segments and synthetic user queries.',
    ARRAY[
        'Semantic chunking with 15% sliding window overlap consistently preserves contextual cross-boundary references far better than rigid fixed-character splitting.'
    ],
    ARRAY['ChromaDB', 'Sentence Transformers', 'NumPy', 'React'],
    4,
    true
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    description = EXCLUDED.description,
    findings = EXCLUDED.findings,
    tools_used = EXCLUDED.tools_used,
    updated_at = now();

-- 4.8 SEED BLOG POSTS
INSERT INTO public.blog_posts (
    id, slug, title, category, date, read_time, excerpt, content, tags, display_order, is_published
)
VALUES
(
    'deconstructing-rag',
    'deconstructing-rag-enterprise-search',
    'Deconstructing RAG: Moving Beyond Naive Retrieval to Production-Grade Agentic Search',
    'LLM Engineering',
    'February 2026',
    '6 min read',
    'A practical architectural walkthrough of why naive top-k vector retrieval produces context fragmentation, and how hybrid dense-sparse indexing, dynamic chunk reranking, and citation anchors solve hallucination.',
    ARRAY[
        'In early proof-of-concept RAG systems, the standard tutorial recipe is simple: split text into 500-token chunks, compute dense embeddings, index in FAISS, and retrieve the top-3 nearest neighbors. While this looks impressive in prototypes, it breaks down quickly in real-world enterprise repositories.',
        'The primary flaw lies in loss of semantic continuity. When a technical document contains tabular data or multi-paragraph arguments, naive chunking truncates prerequisite context. When a user asks a specific question with domain acronyms, cosine similarity on dense embeddings often matches conceptually related paragraphs rather than the exact factual passage.',
        'To build a production-grade RAG assistant, we introduce three core layers: first, semantic chunking with sliding window overlaps based on markdown header trees. Second, a hybrid retrieval strategy combining BM25 lexical keyword matching with dense vector embeddings. Third, a cross-encoder reranker that scores relevance before injecting context into the system prompt.',
        'Finally, strict prompt guardrails must instruct the LLM to refuse speculative extrapolation and append explicit citation anchors referencing verified source IDs. This transforms an unreliable chatbot into an authoritative enterprise knowledge assistant.'
    ],
    ARRAY['RAG', 'Vector Search', 'LangChain', 'FastAPI', 'Architecture'],
    1,
    true
),
(
    'system-prompt-engineering',
    'system-prompt-engineering-patterns',
    'System Prompt Engineering: Patterns, Guardrails and Deterministic Structured Outputs',
    'Prompt Engineering',
    'January 2026',
    '5 min read',
    'Techniques for enforcing strict JSON schemas, preventing prompt injections, and implementing few-shot chain-of-thought heuristics that guarantee reliable machine consumption.',
    ARRAY[
        'Software engineers expect APIs to return valid, typed responses. Large language models, however, are inherently probabilistic token prediction engines. When connecting an LLM to a production backend, unconstrained free-text output is a failure mode.',
        'Achieving deterministic structured outputs requires a multi-layered approach. System instructions must establish an authoritative persona, declare explicit negative constraints (e.g., "Never output markdown codeblocks, introductory affirmations, or apologies"), and define exact Pydantic/JSON schemas.',
        'Furthermore, integrating two or three well-chosen few-shot examples within the system context dramatically reduces schema deviation. Testing shows that few-shot examples with diverse edge cases (such as missing optional fields or non-standard characters) increase parser pass-rates to near 100%.',
        'By pairing prompt guardrails with runtime schema validation in FastAPI, engineers can safely embed generative AI into mission-critical automated pipelines.'
    ],
    ARRAY['Prompt Engineering', 'JSON Schema', 'Pydantic', 'API Integration'],
    2,
    true
),
(
    'agentic-ai-state-machines',
    'agentic-ai-state-machines-langgraph',
    'Agentic AI with LangGraph: Designing Cyclic State Machines for Complex Reasoning',
    'Agentic AI',
    'December 2025',
    '7 min read',
    'How to structure stateful AI agents using LangGraph nodes, conditional edges, and memory checkpoints to automate complex multi-step technical workflows.',
    ARRAY[
        'Linear LLM chains (prompt -> model -> output) are insufficient for tasks that require iterative validation, web tool execution, or self-correction. If a tool call fails or a code execution generates a syntax error, a linear chain fails outright.',
        'Agentic workflows solve this by adopting graph-based state machines. In LangGraph, each step of an agent thought process is a node that reads from and writes to a shared typed state dictionary. Edges between nodes can be conditional based on model tool calls or validation results.',
        'For example, in our AI-Powered Academic Copilot, an intent classifier directs the query to either a code debugger node or a theoretical explanation node. If the generated code hint fails a syntax linter, a conditional loop routes the response back to the prompt refiner node before displaying it to the student.',
        'Designing with explicit state graphs ensures predictability, observability, and robust fallback paths in autonomous systems.'
    ],
    ARRAY['Agentic AI', 'LangGraph', 'State Machines', 'Autonomous Agents'],
    3,
    true
),
(
    'vibe-coding-architecture',
    'vibe-coding-architecture-balance',
    'Vibe Coding in Practice: Balancing AI Acceleration with Rigorous Software Architecture',
    'Vibe Coding',
    'November 2025',
    '4 min read',
    'Observations and best practices on AI-assisted rapid coding: why strong typed contracts, modular boundaries, and architectural discipline become more important, not less.',
    ARRAY[
        'The emergence of AI-first coding assistants and prompt-driven synthesis (colloquially termed "vibe coding") has transformed how quickly an idea can become running software. What used to take days of boilerplate setup can now be scaffolded in minutes.',
        'However, speed without structure leads to brittle codebases. Without disciplined architecture, AI tools often introduce duplicate states, contradictory styling conventions, and fragmented utility functions that become impossible to maintain.',
        'The optimal methodology treats the engineer as a principal software architect: before prompting the AI, write explicit TypeScript interfaces, define folder boundaries, determine state flow, and enforce strict component hierarchies. When the AI is guided by a clear architectural blueprint, it delivers pristine, production-grade results at unprecedented speed.'
    ],
    ARRAY['Vibe Coding', 'Software Architecture', 'TypeScript', 'Productivity'],
    4,
    true
)
ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    date = EXCLUDED.date,
    read_time = EXCLUDED.read_time,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    tags = EXCLUDED.tags,
    updated_at = now();
