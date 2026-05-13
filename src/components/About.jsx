import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiDownload, FiAward, FiTerminal, FiCode, FiLayout, FiCpu } from "react-icons/fi";

const TECH_STACK = {
  core: ["HTML5", "CSS3", "PHP", "Java", "JavaScript", "SQL"],
  frameworks: ["Laravel", "Next.js", "React", "Tailwind", "Bootstrap"],
  tools: ["Vite", "Git", "Notion", "GitHub", "Figma", "Postman"],
};

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="relative w-full bg-[#f4f4f5] py-6 px-4 md:px-8 border-t-[3px] border-black min-h-screen flex items-center">
      {/* Container */}
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {/* Intro Card (Spans 2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2 border-[3px] border-black rounded-[24px] bg-white p-6 shadow-[6px_6px_0_#111]">
            <h2 className="text-2xl md:text-3xl font-black text-black mb-3 tracking-tight uppercase">Hi, I'm Krisna Udayana.</h2>
            <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed mb-2">
              A Junior Web Developer with a degree in Information Systems. I specialize in analyzing requirements and designing system flows to build iterative web solutions.
            </p>
            <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed mb-5">
              Experienced in leading development lifecycles (from design to deployment) for organizational projects, prioritizing data accuracy, performance, and code quality.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-2.5 border-[3px] border-black rounded-full bg-black text-white font-extrabold text-xs shadow-[4px_4px_0_#111] hover:shadow-[6px_6px_0_#111] hover:-translate-y-1 transition-all uppercase tracking-wide"
            >
              <FiDownload size={15} />
              Download Resume
            </a>
          </motion.div>

          {/* Profile Card (Spans 1 col) */}
          <motion.div variants={itemVariants} className="border-[3px] border-black rounded-[24px] bg-white p-3 shadow-[6px_6px_0_#111] flex flex-col items-center justify-center relative overflow-hidden group min-h-[200px]">
            <div className="w-full h-full bg-gray-200 rounded-[18px] overflow-hidden relative border-2 border-dashed border-gray-400 flex items-center justify-center">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Profile Photo</span>
              <img src="https://via.placeholder.com/400x500/111/fff?text=Foto" alt="Krisna Udayana" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-0" />
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <div className="flex items-center justify-between p-2.5 bg-black/80 backdrop-blur-md border-2 border-white/20 rounded-xl">
                  <div>
                    <p className="text-white font-bold text-xs">@krisna</p>
                    <p className="text-green-400 font-bold text-[9px] tracking-widest uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Online
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-white text-black font-bold text-[10px] rounded-full hover:bg-gray-200 transition-colors">Hire Me</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Card (Spans 1 col) */}
          <motion.div variants={itemVariants} className="border-[3px] border-black rounded-[24px] bg-white p-6 shadow-[6px_6px_0_#111] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center mb-4">
                <FiAward size={17} className="text-black" />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">Universitas ...</p>
              <h3 className="text-lg font-black uppercase mb-4 tracking-tight">Information Systems</h3>

              <div className="mb-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Relevant Coursework:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Web Programming", "Database Systems", "Software Engineering", "OOP", "System Analysis"].map((course) => (
                    <span key={course} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold uppercase rounded-md border border-gray-200">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-gray-100 flex items-end gap-2">
              <span className="text-4xl font-black leading-none tracking-tighter">3.81</span>
              <div className="pb-0.5">
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-wider leading-tight">Highly Satisfactory</p>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider leading-tight">/ 4.00 GPA</p>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Card (Spans 2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2 border-[3px] border-black rounded-[24px] bg-white p-6 shadow-[6px_6px_0_#111]">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
                <FiTerminal size={20} />
              </div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Tech Stack</h2>
            </div>

            <div className="space-y-4">
              {/* Core Languages */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Core Languages</p>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.core.map((tech) => (
                    <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg font-bold text-xs text-gray-700 hover:border-black transition-colors cursor-default">
                      <FiCode size={12} className="text-gray-500" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameworks & UI */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Frameworks & UI</p>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.frameworks.map((tech) => (
                    <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg font-bold text-xs text-gray-700 hover:border-black transition-colors cursor-default">
                      <FiLayout size={12} className="text-gray-500" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Ecosystem */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tools & Ecosystem</p>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.tools.map((tech) => (
                    <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg font-bold text-xs text-gray-700 hover:border-black transition-colors cursor-default">
                      <FiCpu size={12} className="text-gray-500" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
