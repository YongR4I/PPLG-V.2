'use client';

import { motion } from 'framer-motion';

export default function InfoColumns() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1] as const
      }
    }
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-12 text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24"
      >
        {/* Column 1: Core Focus / Specialties */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h3 className="text-2xl md:text-3xl font-medium mb-8">Core Focus</h3>
          <ul className="flex flex-col gap-2 text-sm md:text-base text-white/70">
            <li className="text-white hover:text-white transition-colors">Software Engineering</li>
            <li>Web Development</li>
            <li>Mobile Applications</li>
            <li>Game Design & Dev</li>
            <li>UI/UX Design</li>
            <li>Database Architecture</li>
            <li>System Analytics</li>
            <li>Project Management</li>
          </ul>
        </motion.div>

        {/* Column 2: Tech Stack / Tools */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h3 className="text-2xl md:text-3xl font-medium mb-8">Tech & Tools</h3>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-white text-sm md:text-base mb-1">Languages</p>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed">JavaScript, TypeScript, PHP, Python, C++, Java, C#</p>
            </div>
            <div>
              <p className="text-white text-sm md:text-base mb-1">Frameworks</p>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed">React, Next.js, Laravel, Flutter, React Native, Vue</p>
            </div>
            <div>
              <p className="text-white text-sm md:text-base mb-1">Game Engines</p>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed">Unity, Unreal Engine, Godot</p>
            </div>
            <div>
              <p className="text-white text-sm md:text-base mb-1">Design</p>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed">Figma, Adobe CC, Blender</p>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Manifesto / Further Info */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h3 className="text-2xl md:text-3xl font-medium mb-8">The Philosophy</h3>
          <div className="flex flex-col gap-5 text-sm md:text-base text-white/70 font-light leading-relaxed">
            <p>
              We believe coding is more than syntax; it is about solving real-world problems through logic and creativity. At SMKN 1 Ciomas, we get hands-on experience to master software engineering and game development.
            </p>
            <p>
              By uniting frontend, backend, game design, and UI/UX talents, we collaborate in tailored teams to build functional, customized, and high-impact digital solutions.
            </p>
            <p className="text-white mt-2 font-medium">Code the future.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
