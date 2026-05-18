'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = isMounted ? format(currentTime, 'HH:mm:ss') : '';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-8 flex items-center justify-between font-inter-display pointer-events-none transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-white'}`}>
        {/* Left Side: Logo/Text replacing IDN Date */}
        <div className={`text-[12px] md:text-[13px] tracking-wide uppercase pointer-events-auto font-medium transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 mix-blend-normal' : 'mix-blend-difference'}`}>
          PPLG V.2
        </div>

        {/* Center: Clock (Hidden when menu is open, hidden on mobile) */}
        <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 text-[13px] tracking-wide tabular-nums pointer-events-auto mix-blend-difference transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {formattedTime}
        </div>

        {/* Right Side: Menu / CLOSE */}
        <div className={`pointer-events-auto cursor-pointer flex items-center transition-all duration-500 ${isMenuOpen ? 'mix-blend-normal' : 'mix-blend-difference'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <div className="text-[12px] md:text-[13px] tracking-wide uppercase font-medium hover:opacity-70 transition-opacity">
              CLOSE
            </div>
          ) : (
            <div className="text-[12px] md:text-[13px] tracking-wide uppercase font-medium group relative overflow-hidden">
              <span className="relative z-10">MENU</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </div>
          )}
        </div>
      </nav>

      {/* Global Footer info (Visible on Home & Menu) */}
      <div className={`fixed bottom-4 left-6 right-6 md:bottom-6 md:left-8 md:right-8 flex items-center justify-between text-white/80 text-[10px] md:text-[11px] font-inter-display tracking-widest uppercase transition-all duration-500 z-50 pointer-events-none mix-blend-difference ${isMenuOpen ? 'mix-blend-normal' : ''}`}>
        {/* Kontainer Instagram diikat lebarnya agar titik putih aman di tengah */}
        <div className="w-1/3">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="pointer-events-auto hover:text-white transition-colors border-b border-white/50 hover:border-white pb-1 inline-block">INSTAGRAM</a>
        </div>

        {/* Bagian tengah dibiarkan kosong agar titik putih dari komponen lain tidak bertabrakan */}
        <div className="w-1/3"></div>

        {/* Kontainer Copyright diikat lebarnya dan rata kanan */}
        <div className="w-1/3 text-right">
          <span className="opacity-80 pb-1 inline-block">BY RAIHAN</span>
        </div>
      </div>

      {/* Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 h-[100dvh] w-full bg-[#0D0D0D] z-40 flex flex-col justify-center px-6 md:px-[10vw] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Items Container - group/menu lets us detect hover on ANY item to dim the others */}
        <div className="flex flex-col w-full max-w-7xl mx-auto group/menu mt-16 md:mt-0">
          {/* Menu Items */}
          <div className="w-full relative">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="group/item flex items-end justify-between py-4 md:py-6 border-b border-white/20 hover:border-white transition-colors duration-500 w-full"
            >
              <span className={`font-inter-display text-[11px] md:text-sm font-medium mb-1.5 md:mb-3 transition-all duration-700 ${isMenuOpen ? 'opacity-100 blur-none delay-[150ms]' : 'opacity-0 blur-sm'} text-white group-hover/menu:opacity-30 group-hover/item:!opacity-100 group-hover/menu:duration-500`}>01</span>
              <span className={`font-canela text-[64px] sm:text-[80px] md:text-[112px] leading-[0.85] uppercase text-right tracking-tight transition-all duration-700 ${isMenuOpen ? 'opacity-100 blur-none translate-y-0 delay-[200ms]' : 'opacity-0 blur-md translate-y-4'} text-white group-hover/menu:opacity-30 group-hover/item:!opacity-100 group-hover/menu:duration-500 md:group-hover/item:-translate-y-2`}>HOME</span>
            </Link>
          </div>

          <div className="w-full relative">
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="group/item flex items-end justify-between py-4 md:py-6 border-b border-white/20 hover:border-white transition-colors duration-500 w-full"
            >
              <span className={`font-inter-display text-[11px] md:text-sm font-medium mb-1.5 md:mb-3 transition-all duration-700 ${isMenuOpen ? 'opacity-100 blur-none delay-[250ms]' : 'opacity-0 blur-sm'} text-white group-hover/menu:opacity-30 group-hover/item:!opacity-100 group-hover/menu:duration-500`}>02</span>
              <span className={`font-canela text-[64px] sm:text-[80px] md:text-[112px] leading-[0.85] uppercase text-right tracking-tight transition-all duration-700 ${isMenuOpen ? 'opacity-100 blur-none translate-y-0 delay-[300ms]' : 'opacity-0 blur-md translate-y-4'} text-white group-hover/menu:opacity-30 group-hover/item:!opacity-100 group-hover/menu:duration-500 md:group-hover/item:-translate-y-2`}>ABOUT</span>
            </Link>
          </div>

          <div className="w-full relative">
            <Link
              href="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className="group/item flex items-end justify-between py-4 md:py-6 border-b border-white/20 hover:border-white transition-colors duration-500 w-full"
            >
              <span className={`font-inter-display text-[11px] md:text-sm font-medium mb-1.5 md:mb-3 transition-all duration-700 ${isMenuOpen ? 'opacity-100 blur-none delay-[350ms]' : 'opacity-0 blur-sm'} text-white group-hover/menu:opacity-30 group-hover/item:!opacity-100 group-hover/menu:duration-500`}>03</span>
              <span className={`font-canela text-[64px] sm:text-[80px] md:text-[112px] leading-[0.85] uppercase text-right tracking-tight transition-all duration-700 ${isMenuOpen ? 'opacity-100 blur-none translate-y-0 delay-[400ms]' : 'opacity-0 blur-md translate-y-4'} text-white group-hover/menu:opacity-30 group-hover/item:!opacity-100 group-hover/menu:duration-500 md:group-hover/item:-translate-y-2`}>GALLERY</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}