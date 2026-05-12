'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const pathname = usePathname();
  const tabs = [
    { name: 'ABOUT', path: '/about' },
    { name: 'PHOTO', path: '/photo' }
  ];
  
  const currentPathName = pathname === '/about' ? 'ABOUT' : pathname === '/photo' ? 'PHOTO' : 'ABOUT'; // Default to ABOUT if home

  const [activeTab, setActiveTab] = useState(currentPathName);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setActiveTab(currentPathName);
  }, [currentPathName]);

  useEffect(() => {
    const updatePill = () => {
      const targetTab = hoveredTab || activeTab;
      const index = tabs.findIndex(t => t.name === targetTab);
      const element = tabRefs.current[index];
      
      if (element) {
        setPillStyle({
          left: element.offsetLeft,
          width: element.offsetWidth,
          opacity: 1
        });
      }
    };

    updatePill();
    const timeoutId = setTimeout(updatePill, 50);
    return () => clearTimeout(timeoutId);
  }, [hoveredTab, activeTab, isHovered, pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = `IDN, ${format(currentTime, 'dd/MM')}`;
  const formattedTime = format(currentTime, 'HH:mm:ss');

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between font-inter-display pointer-events-none">
        {/* Left Side: Country and Date */}
        <div className="text-white text-[13px] tracking-wide uppercase pointer-events-auto mix-blend-difference">
          {formattedDate}
        </div>

        {/* Center: Interactive Menu */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Logo / Studio Button */}
          <Link
            href="/"
            className="bg-[#FF5722] text-white font-medium text-[11px] tracking-widest px-5 h-[34px] flex items-center rounded-full hover:bg-[#F4511E] transition-colors whitespace-nowrap"
          >
            PPLG V.2
          </Link>

          {/* Expandable Menu Button */}
          <div
            className={`relative flex items-center bg-black/50 backdrop-blur-xl border border-white/30 shadow-lg rounded-full h-[34px] overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
              isHovered ? 'w-[160px]' : 'w-[85px]'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Unhovered state: MENU */}
            <div
              className={`absolute left-0 top-0 w-full h-full flex items-center justify-center transition-opacity duration-[800ms] ${
                isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <span className="text-white font-medium text-[11px] tracking-widest whitespace-nowrap">
                MENU
              </span>
            </div>

            {/* Hovered state: Links */}
            <div
              className={`absolute left-0 top-0 h-full flex items-center gap-1 px-1 w-[160px] transition-opacity duration-[1000ms] ${
                isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Animated Background Pill */}
              <div 
                className="absolute h-[calc(100%-8px)] top-[4px] bg-black/80 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"
                style={{ 
                  left: `${pillStyle.left}px`, 
                  width: `${pillStyle.width}px`, 
                  opacity: isHovered ? pillStyle.opacity : 0 
                }}
              />
              
              {tabs.map((tab, i) => (
                <Link
                  key={tab.name}
                  href={tab.path}
                  ref={(el) => {
                    if (el) tabRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setHoveredTab(tab.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={() => setActiveTab(tab.name)}
                  className={`relative z-10 font-medium text-[11px] tracking-widest px-4 h-full flex items-center justify-center rounded-full whitespace-nowrap transition-colors duration-300 ${
                    (hoveredTab || activeTab) === tab.name ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Clock */}
        <div className="text-white text-[13px] tracking-wide tabular-nums pointer-events-auto mix-blend-difference">
          {formattedTime}
        </div>
      </nav>
    </>
  );
}