import { PortfolioConfig, PortfolioSection, ProjectItem } from '../types/portfolio';

// Strict Blank Portfolio: 0 sections, a pure blank slate
export const BLANK_PORTFOLIO: PortfolioConfig = {
  siteTitle: 'My Portfolio',
  theme: 'monochrome',
  font: 'modern-sans',
  accent: 'neutral',
  sections: [],
};

// Minimalist Hero starter
export const createDefaultHero = (): PortfolioSection => ({
  id: 'hero-1',
  type: 'hero',
  visible: true,
  name: 'Alex Morgan',
  title: 'Digital Designer & Creative Technologist',
  bio: 'Crafting thoughtful digital products, brand identities, and interactive experiences with an editorial eye and systemic precision.',
  location: 'San Francisco, CA',
  statusText: 'Available for Q1 2027 projects',
  layoutVariant: 'minimal',
  ctaText: 'View Selected Works',
  ctaLink: '#projects',
  secondaryCtaText: 'Get in Touch',
  secondaryCtaLink: '#contact',
});

export const createDefaultAbout = (): PortfolioSection => ({
  id: `about-${Date.now()}`,
  type: 'about',
  visible: true,
  heading: 'About & Approach',
  subheading: 'Design at the intersection of discipline and human intuition',
  paragraphs: [
    'I operate as an independent product designer and creative engineer. Over the past eight years, I have worked with early-stage founders, design-led studios, and technology companies to translate complex ideas into clear, functional products.',
    'My philosophy is rooted in architectural clarity, restrained typography, and intentional motion. I believe interfaces should quietly empower the user rather than demand excessive visual attention.'
  ],
  focusAreas: [
    'Design Systems & Interaction Architecture',
    'Full-Stack Frontend Implementation',
    'Editorial Art Direction & Brand Strategy',
    'Product Prototyping & Motion Studies'
  ]
});

export const sampleProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Verve Spatial Interface',
    category: 'Product Design',
    year: '2026',
    description: 'An architectural operating workspace designed for spatial media production and collaborative 3D scene composition.',
    fullContent: 'Verve was built to solve latency and spatial navigation issues in browser-based design tools. We constructed a modular viewport system that reduced mental cognitive overhead by 40% through unified camera coordinates and contextual inspector panels.',
    patternType: 'architectural',
    link: 'https://example.com/verve',
    tags: ['Interaction Design', 'Web Systems', 'Design Tool']
  },
  {
    id: 'proj-2',
    title: 'Monolith Publication',
    category: 'Editorial Direction',
    year: '2025',
    description: 'A contemporary cultural broadsheet and reading platform prioritizing typographic pacing and reader focus.',
    fullContent: 'Designed as a digital counterpart to independent print quarterlies, Monolith employs dynamic typographic rhythm and measured column grids to elevate long-form critique and essay collections.',
    patternType: 'editorial',
    link: 'https://example.com/monolith',
    tags: ['Typography', 'Publishing', 'Art Direction']
  },
  {
    id: 'proj-3',
    title: 'Sentry Protocol Dashboard',
    category: 'Systems Engineering',
    year: '2025',
    description: 'Real-time telemetry and state monitoring console for decentralized infrastructure and network observability.',
    fullContent: 'Re-architected the mission-critical telemetry visualizer with zero-latency tabular figures, precise SVG timelines, and focused anomaly highlighting for high-concurrency operators.',
    patternType: 'geometric',
    link: 'https://example.com/sentry',
    tags: ['Data Visualization', 'React', 'Infrastructure']
  }
];

export const createDefaultProjects = (): PortfolioSection => ({
  id: `projects-${Date.now()}`,
  type: 'projects',
  visible: true,
  heading: 'Selected Works',
  subheading: 'Curated projects across digital systems, direction, and product design',
  items: [...sampleProjects]
});

export const createDefaultSkills = (): PortfolioSection => ({
  id: `skills-${Date.now()}`,
  type: 'skills',
  visible: true,
  heading: 'Capabilities & Stack',
  subheading: 'Tools, methods, and technologies applied in production',
  categories: [
    {
      title: 'Design & Direction',
      items: ['Design Systems', 'Interface Architecture', 'Information Hierarchy', 'Typographic Direction', 'Interaction Prototyping']
    },
    {
      title: 'Frontend Engineering',
      items: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Motion & SVG Animation', 'Performance Optimization']
    },
    {
      title: 'Principles & Practice',
      items: ['Accessibility (WCAG AA)', 'Design Tokens', 'Cross-browser Auditing', 'Zero-Pill Restraint']
    }
  ]
});

export const createDefaultExperience = (): PortfolioSection => ({
  id: `experience-${Date.now()}`,
  type: 'experience',
  visible: true,
  heading: 'Experience & Milestones',
  subheading: 'A chronological view of leadership and production roles',
  items: [
    {
      id: 'exp-1',
      role: 'Staff Product Designer',
      company: 'Studio Form & Code',
      period: '2024 — Present',
      location: 'San Francisco, CA',
      description: 'Directing the core design system and interface architecture for spatial engineering tools across web and desktop.'
    },
    {
      id: 'exp-2',
      role: 'Senior Interaction Designer',
      company: 'Aether Systems',
      period: '2021 — 2024',
      location: 'New York, NY',
      description: 'Led end-to-end UX for developer observability products, collaborating with distributed engineering teams.'
    },
    {
      id: 'exp-3',
      role: 'Design Technologist',
      company: 'Independent Practice',
      period: '2019 — 2021',
      location: 'London, UK',
      description: 'Crafted bespoke digital exhibitions, editorial publications, and interactive brand websites for cultural clients.'
    }
  ]
});

export const createDefaultContact = (): PortfolioSection => ({
  id: `contact-${Date.now()}`,
  type: 'contact',
  visible: true,
  heading: 'Get in Touch',
  subheading: 'Currently open to selective consulting, advisory, and creative collaborations.',
  email: 'alex.morgan@example.com',
  location: 'San Francisco & Remote Worldwide',
  availability: 'Accepting inquiries for upcoming quarters',
  socials: [
    { platform: 'GitHub', label: 'github.com/alexmorgan', url: 'https://github.com' },
    { platform: 'LinkedIn', label: 'linkedin.com/in/alexmorgan', url: 'https://linkedin.com' },
    { platform: 'X / Twitter', label: '@alexmorgan', url: 'https://x.com' },
    { platform: 'Substack', label: 'alexmorgan.substack.com', url: 'https://substack.com' }
  ]
});

export const createDefaultCustomBlock = (): PortfolioSection => ({
  id: `custom-${Date.now()}`,
  type: 'custom',
  visible: true,
  title: 'Design Statement',
  content: 'Good design is not measured by the quantity of elements added to a screen, but by the quiet certainty with which extraneous elements have been removed. We design to make complex tools feel intuitive, durable, and respectful of the human attention span.'
});

// Full starter portfolio if user wants to populate with 1 click
export const FULL_SAMPLE_PORTFOLIO: PortfolioConfig = {
  siteTitle: 'Alex Morgan · Design & Engineering',
  theme: 'monochrome',
  font: 'modern-sans',
  accent: 'neutral',
  sections: [
    createDefaultHero(),
    createDefaultAbout(),
    createDefaultProjects(),
    createDefaultSkills(),
    createDefaultExperience(),
    createDefaultContact()
  ]
};
