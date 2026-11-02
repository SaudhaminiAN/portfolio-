import React, { useState } from 'react';
import { SAMonogram } from './SAMonogram';
import { FileText } from 'lucide-react';

interface NavigationProps {
  onReplayIntro?: () => void;
  onPlaceholderClick: (sectionName: string) => void;
  onOpenResume?: () => void;
  isDark?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onReplayIntro,
  onPlaceholderClick,
  onOpenResume,
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'WHAT I DO', id: 'section-02-track' },
    { label: 'EXPERTISE', id: 'section-skills' },
    { label: 'PROJECTS', id: 'section-projects' },
    { label: 'EXPERIENCE', id: 'section-experience' },
    { label: 'AI LAB', id: 'section-ai-lab' },
    { label: 'BLOG', id: 'section-blog' },
    { label: 'CONTACT', id: 'section-contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-[150] w-full transition-colors duration-500 ${
        isDark
          ? 'bg-[#000000]/95 backdrop-blur-md border-b border-white/15 text-white'
          : 'bg-white/95 backdrop-blur-xs border-b border-[#EAEAEA] text-[#111111]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Left: Brand Identity / Wordmark — Click to replay intro & return to Hero section */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onReplayIntro) {
              onReplayIntro();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          title="Replay intro & return to Hero section"
          className={`group flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase font-outfit whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            isDark ? 'text-white' : 'text-[#111111]'
          }`}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
            <SAMonogram size={34} color={isDark ? '#FFFFFF' : '#111111'} />
          </div>
          <span className="truncate">SAUDHAMINI A N</span>
        </a>

        {/* Right: Nav Links with Elegant Underline Animation */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-6 xl:gap-8">
          <nav
            className={`hidden lg:flex items-center lg:gap-5 xl:gap-8 text-xs font-medium tracking-[0.16em] xl:tracking-[0.18em] uppercase font-jakarta ${
              isDark ? 'text-neutral-400' : 'text-[#777777]'
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onPlaceholderClick(link.id)}
                className={`relative py-1 transition-colors focus-visible:outline-none group whitespace-nowrap text-[11px] xl:text-xs cursor-pointer ${
                  isDark ? 'hover:text-white' : 'hover:text-[#111111]'
                }`}
              >
                <span>{link.label}</span>
                {/* Elegant hairline underline animation */}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[1.5px] transition-all duration-300 ease-out group-hover:w-full ${
                    isDark ? 'bg-white' : 'bg-[#111111]'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Resume / CV Quick Action */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              title="View full curriculum vitae"
              className={`flex items-center gap-1.5 text-[11px] font-mono tracking-wider px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                isDark
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-[#111111]/20 text-[#111111] hover:bg-neutral-50 hover:border-[#111111]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>
          )}

          {/* Mobile & Tablet Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors focus-visible:outline-none cursor-pointer ${
              isDark ? 'text-white hover:text-neutral-300' : 'text-[#111111] hover:text-[#777777]'
            }`}
            aria-label="Toggle Navigation"
          >
            <span className="text-xs font-mono font-medium tracking-widest uppercase">
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Nav Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 sm:px-8 py-4 sm:py-5 animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark ? 'border-white/10 bg-[#0a0a0a]' : 'border-[#EAEAEA] bg-white'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onPlaceholderClick(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs font-medium tracking-[0.2em] uppercase py-2.5 border-b font-jakarta cursor-pointer ${
                  isDark
                    ? 'border-white/10 text-neutral-300 hover:text-white'
                    : 'border-[#F5F5F5] text-[#555555] hover:text-[#111111]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {onOpenResume && (
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className={`mt-2 w-full text-left text-xs font-medium tracking-[0.2em] uppercase py-2.5 font-jakarta flex items-center gap-2 cursor-pointer ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW CURRICULUM VITAE</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
