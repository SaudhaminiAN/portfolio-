import React from 'react';
import { PortfolioConfig } from '../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../utils/themeStyles';

interface PortfolioHeaderProps {
  config: PortfolioConfig;
  brandName: string;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ config, brandName }) => {
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  // Derive which sections actually exist in this portfolio
  const hasProjects = config.sections.some((s) => s.type === 'projects');
  const hasAbout = config.sections.some((s) => s.type === 'about');
  const hasSkills = config.sections.some((s) => s.type === 'skills');
  const hasExperience = config.sections.some((s) => s.type === 'experience');
  const hasContact = config.sections.some((s) => s.type === 'contact');

  return (
    <header className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${theme.bgClass}/90 ${theme.borderClass}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark / Brand Title (Single text element) */}
        <a
          href="#"
          className={`text-base md:text-lg font-bold tracking-tight ${font.display} ${theme.textPrimaryClass} whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity`}
        >
          {brandName || 'Portfolio'}
        </a>

        {/* Zone 2: 4–5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {hasProjects && (
            <a href="#projects" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0">
              Works
            </a>
          )}
          {hasAbout && (
            <a href="#about" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0">
              About
            </a>
          )}
          {hasSkills && (
            <a href="#skills" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0">
              Capabilities
            </a>
          )}
          {hasExperience && (
            <a href="#experience" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0">
              History
            </a>
          )}
          {hasContact && (
            <a href="#contact" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0">
              Contact
            </a>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs ${accent.bg} ${accent.hover}`}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
};
