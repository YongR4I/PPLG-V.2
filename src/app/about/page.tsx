'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import InfoColumns from '../../components/InfoColumns';

const members = [
  { name: "Adilatunnisa", role: "Data Analyst", img: "/Image/About/Member/1920.jpg" },
  { name: "Adrian Maulana Yusuf", role: "Frontend Developer", img: "/Image/About/Member/1921.jpg" },
  { name: "Ahmad Rizky", role: "Backend Engineer", img: "/Image/About/Member/1922.jpg" },
  { name: "Alexa Alkahfi Hanan", role: "Frontend Developer", img: "/Image/About/Member/1923.jpg" },
  { name: "Asril Maulana", role: "Frontend Developer", img: "/Image/About/Member/1924.jpg" },
  { name: "Aura Aqueeni Ilmira", role: "Backend Developer", img: "/Image/About/Member/1925.jpg" },
  { name: "Auza Alfarizi Ramadhan", role: "Full Stack Web Developer & UI/UX Designer", img: "/Image/About/Member/1926.jpg" },
  { name: "Azka Mortaza ", role: "Front-End Developer", img: "/Image/About/Member/1954.jpg" },
  { name: "Dharma Ksatria Gunawan", role: "UI/UX Designer ", img: "/Image/About/Member/1927.jpg" },
  { name: "Diva Ayu Fatmawati", role: "Backend Engineer", img: "/Image/About/Member/1928.jpg" },
  { name: "Divinka Azani Rachdian", role: "Full Stack Developer", img: "/Image/About/Member/1929.jpg" },
  { name: "Hexsa Arizky Sulaiman", role: "Full-Stack Developer", img: "/Image/About/Member/1930.jpg" },
  { name: "Iman Andhika", role: "Frontend Developer", img: "/Image/About/Member/1931.jpg" },
  { name: "Jayshifa Banyuwana", role: "Full Stack Developer", img: "/Image/About/Member/1932.jpg" },
  { name: "Jesselin Roniar", role: "System Analyst", img: "/Image/About/Member/1933.jpg" },
  { name: "Mahardika Rofiq", role: "Backend Developer", img: "/Image/About/Member/1934.jpg" },
  { name: "Malika Thabina Hidayat", role: "Data Analyst", img: "/Image/About/Member/1935.jpg" },
  { name: "Melani Putri", role: "UI/UX Designer", img: "/Image/About/Member/1936.jpg" },
  { name: "Muhamad Abdul Rohman", role: "Backend Developer", img: "/Image/About/Member/1937.jpg" },
  { name: "Muhammad Alfathdry Rausyan", role: "Frontend Developer", img: "/Image/About/Member/1955.jpg" },
  { name: "Muhammad Azmi Ashshidiq Ramadhan", role: "Full-Stack Developer", img: "/Image/About/Member/1939.jpg" },
  { name: "Muhammad Fauzi Ibnu Kosim", role: "Full Stack Developer", img: "/Image/About/Member/1940.jpg" },
  { name: "Nabila Indriyanti", role: "Backend Engineer", img: "/Image/About/Member/1941.jpg" },
  { name: "Putri Salsabila", role: "Full Stack Developer", img: "/Image/About/Member/1942.jpg" },
  { name: "Queena Paramitha Supriyadi", role: "UI/UX Designer", img: "/Image/About/Member/1943.jpg" },
  { name: "Ragil Pramana", role: "Front End Developer", img: "/Image/About/Member/1944.jpg" },
  { name: "Ragil Rifqi Fadhil Anwar", role: "Game Developer", img: "/Image/About/Member/1945.jpg" },
  { name: "Raihan Daffa", role: "Full-Stack Developer", img: "/Image/About/Member/1946.jpg" },
  { name: "Rakha Pradipta", role: "UI/UX Designer", img: "/Image/About/Member/1947.jpg" },
  { name: "Siti Asiah", role: "Front End Developer & UI/UX", img: "/Image/About/Member/1948.jpg" },
  { name: "Siti Nayla Muhibah", role: "UI/UX Designer", img: "/Image/About/Member/1949.jpg" },
  { name: "Vio Adytia Syahputra", role: "Front End Developer", img: "/Image/About/Member/1950.jpg" },
  { name: "Yoris Satria Ananda", role: "Front End Developer", img: "/Image/About/Member/1951.jpg" },
  { name: "Vira Rahmayanti Luniansyah", role: "Data Analyst & Front End Developer", img: "/Image/About/Member/1952.jpg" },
  { name: "Zaafirah Arafi Hariyanto", role: "UI/UX Designer", img: "/Image/About/Member/1953.jpg" }
];

export default function About() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Card layout width is 343px + mx-4 (16px left + 16px right) = 375px
  const oneSetWidth = members.length * 375;
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame(() => {
    if (isDragging || isHovered) return;

    let currentX = x.get();
    currentX -= 0.8; // Smooth premium scrolling speed (negative means scroll left)

    if (currentX < -oneSetWidth) {
      currentX += oneSetWidth;
    } else if (currentX > 0) {
      currentX -= oneSetWidth;
    }
    x.set(currentX);
  });

  return (
    <div className="flex flex-col w-full relative">
      {/* Page 1: Hero Content (Sticky) */}
      <div className="sticky top-0 h-screen w-full bg-[#111111] text-white font-ppneue overflow-hidden z-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            {/* Added quality=75 for optimization and sizes to help browser load the right image size */}
            <Image
              src="/Image/About/Hero/About Hero.png"
              alt="About Hero"
              fill
              sizes="100vw"
              quality={75}
              className="object-cover opacity-40 grayscale blur-[1px] will-change-[opacity,filter]"
              priority
            />
            {/* Dark overlay to enhance text readability */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 h-screen px-6 pt-32 pb-12 md:px-12 md:pt-40 lg:px-16 lg:pb-16">

          {/* small navbar spacer so top navbar unaffected */}
          <div className="absolute top-6 left-0 w-full pointer-events-none z-30" />

          {/* Left Column - About Title */}
          <div className="col-span-1 lg:col-span-5 mb-12 lg:mb-0">
            {/* Wrapper for overflow-hidden to create the slide-up reveal effect */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                className="text-4xl md:text-5xl will-change-transform"
              >
                About
              </motion.h1>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="col-span-1 lg:col-span-7 flex flex-col h-full">

            {/* Top of Right Column */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-[24px] lg:text-[32px] xl:text-[35px] leading-[1.3] mb-8 will-change-[opacity,transform]"
              >
                We are the Software and Game Development (PPLG) class of 1 Ciomas Vocational High School. A passionate collective of students dedicated to exploring the digital frontier, crafting innovative software, and pushing the boundaries of modern technology. Through collaboration, creativity, and continuous learning, we strive to build solutions that leave a lasting impact. Our journey is defined by curiosity, resilience, and a shared ambition to shape the future of tech.
              </motion.p>

              {/* Divider Line 0.5px */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.6 }}
                className="h-[1px] lg:h-[0.5px] bg-white/60 w-full mb-3 origin-left will-change-transform"
              ></motion.div>

            </div>

            {/* Bottom of Right Column - Bogor Indonesia */}
            <div className="flex justify-between items-center w-full my-auto overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.7 }}
                className="text-[42px] md:text-[52px] lg:text-[62px] leading-none will-change-[opacity,transform]"
              >
                Bogor
              </motion.h2>
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.8 }}
                className="text-[42px] md:text-[52px] lg:text-[62px] leading-none will-change-[opacity,transform]"
              >
                Indonesia
              </motion.h2>
            </div>

          </div>

        </div>
      </div>

      {/* Page 2: Black Page sliding up over hero */}
      <div className="relative z-10 w-full bg-[#000000] mt-[60vh] will-change-transform">
        {/* Dynamic Dark Gradient & Blur that leads the black page up */}
        {/* Using bottom-full instead of top-0 -translate-y-full, and translate-y-1 to fix the 1px gap line */}
        <div className="absolute bottom-full left-0 w-full h-[60vh] translate-y-1 pointer-events-none will-change-transform">
          {/* Layer Blur: semakin ke bawah semakin nge-blur */}
          <div className="absolute inset-0 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"></div>
          {/* Layer Hitam: gradasi yang sangat panjang dari atas ke bawah */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]"></div>
        </div>

        {/* You can add your content for Page 2 here */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <InfoColumns />
        </div>
      </div>

      {/* Page 3: White Members Section (Sticky - stays pinned while footer slides over) */}
      <div className="sticky top-0 z-20 w-full bg-white h-screen text-black overflow-hidden">
        {/* Header Area */}
        <div className="flex flex-col items-center justify-center pt-28 pb-16 px-6 select-none">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-neutral-100 rounded-full text-xs md:text-sm font-medium text-neutral-800 border border-neutral-200/50 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 animate-pulse"></span>
            Class Roster
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 mt-6 text-center select-none">
            Meet our class members
          </h2>
        </div>

        {/* Members Draggable Carousel Container */}
        <div className="relative w-full overflow-hidden pb-32">
          {/* Fade gradient overlays on left and right edges for ultra-premium look */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing px-6 md:px-12 lg:px-16">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -oneSetWidth }}
              dragElastic={0.1}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ x, width: 'max-content' }}
              className="flex"
            >
              {[...members, ...members].map((member, index) => (
                <div
                  key={`member-${index}`}
                  className="flex flex-col group w-[343px] mx-4 flex-shrink-0 select-none"
                >
                  <div className="relative w-[343px] h-[343px] rounded-[24px] overflow-hidden bg-neutral-100 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:shadow-md group-hover:scale-[1.02]">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="343px"
                      quality={80}
                      className="object-cover pointer-events-none select-none transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5 text-left w-full px-1 select-none pointer-events-none">
                    <h4 className="text-[17px] md:text-[19px] font-semibold text-neutral-900 leading-snug tracking-tight transition-colors duration-300 group-hover:text-black whitespace-normal">
                      {member.name}
                    </h4>
                    <p className="text-[13px] md:text-[14px] font-light text-neutral-500 mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}
