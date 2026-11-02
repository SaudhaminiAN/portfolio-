import React from 'react';
import { ExperienceSectionData, PortfolioConfig, ExperienceItem } from '../../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../../utils/themeStyles';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface ExperienceSectionProps {
  data: ExperienceSectionData;
  config: PortfolioConfig;
  isEditing: boolean;
  onUpdate: (updated: ExperienceSectionData) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data,
  config,
  isEditing,
  onUpdate,
}) => {
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  const handleItemChange = (index: number, field: keyof ExperienceItem, val: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: val };
    onUpdate({ ...data, items });
  };

  const handleAddItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Product Designer or Lead',
      company: 'Organization Name',
      period: '2024 — 2026',
      location: 'Remote / City',
      description: 'Key deliverables, technical scale, and organizational outcomes achieved in this role.',
    };
    onUpdate({
      ...data,
      items: [newItem, ...data.items],
    });
  };

  const handleRemoveItem = (index: number) => {
    const items = data.items.filter((_, i) => i !== index);
    onUpdate({ ...data, items });
  };

  return (
    <section id="experience" className="py-16 md:py-20 border-b border-neutral-100 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            04. Trajectory & History
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

        {isEditing && (
          <button
            onClick={handleAddItem}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white ${accent.bg} transition-colors`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position</span>
          </button>
        )}
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {data.items.map((item, idx) => (
          <div key={item.id || idx} className="py-6 first:pt-0 last:pb-0 group">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              {/* Period & Location: Tabular figures, unboxed */}
              <div className="md:col-span-3 text-xs md:text-sm font-mono tabular-nums text-neutral-400">
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={item.period}
                      onChange={(e) => handleItemChange(idx, 'period', e.target.value)}
                      className="w-full bg-transparent border-b border-dashed border-neutral-300 outline-none"
                      placeholder="e.g. 2024 — Present"
                    />
                    <input
                      type="text"
                      value={item.location || ''}
                      onChange={(e) => handleItemChange(idx, 'location', e.target.value)}
                      className="w-full bg-transparent border-b border-dashed border-neutral-300 outline-none text-xs"
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  <div>
                    <div>{item.period}</div>
                    {item.location && <div className="text-xs text-neutral-400 opacity-70 mt-0.5">{item.location}</div>}
                  </div>
                )}
              </div>

              {/* Role & Company */}
              <div className="md:col-span-4">
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleItemChange(idx, 'role', e.target.value)}
                      className={`w-full font-semibold text-base ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 outline-none`}
                    />
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleItemChange(idx, 'company', e.target.value)}
                      className={`w-full text-sm ${theme.textSecondaryClass} bg-transparent border-b border-dashed border-neutral-300 outline-none mt-1`}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className={`font-semibold text-base ${theme.textPrimaryClass}`}>
                      {item.role}
                    </h3>
                    <p className={`text-sm ${theme.textSecondaryClass} mt-0.5`}>
                      {item.company}
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-5 relative">
                {isEditing ? (
                  <div className="flex items-start gap-2">
                    <textarea
                      value={item.description}
                      rows={2}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className={`w-full text-sm leading-relaxed ${theme.textSecondaryClass} bg-transparent border border-dashed border-neutral-300 p-2 rounded outline-none`}
                    />
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="text-neutral-400 hover:text-red-500 p-1 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <p className={`text-sm leading-relaxed ${theme.textSecondaryClass}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
