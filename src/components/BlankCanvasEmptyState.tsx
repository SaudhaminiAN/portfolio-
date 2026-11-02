import React, { useState } from 'react';
import {
  Plus,
  Sparkles,
  FileText,
  User,
  FolderGit2,
  SlidersHorizontal,
  Layout,
  Maximize2
} from 'lucide-react';
import { SectionType } from '../types/portfolio';

interface BlankCanvasEmptyStateProps {
  onAddSection: (type: SectionType) => void;
  onOpenDrawer: () => void;
  onLoadSample: () => void;
  onOpenTheme: () => void;
}

export const BlankCanvasEmptyState: React.FC<BlankCanvasEmptyStateProps> = ({
  onAddSection,
  onOpenDrawer,
  onLoadSample,
  onOpenTheme,
}) => {
  const [pureBlank, setPureBlank] = useState(false);

  if (pureBlank) {
    return (
      <div className="relative min-h-[75vh] flex flex-col items-center justify-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 transition-all">
        <button
          onClick={() => setPureBlank(false)}
          className="absolute top-4 right-4 text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Show Design Guide</span>
        </button>

        <div className="text-center">
          <p className="text-sm font-mono text-neutral-400 mb-4">
            — Pure Blank Page —
          </p>
          <button
            onClick={onOpenDrawer}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Section</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 md:p-16 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-xs relative overflow-hidden transition-all">
      {/* Background subtle architectural grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Pure blank toggle */}
      <button
        onClick={() => setPureBlank(true)}
        className="absolute top-4 right-4 text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        title="Toggle pure blank screen with zero guide cards"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        <span>Hide Guides (Pure Blank)</span>
      </button>

      <div className="relative z-10 max-w-xl text-center">
        {/* Subtle pill-free status */}
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
          Blank Page Ready
        </span>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-outfit mb-4 [text-wrap:balance]">
          Start Designing Your Portfolio
        </h2>

        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
          Your blank canvas is set. Click any section below to start composing your personal website, or build block-by-block.
        </p>

        {/* Quick Starter Section Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
          <button
            onClick={() => onAddSection('hero')}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all group"
          >
            <Sparkles className="w-4 h-4 text-neutral-700 dark:text-neutral-300 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Hero Intro
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Headline, title, bio statement, and primary links.
            </p>
          </button>

          <button
            onClick={() => onAddSection('projects')}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all group"
          >
            <FolderGit2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Works & Cases
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Showcase projects with art patterns and details.
            </p>
          </button>

          <button
            onClick={() => onAddSection('about')}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all group"
          >
            <User className="w-4 h-4 text-neutral-700 dark:text-neutral-300 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              About & Bio
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Narrative statement, disciplines, and resume.
            </p>
          </button>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenDrawer}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Browse All Section Blocks</span>
          </button>

          <button
            onClick={onLoadSample}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <Layout className="w-4 h-4 text-neutral-400" />
            <span>Load Sample Portfolio</span>
          </button>

          <button
            onClick={onOpenTheme}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
            <span>Pick Theme & Fonts</span>
          </button>
        </div>
      </div>
    </div>
  );
};
