import React, { useEffect } from 'react';
import { ExperienceItem } from '../types';
import {
  X,
  Calendar,
  MapPin,
  CheckCircle2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ExperienceDetailModalProps {
  experience: ExperienceItem | null;
  roleIndex: number;
  totalRoles: number;
  roleImage: string;
  onClose: () => void;
  onSelectIndex?: (index: number) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  roleIndex,
  totalRoles,
  roleImage,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onSelectIndex && roleIndex > 0) {
        onSelectIndex(roleIndex - 1);
      }
      if (e.key === 'ArrowRight' && onSelectIndex && roleIndex < totalRoles - 1) {
        onSelectIndex(roleIndex + 1);
      }
    };
    if (experience) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose, onSelectIndex, roleIndex, totalRoles]);

  if (!experience) return null;

  const padNum = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${experience.role} at ${experience.company}`}
      onClick={onClose}
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0A0A0A] text-white border border-white/25 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/15 bg-black">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-white text-[#111111]">
              ROLE {padNum(roleIndex + 1)} / {padNum(totalRoles)}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              {experience.type}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contextual Role Cover Header */}
        <div className="relative h-40 sm:h-48 w-full overflow-hidden border-b border-white/15 bg-neutral-950 shrink-0">
          <img
            src={roleImage}
            alt={`${experience.role} — ${experience.company}`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/45 to-black/20" />

          <div className="absolute top-3 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-200">
            <span className="px-2.5 py-1 bg-black/80 border border-white/20 inline-flex items-center gap-1.5 text-white">
              <Calendar className="w-3 h-3 text-neutral-300" />
              {experience.period}
            </span>
            <span className="px-2.5 py-1 bg-black/80 border border-white/20 inline-flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-neutral-300" />
              {experience.location}
            </span>
          </div>

          <div className="absolute bottom-3.5 left-5 right-5">
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-white tracking-tight leading-snug">
              {experience.role}
            </h2>
            <div className="text-xs sm:text-sm font-jakarta text-neutral-300 mt-0.5 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="font-semibold text-white">{experience.company}</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">{experience.type}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Executive Summary */}
          <div className="p-4 bg-white/[0.03] border-l-2 border-white border-y border-r border-white/15">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              ROLE OVERVIEW &amp; MANDATE
            </span>
            <p className="text-xs sm:text-sm font-jakarta text-neutral-200 leading-relaxed">
              {experience.summary}
            </p>
          </div>

          {/* Complete Responsibilities & Deliverables */}
          <div>
            <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-white mb-3">
              Key Responsibilities &amp; Deliverables ({experience.responsibilities.length})
            </h3>
            <ul className="space-y-2.5">
              {experience.responsibilities.map((resp, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm font-jakarta text-neutral-200 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* All Technologies & Competencies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div>
              <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-white mb-2.5">
                Technologies &amp; Core Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/[0.06] border border-white/20 text-xs font-mono text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Prev/Next Role Navigation & Close */}
        <div className="px-5 py-3.5 bg-black border-t border-white/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onSelectIndex && (
              <>
                <button
                  onClick={() => roleIndex > 0 && onSelectIndex(roleIndex - 1)}
                  disabled={roleIndex === 0}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white hover:border-white disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>PREV ROLE</span>
                </button>
                <button
                  onClick={() =>
                    roleIndex < totalRoles - 1 && onSelectIndex(roleIndex + 1)
                  }
                  disabled={roleIndex >= totalRoles - 1}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-white/20 text-[10px] font-mono uppercase tracking-wider text-white hover:border-white disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <span>NEXT ROLE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white text-[#111111] text-[11px] font-mono font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            CLOSE (✕)
          </button>
        </div>
      </div>
    </div>
  );
};
