import React, { useState, useEffect } from 'react';
import { EXPERIENCES } from '../data';
import { ExperienceItem } from '../types';
import { Calendar, MapPin, Check, ArrowRight, Maximize2 } from 'lucide-react';
import { experienceService } from '../../../lib/supabase/services/experienceService';
import { ExperienceDetailModal } from './ExperienceDetailModal';

export const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(EXPERIENCES);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    experienceService.getPublishedExperiences().then((items) => {
      if (isMounted && items && items.length > 0) {
        setExperiences(items);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeExp = experiences[activeIndex] || experiences[0];
  const roleImages = [
    '/assets/images/exp_01_lead.jpg',          // 01 Territory Technical Lead
    '/assets/images/exp_02_academic.jpg',      // 02 Academic Operations Lead cum Developer
    '/assets/images/exp_03_datascientist.jpg', // 03 Trainer cum Data Scientist
    '/assets/images/exp_04_analyst.jpg',       // 04 Junior Data Analyst
    '/assets/images/exp_05_intern.jpg',        // 05 Data Science Intern
    '/assets/images/exp_06_support.jpg',       // 06 Customer Support Associate
    '/assets/images/exp_07_finance.jpg',       // 07 Accountant
    '/assets/images/exp_08_client.jpg',        // 08 Senior Telecaller
  ];
  const activeRoleImage =
    roleImages[activeIndex % roleImages.length] ||
    '/assets/images/exp_01_lead.jpg';

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-[#000000] text-white">
      {/* Upper Split Layout: Hero Typography & Career Switcher on Left, Role Spotlight Frame on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Right Column on Desktop: Focused Role Deliverables Frame (Exact Hero Proportion) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-2">
          <div className="relative w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[350px] xl:max-w-[370px] group">
            <div
              onClick={() => setIsModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              className="relative w-full bg-white/[0.03] border border-white/20 hover:border-white/50 overflow-hidden flex flex-col justify-between transition-colors cursor-pointer"
            >
              {/* Contextual Career Role Image Header */}
              <div className="relative h-32 sm:h-36 w-full overflow-hidden border-b border-white/15">
                <img
                  key={activeRoleImage}
                  src={activeRoleImage}
                  alt={`${activeExp.role} — ${activeExp.company}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] animate-in fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-300">
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20 flex items-center gap-1 text-white">
                    <Calendar className="w-3 h-3 text-neutral-300" />
                    {activeExp.period}
                  </span>
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    {activeExp.location}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold font-outfit text-white tracking-tight truncate">
                      {activeExp.role}
                    </h3>
                    <div className="text-[11px] font-jakarta text-neutral-300 truncate">
                      {activeExp.company} · <span className="text-neutral-400">{activeExp.type}</span>
                    </div>
                  </div>
                  <span
                    className="p-1.5 bg-black/70 border border-white/25 text-white shrink-0 group-hover:bg-white group-hover:text-[#111111] transition-colors"
                    title="View full role details"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-xs text-neutral-400 font-jakarta leading-relaxed mb-2.5 line-clamp-2">
                  {activeExp.summary}
                </p>

                <div className="space-y-1.5">
                  {activeExp.responsibilities.slice(0, 3).map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-200 font-jakarta leading-snug line-clamp-1">
                      <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span className="truncate">{resp}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {(activeExp.technologies || []).slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white/[0.06] border border-white/15 text-[10px] font-mono text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white group-hover:underline shrink-0">
                    FULL DETAILS →
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-neutral-500 px-0.5">
              <span>CAREER RECORD / 0{activeIndex + 1}</span>
              <span>TAP CARD FOR FULL DETAILS</span>
            </div>
          </div>
        </div>

        {/* Left Column on Desktop: Hero-Style Kicker, Two-Tone Headline, Narrative & Chronological Selector */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-1">
          {/* Small Introductory Label */}
          <div className="mb-2">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 font-jakarta">
              05 — PROFESSIONAL EXPERIENCE
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-white">
                Career Progression.
              </span>
              <span className="block text-neutral-500 font-semibold mt-0.5 sm:mt-1">
                Applied Technical Leadership.
              </span>
            </h2>
          </div>

          {/* Subtitle Line */}
          <div className="mb-2.5 sm:mb-3">
            <p className="text-sm sm:text-base md:text-lg font-medium text-white font-outfit tracking-normal">
              <span className="font-semibold">AI/ML Engineering</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Technical Training & Mentorship</span>
            </p>
          </div>

          {/* Airy Narrative */}
          <div className="max-w-2xl mb-4 sm:mb-5 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-neutral-400 font-jakarta font-normal text-justify [text-justify:inter-word]">
              A <span className="text-white font-semibold font-outfit">6+ year</span> professional trajectory spanning{' '}
              <span className="text-white font-semibold border-b border-white/40">
                AI/ML curriculum leadership
              </span>
              ,{' '}
              <span className="text-white font-semibold border-b border-white/40">
                Generative AI engineering
              </span>{' '}
              and commercial analytics. Select a milestone below to inspect deliverables:
            </p>
          </div>

          {/* Clean Hairline Career Selector Rows */}
          <div className="divide-y divide-white/15 border-y border-white/15">
            {experiences.map((exp, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full py-2.5 sm:py-3 px-3 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-white text-[#111111]' : 'hover:bg-white/[0.04] text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-xs font-mono font-bold tabular-nums ${
                        isSelected ? 'text-[#111111]' : 'text-neutral-500'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div className="truncate">
                      <span className="text-xs sm:text-sm font-bold font-outfit">
                        {exp.role}
                      </span>
                      <span
                        className={`ml-2 text-xs font-jakarta ${
                          isSelected ? 'text-[#444444]' : 'text-neutral-400'
                        }`}
                      >
                        — {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono uppercase hidden sm:inline ${
                        isSelected ? 'text-[#333333]' : 'text-neutral-400'
                      }`}
                    >
                      {exp.period}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Signature Line (Exact Hero Section Pattern) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-neutral-400 uppercase font-jakarta">
          TECHNICAL LEADERSHIP · AI ARCHITECTURE · MENTORSHIP · DATA ANALYTICS
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>STAGE 05 / EXPERIENCE</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-education-anchor"
            className="text-white hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>06 EDUCATION ↓</span>
          </a>
        </div>
      </div>

      {/* Full Role Deliverables & Responsibilities Modal */}
      <ExperienceDetailModal
        experience={isModalOpen ? activeExp : null}
        roleIndex={activeIndex}
        totalRoles={experiences.length}
        roleImage={activeRoleImage}
        onClose={() => setIsModalOpen(false)}
        onSelectIndex={(newIndex) => setActiveIndex(newIndex)}
      />
    </section>
  );
};
