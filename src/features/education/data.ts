import { EducationItem, CertificationItem } from './types';

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: 'M.Sc. Data Analytics',
    field: 'Advanced Analytics, Statistical Computation & Machine Learning',
    institution: 'Mar Thoma College',
    status: 'Graduated',
    description:
      'Rigorous postgraduate curriculum emphasizing advanced statistical modeling, multivariate data analysis, big data processing, and applied machine learning frameworks.',
  },
  {
    degree: 'B.Sc. Mathematics',
    field: 'Pure & Applied Mathematics, Probability Theory & Linear Algebra',
    institution: 'SAS SNDP Yogam College, Konni',
    status: 'Graduated',
    description:
      'Rigorous mathematical foundations in linear algebra, differential calculus, discrete mathematics, and numerical methods that underpin neural networks and vector spaces.',
  },
  {
    degree: 'Higher Secondary',
    field: 'Science & Mathematics Stream',
    institution: 'GHSS Konni',
    status: 'Completed',
    description:
      'Foundational scientific curriculum with an intensive focus on physics, chemistry, and higher mathematics.',
  },
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    type: 'Professional Credential',
    skills: ['Data Cleaning', 'SQL', 'R Programming', 'Tableau', 'Statistical Analysis'],
  },
  {
    title: 'Machine Learning & Deep Learning Certification',
    issuer: 'Specialized Technical Institute',
    type: 'Technical Specialization',
    skills: ['Supervised Learning', 'Neural Networks', 'CNN', 'RNN', 'Scikit-learn', 'TensorFlow'],
  },
  {
    title: 'Google Certification in Generative AI',
    issuer: 'Google Cloud / Google',
    type: 'AI Credential',
    skills: ['LLMs', 'Prompt Engineering', 'Generative Models', 'Embeddings', 'AI Safety'],
  },
  {
    title: 'Ethical Hacking & Cybersecurity Certification',
    issuer: 'Cybersecurity Education Body',
    type: 'Security Credential',
    skills: ['Network Security', 'Vulnerability Assessment', 'API Security', 'Threat Modeling'],
  },
];
