'use client';

import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Simulasi loading tidak berurutan (Fake Loading Internet)
    const jumpSteps = [
      { val: 14, delay: 400 },
      { val: 35, delay: 900 }, // Nge-lag / jeda agak lama di 35
      { val: 42, delay: 300 },
      { val: 65, delay: 1000 }, // Nge-lag lagi di 65
      { val: 88, delay: 400 },
      { val: 100, delay: 500 }  // Sampai 100
    ];

    let timeoutIds: NodeJS.Timeout[] = [];
    let totalDelay = 0;

    jumpSteps.forEach((step, index) => {
      totalDelay += step.delay;
      const id = setTimeout(() => {
        setProgress(step.val);

        // Jika sudah mencapai 100, tampilkan tombol alih-alih langsung masuk
        if (index === jumpSteps.length - 1) {
          setTimeout(() => {
            setShowButton(true);
          }, 600); // Tahan sebentar di angka 100 sebelum menampilkan tombol
        }
      }, totalDelay);
      timeoutIds.push(id);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  const handleStart = () => {
    setIsDone(true);
    setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 800); // Tunggu animasi fade out selesai
  };

  if (isHidden) return null;

  // Kalkulasi ukuran kotak berdasarkan progress (Mulai dari SANGAT kecil lalu membesar)
  const boxScale = 0.3 + (progress / 100) * 0.7;
  const opacity = isDone ? 0 : 1; // Fade out saat selesai

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center text-white bg-black transition-opacity duration-800 ease-in-out ${showButton ? 'cursor-default' : 'cursor-wait'}`}
      style={{ opacity }}
    >
      {/* Tombol Ready to Start (Muncul setelah 100%) */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-1000 ${showButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={handleStart}
          className="group relative px-10 py-5 text-white/60 hover:text-white transition-all duration-700 uppercase tracking-[0.6em] text-[11px] md:text-[12px] font-mono flex items-center justify-center ml-[0.3em]"
        >
          {/* Sudut-sudut ala kamera yang merespons hover */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-[1px] border-l-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-[1px] border-r-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1px] border-l-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1px] border-r-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>

          <span className="relative z-10">ENTER</span>
        </button>
      </div>

      {/* Bagian Animasi Kamera (Memudar saat tombol muncul) */}
      <div className={`relative flex flex-col items-center justify-center transition-opacity duration-700 ${showButton ? 'opacity-0' : 'opacity-100'}`}>
        {/* Container untuk Pusatkan Item */}
        <div className="relative flex items-center justify-center">
          {/* Container Kotak Focus */}
          <div
            className="absolute w-[300px] h-[180px] transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
            style={{ transform: `scale(${boxScale})` }}
          >
            {/* Sudut Kiri Atas */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-[1px] border-l-[1px] border-white/60"></div>
            {/* Sudut Kanan Atas */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t-[1px] border-r-[1px] border-white/60"></div>
            {/* Sudut Kiri Bawah */}
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1px] border-l-[1px] border-white/60"></div>
            {/* Sudut Kanan Bawah */}
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1px] border-r-[1px] border-white/60"></div>
          </div>

          {/* Angka Progress */}
          <div className="relative z-10 font-mono text-[16px] md:text-[20px] tracking-widest text-white">
            {progress}
          </div>
        </div>
      </div>

      {/* Waktu/Teks di bagian bawah (Ikut memudar saat tombol muncul) */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/80 transition-opacity duration-700 ${showButton ? 'opacity-0' : 'opacity-100'}`}>
        00:00:{progress.toString().padStart(2, '0')}
      </div>
    </div>
  );
}
