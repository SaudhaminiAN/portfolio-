import React, { useState, useEffect } from 'react';
import { AI_EXPERIMENTS, EXPLORED_AI_TOOLS } from '../data';
import { AiExperiment } from '../types';
import { Terminal, ArrowRight } from 'lucide-react';
import { aiLabService } from '../../../lib/supabase/services/aiLabService';

export const AiLabSection: React.FC = () => {
  const [experiments, setExperiments] = useState<AiExperiment[]>(AI_EXPERIMENTS);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [simulatorOpen, setSimulatorOpen] = useState<boolean>(false);
  const [sampleInput, setSampleInput] = useState<string>(
    'Extract customer sentiment and action item from: "The new release is fast but lacks PDF export support."'
  );
  const [simulatedResult, setSimulatedResult] = useState<string>(
    JSON.stringify(
      {
        sentiment: 'neutral_constructive',
        feature_request: 'PDF export support',
        urgency: 'medium',
        confidence_score: 0.94,
      },
      null,
      2
    )
  );

  useEffect(() => {
    let isMounted = true;
    aiLabService.getPublishedExperiments().then((items) => {
      if (isMounted && items && items.length > 0) {
        setExperiments(items);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const currentExp = experiments[activeIndex] || experiments[0];
  const labExperimentImages = [
    '/assets/images/ailab_01_llm.jpg',    // 01 Local LLM Benchmarking
    '/assets/images/ailab_02_json.jpg',   // 02 Deterministic JSON Extraction
    '/assets/images/ailab_03_vibe.jpg',   // 03 Rapid Architectural Prototyping
    '/assets/images/ailab_04_vector.jpg', // 04 Vector Similarity Visualizer
  ];
  const activeLabImage =
    labExperimentImages[activeIndex % labExperimentImages.length] ||
    '/assets/images/ailab_01_llm.jpg';

  const handleRunSimulation = () => {
    setSimulatedResult(
      JSON.stringify(
        {
          input_tokens: sampleInput.split(' ').length * 2,
          schema_validation: 'VALID_PYDANTIC_V2',
          extracted_intent: 'feature_extraction',
          timestamp_utc: new Date().toISOString(),
          status: '200 OK',
        },
        null,
        2
      )
    );
  };

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-[#000000] text-white">
      {/* Upper Split Layout: Hero Typography & Selector on Left, Experiment Frame on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Right Column on Desktop: Focused Experiment & Prototype Frame (Exact Hero Proportion) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-2">
          <div className="relative w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[350px] xl:max-w-[370px] group">
            <div className="relative w-full bg-white/[0.03] border border-white/20 overflow-hidden flex flex-col justify-between">
              {/* Contextual Lab Experiment Image Header */}
              <div className="relative h-32 sm:h-36 w-full overflow-hidden border-b border-white/15">
                <img
                  key={activeLabImage}
                  src={activeLabImage}
                  alt={currentExp.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] animate-in fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-300">
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20 text-white font-semibold">
                    {currentExp.category}
                  </span>
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20">
                    {currentExp.status}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3.5 right-3.5">
                  <h3 className="text-xs sm:text-sm font-bold font-outfit text-white tracking-tight line-clamp-2">
                    {currentExp.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-xs text-neutral-400 font-jakarta leading-relaxed mb-2.5 line-clamp-2">
                  {currentExp.description}
                </p>

                <div className="p-2.5 bg-white/[0.04] border border-white/15 mb-2.5">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                    KEY TAKEAWAY
                  </span>
                  <p className="text-[11px] font-jakarta text-neutral-200 leading-snug line-clamp-2">
                    {currentExp.findings}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {currentExp.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white/[0.06] border border-white/20 text-[10px] font-mono text-white"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                  <span>LAB EXP 0{activeIndex + 1}</span>
                  <button
                    onClick={() => setSimulatorOpen(true)}
                    className="text-white hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>SANDBOX →</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-neutral-500 px-0.5">
              <span>PROTOTYPE / R&amp;D</span>
              <span>{currentExp.date}</span>
            </div>
          </div>
        </div>

        {/* Left Column on Desktop: Hero-Style Kicker, Two-Tone Headline, Narrative & Experiment Switcher */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-1">
          {/* Small Introductory Label */}
          <div className="mb-2">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 font-jakarta">
              07 — AI LAB & EXPLORATION
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-white">
                Emerging AI Tools.
              </span>
              <span className="block text-neutral-500 font-semibold mt-0.5 sm:mt-1">
                Prompt Heuristics & Vibe Coding.
              </span>
            </h2>
          </div>

          {/* Subtitle Line */}
          <div className="mb-2.5 sm:mb-3">
            <p className="text-sm sm:text-base md:text-lg font-medium text-white font-outfit tracking-normal">
              <span className="font-semibold">Rapid Prototyping</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Schema Guardrails</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Agentic Sandboxes</span>
            </p>
          </div>

          {/* Airy Narrative */}
          <div className="max-w-2xl mb-4 sm:mb-5 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-neutral-400 font-jakarta font-normal text-justify [text-justify:inter-word]">
              A dedicated research testbed for evaluating{' '}
              <span className="text-white font-semibold border-b border-white/40">
                structured LLM outputs
              </span>
              ,{' '}
              <span className="text-white font-semibold border-b border-white/40">
                AI-assisted software synthesis
              </span>{' '}
              and modern developer tooling ({EXPLORED_AI_TOOLS.map((t) => t.name).slice(0, 4).join(', ')}).
            </p>
          </div>

          {/* Clean Experiment Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 sm:mb-5">
            {experiments.map((exp, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`px-3.5 py-2.5 text-left border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-white text-[#111111] border-white'
                      : 'bg-white/[0.03] text-neutral-300 border-white/20 hover:border-white hover:text-white'
                  }`}
                >
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase block opacity-70">
                      0{idx + 1} · {exp.category}
                    </span>
                    <span className="text-xs font-bold font-outfit truncate block">
                      {exp.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Hero-Style CTA */}
          <div>
            <button
              onClick={() => setSimulatorOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-white text-[#111111] hover:bg-neutral-200 transition-all duration-300 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>LAUNCH INTERACTIVE PROTOTYPE SANDBOX</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Signature Line (Exact Hero Section Pattern) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-neutral-400 uppercase font-jakarta">
          PROMPT ENGINEERING · VIBE CODING · DETERMINISTIC SCHEMAS · AI R&D
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>STAGE 07 / AI LAB</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-blog-anchor"
            className="text-white hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>08 PUBLICATIONS ↓</span>
          </a>
        </div>
      </div>

      {/* Clean Modal for Interactive Prototype Simulator */}
      {simulatorOpen && (
        <div
          onClick={() => setSimulatorOpen(false)}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0A0A0A] border border-white/20 p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white" />
                <h3 className="text-xs font-bold font-outfit uppercase tracking-wider">
                  Interactive Prototype Simulator
                </h3>
              </div>
              <button
                onClick={() => setSimulatorOpen(false)}
                className="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
              >
                CLOSE (✕)
              </button>
            </div>

            <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
              Simulated Input Prompt / Query:
            </label>
            <textarea
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-black border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-white mb-4"
            />

            <button
              onClick={handleRunSimulation}
              className="w-full py-2.5 bg-white text-[#111111] font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mb-4 cursor-pointer"
            >
              <span>Run Heuristic Evaluation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="text-[10px] font-mono text-neutral-400 mb-1 flex justify-between">
              <span>DETERMINISTIC JSON OUTPUT</span>
              <span>200 OK</span>
            </div>
            <pre className="p-3 bg-black border border-white/15 text-[#00FF66] text-[11px] font-mono overflow-x-auto max-h-[200px]">
              <code>{simulatedResult}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};
