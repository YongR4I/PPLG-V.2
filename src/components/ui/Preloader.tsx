'use client';

import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    // Start text animation immediately after mount
    setIsMounted(true);

    // After 2.5 seconds, show the "Click to enter" text instead of auto sliding
    const showEnterTimer = setTimeout(() => {
      setShowEnter(true);
    }, 2500);

    return () => {
      clearTimeout(showEnterTimer);
    };
  }, []);

  const handleEnterClick = () => {
    if (!showEnter || slideUp) return; // Cegah klik berulang

    setSlideUp(true);

    // After slide up finishes, hide completely
    setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 1200); // 1200ms disesuaikan dengan duration animasi css
  };

  if (isHidden) return null;

  return (
    <div
      onClick={handleEnterClick}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center text-white transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        slideUp ? '-translate-y-full' : 'translate-y-0'
      } ${showEnter ? 'cursor-pointer' : ''}`}
      style={{
        background: 'linear-gradient(to bottom, #000000 5%, #1E1C1C 100%)'
      }}
    >
      <div className="overflow-hidden">
        <h1
          className={`text-[35px] text-center tracking-wide transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-300 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
          style={{ fontFamily: '"InterDisplay ExtraLight", sans-serif' }}
        >
          Loading Memories...
        </h1>
      </div>

      {/* Teks "Click to enter" yang berkedip pelan */}
      <div
        className={`mt-10 overflow-hidden transition-opacity duration-1000 ${
          showEnter ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-sm tracking-[0.3em] uppercase text-white/50 animate-pulse">
          Click anywhere to enter
        </p>
      </div>
    </div>
  );
}
