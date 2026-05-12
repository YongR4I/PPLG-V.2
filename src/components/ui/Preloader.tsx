'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Start text animation immediately after mount
    setIsMounted(true);

    // After 2.5 seconds, start the slide up animation
    const slideTimer = setTimeout(() => {
      setSlideUp(true);
    }, 2500);

    // After slide up finishes, hide completely
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 3700);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center text-white transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        slideUp ? '-translate-y-full' : 'translate-y-0'
      }`}
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
          Software& Gim Development
        </h1>
      </div>
    </div>
  );
}
