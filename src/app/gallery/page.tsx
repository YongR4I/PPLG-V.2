'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const galleries = [
  { id: '2024', label: '2024', image: '/Image/Photo Slider/Dekstop/Dekstop 1.png' },
  { id: '2025', label: '2025', image: '/Image/Photo Slider/Dekstop/Desktop 2.png' },
  { id: '2026', label: '2026', image: '/Image/Photo Slider/Dekstop/Dekstop 3.png' },
  { id: 'moments', label: 'Moments', image: '/Image/Photo Slider/Dekstop/Desktop 4.png' }
];

export default function Gallery() {
  const [activeGallery, setActiveGallery] = useState(galleries[0].id);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none font-ppneue">
      
      {/* Background Images with AnimatePresence for crossfade & zoom out */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeGallery}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src={galleries.find(g => g.id === activeGallery)?.image || galleries[0].image}
            alt={`${activeGallery} Gallery Background`}
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

      {/* Thin Horizontal Line across the screen, placed ABOVE the menu items */}
      <div className="absolute top-[35%] left-0 w-full h-[1px] bg-white/20 z-10 pointer-events-none hidden md:block"></div>
      
      {/* Galleries Label aligned just under the line */}
      <div className="absolute top-[35%] left-4 md:left-6 lg:left-8 pt-4 z-20 hidden md:block pointer-events-none">
        <h3 className="text-white text-[15px] font-medium tracking-wide font-sans">Galleries</h3>
      </div>

      {/* Right Side: Menu Items (Left aligned on mobile) */}
      <div className="absolute left-6 md:left-auto md:right-[15%] lg:right-[20%] xl:right-[25%] top-[35%] pt-8 flex flex-col items-start justify-start z-20">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="relative cursor-pointer py-1 md:py-2 group"
            onMouseEnter={() => setActiveGallery(gallery.id)}
          >
            <motion.h2
              animate={{
                color: activeGallery === gallery.id ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)'
              }}
              transition={{ duration: 0.15 }}
              className="text-[40px] md:text-[60px] font-inter-bold font-bold leading-[1] tracking-tighter text-left transition-colors duration-150 group-hover:text-white"
            >
              {gallery.label}
            </motion.h2>
          </div>
        ))}
      </div>
      
    </div>
  );
}
