import React, { useEffect, useRef, useState } from 'react';
import { SAMonogram, preloadSAMonogram } from './SAMonogram';

interface CinematicIntroProps {
  onRevealStart?: (skipped?: boolean) => void;
  onComplete: (skipped?: boolean) => void;
}

type IntroPhase = 'black' | 'logo-sequence' | 'reveal-hero';

interface StarPoint {
  id: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number; // px (all small, realistic astronomical pinpoint sizes: 0.7px to 2.3px)
  minOpacity: number;
  maxOpacity: number;
  duration: number; // ms
  delay: number; // ms
  glow?: number; // px halo for brighter magnitude stars
}

// Realistic multi-magnitude night sky starfield: all small pinpoint stars with natural size & brightness variation
const INTRO_STARS: StarPoint[] = [
  // Faint distant background dust stars (0.7px – 1.0px)
  { id: 1, x: 6, y: 11, size: 0.8, minOpacity: 0.12, maxOpacity: 0.55, duration: 1800, delay: 0 },
  { id: 2, x: 14, y: 19, size: 0.9, minOpacity: 0.15, maxOpacity: 0.6, duration: 2100, delay: 320 },
  { id: 3, x: 21, y: 8, size: 0.7, minOpacity: 0.1, maxOpacity: 0.5, duration: 1650, delay: 140 },
  { id: 4, x: 29, y: 15, size: 1.0, minOpacity: 0.18, maxOpacity: 0.65, duration: 1950, delay: 480 },
  { id: 5, x: 38, y: 10, size: 0.8, minOpacity: 0.12, maxOpacity: 0.52, duration: 1750, delay: 210 },
  { id: 6, x: 53, y: 9, size: 0.9, minOpacity: 0.14, maxOpacity: 0.58, duration: 2050, delay: 90 },
  { id: 7, x: 61, y: 14, size: 0.75, minOpacity: 0.1, maxOpacity: 0.48, duration: 1600, delay: 390 },
  { id: 8, x: 74, y: 9, size: 0.85, minOpacity: 0.15, maxOpacity: 0.6, duration: 1900, delay: 260 },
  { id: 9, x: 84, y: 13, size: 0.95, minOpacity: 0.16, maxOpacity: 0.62, duration: 2200, delay: 110 },
  { id: 10, x: 93, y: 17, size: 0.8, minOpacity: 0.12, maxOpacity: 0.54, duration: 1700, delay: 440 },
  { id: 11, x: 9, y: 37, size: 0.85, minOpacity: 0.14, maxOpacity: 0.56, duration: 1850, delay: 170 },
  { id: 12, x: 19, y: 44, size: 0.75, minOpacity: 0.1, maxOpacity: 0.45, duration: 1550, delay: 510 },
  { id: 13, x: 81, y: 36, size: 0.9, minOpacity: 0.15, maxOpacity: 0.58, duration: 2000, delay: 290 },
  { id: 14, x: 94, y: 41, size: 0.8, minOpacity: 0.12, maxOpacity: 0.5, duration: 1780, delay: 60 },
  { id: 15, x: 11, y: 63, size: 0.9, minOpacity: 0.14, maxOpacity: 0.55, duration: 1920, delay: 350 },
  { id: 16, x: 27, y: 67, size: 0.75, minOpacity: 0.1, maxOpacity: 0.48, duration: 1680, delay: 130 },
  { id: 17, x: 73, y: 65, size: 0.85, minOpacity: 0.12, maxOpacity: 0.54, duration: 1820, delay: 420 },
  { id: 18, x: 89, y: 69, size: 0.8, minOpacity: 0.12, maxOpacity: 0.52, duration: 1740, delay: 230 },
  { id: 19, x: 16, y: 86, size: 0.9, minOpacity: 0.15, maxOpacity: 0.6, duration: 2080, delay: 80 },
  { id: 20, x: 39, y: 88, size: 0.75, minOpacity: 0.1, maxOpacity: 0.46, duration: 1620, delay: 310 },
  { id: 21, x: 58, y: 86, size: 0.85, minOpacity: 0.14, maxOpacity: 0.56, duration: 1880, delay: 470 },
  { id: 22, x: 82, y: 89, size: 0.8, minOpacity: 0.12, maxOpacity: 0.5, duration: 1760, delay: 190 },

  // Medium-magnitude pinpoint stars (1.15px – 1.55px)
  { id: 23, x: 12, y: 28, size: 1.25, minOpacity: 0.2, maxOpacity: 0.78, duration: 1500, delay: 120, glow: 3 },
  { id: 24, x: 25, y: 22, size: 1.4, minOpacity: 0.22, maxOpacity: 0.82, duration: 1680, delay: 360, glow: 3.5 },
  { id: 25, x: 35, y: 29, size: 1.15, minOpacity: 0.18, maxOpacity: 0.74, duration: 1420, delay: 70, glow: 2.5 },
  { id: 26, x: 46, y: 19, size: 1.35, minOpacity: 0.2, maxOpacity: 0.8, duration: 1750, delay: 250, glow: 3 },
  { id: 27, x: 67, y: 21, size: 1.3, minOpacity: 0.22, maxOpacity: 0.82, duration: 1580, delay: 410, glow: 3 },
  { id: 28, x: 78, y: 26, size: 1.45, minOpacity: 0.24, maxOpacity: 0.85, duration: 1820, delay: 150, glow: 4 },
  { id: 29, x: 90, y: 29, size: 1.2, minOpacity: 0.18, maxOpacity: 0.75, duration: 1480, delay: 300, glow: 2.5 },
  { id: 30, x: 18, y: 55, size: 1.35, minOpacity: 0.2, maxOpacity: 0.8, duration: 1640, delay: 220, glow: 3 },
  { id: 31, x: 32, y: 52, size: 1.2, minOpacity: 0.18, maxOpacity: 0.72, duration: 1520, delay: 450, glow: 2.5 },
  { id: 32, x: 68, y: 53, size: 1.25, minOpacity: 0.2, maxOpacity: 0.76, duration: 1590, delay: 180, glow: 3 },
  { id: 33, x: 85, y: 51, size: 1.4, minOpacity: 0.22, maxOpacity: 0.84, duration: 1720, delay: 330, glow: 3.5 },
  { id: 34, x: 22, y: 76, size: 1.3, minOpacity: 0.2, maxOpacity: 0.78, duration: 1610, delay: 90, glow: 3 },
  { id: 35, x: 48, y: 79, size: 1.2, minOpacity: 0.18, maxOpacity: 0.74, duration: 1460, delay: 280, glow: 2.5 },
  { id: 36, x: 65, y: 78, size: 1.45, minOpacity: 0.22, maxOpacity: 0.82, duration: 1790, delay: 160, glow: 3.5 },
  { id: 37, x: 77, y: 74, size: 1.25, minOpacity: 0.2, maxOpacity: 0.76, duration: 1540, delay: 390, glow: 3 },

  // Bright primary pinpoint stars (1.75px – 2.25px — still crisp & small, with natural optical point glow)
  { id: 38, x: 17, y: 14, size: 1.9, minOpacity: 0.28, maxOpacity: 0.95, duration: 1380, delay: 110, glow: 5 },
  { id: 39, x: 72, y: 15, size: 2.2, minOpacity: 0.32, maxOpacity: 0.98, duration: 1520, delay: 240, glow: 6 },
  { id: 40, x: 87, y: 22, size: 1.8, minOpacity: 0.26, maxOpacity: 0.92, duration: 1440, delay: 50, glow: 4.5 },
  { id: 41, x: 8, y: 49, size: 2.0, minOpacity: 0.3, maxOpacity: 0.95, duration: 1600, delay: 310, glow: 5.5 },
  { id: 42, x: 91, y: 61, size: 1.85, minOpacity: 0.28, maxOpacity: 0.94, duration: 1490, delay: 190, glow: 5 },
  { id: 43, x: 31, y: 81, size: 2.1, minOpacity: 0.3, maxOpacity: 0.96, duration: 1560, delay: 370, glow: 5.5 },
  { id: 44, x: 83, y: 81, size: 1.95, minOpacity: 0.28, maxOpacity: 0.94, duration: 1410, delay: 140, glow: 5 },
];

// Natural shallow atmospheric entry arc moving left-to-right across the upper sky
const METEOR_ARC_PATH = 'M 140 340 Q 690 135 1290 255';

/**
 * 3-Stage Executive Opening Sequence with Realistic Starfield, Curved Meteor & Instant Bypass:
 *
 * Stage 1 (0.00s – 0.30s): Pure Black Page (#000000) with realistic multi-magnitude tiny stars while ensuring
 *                          the SA Monogram alpha-mask is 100% decoded in memory.
 * Stage 2 (0.30s – 2.00s): SA Orbital Sparkle Logo emerges smoothly from the center (small & faded -> full clear size)
 *                          while a realistic tapered meteor streaks from left to right along a shallow curved trajectory.
 *                          The full-size logo remains on the starry black page once the animation completes.
 * Stage 3 (2.00s – 2.65s): The logo, twinkling stars, and black page fade out TOGETHER as one unified layer
 *                          while the Hero section & Navigation cascade in smoothly underneath.
 */
export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onRevealStart,
  onComplete,
}) => {
  const [phase, setPhase] = useState<IntroPhase>('black');
  const [isSkipped, setIsSkipped] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const onRevealStartRef = useRef(onRevealStart);
  const onCompleteRef = useRef(onComplete);
  onRevealStartRef.current = onRevealStart;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    let t1: ReturnType<typeof setTimeout> | null = null;
    let t2: ReturnType<typeof setTimeout> | null = null;
    let t3: ReturnType<typeof setTimeout> | null = null;
    let skipUnmountTimer: ReturnType<typeof setTimeout> | null = null;
    let webAnim: Animation | null = null;

    const startSequence = async () => {
      const mountTime = performance.now();
      // Ensure the SA Monogram alpha mask is ready before Stage 2 begins (cap wait at 260ms max)
      await Promise.race([
        preloadSAMonogram(),
        new Promise((r) => setTimeout(r, 260)),
      ]);
      if (cancelled) return;

      const elapsed = performance.now() - mountTime;
      // Guarantee ~300ms of starry black page (Stage 1) before Stage 2 logo emergence
      const remainingBlackHold = Math.max(40, 300 - elapsed);

      t1 = setTimeout(() => {
        if (cancelled) return;
        setPhase('logo-sequence');

        // Drive hardware-accelerated Web Animations API directly on the centered logo element:
        // Grows from small & faded in the center to 100% clear original size, and stays on the black page
        const el = logoWrapperRef.current;
        if (el && typeof el.animate === 'function') {
          try {
            webAnim = el.animate(
              [
                {
                  opacity: 0,
                  transform: 'scale3d(0.22, 0.22, 1)',
                  filter: 'blur(4px)',
                  offset: 0,
                },
                {
                  opacity: 0.42,
                  transform: 'scale3d(0.35, 0.35, 1)',
                  filter: 'blur(2.8px)',
                  offset: 0.18,
                },
                {
                  opacity: 0.82,
                  transform: 'scale3d(0.74, 0.74, 1)',
                  filter: 'blur(1px)',
                  offset: 0.5,
                },
                {
                  opacity: 1,
                  transform: 'scale3d(1, 1, 1)',
                  filter: 'blur(0px)',
                  offset: 0.76,
                },
                {
                  opacity: 1,
                  transform: 'scale3d(1, 1, 1)',
                  filter: 'blur(0px)',
                  offset: 1,
                },
              ],
              {
                duration: 1700,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'forwards',
              }
            );
          } catch {
            // Fallback to CSS @keyframes saLogoCenterSequence class
          }
        }

        // Stage 3: After the logo has emerged, the curved meteor has streaked across,
        // and the logo has held on the black page (1700ms), fade out everything TOGETHER
        t2 = setTimeout(() => {
          if (cancelled) return;
          setPhase('reveal-hero');
          onRevealStartRef.current?.(false);
        }, 1700);

        // Complete & unmount after the 650ms unified curtain + logo dissolve
        t3 = setTimeout(() => {
          if (cancelled) return;
          setIsRendered(false);
          onCompleteRef.current(false);
        }, 2350);
      }, remainingBlackHold);
    };

    startSequence();

    // Instant bypass if the user scrolls, drags, clicks, or presses navigation keys before intro finishes
    const triggerInstantBypass = () => {
      if (cancelled) return;
      cancelled = true;
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (t3) clearTimeout(t3);
      if (webAnim) {
        try {
          webAnim.cancel();
        } catch {
          // ignore
        }
      }

      setIsSkipped(true);
      setPhase('reveal-hero');
      onRevealStartRef.current?.(true);

      skipUnmountTimer = setTimeout(() => {
        setIsRendered(false);
        onCompleteRef.current(true);
      }, 150);
    };

    // Only bypass on scroll if the page actually moved downward (> 4px), avoiding false positives on initial layout/reset
    const handleScrollBypass = () => {
      if (window.scrollY > 4) {
        triggerInstantBypass();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' ', 'Escape', 'Enter', 'Tab'].includes(
          e.key
        )
      ) {
        triggerInstantBypass();
      }
    };

    // Attach after 180ms grace period so clicking the header logo to replay doesn't self-cancel
    const attachListenersTimer = setTimeout(() => {
      window.addEventListener('wheel', triggerInstantBypass, { passive: true });
      window.addEventListener('touchmove', triggerInstantBypass, { passive: true });
      window.addEventListener('pointerdown', triggerInstantBypass, { passive: true });
      window.addEventListener('mousedown', triggerInstantBypass, { passive: true });
      window.addEventListener('scroll', handleScrollBypass, { passive: true });
      window.addEventListener('keydown', handleKeyDown, { passive: true });
    }, 180);

    return () => {
      cancelled = true;
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (t3) clearTimeout(t3);
      clearTimeout(attachListenersTimer);
      if (skipUnmountTimer) clearTimeout(skipUnmountTimer);
      if (webAnim) {
        try {
          webAnim.cancel();
        } catch {
          // ignore
        }
      }
      window.removeEventListener('wheel', triggerInstantBypass);
      window.removeEventListener('touchmove', triggerInstantBypass);
      window.removeEventListener('pointerdown', triggerInstantBypass);
      window.removeEventListener('mousedown', triggerInstantBypass);
      window.removeEventListener('scroll', handleScrollBypass);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isRendered) return null;

  const logoStateClass = isSkipped
    ? 'sa-intro-logo--skipped'
    : phase === 'black'
    ? 'sa-intro-logo--black'
    : 'sa-intro-logo--sequence';

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[#000000] pointer-events-none select-none overflow-hidden transition-opacity ${
        isSkipped
          ? 'duration-150 ease-out'
          : 'duration-650 ease-[cubic-bezier(0.22,1,0.36,1)]'
      } ${phase === 'reveal-hero' ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden="true"
    >
      {/* Layer 1: Realistic Multi-Magnitude Pinpoint Starfield (all small, varied sizes 0.7px – 2.2px) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {INTRO_STARS.map((star) => (
          <span
            key={star.id}
            className="sa-real-star absolute rounded-full bg-white"
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: star.glow
                  ? `0 0 ${star.glow}px rgba(255, 255, 255, 0.8)`
                  : undefined,
                animationDuration: `${star.duration}ms`,
                animationDelay: `${star.delay}ms`,
                '--star-min-opacity': star.minOpacity,
                '--star-max-opacity': star.maxOpacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Layer 2: Photorealistic Curved Shooting Star (Tapered Ionization Streak + White-Hot Pinpoint Nucleus)
          Uses preserveAspectRatio="xMidYMid meet" in the upper sky so the full left-to-right curve is 100% visible on mobile, tablet, and desktop */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-x-0 top-0 w-full h-[58vh] sm:h-[75vh] md:h-full pointer-events-none"
      >
        <defs>
          {/* Tapered plasma tail gradient: transparent at trailing tip -> soft silver-white -> incandescent white head */}
          <linearGradient id="saMeteorTailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="40%" stopColor="#E2E8F0" stopOpacity="0.18" />
            <stop offset="82%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Soft atmospheric bloom around the meteor head & core */}
          <filter id="saMeteorAtmosphere" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="saNucleusHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <path id="saMeteorCurvePath" d={METEOR_ARC_PATH} />
        </defs>

        {/* Sub-layer A: Fine Ionization Vapor Trail (0.95px thin streak) */}
        <path
          d={METEOR_ARC_PATH}
          fill="none"
          stroke="url(#saMeteorTailGrad)"
          strokeWidth="0.95"
          strokeLinecap="round"
          pathLength={1400}
          className="sa-meteor-trail"
        />

        {/* Sub-layer B: Incandescent Leading Core (1.65px bright front segment for natural head-to-tail taper) */}
        <path
          d={METEOR_ARC_PATH}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.65"
          strokeLinecap="round"
          pathLength={1400}
          filter="url(#saMeteorAtmosphere)"
          className="sa-meteor-core"
        />

        {/* Sub-layer C: White-Hot Pinpoint Meteoroid Nucleus at the exact leading tip */}
        <g className="sa-meteor-nucleus">
          <animateMotion
            dur="1150ms"
            begin="260ms"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.25 0.46 0.45 0.94"
            rotate="auto"
          >
            <mpath href="#saMeteorCurvePath" />
          </animateMotion>
          {/* Soft radial atmospheric ionization halo */}
          <circle cx="0" cy="0" r="5.5" fill="url(#saNucleusHalo)" />
          {/* Sleek aerodynamic plasma envelope stretched along trajectory */}
          <ellipse cx="-1.5" cy="0" rx="4.2" ry="0.9" fill="#FFFFFF" fillOpacity="0.85" />
          {/* Tiny 1.4px white-hot pinpoint core */}
          <circle cx="0" cy="0" r="1.4" fill="#FFFFFF" />
        </g>
      </svg>

      {/* Layer 3: Centered SA Monogram emerging from small/faded to clear real size and holding on black */}
      <div
        ref={logoWrapperRef}
        className={`relative z-10 sa-intro-logo flex items-center justify-center ${logoStateClass}`}
      >
        <div className="scale-[0.78] sm:scale-[0.9] md:scale-100 flex items-center justify-center">
          <SAMonogram size={144} color="#FFFFFF" />
        </div>
      </div>
    </div>
  );
};




