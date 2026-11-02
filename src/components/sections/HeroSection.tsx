import React, { useRef } from 'react';
import { HeroSectionData, PortfolioConfig } from '../../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../../utils/themeStyles';
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  data: HeroSectionData;
  config: PortfolioConfig;
  isEditing: boolean;
  onUpdate: (updated: HeroSectionData) => void;
  onSelectProject?: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  config,
  isEditing,
  onUpdate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({
          ...data,
          avatarUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative py-16 md:py-24 border-b border-neutral-100 dark:border-neutral-800 transition-colors">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarUpload}
      />

      {/* Subtle layout variant toggle when in edit mode */}
      {isEditing && (
        <div className="mb-6 flex items-center justify-between pb-4 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>Hero Layout Style:</span>
            <div className="flex gap-1 p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">
              {(['minimal', 'split', 'editorial'] as const).map((variant) => (
                <button
                  key={variant}
                  onClick={() => onUpdate({ ...data, layoutVariant: variant })}
                  className={`px-2.5 py-1 text-xs rounded transition-all capitalize ${
                    data.layoutVariant === variant
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs text-neutral-400">Click any text on the page to edit directly</span>
        </div>
      )}

      {/* Minimal Variant */}
      {data.layoutVariant === 'minimal' && (
        <div className="max-w-4xl">
          {/* Metadata: Location · Status (Clean unboxed text, zero pills) */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm tracking-wide text-neutral-500 dark:text-neutral-400 mb-6 font-mono">
            {isEditing ? (
              <input
                type="text"
                value={data.location}
                onChange={(e) => onUpdate({ ...data, location: e.target.value })}
                className="bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none hover:border-neutral-900 focus:border-neutral-900"
                placeholder="City, Country"
              />
            ) : (
              <span>{data.location}</span>
            )}

            <span aria-hidden="true" className="opacity-50">·</span>

            {isEditing ? (
              <input
                type="text"
                value={data.statusText}
                onChange={(e) => onUpdate({ ...data, statusText: e.target.value })}
                className="bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none hover:border-neutral-900 focus:border-neutral-900"
                placeholder="Availability status"
              />
            ) : (
              <span>{data.statusText}</span>
            )}
          </div>

          {/* Primary Name & Title */}
          <div className="mb-6">
            {isEditing ? (
              <input
                type="text"
                value={data.name}
                onChange={(e) => onUpdate({ ...data, name: e.target.value })}
                className={`w-full text-3xl md:text-5xl lg:text-6xl font-bold ${font.display} ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none focus:border-neutral-900 pb-2`}
                placeholder="Your Name"
              />
            ) : (
              <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold ${font.display} ${theme.textPrimaryClass} tracking-tight [text-wrap:balance]`}>
                {data.name}
              </h1>
            )}

            {isEditing ? (
              <input
                type="text"
                value={data.title}
                onChange={(e) => onUpdate({ ...data, title: e.target.value })}
                className={`w-full mt-3 text-xl md:text-2xl ${font.body} ${theme.textSecondaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none focus:border-neutral-900 pb-1`}
                placeholder="Professional Headline"
              />
            ) : (
              <p className={`mt-3 text-xl md:text-2xl ${font.body} ${theme.textSecondaryClass} font-normal`}>
                {data.title}
              </p>
            )}
          </div>

          {/* Bio statement */}
          <div className="mb-10 max-w-2xl">
            {isEditing ? (
              <textarea
                value={data.bio}
                rows={3}
                onChange={(e) => onUpdate({ ...data, bio: e.target.value })}
                className={`w-full text-base md:text-lg leading-relaxed ${theme.textSecondaryClass} bg-transparent border border-dashed border-neutral-300 dark:border-neutral-700 p-2 rounded outline-none focus:border-neutral-900`}
                placeholder="Brief narrative introducing your craft and point of view..."
              />
            ) : (
              <p className={`text-base md:text-lg leading-relaxed ${theme.textSecondaryClass}`}>
                {data.bio}
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={data.ctaLink || '#projects'}
              className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors shadow-xs ${accent.bg} ${accent.hover}`}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={data.ctaText}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onUpdate({ ...data, ctaText: e.target.value })}
                  className="bg-transparent text-white outline-none w-32 border-b border-white/30"
                />
              ) : (
                <span>{data.ctaText}</span>
              )}
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {data.secondaryCtaText && (
              <a
                href={data.secondaryCtaLink || '#contact'}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border transition-colors ${theme.borderClass} ${theme.hoverBorderClass} ${theme.textPrimaryClass}`}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={data.secondaryCtaText}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onUpdate({ ...data, secondaryCtaText: e.target.value })}
                    className="bg-transparent outline-none w-28 border-b border-neutral-400"
                  />
                ) : (
                  <span>{data.secondaryCtaText}</span>
                )}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Split Screen Variant */}
      {data.layoutVariant === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-neutral-500 mb-6 font-mono">
              <span>{data.location}</span>
              <span aria-hidden="true">·</span>
              <span>{data.statusText}</span>
            </div>

            <div className="mb-6">
              {isEditing ? (
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => onUpdate({ ...data, name: e.target.value })}
                  className={`w-full text-4xl md:text-5xl font-bold ${font.display} ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none pb-2`}
                />
              ) : (
                <h1 className={`text-4xl md:text-5xl font-bold ${font.display} ${theme.textPrimaryClass} tracking-tight`}>
                  {data.name}
                </h1>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => onUpdate({ ...data, title: e.target.value })}
                  className={`w-full mt-3 text-xl ${theme.textSecondaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none pb-1`}
                />
              ) : (
                <p className={`mt-3 text-xl ${theme.textSecondaryClass}`}>
                  {data.title}
                </p>
              )}
            </div>

            <p className={`text-base md:text-lg leading-relaxed ${theme.textSecondaryClass} mb-8 max-w-xl`}>
              {data.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={data.ctaLink || '#projects'}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors ${accent.bg} ${accent.hover}`}
              >
                <span>{data.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              {data.secondaryCtaText && (
                <a
                  href={data.secondaryCtaLink || '#contact'}
                  className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border ${theme.borderClass} ${theme.textPrimaryClass}`}
                >
                  <span>{data.secondaryCtaText}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column Visual / Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className={`relative w-full aspect-4/3 lg:h-full max-h-[460px] rounded-2xl overflow-hidden border ${theme.borderClass} ${theme.cardBgClass} flex items-center justify-center group`}>
              {data.avatarUrl ? (
                <img
                  src={data.avatarUrl}
                  alt={data.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-neutral-400">
                  <div className="w-24 h-24 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-4 text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
                    {data.name.slice(0, 2).toUpperCase() || 'ME'}
                  </div>
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Portrait or Studio Visual</span>
                  <span className="text-xs text-neutral-400 mt-1">Upload a real headshot or visual artwork</span>
                </div>
              )}

              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-black text-white text-xs rounded-lg shadow-md transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{data.avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Editorial Variant */}
      {data.layoutVariant === 'editorial' && (
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-neutral-500 mb-8">
            <span>{data.location}</span>
            <span aria-hidden="true">/</span>
            <span>{data.statusText}</span>
          </div>

          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-normal ${font.display} ${theme.textPrimaryClass} leading-[1.08] mb-8 [text-wrap:balance]`}>
            {data.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="md:col-span-5">
              <p className={`text-xl md:text-2xl font-serif italic ${theme.textPrimaryClass}`}>
                "{data.title}"
              </p>
            </div>
            <div className="md:col-span-7">
              <p className={`text-base md:text-lg leading-relaxed ${theme.textSecondaryClass} mb-8`}>
                {data.bio}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={data.ctaLink || '#projects'}
                  className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors ${accent.bg} ${accent.hover}`}
                >
                  <span>{data.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
