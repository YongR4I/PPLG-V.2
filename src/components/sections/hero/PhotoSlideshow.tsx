'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const IMAGES = [
  {
    mobile: '/Image/Photo Slider/Mobile/Mobile 1.png',
    desktop: '/Image/Photo Slider/Dekstop/Dekstop 1.png'
  },
  {
    mobile: '/Image/Photo Slider/Mobile/Mobile 2.png',
    desktop: '/Image/Photo Slider/Dekstop/Desktop 2.png'
  },
  {
    mobile: '/Image/Photo Slider/Mobile/Mobile 3.png',
    desktop: '/Image/Photo Slider/Dekstop/Dekstop 3.png'
  },
  {
    mobile: '/Image/Photo Slider/Mobile/Mobile 4.png',
    desktop: '/Image/Photo Slider/Dekstop/Desktop 4.png'
  },
  {
    mobile: '/Image/Photo Slider/Mobile/Mobile 5.png',
    desktop: '/Image/Photo Slider/Dekstop/Dekstop 5.png'
  }
];

export default function PhotoSlideshow({ isVisible }: { isVisible: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // Ganti gambar setiap 4 detik

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div 
      className={`absolute inset-0 z-20 bg-black transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Container untuk semua gambar, opacity dan blur menyesuaikan index */}
      {IMAGES.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentIndex
              ? 'opacity-100 blur-none scale-100 z-10'
              : 'opacity-0 blur-md scale-105 z-0'
          }`}
        >
          {/* Gambar khusus Mobile (disembunyikan di ukuran medium ke atas) */}
          <Image
            src={`${src.mobile}?v=2`}
            alt={`Slideshow Mobile ${index + 1}`}
            fill
            className="object-cover md:hidden"
            priority={index === 0}
            unoptimized={true}
          />

          {/* Gambar khusus Desktop (disembunyikan di ukuran mobile, muncul di medium ke atas) */}
          <Image
            src={`${src.desktop}?v=2`}
            alt={`Slideshow Desktop ${index + 1}`}
            fill
            className="hidden md:block object-cover"
            priority={index === 0}
            unoptimized={true}
          />
        </div>
      ))}

      {/* Overlay hitam transparan agar text nantinya mudah dibaca */}
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* Indikator Titik (Pagination Dots) - Disejajarkan dengan footer */}
      <div className="absolute bottom-[22px] md:bottom-[30px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 pointer-events-auto mix-blend-difference">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
