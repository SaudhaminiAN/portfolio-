import React from 'react';
import { SkillsSectionData, PortfolioConfig } from '../../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../../utils/themeStyles';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsSectionProps {
  data: SkillsSectionData;
  config: PortfolioConfig;
  isEditing: boolean;
  onUpdate: (updated: SkillsSectionData) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  data,
  config,
  isEditing,
  onUpdate,
}) => {
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  const handleCategoryTitleChange = (catIdx: number, val: string) => {
    const categories = [...data.categories];
    categories[catIdx] = { ...categories[catIdx], title: val };
    onUpdate({ ...data, categories });
  };

  const handleItemChange = (catIdx: number, itemIdx: number, val: string) => {
    const categories = [...data.categories];
    const items = [...categories[catIdx].items];
    items[itemIdx] = val;
    categories[catIdx] = { ...categories[catIdx], items };
    onUpdate({ ...data, categories });
  };

  const handleAddItem = (catIdx: number) => {
    const categories = [...data.categories];
    categories[catIdx] = {
      ...categories[catIdx],
      items: [...categories[catIdx].items, 'New Skill / Tool'],
    };
    onUpdate({ ...data, categories });
  };

  const handleRemoveItem = (catIdx: number, itemIdx: number) => {
    const categories = [...data.categories];
    categories[catIdx] = {
      ...categories[catIdx],
      items: categories[catIdx].items.filter((_, i) => i !== itemIdx),
    };
    onUpdate({ ...data, categories });
  };

  const handleAddCategory = () => {
    onUpdate({
      ...data,
      categories: [
        ...data.categories,
        {
          title: 'New Capability Discipline',
          items: ['Specialized Capability 1', 'Specialized Capability 2'],
        },
      ],
    });
  };

  const handleRemoveCategory = (catIdx: number) => {
    onUpdate({
      ...data,
      categories: data.categories.filter((_, i) => i !== catIdx),
    });
  };

  return (
    <section id="skills" className="py-16 md:py-20 border-b border-neutral-100 dark:border-neutral-800">
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
          03. Capabilities & Practice
        </span>
        {isEditing ? (
          <input
            type="text"
            value={data.heading}
            onChange={(e) => onUpdate({ ...data, heading: e.target.value })}
            className={`text-2xl md:text-3xl font-bold ${font.display} ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none pb-1`}
          />
        ) : (
          <h2 className={`text-2xl md:text-3xl font-bold ${font.display} ${theme.textPrimaryClass} tracking-tight`}>
            {data.heading}
          </h2>
        )}

        {data.subheading && (
          <p className={`mt-2 text-sm ${theme.textSecondaryClass}`}>
            {data.subheading}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {data.categories.map((cat, catIdx) => (
          <div
            key={catIdx}
            className={`p-6 rounded-xl border ${theme.borderClass} ${theme.cardBgClass} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                {isEditing ? (
                  <input
                    type="text"
                    value={cat.title}
                    onChange={(e) => handleCategoryTitleChange(catIdx, e.target.value)}
                    className={`font-semibold text-sm ${theme.textPrimaryClass} bg-transparent outline-none border-b border-dashed border-neutral-300`}
                  />
                ) : (
                  <h3 className={`font-semibold text-sm tracking-wide ${theme.textPrimaryClass}`}>
                    {cat.title}
                  </h3>
                )}

                {isEditing && data.categories.length > 1 && (
                  <button
                    onClick={() => handleRemoveCategory(catIdx)}
                    className="text-neutral-400 hover:text-red-500 p-1"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Zero-pill unboxed text items with clean subtle bullet */}
              <ul className="space-y-3">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center justify-between group text-sm">
                    <div className="flex items-center gap-2.5 flex-1">
                      <span className="w-1 h-1 rounded-full bg-neutral-400 opacity-60 shrink-0" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleItemChange(catIdx, itemIdx, e.target.value)}
                          className={`w-full ${theme.textSecondaryClass} bg-transparent outline-none border-b border-dashed border-transparent hover:border-neutral-300 focus:border-neutral-500`}
                        />
                      ) : (
                        <span className={`${theme.textSecondaryClass}`}>{item}</span>
                      )}
                    </div>

                    {isEditing && (
                      <button
                        onClick={() => handleRemoveItem(catIdx, itemIdx)}
                        className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500 p-1 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {isEditing && (
              <button
                onClick={() => handleAddItem(catIdx)}
                className="mt-5 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-medium pt-3 border-t border-neutral-100 dark:border-neutral-800"
              >
                <Plus className="w-3 h-3" />
                <span>Add capability</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={handleAddCategory}
          className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-600 hover:text-neutral-900 hover:border-neutral-500 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Skill Column</span>
        </button>
      )}
    </section>
  );
};
