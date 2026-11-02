import React, { useState } from 'react';
import { ContactFormData } from '../types';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUp,
  Lock,
  FileText,
} from 'lucide-react';
import { SAMonogram } from '../../../components/SAMonogram';
import { contactService } from '../../../lib/supabase/services/contactService';

interface ContactSectionProps {
  onViewResume?: () => void;
  onOpenAdmin?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onViewResume,
  onOpenAdmin,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    category: 'Collaboration',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email required';
    }
    if (!formData.subject.trim()) errs.subject = 'Required';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Min 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await contactService.submitContactMessage({
        name: formData.fullName,
        email: formData.email,
        subject: `[${formData.category}] ${formData.subject}`,
        message: formData.message,
      });
    } catch {
      // Non-blocking fallback
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        category: 'Collaboration',
        message: '',
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('saudhamini.an@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex flex-col justify-between min-h-[calc(100vh-4rem)] bg-[#000000] text-white">
      {/* Upper Split Layout: Hero Typography & Direct Channels on Left, Direct Dispatch Form Frame on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 my-auto">
        {/* Right Column on Desktop: Clean Architectural Message Dispatch Frame (Exact Hero Proportion) */}
        <div className="md:col-span-5 xl:col-span-4 flex flex-col items-center justify-center order-2 md:order-2">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[320px] lg:max-w-[350px] xl:max-w-[370px]">
            <div className="relative w-full bg-white/[0.03] border border-white/20 p-4 sm:p-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/15 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                <span>DIRECT TRANSMISSION</span>
                <span className="text-white font-semibold">24H RESPONSE</span>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-2.5">
                  <CheckCircle2 className="w-7 h-7 text-white mx-auto" />
                  <h4 className="text-sm font-bold font-outfit text-white">
                    Message Dispatched
                  </h4>
                  <p className="text-xs font-jakarta text-neutral-400">
                    Thank you for reaching out. I will respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-3.5 py-1.5 border border-white/30 text-[10px] font-mono uppercase text-white hover:border-white cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Full Name *"
                        className={`w-full px-2.5 py-2 sm:py-1.5 bg-white/[0.04] border text-xs font-jakarta text-white placeholder-neutral-500 focus:outline-none ${
                          errors.fullName ? 'border-red-400' : 'border-white/15 focus:border-white'
                        }`}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Email *"
                        className={`w-full px-2.5 py-2 sm:py-1.5 bg-white/[0.04] border text-xs font-jakarta text-white placeholder-neutral-500 focus:outline-none ${
                          errors.email ? 'border-red-400' : 'border-white/15 focus:border-white'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2.5">
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as ContactFormData['category'],
                        })
                      }
                      className="w-full px-2.5 py-2 sm:py-1.5 bg-white/[0.04] border border-white/15 text-xs font-jakarta text-white focus:outline-none focus:border-white"
                    >
                      <option value="Collaboration" className="bg-[#111111] text-white">
                        Collaboration
                      </option>
                      <option value="AI Consultation" className="bg-[#111111] text-white">
                        AI Consultation
                      </option>
                      <option value="Mentoring & Training" className="bg-[#111111] text-white">
                        Mentoring & Training
                      </option>
                      <option value="General Inquiry" className="bg-[#111111] text-white">
                        General Inquiry
                      </option>
                    </select>

                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Subject *"
                      className={`w-full px-2.5 py-2 sm:py-1.5 bg-white/[0.04] border text-xs font-jakarta text-white placeholder-neutral-500 focus:outline-none ${
                        errors.subject ? 'border-red-400' : 'border-white/15 focus:border-white'
                      }`}
                    />
                  </div>

                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Outline your project scope, role, or advisory inquiry... *"
                    className={`w-full px-2.5 py-2 sm:py-1.5 bg-white/[0.04] border text-xs font-jakarta text-white placeholder-neutral-500 focus:outline-none ${
                      errors.message ? 'border-red-400' : 'border-white/15 focus:border-white'
                    }`}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 bg-white text-[#111111] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{submitting ? 'DISPATCHING...' : 'TRANSMIT MESSAGE'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-neutral-500 px-0.5">
              <span>DIRECT CHANNEL</span>
              <span>ENCRYPTED DISPATCH</span>
            </div>
          </div>
        </div>

        {/* Left Column on Desktop: Hero-Style Kicker, Two-Tone Headline, Narrative & Direct Action Buttons */}
        <div className="md:col-span-7 xl:col-span-8 flex flex-col justify-center order-1 md:order-1">
          {/* Small Introductory Label */}
          <div className="mb-2">
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-neutral-400 font-jakarta">
              09 — INITIATE CONTACT
            </span>
          </div>

          {/* Main Two-Tone Headline (Exact Hero Typography Pattern) */}
          <div className="mb-2.5 sm:mb-3">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight font-outfit leading-[1.12] [text-wrap:balance]">
              <span className="block text-white">
                Let's Build Intelligent Systems.
              </span>
              <span className="block text-neutral-500 font-semibold mt-0.5 sm:mt-1">
                Collaborate on Real-World AI.
              </span>
            </h2>
          </div>

          {/* Subtitle Line */}
          <div className="mb-2.5 sm:mb-3">
            <p className="text-sm sm:text-base md:text-lg font-medium text-white font-outfit tracking-normal">
              <span className="font-semibold">AI/ML Engineering</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Advisory & Mentorship</span>{' '}
              <span className="text-neutral-500 mx-1.5 font-light">|</span>{' '}
              <span className="font-semibold">Kerala, India</span>
            </p>
          </div>

          {/* Airy Narrative */}
          <div className="max-w-2xl mb-5 sm:mb-6 text-justify">
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[15px] leading-relaxed text-neutral-400 font-jakarta font-normal text-justify [text-justify:inter-word]">
              Available for{' '}
              <span className="text-white font-semibold border-b border-white/40">
                enterprise Generative AI engineering
              </span>
              ,{' '}
              <span className="text-white font-semibold border-b border-white/40">
                RAG & LLM architecture consulting
              </span>{' '}
              and technical leadership initiatives. Connect directly via email or verified profiles below:
            </p>
          </div>

          {/* Hero-Style Rectangular Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase rounded-none bg-white text-[#111111] hover:bg-neutral-200 transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{copiedEmail ? 'EMAIL COPIED!' : 'SAUDHAMINI.AN@GMAIL.COM'}</span>
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <a
              href="https://linkedin.com/in/saudhamini-a-n"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-transparent text-white border border-white hover:bg-white hover:text-[#111111] transition-all duration-300"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>

            <a
              href="https://github.com/saudhaminian"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-transparent text-white border border-white/30 hover:border-white transition-all duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>

            <a
              href="https://medium.com/@saudhaminiupdated"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-transparent text-white border border-white/30 hover:border-white transition-all duration-300"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>MEDIUM</span>
            </a>

            {onViewResume && (
              <button
                onClick={onViewResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.16em] uppercase rounded-none bg-white/[0.05] text-white border border-white/20 hover:border-white transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RESUME / CV</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Signature Colophon Line (Exact Hero Section Pattern) */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5 text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] text-neutral-400 uppercase font-jakarta">
          <SAMonogram size={20} color="#FFFFFF" />
          <span>© {new Date().getFullYear()} SAUDHAMINI A N · AI/ML ENGINEER & TECHNICAL LEAD</span>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-4 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
          {onOpenAdmin && (
            <>
              <button
                onClick={onOpenAdmin}
                title="Administrator Portal"
                className="text-neutral-500 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>ADMIN</span>
              </button>
              <span>·</span>
            </>
          )}
          <button
            onClick={scrollToTop}
            className="text-white hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>BACK TO TOP ↑</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
