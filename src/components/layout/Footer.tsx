'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Hide on home page
  if (pathname === '/') return null;

  return (
    <div className={pathname === '/about' ? 'bg-white' : ''}>
      <footer className="relative z-20 bg-white text-black pt-16 pb-8 px-6 md:px-12 lg:px-16 w-full select-none font-sans rounded-t-[48px]">
        <div className="max-w-[1400px] mx-auto flex flex-col">

          {/* Top Metadata Row: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 pb-12 border-b border-black/10">

            {/* Left Column: Build By */}
            <div className="flex flex-col space-y-1.5 text-[13px] md:text-[14px]">
              <span className="font-semibold text-black/40 uppercase tracking-wider mb-0.5">Build By :</span>
              <span className="font-medium text-black">Raihan Daffa : Full-Stack Developer</span>
            </div>

            {/* Center Column: Contact/Metadata */}
            <div className="flex flex-col space-y-1 text-[13px] md:text-[14px] md:pl-12">
              <span className="font-semibold text-black/40 uppercase tracking-wider mb-1">Contact :</span>
              <a href="mailto:hello@pplgv2.com" className="hover:opacity-75 transition-opacity font-medium text-black">
                hello@pplgv2.com
              </a>
              <span className="text-black/80 font-medium">+62 85694917839</span>
              <span className="text-black/60 font-medium">SMKN 1 Ciomas</span>
              <span className="text-black/60 font-medium">16610 Bogor, Indonesia</span>
            </div>

            {/* Right Column: Socials */}
            <div className="flex flex-col space-y-1 text-[13px] md:text-[14px] md:items-end">
              <span className="font-semibold text-black/40 uppercase tracking-wider mb-1 md:text-right">Socials :</span>
              <a href="https://instagram.com/raihandaffaa.dev" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity font-medium text-black">
                Instagram
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity font-medium text-black">
                GitHub
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity font-medium text-black">
                Spotify
              </a>
            </div>
          </div>

          {/* Bottom Row: Huge PPLG V.2 Gradient Text */}
          <div className="relative w-full flex justify-center pt-8 md:pt-12 overflow-hidden">
            <h2 className="text-[13vw] sm:text-[16vw] md:text-[200px] lg:text-[250px] font-switzer font-medium tracking-tighter leading-none select-none text-center bg-gradient-to-b from-[#D9D9D9] to-black bg-clip-text text-transparent">
              PPLG V.2
            </h2>
          </div>

          {/* Copyright notice */}
          <div className="flex justify-between items-center text-[10px] md:text-[11px] font-medium text-black/40 uppercase tracking-widest pt-8 border-t border-black/5 mt-4">
            <span>&copy; {new Date().getFullYear()} Kelas PPLG</span>
            <span>Designed & Built by Raihan</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
