import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface DisciplineData {
  title: string;
  category: string;
  imageSrc: string;
  caption: string;
  spec: string;
  tags: string[];
}

const DISCIPLINE_ASSETS: DisciplineData[] = [
  {
    title: 'AI & ML ENGINEERING',
    category: '01 / COMPUTATIONAL ARCHITECTURE',
    imageSrc: '/assets/images/ai_ml_engineering.jpg',
    caption: 'Deep learning neural models & computational data infrastructure',
    spec: 'PYTORCH · TENSORFLOW · SCIKIT-LEARN',
    tags: ['NEURAL NETS', 'NLP', 'DEEP LEARNING'],
  },
  {
    title: 'GENERATIVE AI & AGENTIC SYSTEMS',
    category: '02 / AUTONOMOUS AGENTS & LLMs',
    imageSrc: '/assets/images/generative_ai_agentic.jpg',
    caption: 'Multi-agent orchestration, vector RAG embeddings & workflow chains',
    spec: 'LANGCHAIN · LLM AGENTS · VECTOR DB',
    tags: ['RAG SYSTEMS', 'AUTONOMOUS AGENTS', 'LLMS'],
  },
  {
    title: 'PROMPT ENGINEERING & AI EXPLORATION',
    category: '03 / COGNITIVE PROMPT STRATEGY',
    imageSrc: '/assets/images/prompt_engineering.jpg',
    caption: 'Chain-of-thought heuristics, few-shot prompting & model alignment',
    spec: 'COT HEURISTICS · FEW-SHOT · SYSTEM PROMPTS',
    tags: ['SYSTEM PROMPTS', 'COT REASONING', 'EVALS'],
  },
  {
    title: 'VIBE CODING & TECHNICAL INNOVATION',
    category: '04 / ACCELERATED SYNTHESIS',
    imageSrc: '/assets/images/vibe_coding.jpg',
    caption: 'AI-assisted rapid software synthesis & real-time digital prototyping',
    spec: 'RAPID PROTOTYPING · MODERN WEB · DEV TOOLS',
    tags: ['AI-ASSISTED DEV', 'FAST ITERATION', 'UI/UX'],
  },
];

interface DisciplineVisualProps {
  disciplineIndex: number; // 0 to 3
}

export const DisciplineVisual: React.FC<DisciplineVisualProps> = ({ disciplineIndex }) => {
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const activeData = DISCIPLINE_ASSETS[disciplineIndex] || DISCIPLINE_ASSETS[0];

  return (
    <div className="relative aspect-[4/3] sm:aspect-[3/4] max-h-[300px] sm:max-h-[340px] w-full bg-[#0A0A0A] border border-white/20 overflow-hidden flex flex-col justify-between select-none shadow-2xl transition-all duration-500 group">
      {/* Center Image Container with Color Display & Zoom Effect */}
      <div className="relative z-10 flex-1 w-full h-full overflow-hidden bg-neutral-950">
        {!imageError[disciplineIndex] ? (
          <img
            key={activeData.imageSrc}
            src={activeData.imageSrc}
            alt={activeData.title}
            onError={() => setImageError((prev) => ({ ...prev, [disciplineIndex]: true }))}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03] animate-in fade-in"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-900 to-black text-center">
            <Sparkles className="w-6 h-6 text-white mb-2" />
            <div className="text-[11px] font-mono uppercase text-white tracking-widest mb-0.5">
              {activeData.title}
            </div>
            <div className="text-[10px] text-neutral-400 max-w-xs leading-snug">
              {activeData.caption}
            </div>
          </div>
        )}

        {/* Measured Scrim matching Hero Portrait */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Bottom Editorial Caption inside Frame (Matches Hero Portrait Caption) */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-end justify-between text-white z-20">
          <div>
            <div className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide font-outfit uppercase">
              {activeData.title}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-300 uppercase mt-0.5">
              {activeData.spec}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
