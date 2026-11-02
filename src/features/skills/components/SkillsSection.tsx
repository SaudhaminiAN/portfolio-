import React, { useState, useEffect } from 'react';
import { SKILL_CATEGORIES } from '../data';
import { SkillCategory } from '../types';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { skillsService } from '../../../lib/supabase/services/skillsService';

export const SkillsSection: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    skillsService.getPublishedSkills().then((data) => {
      if (isMounted && data && data.length > 0) {
        setCategories(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeCategory = categories[activeIndex] || categories[0];
  const totalSkillCount = categories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const skillDomainImages = [
    '/assets/images/skill_01_genai.jpg',       // 01 Generative AI & LLMs
    '/assets/images/skill_02_frameworks.jpg',  // 02 AI Frameworks & Libraries
    '/assets/images/skill_03_mldl.jpg',        // 03 Machine Learning & Deep Learning
    '/assets/images/skill_04_programming.jpg', // 04 Programming & Web Standards
    '/assets/images/skill_05_backend.jpg',     // 05 Backend & API Integration
    '/assets/images/skill_06_vectordb.jpg',    // 06 Databases & Vector Storage
    '/assets/images/skill_07_analytics.jpg',   // 07 Data Analytics & Visualization
    '/assets/images/skill_08_devops.jpg',      // 08 DevOps & Workflow Automation
    '/assets/images/skill_09_cloud.jpg',       // 09 Cloud Computing
  ];
  const activeDomainImage =
    skillDomainImages[activeIndex % skillDomainImages.length] ||
    '/assets/images/skill_01_genai.jpg';

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-[#000000] text-white">
      {/* Upper Split Layout: Hero-Style Typography on Left, Featured Domain Frame on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Right Column on Desktop: Single Focused Architectural Domain Frame (Exact Hero Proportion) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-2">
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] md:max-w-[320px] lg:max-w-[350px] xl:max-w-[370px] group">
            <div className="relative w-full bg-white/[0.03] border border-white/20 overflow-hidden flex flex-col justify-between">
              {/* Contextual Domain Visual Header */}
              <div className="relative h-32 sm:h-36 w-full overflow-hidden border-b border-white/15">
                <img
                  key={activeDomainImage}
                  src={activeDomainImage}
                  alt={activeCategory.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] animate-in fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-300">
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20">
                    DOMAIN 0{activeIndex + 1} / 0{categories.length}
                  </span>
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20 text-white font-semibold tabular-nums">
                    {activeCategory.skills.length} SKILLS
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold font-outfit text-white tracking-tight uppercase truncate">
                    {activeCategory.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-xs text-neutral-400 font-jakarta leading-relaxed mb-3 line-clamp-2">
                  {activeCategory.description}
                </p>

                {/* Clean Competency Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {activeCategory.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono text-white bg-white/[0.06] border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                  <span className="flex items-center gap-1.5 text-white">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    PRODUCTION VERIFIED
                  </span>
                  <span>ACTIVE STACK</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-neutral-500 px-0.5">
              <span>COMPETENCY MATRIX</span>
              <span>{totalSkillCount}+ TOOLS</span>
            </div>
          </div>
        </div>

        {/* Left Column on Desktop: Hero-Style Kicker, Two-Tone Headline, Subtitle, Narrative & Domain Selector */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-1">
          {/* Small Introductory Label */}
          <div className="mb-2">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 font-jakarta">
              03 — TECHNICAL EXPERTISE
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-white">
                Production-Tested Stack.
              </span>
              <span className="block text-neutral-500 font-semibold mt-0.5 sm:mt-1">
                Applied AI Foundations.
              </span>
            </h2>
          </div>

          {/* Professional Subtitle Line */}
          <div className="mb-2.5 sm:mb-3">
            <p className="text-sm sm:text-base md:text-lg font-medium text-white font-outfit tracking-normal">
              <span className="font-semibold">LLM Orchestration</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Deep Learning</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Vector Architecture</span>
            </p>
          </div>

          {/* Airy Narrative with Underlined Keywords */}
          <div className="max-w-2xl mb-4 sm:mb-5 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-neutral-400 font-jakarta font-normal text-justify [text-justify:inter-word]">
              Engineering scalable systems across{' '}
              <span className="text-white font-semibold border-b border-white/40">
                Python & FastAPI
              </span>
              ,{' '}
              <span className="text-white font-semibold border-b border-white/40">
                LangChain & LangGraph
              </span>
              ,{' '}
              <span className="text-white font-semibold">Retrieval-Augmented Generation</span>{' '}
              and modern{' '}
              <span className="text-white font-semibold border-b border-white/40">
                Vector Databases
              </span>
              . Select any core domain below to inspect the verified stack:
            </p>
          </div>

          {/* Clean Selector Buttons (Sharp Rectangular Hero Button Style) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {categories.map((cat, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group flex items-center justify-between px-3 sm:px-3.5 py-2.5 text-left text-[11px] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] uppercase rounded-none border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#111111] border-white'
                      : 'bg-white/[0.03] text-neutral-300 border-white/20 hover:border-white hover:text-white'
                  }`}
                >
                  <span className="truncate pr-1.5">
                    0{idx + 1}. {cat.name.split('&')[0].trim()}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      isSelected ? 'translate-x-0.5 text-[#111111]' : 'opacity-40 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Signature Line (Exact Hero Section Pattern) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-neutral-400 uppercase font-jakarta">
          PYTHON · LANGCHAIN · RAG · DEEP LEARNING · VECTOR DATABASES · MLOPS
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>STAGE 03 / EXPERTISE</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-projects-anchor"
            className="text-white hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>04 PROJECTS ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
