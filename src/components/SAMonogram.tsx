import React, { useEffect, useState } from 'react';

interface SAMonogramProps {
  className?: string;
  color?: string;
  size?: number;
}

const LOGO_SRC = '/assets/aistudio/Monogram_S_and_A_with_Orbital_Sparkle_86e905c5.png';

// Module-level cache so luminance-to-alpha + auto-crop runs only once per session
let cachedAlphaMaskUrl: string | null = null;
let processingPromise: Promise<string> | null = null;

export function preloadSAMonogram(src: string = LOGO_SRC): Promise<string> {
  if (cachedAlphaMaskUrl) {
    return Promise.resolve(cachedAlphaMaskUrl);
  }
  if (processingPromise) {
    return processingPromise;
  }

  processingPromise = new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(src);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      try {
        const rawW = img.naturalWidth || img.width || 512;
        const rawH = img.naturalHeight || img.height || 512;
        // Cap working resolution to 512px max dimension so pixel processing takes < 3ms on the main thread
        const maxWorkDim = 512;
        const scale = Math.min(1, maxWorkDim / Math.max(rawW, rawH));
        const w = Math.max(1, Math.round(rawW * scale));
        const h = Math.max(1, Math.round(rawH * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          cachedAlphaMaskUrl = src;
          resolve(src);
          return;
        }

        ctx.drawImage(img, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        let minX = w;
        let minY = h;
        let maxX = 0;
        let maxY = 0;

        // Convert black background to true alpha transparency & find tight artwork bounds
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const lum = (r + g + b) / 3;

            // Smooth levels curve: strip near-black (< 22), preserve crisp anti-aliased white strokes
            const alpha = Math.min(
              255,
              Math.max(0, Math.round(((lum - 22) / (230 - 22)) * 255))
            );

            data[idx] = 255;
            data[idx + 1] = 255;
            data[idx + 2] = 255;
            data[idx + 3] = alpha;

            if (alpha > 32) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // Crop dead black margins into a balanced square around the SA artwork
        if (maxX > minX && maxY > minY) {
          const contentW = maxX - minX + 1;
          const contentH = maxY - minY + 1;
          const maxDim = Math.max(contentW, contentH);
          const pad = Math.round(maxDim * 0.04);
          const squareSize = maxDim + pad * 2;

          const outCanvas = document.createElement('canvas');
          outCanvas.width = squareSize;
          outCanvas.height = squareSize;
          const outCtx = outCanvas.getContext('2d');

          if (outCtx) {
            const offsetX = Math.round((squareSize - contentW) / 2);
            const offsetY = Math.round((squareSize - contentH) / 2);
            outCtx.drawImage(
              canvas,
              minX,
              minY,
              contentW,
              contentH,
              offsetX,
              offsetY,
              contentW,
              contentH
            );
            cachedAlphaMaskUrl = outCanvas.toDataURL('image/png');
            resolve(cachedAlphaMaskUrl);
            return;
          }
        }

        cachedAlphaMaskUrl = canvas.toDataURL('image/png');
        resolve(cachedAlphaMaskUrl);
      } catch {
        cachedAlphaMaskUrl = src;
        resolve(src);
      }
    };
    img.onerror = () => {
      cachedAlphaMaskUrl = src;
      resolve(src);
    };
    img.src = src;
  });

  return processingPromise;
}

// Start preloading immediately when module loads so the mask is ready for CinematicIntro
preloadSAMonogram();

/**
 * Official SA Monogram with Orbital Swoosh, Analytics Bars & Sparkle Star.
 * Automatically renders with a true transparent background and adapts to any color theme.
 */
export const SAMonogram: React.FC<SAMonogramProps> = ({
  className = '',
  color = '#FFFFFF',
  size = 72,
}) => {
  const [maskUrl, setMaskUrl] = useState<string | null>(cachedAlphaMaskUrl);

  useEffect(() => {
    let active = true;
    if (!cachedAlphaMaskUrl) {
      preloadSAMonogram(LOGO_SRC).then((url) => {
        if (active) setMaskUrl(url);
      });
    } else if (maskUrl !== cachedAlphaMaskUrl) {
      setMaskUrl(cachedAlphaMaskUrl);
    }
    return () => {
      active = false;
    };
  }, [maskUrl]);

  const isLightColor =
    color.toLowerCase() === '#ffffff' ||
    color.toLowerCase() === '#fff' ||
    color.toLowerCase() === 'white';

  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center bg-transparent overflow-hidden shrink-0 select-none ${className}`}
      aria-label="SA Monogram Logo"
    >
      {maskUrl ? (
        <div
          className="w-full h-full transition-colors duration-300"
          style={{
            backgroundColor: color,
            WebkitMaskImage: `url(${maskUrl})`,
            maskImage: `url(${maskUrl})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
      ) : (
        <img
          src={LOGO_SRC}
          alt="SA Monogram Logo"
          className={`w-full h-full object-contain scale-[1.72] ${
            isLightColor ? '' : 'invert'
          }`}
          draggable={false}
        />
      )}
    </div>
  );
};
