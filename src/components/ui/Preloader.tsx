'use client';

import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'typing' | 'loading'>('typing');
  const [typedText, setTypedText] = useState('');
  const [textOpacity, setTextOpacity] = useState(1);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Daftar teks yang akan muncul bergantian (tanpa tanda > di dalamnya)
  const textSequence = [
    "Archiving the moments we cannot pause...",
    "Compiling our journey through lines of code...",
    "Calibrating focus..."
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

  // Effect untuk Fake Loading
  useEffect(() => {
    if (phase !== 'loading') return;

    const jumpSteps = [
      { val: 14, delay: 400 },
      { val: 35, delay: 900 },
      { val: 42, delay: 300 },
      { val: 65, delay: 1000 },
      { val: 88, delay: 400 },
      { val: 100, delay: 500 }
    ];

    let timeoutIds: NodeJS.Timeout[] = [];
    let totalDelay = 0;

    jumpSteps.forEach((step, index) => {
      totalDelay += step.delay;
      const id = setTimeout(() => {
        setProgress(step.val);

        if (index === jumpSteps.length - 1) {
          setTimeout(() => {
            setShowButton(true);
          }, 600);
        }
      }, totalDelay);
      timeoutIds.push(id);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [phase]);

  const handleStart = () => {
    setIsDone(true);
    setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 800);
  };

  if (isHidden) return null;

  const boxScale = 0.3 + (progress / 100) * 0.7;
  const opacity = isDone ? 0 : 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center text-white bg-black transition-opacity duration-800 ease-in-out ${phase === 'loading' && showButton ? 'cursor-default' : 'cursor-wait'}`}
      style={{ opacity }}
    >
      {/* BAGIAN TEKS NGETIK */}
      {phase !== 'loading' && (
        <div
          className="font-mono text-[12px] md:text-[14px] text-white/80 transition-opacity duration-500 tracking-wider text-center"
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

          <div className={`relative flex flex-col items-center justify-center transition-opacity duration-700 animate-in fade-in zoom-in-95 duration-1000 ${showButton ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-[300px] h-[180px] transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                style={{ transform: `scale(${boxScale})` }}
              >
                <div className="absolute top-0 left-0 w-6 h-6 border-t-[1px] border-l-[1px] border-white/60"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-[1px] border-r-[1px] border-white/60"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1px] border-l-[1px] border-white/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1px] border-r-[1px] border-white/60"></div>
              </div>

              <div className="relative z-10 font-mono text-[16px] md:text-[20px] tracking-widest text-white">
                {progress}
              </div>
            </div>
          </div>

          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/80 transition-opacity duration-700 animate-in fade-in slide-in-from-bottom-2 duration-1000 ${showButton ? 'opacity-0' : 'opacity-100'}`}>
            00:00:{progress.toString().padStart(2, '0')}
          </div>
        </>
      )}
    </div>
  );
}