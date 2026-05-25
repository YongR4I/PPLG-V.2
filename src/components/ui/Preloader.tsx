'use client';

import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'typing' | 'loading'>('typing');
  const [typedText, setTypedText] = useState('');
  const [textOpacity, setTextOpacity] = useState(1);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const [showButton, setShowButton] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Daftar teks yang akan muncul bergantian (tanpa tanda > di dalamnya)
  const textSequence = [
    "PPLG v.2 — Memories,",
    "Satu seragam, sejuta cerita, dan mimpi-mimpi yang pernah kita bagi.",
    "Sengaja disimpan di sini, agar tidak pernah hilang dimakan waktu.",
    "Welcome back, let’s look back and cherish our memories together."
  ];

  // Effect untuk Animasi Mengetik Bergantian
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeString = (str: string, onFinish: () => void) => {
      let i = 0;
      setTypedText('');
      setTextOpacity(1);

      const typeChar = () => {
        if (i < str.length) {
          setTypedText(str.slice(0, i + 1));
          i++;
          timeoutId = setTimeout(typeChar, 30 + Math.random() * 40); // Kecepatan ngetik
        } else {
          // Tunggu sebentar agar bisa dibaca setelah selesai diketik
          timeoutId = setTimeout(onFinish, 1200);
        }
      };
      typeChar();
    };

    if (phase === 'typing') {
      if (currentTextIndex < textSequence.length) {
        // Mulai ngetik teks saat ini
        typeString(textSequence[currentTextIndex], () => {
          // Setelah selesai ngetik dan nunggu, fade out
          setTextOpacity(0);

          // Tunggu fade out selesai, lalu lanjut ke teks berikutnya
          timeoutId = setTimeout(() => {
            setCurrentTextIndex(prev => prev + 1);
          }, 600); // 600ms harus sinkron dengan durasi transition-opacity
        });
      } else {
        // Jika semua teks di array sudah selesai
        setPhase('loading');
      }
    }

    return () => clearTimeout(timeoutId);
  }, [phase, currentTextIndex]);

  // Effect untuk menampilkan tombol setelah ngetik selesai
  useEffect(() => {
    if (phase !== 'loading') return;

    // Lewati animasi angka agar lebih cepat, langsung munculkan tombol ENTER
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [phase]);

  const handleStart = () => {
    setIsDone(true);
    setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 800);
  };

  if (isHidden) return null;

  const boxScale = 1; // Animasi angka dihapus, langsung gunakan skala penuh
  const opacity = isDone ? 0 : 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center text-white bg-black transition-opacity duration-800 ease-in-out ${phase === 'loading' && showButton ? 'cursor-default' : 'cursor-wait'}`}
      style={{ opacity }}
    >
      {/* BAGIAN TEKS NGETIK */}
      {phase !== 'loading' && (
        <div
          className={`font-mono text-[12px] md:text-[14px] text-white/80 transition-opacity duration-500 tracking-wider text-center ${currentTextIndex === 0 ? 'font-semibold' : ''}`}
          style={{ opacity: textOpacity }}
        >
          {currentTextIndex === 0 && <span className="text-white/50 mr-2">{'>'}</span>}
          {typedText}
          <span className="animate-pulse font-bold">_</span>
        </div>
      )}

      {/* BAGIAN UI PRELOADER KAMERA */}
      {phase === 'loading' && (
        <>
          <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-1000 ${showButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={handleStart}
              className="group relative px-10 py-5 text-white/60 hover:text-white transition-all duration-700 uppercase tracking-[0.6em] text-[11px] md:text-[12px] font-mono flex items-center justify-center ml-[0.3em]"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-[1px] border-l-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-[1px] border-r-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1px] border-l-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1px] border-r-[1px] border-white/30 group-hover:border-white group-hover:w-4 group-hover:h-4 transition-all duration-500"></div>

              <span className="relative z-10">ENTER</span>
            </button>
          </div>


        </>
      )}
    </div>
  );
}