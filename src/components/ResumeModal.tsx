import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileText, Download, ExternalLink } from 'lucide-react';
import { SAMonogram } from './SAMonogram';
import { EXPERIENCES } from '../features/experience/data';
import { EDUCATION_LIST, CERTIFICATIONS_LIST } from '../features/education/data';
import { SKILL_CATEGORIES } from '../features/skills/data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `SAUDHAMINI A N
AI/ML Engineer | Generative AI Developer | Technical Lead
Email: saudhamini.an@gmail.com | Location: Kerala, India
LinkedIn: https://linkedin.com/in/saudhamini-a-n | GitHub: https://github.com/saudhaminian

SUMMARY:
AI/ML Engineer with 6+ years of professional experience, including 4+ years dedicated to Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI. Proven track record in building production RAG systems, LLM automation pipelines, semantic search engines, and enterprise backends. Technical leader and educator who has trained 2,000+ learners, mentored 500+ projects, and architected industry-aligned AI curricula.

EXPERIENCE:
${EXPERIENCES.map(
  (e) => `• ${e.role} — ${e.company} (${e.period}, ${e.location})
  ${e.summary}
  Responsibilities:
  ${e.responsibilities.map((r) => `  - ${r}`).join('\n')}`
).join('\n\n')}

EDUCATION:
${EDUCATION_LIST.map((ed) => `• ${ed.degree} in ${ed.field} — ${ed.institution} (${ed.status})`).join('\n')}

CERTIFICATIONS:
${CERTIFICATIONS_LIST.map((c) => `• ${c.title} (${c.issuer}) — ${c.skills.join(', ')}`).join('\n')}

TECHNICAL EXPERTISE:
${SKILL_CATEGORIES.map((cat) => `${cat.name}: ${cat.skills.join(', ')}`).join('\n')}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div
        className="relative w-full max-w-4xl bg-white text-[#111111] border border-[#EAEAEA] shadow-2xl my-6 flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-[#FAFAFA] border-b border-[#EAEAEA] print:hidden">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-[#111111]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#111111]">
              CURRICULUM VITAE — SAUDHAMINI A N
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#EAEAEA] hover:border-[#111111] bg-white text-[#111111] transition-colors"
              title="Copy plain text CV to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#111111]" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY TEXT'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#111111] text-white hover:bg-neutral-800 transition-colors"
              title="Print or export as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-[#111111] hover:bg-neutral-100 transition-colors"
              title="Close CV Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Body */}
        <div className="overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-8 font-jakarta print:overflow-visible print:p-0">
          {/* Header */}
          <div className="border-b border-[#111111] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <SAMonogram size={24} color="#111111" />
                <h1 className="text-2xl sm:text-3xl font-bold font-outfit uppercase tracking-tight text-[#111111]">
                  SAUDHAMINI A N
                </h1>
              </div>
              <p className="text-sm sm:text-base font-medium font-outfit text-[#444444] tracking-normal">
                AI/ML Engineer <span className="text-neutral-400 mx-1">|</span> Generative AI Developer <span className="text-neutral-400 mx-1">|</span> Technical Lead
              </p>
              <p className="text-xs text-[#777777] font-mono mt-1">
                Location: Kerala, India <span className="mx-1.5">·</span> Open to Hybrid & Remote Engagements
              </p>
            </div>

            <div className="text-xs font-mono text-[#555555] space-y-1 sm:text-right">
              <div>Email: <a href="mailto:saudhamini.an@gmail.com" className="text-[#111111] hover:underline">saudhamini.an@gmail.com</a></div>
              <div>LinkedIn: <a href="https://linkedin.com/in/saudhamini-a-n" target="_blank" rel="noreferrer" className="text-[#111111] hover:underline">linkedin.com/in/saudhamini-a-n</a></div>
              <div>GitHub: <a href="https://github.com/saudhaminian" target="_blank" rel="noreferrer" className="text-[#111111] hover:underline">github.com/saudhaminian</a></div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#777777] border-b border-[#EAEAEA] pb-1.5 mb-3">
              01 — EXECUTIVE SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed text-justify">
              AI/ML Engineer with <strong>6+ years</strong> of professional experience, including <strong>4+ years</strong> specialized in <strong>Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI</strong>. Hands-on expertise in developing production Retrieval-Augmented Generation (RAG) assistants, semantic search pipelines, automated LLM reporting systems, and scalable FastAPI backend architectures. Accomplished technical educator and mentor who has trained <strong>2,000+ learners</strong>, mentored <strong>500+ student capstone projects</strong>, authored comprehensive AI curricula, and spearheaded academic technology operations.
            </p>
          </div>

          {/* Core Technical Matrix */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#777777] border-b border-[#EAEAEA] pb-1.5 mb-3">
              02 — TECHNICAL EXPERTISE & STACK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#FAFAFA] border border-[#EAEAEA]">
                <span className="font-bold text-[#111111] block mb-1">Generative AI & LLMs</span>
                <span className="text-[#555555] leading-relaxed">
                  RAG, AI Agents, Prompt Engineering, Embeddings, Semantic Search, Function Calling, LangChain, LangGraph, Hugging Face Transformers.
                </span>
              </div>
              <div className="p-3 bg-[#FAFAFA] border border-[#EAEAEA]">
                <span className="font-bold text-[#111111] block mb-1">Machine Learning & Data</span>
                <span className="text-[#555555] leading-relaxed">
                  Deep Learning, CNN, RNN, LSTM, Transfer Learning, Scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, Power BI, Statistical Modeling.
                </span>
              </div>
              <div className="p-3 bg-[#FAFAFA] border border-[#EAEAEA]">
                <span className="font-bold text-[#111111] block mb-1">Backend & Infrastructure</span>
                <span className="text-[#555555] leading-relaxed">
                  Python, FastAPI, REST APIs, MySQL, ChromaDB, FAISS, Vector Databases, Docker (Basic), Git/GitHub, n8n Automation, Azure & AWS Fundamentals.
                </span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#777777] border-b border-[#EAEAEA] pb-1.5 mb-4">
              03 — PROFESSIONAL EXPERIENCE (8 POSITIONS)
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-[#111111]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold font-outfit text-[#111111]">
                      {exp.role} <span className="font-normal text-[#555555]">· {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-[#777777] shrink-0">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <p className="text-xs text-[#555555] mb-2 leading-relaxed">
                    {exp.summary}
                  </p>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#444444] mb-2">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-[#F5F5F5] border border-[#EAEAEA] text-[10px] font-mono text-[#333333]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Degrees */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#777777] border-b border-[#EAEAEA] pb-1.5 mb-3">
              04 — ACADEMIC CREDENTIALS
            </h2>
            <div className="space-y-3">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-[#F0F0F0]">
                  <div>
                    <span className="text-xs font-bold text-[#111111]">{edu.degree}</span>
                    <span className="text-xs text-[#555555] ml-2">({edu.field})</span>
                    <span className="text-xs text-[#777777] block mt-0.5">{edu.institution}</span>
                  </div>
                  <span className="text-xs font-mono text-[#111111] font-semibold">{edu.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#777777] border-b border-[#EAEAEA] pb-1.5 mb-3">
              05 — PROFESSIONAL CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS_LIST.map((cert, idx) => (
                <div key={idx} className="p-3 bg-[#FAFAFA] border border-[#EAEAEA]">
                  <span className="text-xs font-bold text-[#111111] block mb-0.5">{cert.title}</span>
                  <span className="text-[11px] font-mono text-[#777777] block mb-1.5">{cert.issuer} · {cert.type}</span>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((s, sIdx) => (
                      <span key={sIdx} className="px-1.5 py-0.5 bg-white border border-[#EAEAEA] text-[9px] font-mono text-[#555555]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="px-6 py-3.5 bg-[#FAFAFA] border-t border-[#EAEAEA] flex items-center justify-between text-xs font-mono text-[#777777] print:hidden">
          <span>Saudhamini A N — Confidential Curriculum Vitae</span>
          <button
            onClick={onClose}
            className="text-[#111111] hover:underline font-semibold"
          >
            Close Viewer (✕)
          </button>
        </div>
      </div>
    </div>
  );
};
