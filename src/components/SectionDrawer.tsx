import React from 'react';
import { SectionType } from '../types/portfolio';
import {
  Sparkles,
  User,
  FolderGit2,
  Cpu,
  History,
  Mail,
  FileText,
  X,
  Plus
} from 'lucide-react';

interface SectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (type: SectionType) => void;
  existingTypes: SectionType[];
}

interface SectionOption {
  type: SectionType;
  title: string;
  description: string;
  icon: React.ReactNode;
  recommendedPosition: string;
}

const SECTION_OPTIONS: SectionOption[] = [
  {
    type: 'hero',
    title: 'Hero / Introduction',
    description: 'High-impact greeting, title, bio statement, and primary call-to-actions.',
    icon: <Sparkles className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    recommendedPosition: 'Top',
  },
  {
    type: 'about',
    title: 'About & Approach',
    description: 'Detailed narrative, design philosophy, core focus disciplines, and resume link.',
    icon: <User className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    recommendedPosition: 'Middle',
  },
  {
    type: 'projects',
    title: 'Selected Works & Case Studies',
    description: 'Grid showcase of projects, case studies, roles, years, and interactive modal reader.',
    icon: <FolderGit2 className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    recommendedPosition: 'Primary',
  },
  {
    type: 'skills',
    title: 'Capabilities & Stack',
    description: 'Categorized competencies, tools, design disciplines, and engineering strengths.',
    icon: <Cpu className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    recommendedPosition: 'Middle',
  },
  {
    type: 'experience',
    title: 'Experience & History',
    description: 'Chronological timeline of career roles, clients, companies, and achievements.',
    icon: <History className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    recommendedPosition: 'Middle',
  },
  {
    type: 'contact',
    title: 'Contact & Inquiries',
    description: 'Direct email dispatch, one-click copy, active message form, and social channels.',
    icon: <Mail className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    recommendedPosition: 'Bottom',
  },
  {
    type: 'custom',
    title: 'Custom Editorial Block',
    description: 'Freeform section for personal manifesto, publication excerpt, or announcements.',
    icon: <FileText className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    recommendedPosition: 'Anywhere',
  },
];

export const SectionDrawer: React.FC<SectionDrawerProps> = ({
  isOpen,
  onClose,
  onAddSection,
  existingTypes,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Add Section to Your Portfolio
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Select a section block to insert onto your canvas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of section types */}
        <div className="p-6 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
          {SECTION_OPTIONS.map((opt) => {
            const alreadyAdded = existingTypes.includes(opt.type) && opt.type !== 'custom';
            return (
              <div
                key={opt.type}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5">
                    {opt.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {opt.title}
                      </h4>
                      {alreadyAdded && (
                        <span className="text-xs font-mono text-neutral-400">
                          (Already on page)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 max-w-md leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddSection(opt.type);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors shrink-0 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Block</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-950/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>Sections can be reordered or removed at any time</span>
          <button
            onClick={onClose}
            className="hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
