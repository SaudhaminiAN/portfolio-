import React from 'react';
import { AboutSectionData, PortfolioConfig } from '../../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../../utils/themeStyles';
import { Plus, Trash2, FileText, Download } from 'lucide-react';

interface AboutSectionProps {
  data: AboutSectionData;
  config: PortfolioConfig;
  isEditing: boolean;
  onUpdate: (updated: AboutSectionData) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  data,
  config,
  isEditing,
  onUpdate,
}) => {
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...data.paragraphs];
    updated[index] = val;
    onUpdate({ ...data, paragraphs: updated });
  };

  const handleAddParagraph = () => {
    onUpdate({
      ...data,
      paragraphs: [...data.paragraphs, 'New paragraph detailing your background, process, or philosophy.'],
    });
  };

  const handleRemoveParagraph = (index: number) => {
    const updated = data.paragraphs.filter((_, i) => i !== index);
    onUpdate({ ...data, paragraphs: updated });
  };

  const handleFocusAreaChange = (index: number, val: string) => {
    const updated = [...data.focusAreas];
    updated[index] = val;
    onUpdate({ ...data, focusAreas: updated });
  };

  const handleAddFocusArea = () => {
    onUpdate({
      ...data,
      focusAreas: [...data.focusAreas, 'New discipline or capability'],
    });
  };

  const handleRemoveFocusArea = (index: number) => {
    const updated = data.focusAreas.filter((_, i) => i !== index);
    onUpdate({ ...data, focusAreas: updated });
  };

  return (
    <section id="about" className="py-16 md:py-20 border-b border-neutral-100 dark:border-neutral-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Left Column: Heading & kicker */}
        <div className="lg:col-span-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            01. Narrative & Background
          </span>

          {isEditing ? (
            <input
              type="text"
              value={data.heading}
              onChange={(e) => onUpdate({ ...data, heading: e.target.value })}
              className={`w-full text-2xl md:text-3xl font-bold ${font.display} ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none pb-1`}
            />
          ) : (
            <h2 className={`text-2xl md:text-3xl font-bold ${font.display} ${theme.textPrimaryClass} tracking-tight`}>
              {data.heading}
            </h2>
          )}

          {data.subheading && (
            <p className={`mt-2 text-sm ${theme.textMutedClass}`}>
              {data.subheading}
            </p>
          )}

          {/* Download Resume / CV Link */}
          <div className="mt-8">
            <a
              href="#contact"
              onClick={(e) => {
                if (isEditing) {
                  e.preventDefault();
                  alert('Resume download button is active. You can link this to your PDF file in the export code.');
                }
              }}
              className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase font-mono px-4 py-2 rounded-lg border ${theme.borderClass} ${theme.hoverBorderClass} ${theme.textPrimaryClass} transition-colors`}
            >
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>Resume & CV (PDF)</span>
              <Download className="w-3 h-3 ml-1 opacity-70" />
            </a>
          </div>
        </div>

        {/* Right Column: Paragraphs & Focus Areas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            {data.paragraphs.map((p, idx) => (
              <div key={idx} className="relative group">
                {isEditing ? (
                  <div className="flex items-start gap-2">
                    <textarea
                      value={p}
                      rows={3}
                      onChange={(e) => handleParagraphChange(idx, e.target.value)}
                      className={`w-full text-base md:text-lg leading-relaxed ${theme.textSecondaryClass} bg-transparent border border-dashed border-neutral-300 dark:border-neutral-700 p-2.5 rounded-lg outline-none focus:border-neutral-900`}
                    />
                    {data.paragraphs.length > 1 && (
                      <button
                        onClick={() => handleRemoveParagraph(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded mt-2"
                        title="Delete paragraph"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <p className={`text-base md:text-lg leading-relaxed ${theme.textSecondaryClass}`}>
                    {p}
                  </p>
                )}
              </div>
            ))}

            {isEditing && (
              <button
                onClick={handleAddParagraph}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-medium py-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add paragraph</span>
              </button>
            )}
          </div>

          {/* Core Focus Areas */}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <h3 className={`text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4`}>
              Core Focus Disciplines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg border ${theme.borderClass} ${theme.cardBgClass}`}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => handleFocusAreaChange(idx, e.target.value)}
                      className={`w-full text-sm font-medium ${theme.textPrimaryClass} bg-transparent outline-none`}
                    />
                  ) : (
                    <span className={`text-sm font-medium ${theme.textPrimaryClass}`}>
                      {area}
                    </span>
                  )}

                  {isEditing && (
                    <button
                      onClick={() => handleRemoveFocusArea(idx)}
                      className="text-neutral-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <button
                onClick={handleAddFocusArea}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-medium py-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add discipline</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
