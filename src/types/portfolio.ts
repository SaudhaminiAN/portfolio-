export type ThemeMode = 'monochrome' | 'warm-paper' | 'obsidian' | 'nordic' | 'sage';
export type FontPairing = 'modern-sans' | 'editorial-serif' | 'monograph' | 'technical';
export type AccentColor = 'neutral' | 'cobalt' | 'ochre' | 'emerald' | 'crimson';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  fullContent?: string;
  image?: string;
  patternType?: 'architectural' | 'minimalist' | 'editorial' | 'geometric';
  link?: string;
  tags: string[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  location?: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

export type SectionType = 
  | 'hero'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'contact'
  | 'custom';

export interface BaseSection {
  id: string;
  type: SectionType;
  visible: boolean;
}

export interface HeroSectionData extends BaseSection {
  type: 'hero';
  name: string;
  title: string;
  bio: string;
  location: string;
  statusText: string;
  avatarUrl?: string;
  layoutVariant: 'minimal' | 'split' | 'editorial';
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface AboutSectionData extends BaseSection {
  type: 'about';
  heading: string;
  subheading?: string;
  paragraphs: string[];
  focusAreas: string[];
  resumeUrl?: string;
  resumeFileName?: string;
}

export interface ProjectsSectionData extends BaseSection {
  type: 'projects';
  heading: string;
  subheading?: string;
  items: ProjectItem[];
}

export interface SkillsSectionData extends BaseSection {
  type: 'skills';
  heading: string;
  subheading?: string;
  categories: SkillCategory[];
}

export interface ExperienceSectionData extends BaseSection {
  type: 'experience';
  heading: string;
  subheading?: string;
  items: ExperienceItem[];
}

export interface ContactSectionData extends BaseSection {
  type: 'contact';
  heading: string;
  subheading?: string;
  email: string;
  location: string;
  availability: string;
  socials: SocialLink[];
}

export interface CustomBlockSectionData extends BaseSection {
  type: 'custom';
  title: string;
  content: string;
}

export type PortfolioSection =
  | HeroSectionData
  | AboutSectionData
  | ProjectsSectionData
  | SkillsSectionData
  | ExperienceSectionData
  | ContactSectionData
  | CustomBlockSectionData;

export interface PortfolioConfig {
  siteTitle: string;
  theme: ThemeMode;
  font: FontPairing;
  accent: AccentColor;
  sections: PortfolioSection[];
}
