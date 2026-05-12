import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiDownload, FiAward, FiTerminal, FiCode, FiLayout, FiCpu } from "react-icons/fi";

const TECH_STACK = {
  core: ["HTML5", "CSS3", "PHP", "Java", "JavaScript", "SQL"],
  frameworks: ["Laravel", "Next.js", "React", "Tailwind", "Bootstrap"],
  tools: ["Vite", "Git", "Notion", "GitHub", "Figma", "Postman"]
};

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="about" className="relative w-full bg-[#f4f4f5] py-24 px-4 md:px-8 border-t-[3px] border-black">
      {/* Container */}
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Intro Card (Spans 2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2 border-[3px] border-black rounded-[32px] bg-white p-8 md:p-12 shadow-[8px_8px_0_#111]">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-6 tracking-tight uppercase">
              Hi, I'm Krisna Udayana.
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-6">
              A Junior Web Developer with a degree in Information Systems. I specialize in analyzing requirements and designing system flows to build iterative web solutions.
            </p>
            <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-10">
              Experienced in leading development lifecycles (from design to deployment) for organizational projects, prioritizing data accuracy, performance, and code quality.
            </p>
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 border-[3px] border-black rounded-full bg-black text-white font-extrabold text-sm shadow-[4px_4px_0_#111] hover:shadow-[6px_6px_0_#111] hover:-translate-y-1 transition-all uppercase tracking-wide">
              <FiDownload size={18} />
              Download Resume
            </a>
          </motion.div>

          {/* Profile Card (Spans 1 col) */}
          <motion.div variants={itemVariants} className="border-[3px] border-black rounded-[32px] bg-white p-4 shadow-[8px_8px_0_#111] flex flex-col items-center justify-center relative overflow-hidden group min-h-[300px]">
            {/* Placeholder for Profile Image */}
            <div className="w-full h-full bg-gray-200 rounded-[24px] overflow-hidden relative border-2 border-dashed border-gray-400 flex items-center justify-center">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Profile Photo</span>
              <img 
                src="https://via.placeholder.com/400x500/111/fff?text=Foto" 
                alt="Krisna Udayana" 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-0"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="flex items-center justify-between p-3 bg-black/80 backdrop-blur-md border-2 border-white/20 rounded-2xl">
                  <div>
                    <p className="text-white font-bold text-sm">@krisna</p>
                    <p className="text-green-400 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Online
                    </p>
                  </div>
                  <button className="px-4 py-1.5 bg-white text-black font-bold text-xs rounded-full hover:bg-gray-200 transition-colors">
                    Hire Me
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Card (Spans 1 col) */}
          <motion.div variants={itemVariants} className="border-[3px] border-black rounded-[32px] bg-white p-8 shadow-[8px_8px_0_#111] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center mb-6">
                <FiAward size={20} className="text-black" />
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Universitas ...</p>
              <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">Information Systems</h3>
              
              <div className="mb-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Relevant Coursework:</p>
                <div className="flex flex-wrap gap-2">
                  {["Web Programming", "Database Systems", "Software Engineering", "OOP", "System Analysis"].map(course => (
                    <span key={course} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-md border border-gray-200">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t-2 border-gray-100 flex items-end gap-3">
              <span className="text-5xl font-black leading-none tracking-tighter">3.81</span>
              <div className="pb-1">
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-wider leading-tight">Highly Satisfactory</p>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider leading-tight">/ 4.00 GPA</p>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Card (Spans 2 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-2 border-[3px] border-black rounded-[32px] bg-white p-8 md:p-12 shadow-[8px_8px_0_#111]">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                <FiTerminal size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Tech Stack</h2>
            </div>

            <div className="space-y-8">
              {/* Core Languages */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Core Languages</p>
                <div className="flex flex-wrap gap-3">
                  {TECH_STACK.core.map(tech => (
                    <div key={tech} className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:border-black transition-colors cursor-default">
                      <FiCode size={14} className="text-gray-500" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameworks & UI */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Frameworks & UI</p>
                <div className="flex flex-wrap gap-3">
                  {TECH_STACK.frameworks.map(tech => (
                    <div key={tech} className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:border-black transition-colors cursor-default">
                      <FiLayout size={14} className="text-gray-500" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Ecosystem */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Tools & Ecosystem</p>
                <div className="flex flex-wrap gap-3">
                  {TECH_STACK.tools.map(tech => (
                    <div key={tech} className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:border-black transition-colors cursor-default">
                      <FiCpu size={14} className="text-gray-500" />
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
