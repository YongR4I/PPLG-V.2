'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
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
              src="/Image/About/Hero/About Hero.jpeg"
              alt="About Hero"
              fill
              sizes="100vw"
              quality={75}
              className="object-cover opacity-40 grayscale blur-[2px] will-change-[opacity,filter]"
              priority
            />
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 h-screen px-6 pt-32 pb-12 md:px-12 md:pt-40 lg:px-16 lg:pb-16">

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

      {/* Page 2: Black Page sliding up */}
      <div className="relative z-30 w-full bg-[#000000] min-h-[200vh] mt-[60vh] will-change-transform">
        {/* Dynamic Dark Gradient & Blur that leads the black page up */}
        {/* Using bottom-full instead of top-0 -translate-y-full, and translate-y-1 to fix the 1px gap line */}
        <div className="absolute bottom-full left-0 w-full h-[60vh] translate-y-1 pointer-events-none will-change-transform">
          {/* Layer Blur: semakin ke bawah semakin nge-blur */}
          <div className="absolute inset-0 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"></div>
          {/* Layer Hitam: gradasi yang sangat panjang dari atas ke bawah */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]"></div>
        </div>

        {/* You can add your content for Page 2 here */}
      </div>
    </div>
  );
}
