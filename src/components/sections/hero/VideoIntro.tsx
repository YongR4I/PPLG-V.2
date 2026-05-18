'use client';

import { useEffect, useRef, useState } from 'react';

// Video Intro Component
export default function VideoIntro({ onComplete }: { onComplete?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0); // State untuk progress bar
  const [currentTime, setCurrentTime] = useState(0); // State untuk waktu saat ini
  const [isPlaying, setIsPlaying] = useState(true); // State play/pause
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // State untuk posisi mouse
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => console.log("Auto-play was prevented", error));

      // Update progress bar seiring berjalannya video
      const handleTimeUpdate = () => {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
        setCurrentTime(video.currentTime);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      // Bersihkan event listener saat komponen unmount
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  const handleVideoEnd = () => {
    setIsFading(true); // Mulai transisi fade out
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 1000); // Tunggu 1 detik sampai video benar-benar hitam, baru ganti komponen
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Format waktu kecil (00:00:44)
  const formatSmallTime = (time: number) => {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  // Format waktu besar (01:06)
  const formatHugeTime = (time: number) => {
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isDone) return null;

  return (
    <div
      className={`absolute inset-0 z-30 bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'} cursor-none`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src="/Vidios/Vidios.mov"
        className={`w-full h-full object-contain md:object-cover transition-opacity duration-500 ${!isPlaying ? 'opacity-50' : 'opacity-100'}`}
        onEnded={handleVideoEnd}
        playsInline
        autoPlay
        // Audio unmuted
      />

      {/* Progress Bar Video */}
      <div className="absolute bottom-[48px] md:bottom-[56px] left-6 right-6 md:left-8 md:right-8 h-[2px] bg-white/20 z-40 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-white transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Custom Mouse Cursor (Teks Kecil) */}
      <div
        className={`fixed z-50 pointer-events-none mix-blend-difference text-white text-center font-inter-display tracking-widest transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          fontSize: '11px',
          lineHeight: '1.2'
        }}
      >
        <div>{isPlaying ? 'PAUSE' : 'PLAY'}</div>
        <div>{formatSmallTime(currentTime)}</div>
      </div>

      {/* Teks Detik Besar di Tengah (Muncul saat Pause) */}
      <div className={`absolute inset-0 z-40 flex items-center justify-center pointer-events-none transition-all duration-500 ease-out ${isPlaying ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="text-white font-inter-display text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-medium leading-none tracking-tighter mix-blend-difference">
          {formatHugeTime(currentTime)}
        </div>
      </div>
    </div>
  );
}
