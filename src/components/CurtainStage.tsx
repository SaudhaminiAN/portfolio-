import React, { useEffect, useRef, useState } from 'react';

interface CurtainStageProps {
  id: string;
  zIndex: number;
  theme: 'light' | 'dark';
  isFirst?: boolean;
  isLast?: boolean;
  isRevealed?: boolean;
  stageLabel?: string;
  children: React.ReactNode;
}

/**
 * Universal Curtain Stage container:
 * 1. Ensures every section is 100% visible from top to bottom before locking:
 *    - If a section fits within `calc(100vh - 4rem)`, it pins cleanly at `top: 64px` (below navbar).
 *    - If a section's content is taller than the viewport on smaller screens, it scrolls naturally
 *      until its bottom edge reaches the bottom of the viewport (`top = innerHeight - sectionHeight`)
 *      before pinning—so no content is ever cut off or hidden early.
 * 2. Adds a post-completion scroll hold (`35vh`) after each section so the next curtain only begins
 *    rising AFTER the current section has been completely viewed.
 * 3. Tracks viewport intersection (`data-stage-visible`) to drive smooth architectural editorial text animations.
 */
export const CurtainStage: React.FC<CurtainStageProps> = ({
  id,
  zIndex,
  theme,
  isFirst = false,
  isLast = false,
  isRevealed = true,
  children,
}) => {
  const isDark = theme === 'dark';
  const stageRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState<number>(64);
  const [hasEnteredViewport, setHasEnteredViewport] = useState<boolean>(isFirst);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateStickyOffset = () => {
      const headerHeight = 64; // 4rem fixed navigation bar
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const sectionHeight = el.offsetHeight;
      const availableHeight = viewportHeight - headerHeight;

      if (sectionHeight > availableHeight) {
        // Allow the entire section to scroll until its bottom edge is fully visible
        setStickyTop(viewportHeight - sectionHeight);
      } else {
        // Pin directly beneath the 64px navbar
        setStickyTop(headerHeight);
      }
    };

    updateStickyOffset();

    const resizeObserver = new ResizeObserver(() => {
      updateStickyOffset();
    });
    resizeObserver.observe(el);
    window.addEventListener('resize', updateStickyOffset, { passive: true });
    window.visualViewport?.addEventListener('resize', updateStickyOffset, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateStickyOffset);
      window.visualViewport?.removeEventListener('resize', updateStickyOffset);
    };
  }, []);

  useEffect(() => {
    if (isFirst) return;
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredViewport(true);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isFirst]);

  const stageVisible = isFirst ? isRevealed : hasEnteredViewport;

  return (
    <>
      {/* Non-sticky flow marker for accurate scroll detection & anchor navigation */}
      <div
        id={`${id}-anchor`}
        data-curtain-id={id}
        data-curtain-theme={theme}
        className="w-full h-0 scroll-mt-16 pointer-events-none"
      />

      {/* Sticky Curtain Layer */}
      <div
        ref={stageRef}
        id={id}
        data-stage-visible={stageVisible ? 'true' : 'false'}
        style={{ zIndex, top: `${stickyTop}px` }}
        className={`sticky w-full min-h-[calc(100dvh-4rem)] flex flex-col justify-between transition-colors duration-500 ${
          isDark ? 'bg-[#000000] text-white' : 'bg-white text-[#111111]'
        } ${
          !isFirst
            ? isDark
              ? 'shadow-[0_-50px_120px_rgba(0,0,0,0.9)] border-t border-white/20'
              : 'shadow-[0_-50px_120px_rgba(0,0,0,0.6)] border-t border-[#EAEAEA]'
            : ''
        }`}
      >
        {children}
      </div>

      {/* Completion Hold Runway: Keeps the completed section on screen before the next curtain rises */}
      {!isLast && (
        <div
          aria-hidden="true"
          style={{ zIndex: Math.max(1, zIndex - 1) }}
          className={`relative w-full h-[20vh] sm:h-[28vh] lg:h-[35vh] -mt-px pointer-events-none select-none ${
            isDark ? 'bg-[#000000]' : 'bg-white'
          }`}
        />
      )}
    </>
  );
};
