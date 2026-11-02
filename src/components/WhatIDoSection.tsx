import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { DisciplineVisual } from './DisciplineVisual';

interface ExpertiseItem {
  number: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  descriptionNode: React.ReactNode;
}

const EXPERTISE_AREAS: ExpertiseItem[] = [
  {
    number: '01',
    shortLabel: 'AI & ML',
    title: 'AI & ML Engineering',
    subtitle: 'Python · Deep Learning · Predictive Modeling · NLP',
    descriptionNode: (
      <>
        Developing production-grade intelligent solutions using{' '}
        <span className="text-white font-semibold border-b border-white/40">Python</span>,{' '}
        <span className="text-white font-semibold border-b border-white/40">Machine Learning</span>,{' '}
        <span className="text-white font-semibold">Deep Learning</span> and{' '}
        <span className="text-white font-semibold border-b border-white/40">Natural Language Processing</span>{' '}
        to solve complex real-world domain challenges.
      </>
    ),
  },
  {
    number: '02',
    shortLabel: 'GEN AI & RAG',
    title: 'Generative AI & Agentic Systems',
    subtitle: 'LLM Applications · RAG Pipelines · Multi-Agent Workflows',
    descriptionNode: (
      <>
        Architecting{' '}
        <span className="text-white font-semibold border-b border-white/40">LLM-powered applications</span>,{' '}
        <span className="text-white font-semibold border-b border-white/40">Retrieval-Augmented Generation (RAG)</span>{' '}
        systems, autonomous{' '}
        <span className="text-white font-semibold">AI agents</span> and deterministic enterprise workflows.
      </>
    ),
  },
  {
    number: '03',
    shortLabel: 'PROMPTING',
    title: 'Prompt Engineering & AI Exploration',
    subtitle: 'Chain-of-Thought · Schema Guardrails · Model Alignment',
    descriptionNode: (
      <>
        Exploring emerging AI models, experimenting with{' '}
        <span className="text-white font-semibold border-b border-white/40">advanced prompting heuristics</span>{' '}
        and engineering structured evaluation pipelines for high-reliability reasoning and productivity.
      </>
    ),
  },
  {
    number: '04',
    shortLabel: 'VIBE CODING',
    title: 'Vibe Coding & Technical Innovation',
    subtitle: 'AI-Assisted Synthesis · Rapid Prototyping · Full-Stack AI',
    descriptionNode: (
      <>
        Transforming concepts into functional digital experiences through{' '}
        <span className="text-white font-semibold border-b border-white/40">AI-assisted software synthesis</span>,{' '}
        <span className="text-white font-semibold border-b border-white/40">rapid prototyping</span>{' '}
        and modern full-stack application architectures.
      </>
    ),
  },
];

export const WhatIDoSection: React.FC = () => {
  const [activeVisualIndex, setActiveVisualIndex] = useState<number>(0);
  const currentItem = EXPERTISE_AREAS[activeVisualIndex] || EXPERTISE_AREAS[0];

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-[#000000] text-white">
      {/* Upper Split Layout: Typography on Left (md:col-span-7 xl:col-span-8), Visual Frame on Right (md:col-span-5 xl:col-span-4) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Right Column on Desktop: Compact Architectural Visual Frame (Matches Hero Portrait Size) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-2">
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px]">
            <DisciplineVisual disciplineIndex={activeVisualIndex} />
            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-neutral-500 px-0.5">
              <span>DISCIPLINE / 0{activeVisualIndex + 1} OF 04</span>
              <span>CORE FOCUS</span>
            </div>
          </div>
        </div>

        {/* Left Column on Desktop: Hero-Style Kicker, Two-Tone Headline, Subtitle, Narrative & 4 Discipline Switchers */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-1">
          {/* Small Introductory Label */}
          <div className="mb-2 sm:mb-2.5">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 font-jakarta">
              02 — WHAT I DO
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3.5">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[48px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-white">
                Exploring & Experimenting.
              </span>
              <span className="block text-neutral-500 font-semibold mt-0.5 sm:mt-1">
                Engineering Intelligent Reality.
              </span>
            </h2>
          </div>

          {/* Active Discipline Subtitle */}
          <div
            key={`subtitle-${activeVisualIndex}`}
            className="mb-2.5 sm:mb-3.5 editorial-text-swap"
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white font-outfit tracking-normal">
              <span className="font-semibold">0{activeVisualIndex + 1}. {currentItem.title}</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="text-neutral-400 text-xs sm:text-sm md:text-base font-normal">
                {currentItem.subtitle}
              </span>
            </p>
          </div>

          {/* Professional Narrative (2 short breathable paragraphs like Hero) */}
          <div className="max-w-2xl space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 lg:mb-6 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-neutral-400 font-jakarta font-normal text-justify [text-justify:inter-word]">
              I work at the intersection of{' '}
              <span className="text-white font-semibold border-b border-white/40">
                Artificial Intelligence
              </span>
              ,{' '}
              <span className="text-white font-semibold border-b border-white/40">
                Generative AI
              </span>{' '}
              and emerging technologies—combining deep theoretical foundations with rapid production engineering.
            </p>
            <p
              key={`desc-${activeVisualIndex}`}
              className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-neutral-300 font-jakarta font-normal text-justify [text-justify:inter-word] editorial-text-swap"
            >
              {currentItem.descriptionNode}
            </p>
          </div>

          {/* 4 Clean Hero-Style Rectangular Discipline Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3">
            {EXPERTISE_AREAS.map((item, idx) => {
              const isSelected = activeVisualIndex === idx;
              return (
                <button
                  key={item.number}
                  onClick={() => setActiveVisualIndex(idx)}
                  onMouseEnter={() => setActiveVisualIndex(idx)}
                  className={`group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold tracking-[0.14em] uppercase rounded-none border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#111111] border-white'
                      : 'bg-transparent text-white border-white/30 hover:border-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{item.number}. {item.shortLabel}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isSelected ? 'translate-x-0.5 text-[#111111]' : 'opacity-60 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART 7: PROFESSIONAL SIGNATURE (Exact Hero Section Match) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-neutral-400 uppercase font-jakarta">
          AI & ML ENGINEERING · GENERATIVE AI · PROMPT ENGINEERING · VIBE CODING
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>STAGE 02 / WHAT I DO</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-leadership-anchor"
            className="text-white hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>02B LEADERSHIP ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
