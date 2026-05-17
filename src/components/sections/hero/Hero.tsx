'use client';

import { useState } from 'react';
import Image from 'next/image';
import Preloader from '@/components/ui/Preloader';
import VideoIntro from './VideoIntro';
import PhotoSlideshow from './PhotoSlideshow';
import HeroContent from './HeroContent';
import PlayPauseButton from '@/components/ui/PlayPauseButton';

// Komponen Utama Pembungkus Hero Section
export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false); // Atur state perpindahan preloader -> video -> foto

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/*
        Urutan Z-Index (dari bawah ke atas):
        1. Background Image (z-10)
        2. HeroContent (z-40) -> Muncul setelah video selesai
      */}

      {/* Static Background Image */}
      <div className="absolute inset-0 z-10">
        <Image 
          src="/Image/HeroClass.png" 
          alt="Hero Background" 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* <PhotoSlideshow /> */}
      {/* <VideoIntro /> */}
      {/* <HeroContent /> */}
      {/* <PlayPauseButton /> */}
      <Preloader />

      {/* Bottom Left: Instagram (Removed from here, managed in layout/navbar) */}

      {/* Bottom Right: Created By (Removed from here, managed in layout/navbar) */}
    </section>
  );
}
