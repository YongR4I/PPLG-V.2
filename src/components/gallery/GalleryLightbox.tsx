'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface GalleryLightboxProps {
  photos: string[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

export default function GalleryLightbox({ photos, selectedIndex, setSelectedIndex }: GalleryLightboxProps) {
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/95 backdrop-blur-xl"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-50 p-3 md:p-4 bg-black/20 hover:bg-black/40 rounded-full"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-3 md:p-4 bg-black/20 hover:bg-black/40 rounded-full"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Image */}
          <motion.div
            key={selectedIndex}
            initial={{ scale: 0.95, opacity: 0, x: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.95, opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-[90vw] h-[75vh] md:w-[85vw] md:h-[85vh] max-w-7xl select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedIndex]}
              alt={`Gallery Photo ${selectedIndex + 1}`}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
