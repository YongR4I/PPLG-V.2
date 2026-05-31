'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';

export default function Gallery2025() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photos = [
    '/Image/Gallery/2025/IMG-20250731-WA0086.jpg',
    '/Image/Gallery/2025/IMG-20250817-WA0014.jpg',
    '/Image/Gallery/2025/IMG-20250817-WA0020.jpg',
    '/Image/Gallery/2025/IMG-20250817-WA0023.jpg',
    '/Image/Gallery/2025/IMG-20250821-WA0102.jpg',
    '/Image/Gallery/2025/IMG-20250821-WA0108.jpg',
    '/Image/Gallery/2025/IMG-20250831-WA0034.jpg',
    '/Image/Gallery/2025/IMG-20250915-WA0017.jpg',
    '/Image/Gallery/2025/IMG-20251008-WA0052.jpg',
    '/Image/Gallery/2025/IMG-20251008-WA0053.jpg',
    '/Image/Gallery/2025/IMG-20251021-WA0071.jpg',
    '/Image/Gallery/2025/IMG-20251022-WA0021.jpg',
    '/Image/Gallery/2025/IMG-20251022-WA0032.jpg',
    '/Image/Gallery/2025/IMG-20251125-WA0009.jpg',
    '/Image/Gallery/2025/IMG-20251125-WA0011.jpg',
    '/Image/Gallery/2025/IMG-20251125-WA0024.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0016.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0018.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0030.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0043.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0048.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0055.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0057.jpg',
    '/Image/Gallery/2025/IMG-20260510-WA0098.jpg',
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-16 px-6 md:px-12 lg:px-16 font-ppneue">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
        >
          <h1 className="text-white text-5xl md:text-6xl font-medium tracking-tight">2025</h1>
          <Link href="/gallery" className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
            <span className="transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Back to Galleries</span>
          </Link>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {photos.map((src, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
              }}
              className="relative w-full aspect-[466/312] rounded-[20px] overflow-hidden group bg-white/5 cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={src}
                alt={`2025 Photo ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <GalleryLightbox 
        photos={photos} 
        selectedIndex={selectedIndex} 
        setSelectedIndex={setSelectedIndex} 
      />
    </div>
  );
}
