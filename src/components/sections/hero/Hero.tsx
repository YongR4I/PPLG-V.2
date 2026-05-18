'use client';

import { useState } from 'react';
import Preloader from '@/components/ui/Preloader';
import VideoIntro from './VideoIntro';
import PhotoSlideshow from './PhotoSlideshow';
import HeroContent from './HeroContent';
import PlayPauseButton from '@/components/ui/PlayPauseButton';

// Komponen Utama Pembungkus Hero Section
export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false); // Atur state perpindahan preloader -> video -> foto
  const [videoComplete, setVideoComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setShowVideo(true);
  };

  const handleVideoComplete = () => {
    setVideoComplete(true);
    setShowVideo(false);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/*
        Urutan Z-Index (dari bawah ke atas):
        2. HeroContent (z-40) -> Muncul setelah video selesai
      */}

      {/* <PhotoSlideshow /> */}
      {showVideo && <VideoIntro onComplete={handleVideoComplete} />}
      {/* <HeroContent /> */}
      {/* <PlayPauseButton /> */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Bottom Left: Instagram (Removed from here, managed in layout/navbar) */}

      {/* Bottom Right: Created By (Removed from here, managed in layout/navbar) */}
    </section>
  );
}
