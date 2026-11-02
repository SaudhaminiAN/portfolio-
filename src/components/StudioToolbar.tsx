import React from 'react';
import {
  Plus,
  Palette,
  Eye,
  Edit2,
  Download,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  FileText
} from 'lucide-react';

interface StudioToolbarProps {
  isEditing: boolean;
  onToggleEditing: (isEditing: boolean) => void;
  viewport: 'desktop' | 'tablet' | 'mobile' | 'full';
  onChangeViewport: (vp: 'desktop' | 'tablet' | 'mobile' | 'full') => void;
  onOpenAddSection: () => void;
  onOpenTheme: () => void;
  onOpenExport: () => void;
  onResetToBlank: () => void;
  onLoadSample: () => void;
  sectionCount: number;
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  isEditing,
  onToggleEditing,
  viewport,
  onChangeViewport,
  onOpenAddSection,
  onOpenTheme,
  onOpenExport,
  onResetToBlank,
  onLoadSample,
  sectionCount,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-neutral-900/95 text-neutral-100 backdrop-blur-md border-b border-neutral-800 px-4 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode selector & Blank status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-3 border-r border-neutral-700/80">
            <span className="font-bold text-sm tracking-tight text-white font-outfit">
              Portfolio Studio
            </span>
            {sectionCount === 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                Blank Slate
              </span>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-0.5 bg-neutral-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => onToggleEditing(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                isEditing
                  ? 'bg-neutral-100 text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Design Canvas</span>
            </button>

            <button
              onClick={() => onToggleEditing(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                !isEditing
                  ? 'bg-neutral-100 text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Site Preview</span>
            </button>
          </div>
        </div>

        {/* Center: Viewport Switcher */}
        <div className="hidden lg:flex items-center gap-1 p-0.5 bg-neutral-800/80 rounded-lg text-xs">
          <button
            onClick={() => onChangeViewport('desktop')}
            className={`p-1.5 rounded transition-all ${
              viewport === 'desktop' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
            }`}
            title="Desktop 1440px"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onChangeViewport('tablet')}
            className={`p-1.5 rounded transition-all ${
              viewport === 'tablet' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
            }`}
            title="Tablet 768px"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onChangeViewport('mobile')}
            className={`p-1.5 rounded transition-all ${
              viewport === 'mobile' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
            }`}
            title="Mobile 375px"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Add Section Button */}
          <button
            onClick={onOpenAddSection}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Section</span>
          </button>

          {/* Theme customizer */}
          <button
            onClick={onOpenTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme & Fonts</span>
          </button>

          {/* Export Code */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>

          {/* Blank or Sample options dropdown / buttons */}
          {sectionCount > 0 ? (
            <button
              onClick={onResetToBlank}
              className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
              title="Reset to Blank Page"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onLoadSample}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 transition-colors"
              title="Load sample content if desired"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Load Sample</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
