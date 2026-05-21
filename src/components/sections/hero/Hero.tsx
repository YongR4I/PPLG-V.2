'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/ui/Preloader';
import VideoIntro from './VideoIntro';
import PhotoSlideshow from './PhotoSlideshow';
import HeroContent from './HeroContent';
import PlayPauseButton from '@/components/ui/PlayPauseButton';

// Komponen Utama Pembungkus Hero Section
export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [showVideo, setShowVideo] = useState(false); // Atur state perpindahan preloader -> video -> foto
  const [videoComplete, setVideoComplete] = useState(false);

  useEffect(() => {
    // Mengecek saat halaman pertama kali dimuat di browser
    const hasSeenIntro = sessionStorage.getItem('introPlayed');
    if (hasSeenIntro) {
      setShowPreloader(false); // Matikan preloader
      setVideoComplete(true); // Langsung masuk ke mode foto
    }
  }, []);

  const handlePreloaderComplete = () => {
    // Karena kalau sudah pernah nonton preloader akan dimatikan di useEffect,
    // yang masuk ke sini pasti pengunjung baru di sesi ini.
    setShowPreloader(false);
    setShowVideo(true); // Mainkan video intro
  };

  const handleVideoComplete = () => {
    // Simpan memori di browser bahwa video sudah selesai diputar
    sessionStorage.setItem('introPlayed', 'true');
    setVideoComplete(true);
    setShowVideo(false);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/*
        Urutan Z-Index (dari bawah ke atas):
        2. HeroContent (z-40) -> Muncul setelah video selesai
      */}

      <PhotoSlideshow isVisible={videoComplete} />
      {showVideo && <VideoIntro onComplete={handleVideoComplete} />}
      {/* <HeroContent /> */}
      {/* <PlayPauseButton /> */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Bottom Left: Instagram (Removed from here, managed in layout/navbar) */}

      {/* Bottom Right: Created By (Removed from here, managed in layout/navbar) */}
    </section>
  );
}
