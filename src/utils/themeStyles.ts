import { ThemeMode, FontPairing, AccentColor } from '../types/portfolio';

export interface ThemeProperties {
  bgClass: string;
  cardBgClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  textMutedClass: string;
  borderClass: string;
  hoverBorderClass: string;
  dividerClass: string;
  canvasBg: string;
  isDark: boolean;
}

export const THEMES: Record<ThemeMode, ThemeProperties> = {
  'monochrome': {
    bgClass: 'bg-white',
    cardBgClass: 'bg-neutral-50',
    textPrimaryClass: 'text-neutral-900',
    textSecondaryClass: 'text-neutral-600',
    textMutedClass: 'text-neutral-400',
    borderClass: 'border-neutral-200',
    hoverBorderClass: 'hover:border-neutral-400',
    dividerClass: 'border-neutral-100',
    canvasBg: '#ffffff',
    isDark: false,
  },
  'warm-paper': {
    bgClass: 'bg-[#FAF8F5]',
    cardBgClass: 'bg-[#F2ECE4]/60',
    textPrimaryClass: 'text-[#1C1917]',
    textSecondaryClass: 'text-[#57534E]',
    textMutedClass: 'text-[#78716C]',
    borderClass: 'border-[#E7E2DA]',
    hoverBorderClass: 'hover:border-[#A8A29E]',
    dividerClass: 'border-[#EAE5DE]',
    canvasBg: '#FAF8F5',
    isDark: false,
  },
  'obsidian': {
    bgClass: 'bg-[#09090B]',
    cardBgClass: 'bg-[#121215]',
    textPrimaryClass: 'text-[#FAFAFA]',
    textSecondaryClass: 'text-[#A1A1AA]',
    textMutedClass: 'text-[#71717A]',
    borderClass: 'border-[#27272A]',
    hoverBorderClass: 'hover:border-[#3F3F46]',
    dividerClass: 'border-[#18181B]',
    canvasBg: '#09090B',
    isDark: true,
  },
  'nordic': {
    bgClass: 'bg-[#F8FAFC]',
    cardBgClass: 'bg-white',
    textPrimaryClass: 'text-[#0F172A]',
    textSecondaryClass: 'text-[#475569]',
    textMutedClass: 'text-[#94A3B8]',
    borderClass: 'border-[#E2E8F0]',
    hoverBorderClass: 'hover:border-[#CBD5E1]',
    dividerClass: 'border-[#F1F5F9]',
    canvasBg: '#F8FAFC',
    isDark: false,
  },
  'sage': {
    bgClass: 'bg-[#F4F6F2]',
    cardBgClass: 'bg-[#EAEFE8]/70',
    textPrimaryClass: 'text-[#1C241E]',
    textSecondaryClass: 'text-[#4D5A50]',
    textMutedClass: 'text-[#7D8A80]',
    borderClass: 'border-[#D9E1D7]',
    hoverBorderClass: 'hover:border-[#B5C2B2]',
    dividerClass: 'border-[#DFE7DD]',
    canvasBg: '#F4F6F2',
    isDark: false,
  },
};

export const FONTS: Record<FontPairing, { display: string; body: string; label: string; desc: string }> = {
  'modern-sans': {
    display: 'font-outfit tracking-tight',
    body: 'font-jakarta',
    label: 'Modern Sans',
    desc: 'Outfit + Plus Jakarta Sans',
  },
  'editorial-serif': {
    display: 'font-playfair tracking-normal',
    body: 'font-dm',
    label: 'Editorial Serif',
    desc: 'Playfair Display + DM Sans',
  },
  'monograph': {
    display: 'font-cormorant tracking-tight font-semibold',
    body: 'font-jakarta',
    label: 'Monograph Classic',
    desc: 'Cormorant Garamond + Plus Jakarta Sans',
  },
  'technical': {
    display: 'font-mono-code tracking-tight font-medium',
    body: 'font-dm',
    label: 'Technical Clean',
    desc: 'JetBrains Mono + DM Sans',
  },
};

export const ACCENTS: Record<AccentColor, { bg: string; text: string; hover: string; border: string; label: string }> = {
  'neutral': {
    bg: 'bg-neutral-900 text-white',
    text: 'text-neutral-900',
    hover: 'hover:bg-neutral-800',
    border: 'border-neutral-900',
    label: 'Charcoal',
  },
  'cobalt': {
    bg: 'bg-blue-600 text-white',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-700',
    border: 'border-blue-600',
    label: 'Cobalt',
  },
  'ochre': {
    bg: 'bg-amber-600 text-white',
    text: 'text-amber-600',
    hover: 'hover:bg-amber-700',
    border: 'border-amber-600',
    label: 'Ochre',
  },
  'emerald': {
    bg: 'bg-emerald-600 text-white',
    text: 'text-emerald-600',
    hover: 'hover:bg-emerald-700',
    border: 'border-emerald-600',
    label: 'Emerald',
  },
  'crimson': {
    bg: 'bg-rose-600 text-white',
    text: 'text-rose-600',
    hover: 'hover:bg-rose-700',
    border: 'border-rose-600',
    label: 'Crimson',
  },
};
