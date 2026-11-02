import React, { useState, useEffect } from 'react';
import { BLOG_POSTS, MEDIUM_PROFILE_URL } from '../data';
import { BlogPost } from '../types';
import { BlogArticleModal } from './BlogArticleModal';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { blogService } from '../../../lib/supabase/services/blogService';

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS.slice(0, 4));
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  useEffect(() => {
    let isMounted = true;
    blogService.getPublishedBlogPosts().then((items) => {
      if (isMounted && items && items.length > 0) {
        setPosts(items.slice(0, 4));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const currentPost = posts[selectedIndex] || posts[0];
  const fallbackImages = [
    '/assets/images/medium_01_intelligence.jpg',
    '/assets/images/medium_02_overfitting.png',
    '/assets/images/medium_03_transfer.jpg',
    '/assets/images/medium_04_naivebayes.jpg',
  ];
  const activeArticleImage =
    currentPost.coverImage ||
    fallbackImages[selectedIndex % fallbackImages.length] ||
    '/assets/images/medium_01_intelligence.jpg';

  const padNumber = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-white text-[#111111]">
      {/* Upper Split Layout: Featured Medium Article Frame on Left, Hero Typography & Medium Selector on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Left Column: Featured Medium Publication Frame (Exact Hero Proportion) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-1">
          <div className="relative w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[350px] xl:max-w-[370px]">
            <div
              onClick={() => setActiveArticle(currentPost)}
              className="group relative w-full bg-[#FAFAFA] border border-[#EAEAEA] hover:border-[#111111] overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xs"
            >
              {/* Contextual Medium Cover Image Header */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden border-b border-[#EAEAEA] bg-[#111111]">
                <img
                  key={activeArticleImage}
                  src={activeArticleImage}
                  alt={currentPost.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] animate-in fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white">
                  <span className="px-2 py-0.5 bg-black/80 border border-white/20 font-semibold">
                    {currentPost.category}
                  </span>
                  <span className="px-2 py-0.5 bg-black/80 border border-white/20">
                    {currentPost.readTime}
                  </span>
                </div>
                <div className="absolute bottom-2 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono text-neutral-200 uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-white" />
                    <span>MEDIUM · {padNumber(selectedIndex + 1)}</span>
                  </span>
                  <span>@SAUDHAMINIUPDATED</span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold font-outfit text-[#111111] leading-snug mb-2 line-clamp-2">
                  {currentPost.title}
                </h3>

                <p className="text-xs font-jakarta text-[#666666] leading-relaxed line-clamp-3">
                  {currentPost.summary}
                </p>

                <div className="mt-3.5 pt-2.5 border-t border-[#EAEAEA] flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className="text-[#777777]">{currentPost.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#111111] group-hover:underline">
                      SUMMARY →
                    </span>
                    {currentPost.mediumUrl && (
                      <a
                        href={currentPost.mediumUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-[#111111] hover:underline inline-flex items-center gap-1"
                      >
                        <span>MEDIUM</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#999999] px-0.5">
              <span>MEDIUM STORY / {padNumber(selectedIndex + 1)} OF {padNumber(posts.length)}</span>
              <span>SAUDHAMINI AN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero-Style Kicker, Two-Tone Headline, Narrative & Medium Article Grid */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-2">
          {/* Small Introductory Label */}
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-[#777777] font-jakarta">
              08 — MEDIUM BLOGS &amp; TECHNICAL PUBLICATIONS
            </span>
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#111111] border border-[#EAEAEA] hover:border-[#111111] px-2.5 py-0.5 bg-[#FAFAFA] transition-colors"
            >
              <span>MEDIUM/@SAUDHAMINIUPDATED</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-[#111111]">
                Published on Medium.
              </span>
              <span className="block text-[#777777] font-semibold mt-0.5 sm:mt-1">
                AI Architecture, ML &amp; Applied Data Science.
              </span>
            </h2>
          </div>

          {/* Subtitle Line */}
          <div className="mb-2.5 sm:mb-3">
            <p className="text-sm sm:text-base md:text-lg font-medium text-[#111111] font-outfit tracking-normal">
              <span className="font-semibold">Internal Intelligence</span>{' '}
              <span className="text-neutral-400 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Deep Learning &amp; Transfer Learning</span>{' '}
              <span className="text-neutral-400 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Clinical &amp; Predictive ML</span>
            </p>
          </div>

          {/* Airy Narrative */}
          <div className="max-w-2xl mb-4 sm:mb-5 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-[#555555] font-jakarta font-normal text-justify [text-justify:inter-word]">
              Authored by{' '}
              <span className="text-[#111111] font-semibold border-b border-black/30">
                Saudhamini A N on Medium
              </span>
              —exploring{' '}
              <span className="text-[#111111] font-semibold border-b border-black/30">
                enterprise intelligence architecture
              </span>
              , model generalization, neural network diagnostics, Naive Bayes text classification, and end-to-end machine learning deployments. Select any article below to preview or read on Medium:
            </p>
          </div>

          {/* 2-Column Medium Publication Selector Grid (Fits all 8 Medium Posts Compactly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {posts.map((post, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={post.id}
                  onClick={() => setSelectedIndex(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full py-2 px-3 border flex items-center justify-between gap-2.5 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FAFAFA] hover:bg-white text-[#111111] border-[#EAEAEA] hover:border-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`text-[11px] font-mono font-bold tabular-nums shrink-0 ${
                        isSelected ? 'text-white' : 'text-[#888888]'
                      }`}
                    >
                      {padNumber(idx + 1)}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold font-outfit truncate block">
                        {post.title}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase tracking-wider block truncate ${
                          isSelected ? 'text-neutral-300' : 'text-[#777777]'
                        }`}
                      >
                        {post.category} · {post.date}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? 'text-white' : 'text-[#888888]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Hero-Style Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setActiveArticle(currentPost)}
              className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-[#111111] text-white hover:bg-[#262626] transition-all duration-300 cursor-pointer"
            >
              <span>READ ARTICLE PREVIEW</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {currentPost.mediumUrl && (
              <a
                href={currentPost.mediumUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-white text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300"
              >
                <span>READ ON MEDIUM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Signature Line (Exact Hero Section Pattern) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-[#888888] uppercase font-jakarta">
          MEDIUM PUBLICATIONS · AI ARCHITECTURE · DEEP LEARNING · DATA SCIENCE
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider">
          <span>STAGE 08 / MEDIUM BLOGS</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-contact-anchor"
            className="text-[#111111] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>09 CONTACT ↓</span>
          </a>
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      <BlogArticleModal
        post={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  );
};

