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
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between font-inter-display pointer-events-none">
        {/* Left Side: Logo/Text replacing IDN Date */}
        <div className="text-white text-[13px] tracking-wide uppercase pointer-events-auto mix-blend-difference font-medium">
          PPLG V.2
        </div>

        {/* Center: Clock */}
        <div className="absolute left-1/2 -translate-x-1/2 text-white text-[13px] tracking-wide tabular-nums pointer-events-auto mix-blend-difference">
          {formattedTime}
        </div>

        {/* Right Side: Hamburger Menu */}
        <div className="pointer-events-auto mix-blend-difference cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="flex flex-col justify-center items-end w-8 h-8 gap-1.5">
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`}></span>
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`}></span>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-white font-inter-display text-3xl tracking-[0.2em]">
          <Link 
            href="/" 
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-300 hover:text-[#FF5722] ${pathname === '/' ? 'text-[#FF5722]' : 'text-white'}`}
          >
            HOME
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-300 hover:text-[#FF5722] ${pathname === '/about' ? 'text-[#FF5722]' : 'text-white'}`}
          >
            ABOUT
          </Link>
          <Link 
            href="/photo" 
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-300 hover:text-[#FF5722] ${pathname === '/photo' ? 'text-[#FF5722]' : 'text-white'}`}
          >
            PHOTO
          </Link>
        </div>
      </div>
    </>
  );
}