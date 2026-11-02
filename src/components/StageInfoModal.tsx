import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { SAMonogram } from './SAMonogram';

interface StageInfoModalProps {
  type: 'about' | 'work' | 'connect' | null;
  onClose: () => void;
}

export const StageInfoModal: React.FC<StageInfoModalProps> = ({
  type,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [type, onClose]);

  if (!type) return null;

  const email = 'saudhamini.an@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white border border-[#EAEAEA] p-8 sm:p-10 shadow-2xl relative flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1 text-[#777777] hover:text-[#111111] transition-colors focus-visible:outline-none"
          title="Close (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <SAMonogram size={28} color="#111111" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#777777]">
            {type === 'connect' ? "LET'S CONNECT" : `STAGE ROADMAP / ${type.toUpperCase()}`}
          </span>
        </div>

        {type === 'connect' ? (
          <div>
            <h3 className="text-2xl font-bold font-outfit text-[#111111] tracking-tight mb-3">
              Get in Touch
            </h3>
            <p className="text-sm text-[#555555] font-jakarta leading-relaxed mb-6">
              I am open to discussing AI/ML engineering roles, Generative AI architecture, consulting engagements, and technical collaborations.
            </p>

            {/* Direct Email Card */}
            <div className="p-4 border border-[#EAEAEA] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="font-mono text-xs sm:text-sm text-[#111111] truncate select-all">
                {email}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#EAEAEA] bg-white hover:border-[#111111] text-[#111111] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-[#111111] text-white hover:bg-[#262626] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Mail</span>
                </a>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#888888] tracking-wider uppercase">
              Bengaluru, India · Open to Global & Remote Opportunities
            </div>
          </div>
        ) : type === 'work' ? (
          <div>
            <h3 className="text-2xl font-bold font-outfit text-[#111111] tracking-tight mb-3">
              Selected Works & Case Studies
            </h3>
            <p className="text-sm text-[#555555] font-jakarta leading-relaxed mb-6">
              As requested in the development brief, Stage 01 focuses strictly on the cinematic intro and homepage hero. The comprehensive portfolio of AI/ML systems, LLM implementations, and generative pipelines will be implemented in Stage 02.
            </p>
            <div className="p-4 border border-[#EAEAEA] bg-[#FAFAFA] text-xs font-mono text-[#555555] space-y-1.5">
              <div>→ LLM Agents & Retrieval-Augmented Generation (RAG)</div>
              <div>→ Deep Learning & Predictive Neural Architectures</div>
              <div>→ End-to-End MLOps & Production Inference Pipelines</div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold font-outfit text-[#111111] tracking-tight mb-3">
              Engineering Biography & Practice
            </h3>
            <p className="text-sm text-[#555555] font-jakarta leading-relaxed mb-6">
              Stage 01 focuses strictly on the opening cinematic identity and hero section. The detailed technical background, leadership philosophy, research publications, and skill matrix will be developed in Stage 03.
            </p>
            <div className="p-4 border border-[#EAEAEA] bg-[#FAFAFA] text-xs font-mono text-[#555555] space-y-1.5">
              <div>→ 6+ Years Professional Engineering Experience</div>
              <div>→ 4+ Years Specialized AI/ML & Deep Learning Practice</div>
              <div>→ 2,000+ Students Mentored & 500+ Technical Projects Mentored</div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#EAEAEA] flex items-center justify-between text-xs font-mono text-[#888888]">
          <span>Saudhamini A N</span>
          <button
            onClick={onClose}
            className="hover:text-[#111111] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
