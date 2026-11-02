import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Github, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white text-[#111111] border border-[#EAEAEA] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAEAEA] bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#111111] text-white">
              PROJECT {project.number}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#777777] hover:text-[#111111] hover:bg-[#EAEAEA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit tracking-tight text-[#111111] mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-jakarta text-[#555555]">
              {project.subtitle}
            </p>
          </div>

          {/* Project Overview */}
          <div className="p-4 sm:p-5 bg-[#FAFAFA] border-l-2 border-[#111111] border-y border-r border-[#EAEAEA]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block mb-1">
              EXECUTIVE OVERVIEW
            </span>
            <p className="text-sm font-jakarta text-[#222222] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Problem vs Solution 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Problem Statement */}
            <div className="p-5 border border-[#EAEAEA] bg-white">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block mb-2">
                01 / THE PROBLEM
              </span>
              <h3 className="text-sm font-bold font-outfit uppercase tracking-wide text-[#111111] mb-2">
                Operational Bottlenecks & Limitations
              </h3>
              <p className="text-xs sm:text-sm font-jakarta text-[#555555] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="p-5 border border-[#111111] bg-[#FAFAFA]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111] block mb-2">
                02 / THE ARCHITECTURAL SOLUTION
              </span>
              <h3 className="text-sm font-bold font-outfit uppercase tracking-wide text-[#111111] mb-2">
                Engineered Approach & Flow
              </h3>
              <p className="text-xs sm:text-sm font-jakarta text-[#222222] leading-relaxed">
                {project.proposedSolution}
              </p>
            </div>
          </div>

          {/* Technical Architecture Pipeline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#111111]" />
              <h3 className="text-sm font-bold font-outfit uppercase tracking-wider text-[#111111]">
                Technical Architecture & Pipeline
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architecture.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FAFAFA] border border-[#EAEAEA] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mb-1">
                      STAGE 0{idx + 1}
                    </span>
                    <h4 className="text-xs font-bold font-outfit text-[#111111] mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#555555] font-jakarta leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Implementations & Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Implementations */}
            <div>
              <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-[#111111] mb-3">
                Key Technical Implementations
              </h3>
              <ul className="space-y-2">
                {project.keyImplementations.map((impl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-jakarta text-[#444444]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] shrink-0 mt-0.5" />
                    <span>{impl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-[#111111] mb-3">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#FAFAFA] border border-[#CCCCCC] text-xs font-mono text-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#EAEAEA] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono uppercase text-[#777777]"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#CCCCCC] bg-white text-xs font-mono text-[#111111] hover:border-[#111111] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#111111] text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
