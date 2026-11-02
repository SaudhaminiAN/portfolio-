import React, { useState, useEffect } from 'react';
import { SELECTED_PROJECTS } from '../data';
import { ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ArrowRight, ArrowUpRight, Github, Layers } from 'lucide-react';
import { projectsService } from '../../../lib/supabase/services/projectsService';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(SELECTED_PROJECTS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    projectsService.getPublishedProjects().then((items) => {
      if (isMounted && items && items.length > 0) {
        setProjects(items);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const currentProject = projects[selectedIndex] || projects[0];
  const resolvedProjectImage =
    currentProject.id?.includes('rag') || selectedIndex === 0
      ? '/assets/images/project_rag.jpg'
      : currentProject.id?.includes('copilot') || selectedIndex === 1
        ? '/assets/images/project_copilot.jpg'
        : currentProject.id?.includes('enterprise') || selectedIndex === 2
          ? '/assets/images/project_enterprise.jpg'
          : currentProject.image || '/assets/images/project_rag.jpg';

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-white text-[#111111]">
      {/* Upper Split Layout: Project Portrait/Visual Frame on Left, Hero Typography & Selector on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Left Column: Architectural Project Frame (Mirrors Hero Portrait Frame) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-1">
          <div className="relative w-full max-w-[330px] sm:max-w-[350px] md:max-w-[320px] lg:max-w-[350px] xl:max-w-[370px] group">
            <div className="relative aspect-[4/3] sm:aspect-[3/4] max-h-[300px] sm:max-h-[330px] w-full overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] shadow-xs">
              {resolvedProjectImage ? (
                <img
                  key={resolvedProjectImage}
                  src={resolvedProjectImage}
                  alt={currentProject.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] animate-in fade-in"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                  <Layers className="w-12 h-12 text-white/40" />
                </div>
              )}

              {/* Measured Scrim for Editorial Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Top Project Index Label */}
              <div className="absolute top-3 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white">
                <span className="px-2.5 py-1 bg-black/80 border border-white/20">
                  SYSTEM {currentProject.number}
                </span>
                <span className="px-2.5 py-1 bg-black/70 border border-white/15 text-neutral-200">
                  {currentProject.category}
                </span>
              </div>

              {/* Bottom Editorial Caption inside Frame */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <div className="text-sm sm:text-base font-bold tracking-wide font-outfit uppercase">
                  {currentProject.title}
                </div>
                <div className="text-[11px] font-jakarta text-neutral-300 mt-0.5 line-clamp-2">
                  {currentProject.subtitle}
                </div>
              </div>
            </div>

            {/* Subtle architectural baseline label (Exact Hero Match) */}
            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#999999] px-0.5">
              <span>CASE STUDY / 0{selectedIndex + 1} OF 0{projects.length}</span>
              <span>PRODUCTION SYSTEM</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero-Style Kicker, Two-Tone Headline, Narrative, Project Selector & CTAs */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-2">
          {/* Small Introductory Label */}
          <div className="mb-2">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-[#777777] font-jakarta">
              04 — SELECTED PROJECTS
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-[#111111]">
                Applied Generative AI.
              </span>
              <span className="block text-[#777777] font-semibold mt-0.5 sm:mt-1">
                Enterprise-Grade Architectures.
              </span>
            </h2>
          </div>

          {/* Active Project Subtitle Line */}
          <div
            key={`proj-sub-${selectedIndex}`}
            className="mb-2.5 sm:mb-3 editorial-text-swap"
          >
            <p className="text-sm sm:text-base md:text-lg font-medium text-[#111111] font-outfit tracking-normal">
              <span className="font-semibold">{currentProject.title}</span>{' '}
              <span className="text-neutral-400 mx-1.5 font-light">|</span>{' '}
              <span className="text-[#666666] font-normal text-xs sm:text-sm">
                {currentProject.category}
              </span>
            </p>
          </div>

          {/* Airy Narrative of Selected Project */}
          <div className="max-w-2xl mb-4 sm:mb-5 text-justify">
            <p
              key={`proj-desc-${selectedIndex}`}
              className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-[#555555] font-jakarta font-normal text-justify [text-justify:inter-word] editorial-text-swap"
            >
              {currentProject.overview}
            </p>
          </div>

          {/* Clean Project Switcher Tabs (4 Flagship Projects) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-4 sm:mb-5">
            {projects.map((proj, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedIndex(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2 text-left border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FAFAFA] text-[#555555] border-[#EAEAEA] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  <div className="text-[9px] font-mono uppercase tracking-wider opacity-70">
                    PROJECT {proj.number}
                  </div>
                  <div className="text-xs font-bold font-outfit truncate mt-0.5">
                    {proj.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Hero-Style Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setActiveProject(currentProject)}
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-[#111111] text-white hover:bg-[#262626] transition-all duration-300 cursor-pointer"
            >
              <span>VIEW ARCHITECTURE & DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {currentProject.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-white text-[#111111] border border-[#111111] hover:bg-[#F9F9F9] transition-all duration-300"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE CODE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Signature Line (Exact Hero Section Pattern) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-[#888888] uppercase font-jakarta">
          AGENTIC SYSTEMS · SEMANTIC RETRIEVAL · DEEP LEARNING · FULL-STACK AI
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider">
          <span>STAGE 04 / PROJECTS</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-experience-anchor"
            className="text-[#111111] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>05 EXPERIENCE ↓</span>
          </a>
        </div>
      </div>

      {/* Modal for Deep Architecture & Implementation Breakdown */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
