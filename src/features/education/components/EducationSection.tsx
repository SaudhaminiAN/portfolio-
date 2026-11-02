import React, { useState, useEffect } from 'react';
import { EDUCATION_LIST, CERTIFICATIONS_LIST } from '../data';
import { EducationItem, CertificationItem } from '../types';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { educationService } from '../../../lib/supabase/services/educationService';

export const EducationSection: React.FC = () => {
  const [educationList, setEducationList] = useState<EducationItem[]>(EDUCATION_LIST);
  const [certificationsList, setCertificationsList] = useState<CertificationItem[]>(CERTIFICATIONS_LIST);
  const [activeTab, setActiveTab] = useState<'degrees' | 'certifications'>('degrees');

  useEffect(() => {
    let isMounted = true;
    educationService.getPublishedEducation().then((edu) => {
      if (isMounted && edu && edu.length > 0) setEducationList(edu);
    });
    educationService.getPublishedCertifications().then((certs) => {
      if (isMounted && certs && certs.length > 0) setCertificationsList(certs);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeEducationImage =
    activeTab === 'degrees'
      ? '/assets/images/education_math.jpg'
      : '/assets/images/education_certs.jpg';

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-white text-[#111111]">
      {/* Upper Split Layout: Credentials Frame on Left, Hero Typography & Narrative on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Left Column: Clean Architectural Credentials Frame (Exact Hero Proportion) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-1">
          <div className="relative w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[350px] xl:max-w-[370px] group">
            <div className="relative w-full bg-[#FAFAFA] border border-[#EAEAEA] overflow-hidden flex flex-col justify-between shadow-xs">
              {/* Contextual Academic / Credentials Visual Header */}
              <div className="relative h-28 sm:h-32 w-full overflow-hidden border-b border-[#EAEAEA]">
                <img
                  key={activeEducationImage}
                  src={activeEducationImage}
                  alt={activeTab === 'degrees' ? 'M.Sc. Data Analytics & B.Sc. Mathematics' : 'Verified AI & Data Certifications'}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] animate-in fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white">
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20">
                    {activeTab === 'degrees' ? 'ACADEMIC DEGREES' : 'INDUSTRY CREDENTIALS'}
                  </span>
                  <span className="px-2 py-0.5 bg-black/75 border border-white/20 font-semibold">
                    VERIFIED
                  </span>
                </div>
                <div className="absolute bottom-2 left-3.5 right-3.5 text-white">
                  <div className="text-xs sm:text-sm font-bold font-outfit uppercase tracking-wide">
                    {activeTab === 'degrees' ? 'M.Sc. Data Analytics · B.Sc. Mathematics' : 'Google & Specialized AI Credentials'}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-4">
                {activeTab === 'degrees' ? (
                  <div className="space-y-2">
                    {educationList.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-white border border-[#EAEAEA]"
                      >
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <h3 className="text-xs sm:text-sm font-bold font-outfit text-[#111111]">
                            {edu.degree}
                          </h3>
                          <span className="px-1.5 py-0.5 bg-[#FAFAFA] border border-[#E0E0E0] text-[8px] font-mono uppercase text-[#111111] shrink-0">
                            {edu.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold font-jakarta text-[#333333]">
                          {edu.institution}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-1.5">
                    {certificationsList.map((cert, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white border border-[#EAEAEA] flex items-start justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold font-outfit text-[#111111] truncate">
                            {cert.title}
                          </h4>
                          <div className="text-[10px] font-jakarta text-[#666666] truncate">
                            <span className="font-semibold text-[#222222]">{cert.issuer}</span> · {cert.type}
                          </div>
                        </div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] shrink-0 mt-0.5" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-[#888888]">
                  <span>MATHEMATICS & ANALYTICS</span>
                  <span>KERALA · IND</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#999999] px-0.5">
              <span>ACADEMIC FOUNDATION</span>
              <span>VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero-Style Kicker, Two-Tone Headline, Narrative & Mode Buttons */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-2">
          {/* Small Introductory Label */}
          <div className="mb-2">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-[#777777] font-jakarta">
              06 — EDUCATION & CERTIFICATIONS
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-[#111111]">
                Mathematical Depth.
              </span>
              <span className="block text-[#777777] font-semibold mt-0.5 sm:mt-1">
                Verified AI Specializations.
              </span>
            </h2>
          </div>

          {/* Professional Subtitle */}
          <div className="mb-2.5 sm:mb-3">
            <p className="text-sm sm:text-base md:text-lg font-medium text-[#111111] font-outfit tracking-normal">
              <span className="font-semibold">M.Sc. Data Analytics</span>{' '}
              <span className="text-neutral-400 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">B.Sc. Mathematics</span>
            </p>
          </div>

          {/* Airy Narrative */}
          <div className="max-w-2xl space-y-2 mb-5 sm:mb-6 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-[#555555] font-jakarta font-normal text-justify [text-justify:inter-word]">
              Grounding advanced machine learning in{' '}
              <span className="text-[#111111] font-semibold border-b border-black/30">
                mathematical rigor
              </span>
              —combining a postgraduate{' '}
              <span className="text-[#111111] font-semibold border-b border-black/30">
                M.Sc. in Data Analytics
              </span>{' '}
              and undergraduate{' '}
              <span className="text-[#111111] font-semibold">B.Sc. in Mathematics</span> with industry-verified specializations in Generative AI, Deep Learning, and Data Science.
            </p>
          </div>

          {/* Hero-Style Rectangular Switcher Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={() => setActiveTab('degrees')}
              className={`inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none border transition-all duration-300 cursor-pointer ${
                activeTab === 'degrees'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#111111] border-[#111111] hover:bg-[#F9F9F9]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC DEGREES ({educationList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none border transition-all duration-300 cursor-pointer ${
                activeTab === 'certifications'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#111111] border-[#111111] hover:bg-[#F9F9F9]'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS ({certificationsList.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Signature Line (Exact Hero Section Pattern) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.24em] text-[#888888] uppercase font-jakarta">
          DATA ANALYTICS · PURE MATHEMATICS · STATISTICAL MODELING · AI CREDENTIALS
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider">
          <span>STAGE 06 / EDUCATION</span>
          <span aria-hidden="true">·</span>
          <a
            href="#section-ai-lab-anchor"
            className="text-[#111111] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>07 AI LAB ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
