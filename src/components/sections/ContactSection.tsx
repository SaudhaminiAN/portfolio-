import React, { useState } from 'react';
import { ContactSectionData, PortfolioConfig, SocialLink } from '../../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../../utils/themeStyles';
import { Mail, Check, Copy, ArrowUpRight, Send, Plus, Trash2 } from 'lucide-react';

interface ContactSectionProps {
  data: ContactSectionData;
  config: PortfolioConfig;
  isEditing: boolean;
  onUpdate: (updated: ContactSectionData) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  config,
  isEditing,
  onUpdate,
}) => {
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  const [copied, setCopied] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail || !inquiryMessage) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 4000);
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, val: string) => {
    const socials = [...data.socials];
    socials[index] = { ...socials[index], [field]: val };
    onUpdate({ ...data, socials });
  };

  const handleAddSocial = () => {
    onUpdate({
      ...data,
      socials: [
        ...data.socials,
        { platform: 'Platform', label: 'Handle / URL', url: 'https://' },
      ],
    });
  };

  const handleRemoveSocial = (index: number) => {
    onUpdate({
      ...data,
      socials: data.socials.filter((_, i) => i !== index),
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Side: Contact details & Direct mail */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
              05. Connection & Inquiries
            </span>

            {isEditing ? (
              <input
                type="text"
                value={data.heading}
                onChange={(e) => onUpdate({ ...data, heading: e.target.value })}
                className={`text-3xl md:text-5xl font-bold ${font.display} ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none pb-1`}
              />
            ) : (
              <h2 className={`text-3xl md:text-5xl font-bold ${font.display} ${theme.textPrimaryClass} tracking-tight`}>
                {data.heading}
              </h2>
            )}

            {data.subheading && (
              <p className={`mt-3 text-base md:text-lg ${theme.textSecondaryClass} leading-relaxed`}>
                {data.subheading}
              </p>
            )}

            {/* Direct Email with copy & mailto */}
            <div className="mt-8 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                Direct Email
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                {isEditing ? (
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => onUpdate({ ...data, email: e.target.value })}
                    className={`text-lg md:text-xl font-medium ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 outline-none`}
                  />
                ) : (
                  <a
                    href={`mailto:${data.email}`}
                    className={`text-lg md:text-xl font-medium ${theme.textPrimaryClass} hover:underline`}
                  >
                    {data.email}
                  </a>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${data.email}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-white ${accent.bg}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Mail</span>
                  </a>
                </div>
              </div>

              {/* Status and Location (Zero pills, unboxed) */}
              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500">
                <span>{data.location}</span>
                <span aria-hidden="true">·</span>
                <span>{data.availability}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-3">
              Elsewhere on the Web
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {data.socials.map((soc, sIdx) => (
                <div key={sIdx} className="flex items-center gap-1 text-sm group">
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={soc.platform}
                        onChange={(e) => handleSocialChange(sIdx, 'platform', e.target.value)}
                        className="w-20 text-xs bg-transparent border-b border-dashed border-neutral-300"
                      />
                      <input
                        type="text"
                        value={soc.url}
                        onChange={(e) => handleSocialChange(sIdx, 'url', e.target.value)}
                        className="w-24 text-xs bg-transparent border-b border-dashed border-neutral-300"
                      />
                      <button
                        onClick={() => handleRemoveSocial(sIdx)}
                        className="text-neutral-400 hover:text-red-500 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <a
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 ${theme.textSecondaryClass} hover:${theme.textPrimaryClass} hover:underline font-medium`}
                    >
                      <span>{soc.platform}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </a>
                  )}
                </div>
              ))}

              {isEditing && (
                <button
                  onClick={handleAddSocial}
                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Link</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Working Inquiry Form */}
        <div className="lg:col-span-6">
          <div className={`p-6 md:p-8 rounded-2xl border ${theme.borderClass} ${theme.cardBgClass}`}>
            <h3 className={`text-lg font-bold ${font.display} ${theme.textPrimaryClass} mb-2`}>
              Send a Direct Message
            </h3>
            <p className={`text-xs md:text-sm ${theme.textSecondaryClass} mb-6`}>
              Inquire about project timelines, consulting arrangements, or speaking.
            </p>

            {messageSent ? (
              <div className="p-6 text-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Message Dispatched
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  Thank you! Your note has been delivered to {data.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${theme.borderClass} bg-white dark:bg-neutral-900 outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="your.email@organization.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${theme.borderClass} bg-white dark:bg-neutral-900 outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Project Scope or Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Briefly describe what you would like to collaborate on..."
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${theme.borderClass} bg-white dark:bg-neutral-900 outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium rounded-lg text-white ${accent.bg} ${accent.hover} transition-colors shadow-xs`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
