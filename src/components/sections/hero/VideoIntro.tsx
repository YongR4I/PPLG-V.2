'use client';

import { useEffect, useRef, useState } from 'react';

// Video Intro Component
export default function VideoIntro({ onComplete }: { onComplete?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => console.log("Auto-play was prevented", error));
    }
  }, []);

  const handleVideoEnd = () => {
    setIsDone(true);
    if (onComplete) onComplete();
  };

  if (isDone) return null;

  return (
    <div className="absolute inset-0 z-30 bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/Vidios/Vidios.mov"
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
        playsInline
        autoPlay
        // Audio unmuted
      />
    </div>
  );
}
