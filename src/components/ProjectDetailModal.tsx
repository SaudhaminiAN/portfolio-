import React, { useEffect } from 'react';
import { ProjectItem, PortfolioConfig } from '../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../utils/themeStyles';
import { ProjectArtPattern } from './ProjectArtPattern';
import { X, ArrowUpRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  config: PortfolioConfig;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  config,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/65 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border ${theme.borderClass} ${theme.bgClass} shadow-2xl relative flex flex-col`}
      >
        {/* Close Button (Top right, prominent) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
          title="Close (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Banner */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
          <ProjectArtPattern
            type={project.patternType || 'architectural'}
            imageUrl={project.image}
            title={project.title}
          />
        </div>

        {/* Modal Article Content */}
        <div className="p-6 md:p-10">
          {/* Metadata: Category · Year · Tags (Unboxed zero-pill text) */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-mono text-neutral-400 mb-3">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            {project.tags && project.tags.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.tags.join(' / ')}</span>
              </>
            )}
          </div>

          <h2 className={`text-2xl md:text-4xl font-bold ${font.display} ${theme.textPrimaryClass} tracking-tight mb-6`}>
            {project.title}
          </h2>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p className="font-medium text-lg md:text-xl text-neutral-900 dark:text-neutral-100">
              {project.description}
            </p>

            {project.fullContent ? (
              <p className="leading-relaxed">
                {project.fullContent}
              </p>
            ) : (
              <p className="leading-relaxed">
                This project represents a synthesis of rigorous user research, clean structural systems, and refined visual craft. Every touchpoint was tested for clarity, responsiveness, and performance under real-world usage.
              </p>
            )}
          </div>

          {/* External Project Link */}
          {project.link && (
            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-lg text-white ${accent.bg} ${accent.hover} transition-colors shadow-xs`}
              >
                <span>Visit Live Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="text-xs font-mono text-neutral-400">
                Press ESC to close
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
