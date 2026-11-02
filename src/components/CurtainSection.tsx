import React from 'react';
import { SAMonogram } from './SAMonogram';
import { ArrowUpRight, Cpu, Layers, Sparkles } from 'lucide-react';

interface CurtainSectionProps {
  onConnectClick: () => void;
}

export const CurtainSection: React.FC<CurtainSectionProps> = ({ onConnectClick }) => {
  return (
    <section
      id="curtain-section"
      className="relative z-20 w-full bg-[#000000] text-white shadow-[0_-40px_100px_rgba(0,0,0,0.9)] border-t border-white/15 pt-12 sm:pt-16 pb-20 sm:pb-28"
    >
      {/* Inner Container matching the exact max-w-[1440px] px-4 sm:px-8 lg:px-14 width of the hero section */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Top Curtain Notch / Pull Handle */}
        <div className="flex flex-col items-center justify-center mb-10 sm:mb-14">
          <div className="w-12 sm:w-16 h-1 rounded-full bg-white/25 mb-3" />
          <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-neutral-400">
            STAGE 02 / SELECTED WORKS & CORE SYSTEMS
          </span>
        </div>

        {/* Header Grid: Large Typography & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-12 sm:mb-16 pb-10 border-b border-white/10">
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-4xl lg:text-[50px] font-bold tracking-tight font-outfit leading-[1.1] [text-wrap:balance]">
              <span className="text-white block">
                Architecting the Next Frontier
              </span>
              <span className="text-neutral-500 block mt-1 sm:mt-2">
                of Intelligent Systems.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-1">
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 font-jakarta text-justify [text-justify:inter-word]">
              Where theoretical machine learning meets enterprise production scale. A curated exploration of generative architectures, retrieval-augmented networks, and deep learning systems built for measurable impact.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Core Focus · 2026 / 2027
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Architectural Pillars / Project Domains */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {/* Card 1 */}
          <div className="group relative p-5 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
                  SYSTEM / 01
                </span>
                <Sparkles className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-outfit text-white mb-2.5 group-hover:text-neutral-200 transition-colors">
                Autonomous LLM Agents & RAG Frameworks
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-400 font-jakarta leading-relaxed text-justify [text-justify:inter-word]">
                High-precision multi-agent orchestration architectures, semantic vector retrieval pipelines, and guardrailed reasoning systems engineered for zero hallucination in critical domains.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>LangChain · LlamaIndex · VectorDBs</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative p-5 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
                  SYSTEM / 02
                </span>
                <Cpu className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-outfit text-white mb-2.5 group-hover:text-neutral-200 transition-colors">
                Deep Neural Networks & Predictive Modeling
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-400 font-jakarta leading-relaxed text-justify [text-justify:inter-word]">
                End-to-end custom deep learning architectures, convolutional spatial vision models, and transformer pipelines fine-tuned on proprietary domain datasets with rigorous validation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>PyTorch · TensorFlow · Transformers</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative p-5 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
                  SYSTEM / 03
                </span>
                <Layers className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-outfit text-white mb-2.5 group-hover:text-neutral-200 transition-colors">
                Production MLOps & Scalable Inference
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-400 font-jakarta leading-relaxed text-justify [text-justify:inter-word]">
                Containerized microservice inference engines, automated model drift monitoring, quantized low-latency deployment, and distributed training pipelines on cloud clusters.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Docker · Kubernetes · FastAPI · vLLM</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Bottom Banner with Connect Action */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0">
              <SAMonogram size={22} color="#FFFFFF" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold font-outfit text-white">
                Interested in collaborating or discussing technical architectures?
              </h4>
              <p className="text-xs text-neutral-400 font-jakarta mt-0.5">
                Saudhamini A N · AI/ML Engineer & Generative AI Developer
              </p>
            </div>
          </div>

          <button
            onClick={onConnectClick}
            className="px-6 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-white text-[#111111] hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
          >
            GET IN TOUCH →
          </button>
        </div>

        {/* Quiet Footer in Black */}
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center sm:text-left">
          <span>© {new Date().getFullYear()} SAUDHAMINI A N. ALL RIGHTS RESERVED.</span>
          <span>STAGE 02 / PURE BLACK CURTAIN ARCHITECTURE</span>
        </div>
      </div>
    </section>
  );
};
