import React from 'react';
import { CustomBlockSectionData, PortfolioConfig } from '../../types/portfolio';
import { THEMES, FONTS } from '../../utils/themeStyles';

interface CustomBlockSectionProps {
  data: CustomBlockSectionData;
  config: PortfolioConfig;
  isEditing: boolean;
  onUpdate: (updated: CustomBlockSectionData) => void;
}

export const CustomBlockSection: React.FC<CustomBlockSectionProps> = ({
  data,
  config,
  isEditing,
  onUpdate,
}) => {
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];

  return (
    <section className="py-16 md:py-20 border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-3xl mx-auto text-center">
        {isEditing ? (
          <input
            type="text"
            value={data.title}
            onChange={(e) => onUpdate({ ...data, title: e.target.value })}
            className={`w-full text-center text-2xl md:text-3xl font-bold ${font.display} ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none pb-2 mb-6`}
            placeholder="Section Title"
          />
        ) : (
          <h2 className={`text-2xl md:text-3xl font-bold ${font.display} ${theme.textPrimaryClass} mb-6 tracking-tight`}>
            {data.title}
          </h2>
        )}

        {isEditing ? (
          <textarea
            value={data.content}
            rows={4}
            onChange={(e) => onUpdate({ ...data, content: e.target.value })}
            className={`w-full text-base md:text-lg leading-relaxed ${theme.textSecondaryClass} bg-transparent border border-dashed border-neutral-300 dark:border-neutral-700 p-4 rounded-xl outline-none`}
            placeholder="Write your custom statement, essay excerpt, or announcement..."
          />
        ) : (
          <p className={`text-base md:text-lg leading-relaxed ${theme.textSecondaryClass}`}>
            {data.content}
          </p>
        )}
      </div>
    </section>
  );
};
