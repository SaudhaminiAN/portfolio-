import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface LeadershipPillar {
  number: string;
  shortLabel: string;
  title: string;
  metric: string;
  image: string;
  caption: string;
  description: string;
}

const LEADERSHIP_PILLARS: LeadershipPillar[] = [
  {
    number: '01',
    shortLabel: '2,000+ MENTORED',
    title: 'Student & Professional Mentorship',
    metric: '2,000+ Learners Trained',
    image: '/assets/images/leadership_01_mentorship.jpg',
    caption: 'Interactive AI & ML cohort training, technical seminars & live code workshops',
    description:
      'Empowering engineering students and working professionals across Kerala and beyond in Python, Machine Learning, Deep Learning, and Generative AI systems.',
  },
  {
    number: '02',
    shortLabel: '500+ PROJECTS',
    title: 'Capstone & Production Project Guidance',
    metric: '500+ Projects Mentored',
    image: '/assets/images/leadership_02_projects.jpg',
    caption: 'System architecture mapping, RAG workflow design & end-to-end project reviews',
    description:
      'Hands-on architectural mentorship guiding student capstones, RAG prototypes, computer vision pipelines, and real-world enterprise AI deployments.',
  },
  {
    number: '03',
    shortLabel: 'CURRICULUM',
    title: 'Industry AI Curriculum Architecture',
    metric: 'End-to-End AI Roadmaps',
    image: '/assets/images/leadership_03_curriculum.jpg',
    caption: 'Structured Generative AI syllabi, lab rubrics & industry competency frameworks',
    description:
      'Designing structured learning frameworks, hands-on lab rubrics, and industry-aligned Generative AI & MLOps engineering roadmaps.',
  },
  {
    number: '04',
    shortLabel: 'TEAM LEAD',
    title: 'Technical Trainer & Cohort Leadership',
    metric: 'Cross-Functional Teams',
    image: '/assets/images/leadership_04_teamlead.jpg',
    caption: 'Collaborative engineering cohorts, trainer upskilling & code quality leadership',
    description:
      'Leading technical trainers, standardizing code quality across cohorts, and steering technical teams toward practical AI innovation.',
  },
];

export const LeadershipSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentPillar = LEADERSHIP_PILLARS[activeIndex] || LEADERSHIP_PILLARS[0];

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-white text-[#111111]">
      {/* Upper Split Layout: Contextual Visual Frame on Left (md:col-span-5 xl:col-span-4), Typography on Right (md:col-span-7 xl:col-span-8) — Exact Hero Proportions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Left Column: Contextual Leadership & Mentorship Visual Frame (Exact Hero Proportions) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-1">
          <div className="relative w-full max-w-[220px] sm:max-w-[270px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[340px] group">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] shadow-xs">
              <img
                key={currentPillar.image}
                src={currentPillar.image}
                alt={`${currentPillar.title} — ${currentPillar.metric}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] animate-in fade-in"
              />

              {/* Measured Scrim for Editorial Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Top Pillar Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white">
                <span className="px-2 py-0.5 bg-black/70 border border-white/20 backdrop-blur-xs">
                  PILLAR {currentPillar.number} / 04
                </span>
                <span className="px-2 py-0.5 bg-black/70 border border-white/20 backdrop-blur-xs font-semibold">
                  {currentPillar.shortLabel}
                </span>
              </div>

              {/* Bottom Editorial Caption matching Hero Frame */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide font-outfit uppercase">
                    {currentPillar.metric}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-300 uppercase mt-0.5">
                    {currentPillar.title}
                  </div>
                </div>
                <div className="text-[8px] sm:text-[9px] font-mono text-neutral-300 uppercase tracking-widest pb-0.5">
                  0{activeIndex + 1} / 04
                </div>
              </div>
            </div>

            {/* Subtle architectural baseline label */}
            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#999999] px-0.5">
              <span>LEADERSHIP / IMPACT</span>
              <span>2,000+ TRAINED</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero-Style Kicker, Two-Tone Headline, Subtitle, Narrative & Pillar Buttons */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-2">
          {/* Small Introductory Label */}
          <div className="mb-2 sm:mb-2.5">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-[#777777] font-jakarta">
              02B — MENTORING & TECHNICAL LEADERSHIP
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3.5">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[48px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-[#111111]">
                Mentoring Future Talent.
              </span>
              <span className="block text-[#777777] font-semibold mt-0.5 sm:mt-1">
                Designing AI Curricula & Guiding Teams.
              </span>
            </h2>
          </div>

          {/* Professional Title / Active Pillar */}
          <div
            key={`pillar-sub-${activeIndex}`}
            className="mb-2.5 sm:mb-3.5 editorial-text-swap"
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#111111] font-outfit tracking-normal">
              <span className="font-semibold">{currentPillar.title}</span>{' '}
              <span className="text-neutral-400 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold text-[#555555]">{currentPillar.metric}</span>
            </p>
          </div>

          {/* Airy 2-Paragraph Narrative matching Hero Section */}
          <div className="max-w-2xl space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 lg:mb-6 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-[#555555] font-jakarta font-normal text-justify [text-justify:inter-word]">
              Beyond engineering intelligent systems, I am dedicated to cultivating the next generation of technologists—having trained over{' '}
              <span className="text-[#111111] font-semibold font-outfit border-b border-black/30">
                2,000+ students & learners
              </span>{' '}
              and guided{' '}
              <span className="text-[#111111] font-semibold font-outfit border-b border-black/30">
                500+ technical projects
              </span>{' '}
              from conception to deployment.
            </p>
            <p
              key={`pillar-desc-${activeIndex}`}
              className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-[#555555] font-jakarta font-normal text-justify [text-justify:inter-word] editorial-text-swap"
            >
              {currentPillar.description}
            </p>
          </div>

          {/* Hero-Style Rectangular Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3">
            {LEADERSHIP_PILLARS.map((pillar, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={pillar.number}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold tracking-[0.14em] uppercase rounded-none border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-white text-[#111111] border-[#111111] hover:bg-[#F9F9F9]'
                  }`}
                >
                  <span>{pillar.number}. {pillar.shortLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART 7: PROFESSIONAL SIGNATURE (Exact Hero Section Match) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-[#888888] uppercase font-jakarta">
          TECHNICAL LEADERSHIP · CURRICULUM DESIGN · COHORT MENTORSHIP · INNOVATION
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider">
          <span>STAGE 02B / LEADERSHIP</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-skills-anchor"
            className="text-[#111111] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>03 EXPERTISE ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
