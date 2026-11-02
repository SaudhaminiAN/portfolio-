import React, { useState, useEffect } from 'react';
import { ArrowRight, Maximize2, FileText } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onConnect: () => void;
  onViewResume?: () => void;
  isRevealed?: boolean;
  instantReveal?: boolean;
  revealKey?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onConnect,
  onViewResume,
  isRevealed = true,
  instantReveal = false,
  revealKey = 0,
}) => {
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [counts, setCounts] = useState<{ exp: number; ai: number; projects: number }>({
    exp: 6,
    ai: 4,
    projects: 500,
  });

  // Smooth count-up animation for Experience Highlights synchronized with Hero reveal
  useEffect(() => {
    if (!isRevealed) {
      setCounts({ exp: 0, ai: 0, projects: 0 });
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || instantReveal) {
      setCounts({ exp: 6, ai: 4, projects: 500 });
      return;
    }

    let rafId: number;
    const duration = 1150;
    const startDelay = 220;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime - startDelay;

      if (elapsed < 0) {
        setCounts({ exp: 0, ai: 0, projects: 0 });
        rafId = requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        exp: Math.round(eased * 6),
        ai: Math.round(eased * 4),
        projects: Math.round(eased * 500),
      });

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isRevealed, instantReveal, revealKey]);

  return (
    <section
      key={revealKey}
      className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)]"
    >
      {/* Upper Split Layout: Photo on Left, Typography on Right (2-col on md & lg, stacked neatly on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Left Column: Executive Portrait Frame */}
        <div
          className={`md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-1 md:order-1 transition-all ${
            instantReveal ? 'duration-150' : 'duration-800'
          } ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-5 scale-[0.98]'
          }`}
        >
          <div className="relative w-full max-w-[220px] sm:max-w-[270px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[340px] group">
            {/* Architectural Border & Inner Framing */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAFAFA] border border-[#EAEAEA] shadow-xs">
              {/* High-Resolution Professional Workspace Portrait */}
              <img
                src="/assets/aistudio/Warm_Modern_Workspace_Portrait_eb5d3f5b.png"
                alt="Saudhamini A N — AI/ML Engineer and Generative AI Developer"
                className="w-full h-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Measured Scrim for Editorial Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide font-outfit uppercase">
                    Saudhamini A N
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-wider text-neutral-300 uppercase mt-0.5">
                    AI/ML & GenAI Specialist
                  </div>
                </div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-neutral-400 uppercase tracking-widest pb-0.5">
                  BLR · IND
                </div>
              </div>

              {/* Expand View Affordance */}
              <button
                onClick={() => setIsPhotoExpanded(true)}
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                title="View full portrait"
                aria-label="View portrait"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subtle architectural baseline label */}
            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#999999] px-0.5">
              <span>PORTRAIT / IDENTITY</span>
              <span>EST. 2020</span>
            </div>
          </div>
        </div>

        {/* Right Column: Typography, Title, Narrative, CTAs */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-2 md:order-2">
          {/* PART 4: Small introductory label with subtle tracking settle */}
          <div className="mb-2 sm:mb-2.5 overflow-hidden">
            <span
              className={`inline-block text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase text-[#777777] font-jakarta transition-all ${
                instantReveal ? 'duration-150' : 'duration-750'
              } ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRevealed
                  ? 'opacity-100 translate-y-0 tracking-[0.22em]'
                  : 'opacity-0 translate-y-2.5 tracking-[0.34em]'
              }`}
            >
              CURIOSITY · COURAGE · CONTINUOUS GROWTH
            </span>
          </div>

          {/* PART 4: Main Headline with Masked Architectural Line Reveal */}
          <div className="mb-2.5 sm:mb-3.5">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[48px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="editorial-line-mask">
                <span
                  className={`editorial-line-inner text-[#111111] ${
                    instantReveal ? 'delay-0 duration-150' : 'delay-75'
                  } ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                  }`}
                >
                  Nothing Is Impossible.
                </span>
              </span>
              <span className="editorial-line-mask mt-0.5 sm:mt-1">
                <span
                  className={`editorial-line-inner text-[#777777] font-semibold ${
                    instantReveal ? 'delay-0 duration-150' : 'delay-150'
                  } ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                  }`}
                >
                  Everything Is Earned.
                </span>
              </span>
            </h1>
          </div>

          {/* PART 4: Professional Title */}
          <div
            className={`mb-2.5 sm:mb-3.5 transition-all ${
              instantReveal ? 'duration-150 delay-0' : 'duration-750 delay-200'
            } ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3.5'
            }`}
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#111111] font-outfit tracking-normal">
              <span className="font-semibold">AI/ML Engineer</span>{' '}
              <span className="text-neutral-400 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Generative AI Developer</span>{' '}
              <span className="text-neutral-400 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Technology Educator</span>
            </p>
          </div>

          {/* PART 4: Professional Introduction */}
          <div
            className={`max-w-2xl space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 lg:mb-6 text-justify transition-all ${
              instantReveal ? 'duration-150 delay-0' : 'duration-800 delay-275'
            } ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-[#555555] font-jakarta font-normal text-justify [text-justify:inter-word] hyphens-auto break-words">
              I'm <span className="text-[#111111] font-semibold">Saudhamini A N</span>—a self-made technologist who believes determination turns the most challenging ambitions into reality. Every step of my journey has been earned through <span className="text-[#111111] font-semibold border-b border-black/30">relentless persistence</span>, <span className="text-[#111111] font-semibold border-b border-black/30">continuous learning</span>, and the courage to push past boundaries.
            </p>
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-[#555555] font-jakarta font-normal text-justify [text-justify:inter-word] hyphens-auto break-words">
              With <span className="text-[#111111] font-semibold font-outfit">6+ years</span> of professional experience—including <span className="text-[#111111] font-semibold font-outfit">4+ years</span> in <span className="text-[#111111] font-semibold border-b border-black/30">Artificial Intelligence</span>, <span className="text-[#111111] font-semibold">Machine Learning</span>, and <span className="text-[#111111] font-semibold border-b border-black/30">Generative AI</span>—I build meaningful real-world solutions and empower others through knowledge. <span className="text-[#111111] font-semibold">Still learning, still building, and nowhere near finished.</span>
            </p>
          </div>

          {/* PART 6: CALL-TO-ACTION */}
          <div
            className={`flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 lg:gap-4 transition-all ${
              instantReveal ? 'duration-150 delay-0' : 'duration-800 delay-350'
            } ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Primary button */}
            <button
              onClick={onExploreWork}
              className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 lg:px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-[#111111] text-white hover:bg-[#262626] transition-all duration-300 shadow-xs cursor-pointer focus-visible:outline-none w-full sm:w-auto"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary button */}
            <button
              onClick={onConnect}
              className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 lg:px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-white text-[#111111] border border-[#111111] hover:bg-[#F9F9F9] transition-all duration-300 cursor-pointer focus-visible:outline-none w-full sm:w-auto"
            >
              <span>LET'S CONNECT</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Resume button */}
            {onViewResume && (
              <button
                onClick={onViewResume}
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-[#FAFAFA] text-[#444444] border border-[#EAEAEA] hover:border-[#111111] hover:text-[#111111] hover:bg-white transition-all duration-300 cursor-pointer focus-visible:outline-none w-full sm:w-auto"
                title="View and print Saudhamini's full curriculum vitae"
              >
                <FileText className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#111111]" />
                <span>RESUME / CV</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PART 5: EXPERIENCE HIGHLIGHTS (Centrally Aligned 3-Column Row Across Mobile, Tablet & Desktop) */}
      <div
        className={`pt-3.5 sm:pt-5 pb-3.5 sm:pb-5 border-t border-[#EAEAEA] mt-4 sm:mt-6 text-center transition-all ${
          instantReveal ? 'duration-150 delay-0' : 'duration-800 delay-400'
        } ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8 w-full max-w-4xl mx-auto">
          {/* Stat 1 */}
          <div className="px-1.5 sm:px-6 lg:px-8 border-r border-[#EAEAEA] flex flex-col items-center justify-center text-center">
            <div className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111] font-outfit tabular-nums text-center">
              {counts.exp}+
            </div>
            <div className="text-[10px] sm:text-xs text-[#777777] font-jakarta mt-0.5 sm:mt-1 leading-tight sm:leading-snug text-center">
              Years of Professional Experience
            </div>
          </div>

          {/* Stat 2 */}
          <div className="px-1.5 sm:px-6 lg:px-8 border-r border-[#EAEAEA] flex flex-col items-center justify-center text-center">
            <div className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111] font-outfit tabular-nums text-center">
              {counts.ai}+
            </div>
            <div className="text-[10px] sm:text-xs text-[#777777] font-jakarta mt-0.5 sm:mt-1 leading-tight sm:leading-snug text-center">
              Years in Artificial Intelligence
            </div>
          </div>

          {/* Stat 3 */}
          <div className="px-1.5 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
            <div className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111] font-outfit tabular-nums text-center">
              {counts.projects}+
            </div>
            <div className="text-[10px] sm:text-xs text-[#777777] font-jakarta mt-0.5 sm:mt-1 leading-tight sm:leading-snug text-center">
              Projects Mentored
            </div>
          </div>
        </div>
      </div>

      {/* PART 7: PROFESSIONAL SIGNATURE */}
      <div
        className={`pt-2.5 sm:pt-3.5 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left transition-opacity ${
          instantReveal ? 'duration-150 delay-0' : 'duration-800 delay-500'
        } ${
          isRevealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-[#888888] uppercase font-jakarta">
          ARTIFICIAL INTELLIGENCE · MACHINE LEARNING · GENERATIVE AI · ENGINEERING
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider">
          <span>STAGE 01 / HERO</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-02-anchor"
            onClick={(e) => {
              e.preventDefault();
              onExploreWork();
            }}
            className="text-[#111111] hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>02 WHAT I DO ↓</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      {isPhotoExpanded && (
        <div
          onClick={() => setIsPhotoExpanded(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-white p-3 border border-[#EAEAEA] shadow-2xl"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
              <img
                src="/assets/aistudio/Warm_Modern_Workspace_Portrait_eb5d3f5b.png"
                alt="Saudhamini A N Portrait"
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#777777] px-1">
              <span>Saudhamini A N</span>
              <button
                onClick={() => setIsPhotoExpanded(false)}
                className="text-[#111111] hover:underline font-medium"
              >
                Close (✕)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
