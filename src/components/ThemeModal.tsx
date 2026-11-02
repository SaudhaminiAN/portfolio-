import React from 'react';
import { PortfolioConfig, ThemeMode, FontPairing, AccentColor } from '../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../utils/themeStyles';
import { X, Check } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onUpdateConfig: (updated: Partial<PortfolioConfig>) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Style, Typography & Palette
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Customize the aesthetic direction of your portfolio
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Theme Palette */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
              Canvas Surface & Atmosphere (60% Neutral)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  { id: 'monochrome', name: 'Monochrome Studio', desc: 'Crisp white, pitch charcoal' },
                  { id: 'warm-paper', name: 'Warm Editorial Paper', desc: 'Ivory tone, monograph feel' },
                  { id: 'obsidian', name: 'Obsidian Night', desc: 'Deep jet black, luminescent type' },
                  { id: 'nordic', name: 'Nordic Slate', desc: 'Cool soft grey, precision contrast' },
                  { id: 'sage', name: 'Sage & Linen', desc: 'Organic muted studio aesthetic' },
                ] as const
              ).map((t) => {
                const isSelected = config.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onUpdateConfig({ theme: t.id })}
                    className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {t.name}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">{t.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Pairings */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
              Typography Pairings (2-Font Rule)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(FONTS) as FontPairing[]).map((fKey) => {
                const f = FONTS[fKey];
                const isSelected = config.font === fKey;
                return (
                  <button
                    key={fKey}
                    onClick={() => onUpdateConfig({ font: fKey })}
                    className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <div>
                      <div className={`text-base font-semibold text-neutral-900 dark:text-neutral-100 ${f.display}`}>
                        {f.label}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5 font-mono">{f.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
              Primary Action Accent (10% Budget)
            </label>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(ACCENTS) as AccentColor[]).map((aKey) => {
                const a = ACCENTS[aKey];
                const isSelected = config.accent === aKey;
                return (
                  <button
                    key={aKey}
                    onClick={() => onUpdateConfig({ accent: aKey })}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg border transition-all text-xs font-medium ${
                      isSelected
                        ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full ${
                        aKey === 'neutral'
                          ? 'bg-neutral-900 dark:bg-neutral-100'
                          : aKey === 'cobalt'
                          ? 'bg-blue-600'
                          : aKey === 'ochre'
                          ? 'bg-amber-600'
                          : aKey === 'emerald'
                          ? 'bg-emerald-600'
                          : 'bg-rose-600'
                      }`}
                    />
                    <span>{a.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-950/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
