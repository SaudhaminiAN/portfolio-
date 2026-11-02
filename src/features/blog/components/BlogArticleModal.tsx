import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { MEDIUM_PROFILE_URL } from '../data';
import { X, ExternalLink } from 'lucide-react';

interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white text-[#111111] border border-[#EAEAEA] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA] bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#111111] text-white uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#777777]">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={post.mediumUrl || MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#111111] text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
            >
              <span>OPEN ON MEDIUM</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close article"
              className="p-1.5 text-[#777777] hover:text-[#111111] hover:bg-[#EAEAEA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {post.coverImage && (
            <div className="w-full h-48 sm:h-60 overflow-hidden border border-[#EAEAEA] bg-[#111111]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-outfit tracking-tight text-[#111111] leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base font-jakarta text-[#555555] leading-relaxed">
              {post.subtitle}
            </p>
          </div>

          {/* Abstract / Summary Quote */}
          <div className="p-4 bg-[#FAFAFA] border-l-2 border-[#111111] border-y border-r border-[#EAEAEA] italic text-xs sm:text-sm font-jakarta text-[#333333]">
            "{post.summary}"
          </div>

          {/* Full Paragraphs */}
          <div className="space-y-4 pt-2">
            {post.content.map((para, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-sm font-jakarta text-[#333333] leading-relaxed text-justify [text-justify:inter-word]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#EAEAEA] flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider mr-2">
              MEDIUM TOPICS:
            </span>
            {post.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 bg-[#FAFAFA] border border-[#E0E0E0] text-xs font-mono text-[#222222]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#EAEAEA] flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-mono uppercase text-[#777777]">
            PUBLISHED BY SAUDHAMINI A N ON MEDIUM (@SAUDHAMINIUPDATED)
          </span>
          <div className="flex items-center gap-2.5">
            <a
              href={post.mediumUrl || MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#111111] text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              <span>CONTINUE READING ON MEDIUM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white border border-[#EAEAEA] hover:border-[#111111] text-[#111111] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

