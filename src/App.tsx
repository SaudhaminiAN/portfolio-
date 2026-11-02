/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navigation } from './components/Navigation';
import { CurtainStage } from './components/CurtainStage';
import { HeroSection } from './components/HeroSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { LeadershipSection } from './components/LeadershipSection';
import { SkillsSection } from './features/skills/components/SkillsSection';
import { ProjectsSection } from './features/projects/components/ProjectsSection';
import { ExperienceSection } from './features/experience/components/ExperienceSection';
import { EducationSection } from './features/education/components/EducationSection';
import { AiLabSection } from './features/ai-lab/components/AiLabSection';
import { BlogSection } from './features/blog/components/BlogSection';
import { ContactSection } from './features/contact/components/ContactSection';
import { StageInfoModal } from './components/StageInfoModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminPortalModal } from './components/AdminPortalModal';

const CURTAIN_STAGES: Array<{ id: string; theme: 'light' | 'dark' }> = [
  { id: 'section-01', theme: 'light' },
  { id: 'section-02', theme: 'dark' },
  { id: 'section-leadership', theme: 'light' },
  { id: 'section-skills', theme: 'dark' },
  { id: 'section-projects', theme: 'light' },
  { id: 'section-experience', theme: 'dark' },
  { id: 'section-education', theme: 'light' },
  { id: 'section-ai-lab', theme: 'dark' },
  { id: 'section-blog', theme: 'light' },
  { id: 'section-contact', theme: 'dark' },
];

export default function App() {
  const [introActive, setIntroActive] = useState(true);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [instantReveal, setInstantReveal] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const [modalType, setModalType] = useState<'about' | 'work' | 'connect' | null>(null);
  const [isDarkNavbar, setIsDarkNavbar] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determine which curtain has most recently slid up to the navbar (top <= 80px)
      let activeTheme: 'light' | 'dark' = 'light';

      for (const stage of CURTAIN_STAGES) {
        const anchorEl = document.getElementById(`${stage.id}-anchor`);
        if (anchorEl) {
          const rect = anchorEl.getBoundingClientRect();
          if (rect.top <= 80) {
            activeTheme = stage.theme;
          }
        }
      }

      setIsDarkNavbar(activeTheme === 'dark');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setIsDarkNavbar(false);
    setInstantReveal(false);
    setHeroRevealed(false);
    setIntroKey((prev) => prev + 1);
    setIntroActive(true);
  };

  const scrollToStage = (stageId: string) => {
    const anchorEl =
      document.getElementById(`${stageId}-anchor`) ||
      document.getElementById(stageId);
    if (anchorEl) {
      const targetY = Math.max(
        0,
        anchorEl.getBoundingClientRect().top + window.scrollY - 64
      );
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleNavigateTo = (target: string) => {
    const normalized = target.toLowerCase();
    if (normalized === 'section-02-track' || normalized.includes('work') || normalized.includes('what')) {
      scrollToStage('section-02');
    } else if (normalized.includes('leader')) {
      scrollToStage('section-leadership');
    } else if (normalized.includes('skill') || normalized.includes('expertise')) {
      scrollToStage('section-skills');
    } else if (normalized.includes('project')) {
      scrollToStage('section-projects');
    } else if (normalized.includes('experience')) {
      scrollToStage('section-experience');
    } else if (normalized.includes('education')) {
      scrollToStage('section-education');
    } else if (normalized.includes('lab') || normalized.includes('ai-lab')) {
      scrollToStage('section-ai-lab');
    } else if (normalized.includes('blog')) {
      scrollToStage('section-blog');
    } else if (normalized.includes('contact') || normalized.includes('connect')) {
      scrollToStage('section-contact');
    } else {
      scrollToStage(target);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111111] antialiased selection:bg-[#111111] selection:text-white font-jakarta">
      {/* PART 1: Cinematic Opening Intro Screen */}
      {introActive && (
        <CinematicIntro
          key={introKey}
          onRevealStart={(skipped) => {
            if (skipped) setInstantReveal(true);
            setHeroRevealed(true);
          }}
          onComplete={(skipped) => {
            if (skipped) setInstantReveal(true);
            setHeroRevealed(true);
            setIntroActive(false);
          }}
        />
      )}

      {/* PART 2: Main Website Environment (Always rendered at 100% opacity beneath the z-[300] black intro curtain so there is zero blank white flash) */}
      <div className="w-full min-h-screen">
        {/* Navigation Bar with Adaptive Light/Dark Theme Across All Curtain Stages */}
        <Navigation
          onReplayIntro={handleReplayIntro}
          onPlaceholderClick={handleNavigateTo}
          onOpenResume={() => setIsResumeOpen(true)}
          isDark={isDarkNavbar}
        />

        {/* Main Portfolio Sections: Universal Alternating White & Black Curtain Architecture */}
        <main className="relative w-full">
          {/* STAGE 01: Hero — WHITE */}
          <CurtainStage
            id="section-01"
            zIndex={10}
            theme="light"
            isFirst
            isRevealed={heroRevealed}
          >
            <HeroSection
              onExploreWork={() => scrollToStage('section-02')}
              onConnect={() => scrollToStage('section-contact')}
              onViewResume={() => setIsResumeOpen(true)}
              isRevealed={heroRevealed}
              instantReveal={instantReveal}
              revealKey={introKey}
            />
          </CurtainStage>

          {/* STAGE 02: What I Do — BLACK */}
          <CurtainStage
            id="section-02"
            zIndex={20}
            theme="dark"
            stageLabel="STAGE 02 / CORE DISCIPLINES"
          >
            <WhatIDoSection />
          </CurtainStage>

          {/* STAGE 02B: Leadership & Mentoring Spotlight — WHITE */}
          <CurtainStage
            id="section-leadership"
            zIndex={30}
            theme="light"
            stageLabel="STAGE 02B / LEADERSHIP & MENTORSHIP"
          >
            <LeadershipSection />
          </CurtainStage>

          {/* STAGE 03: Technical Expertise (Skills) — BLACK */}
          <CurtainStage
            id="section-skills"
            zIndex={40}
            theme="dark"
            stageLabel="STAGE 03 / TECHNICAL EXPERTISE"
          >
            <SkillsSection />
          </CurtainStage>

          {/* STAGE 04: Selected Projects — WHITE */}
          <CurtainStage
            id="section-projects"
            zIndex={50}
            theme="light"
            stageLabel="STAGE 04 / SELECTED PROJECTS"
          >
            <ProjectsSection />
          </CurtainStage>

          {/* STAGE 05: Professional Experience — BLACK */}
          <CurtainStage
            id="section-experience"
            zIndex={60}
            theme="dark"
            stageLabel="STAGE 05 / PROFESSIONAL EXPERIENCE"
          >
            <ExperienceSection />
          </CurtainStage>

          {/* STAGE 06: Education & Certifications — WHITE */}
          <CurtainStage
            id="section-education"
            zIndex={70}
            theme="light"
            stageLabel="STAGE 06 / EDUCATION & CREDENTIALS"
          >
            <EducationSection />
          </CurtainStage>

          {/* STAGE 07: AI Lab / Exploration — BLACK */}
          <CurtainStage
            id="section-ai-lab"
            zIndex={80}
            theme="dark"
            stageLabel="STAGE 07 / AI LAB & PROTOTYPING"
          >
            <AiLabSection />
          </CurtainStage>

          {/* STAGE 08: Blog / Knowledge Sharing — WHITE */}
          <CurtainStage
            id="section-blog"
            zIndex={90}
            theme="light"
            stageLabel="STAGE 08 / TECHNICAL PUBLICATIONS"
          >
            <BlogSection />
          </CurtainStage>

          {/* STAGE 09: Contact & Footer — BLACK */}
          <CurtainStage
            id="section-contact"
            zIndex={100}
            theme="dark"
            isLast
            stageLabel="STAGE 09 / INITIATE CONTACT"
          >
            <ContactSection
              onViewResume={() => setIsResumeOpen(true)}
              onOpenAdmin={() => setIsAdminPortalOpen(true)}
            />
          </CurtainStage>
        </main>
      </div>

      {/* Contextual Information Modal for Stage Placeholders */}
      <StageInfoModal
        type={modalType}
        onClose={() => setModalType(null)}
      />

      {/* Full Curriculum Vitae & Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Protected Executive Admin Command Center (Supabase Auth + Inbox + DB Migration) */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
    </div>
  );
}
