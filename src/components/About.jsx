import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiDownload, FiCode, FiLayout, FiCpu, FiStar } from "react-icons/fi";

const TECH_STACK = {
  core: ["HTML5", "CSS3", "PHP", "Java", "JavaScript", "SQL"],
  frameworks: ["Laravel", "Next.js", "React", "Tailwind", "Bootstrap"],
  tools: ["Vite", "Git", "Notion", "GitHub", "Figma", "Postman"],
};

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="about" className="relative w-full bg-[#f4f4f5] py-20 px-4 md:px-8 border-t-[3px] border-black min-h-screen flex items-center overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 text-gray-300 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
          
          {/* LEFT: ID BADGE (Polaroid Style) */}
          <motion.div 
            className="w-full lg:w-[380px] flex-shrink-0"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="group relative bg-white border-[3px] border-black p-5 rounded-[2px] shadow-[8px_8px_0_#111] rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
              
              {/* Tape effect */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 border-2 border-gray-300 backdrop-blur-sm rotate-3 z-10"></div>

              {/* Photo Area */}
              <div className="relative w-full aspect-[4/5] bg-gray-200 border-[3px] border-black mb-5 overflow-hidden flex items-center justify-center">
                <span className="font-bold text-gray-400 tracking-widest uppercase text-sm">Insert Photo</span>
                <img 
                  src="https://via.placeholder.com/400x500/111/fff?text=Foto" 
                  alt="Krisna Udayana" 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-0" 
                />
                
                {/* Online Status Pill */}
                <div className="absolute top-3 right-3 bg-white border-2 border-black px-2 py-1 flex items-center gap-2 shadow-[2px_2px_0_#111] rotate-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse border border-black"></div>
                  <span className="text-[10px] font-black uppercase tracking-wider">Online</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-1">Krisna Udayana</h2>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Junior Web Developer</p>
              </div>

              {/* Education & Action */}
              <div className="border-t-[3px] border-black pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Education</p>
                    <p className="text-xs font-black uppercase">Information Systems</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">GPA</p>
                    <p className="text-lg font-black leading-none">3.81</p>
                  </div>
                </div>
                
                <a
                  href="#"
                  className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[#111] text-white border-[3px] border-black font-black uppercase tracking-wider text-sm shadow-[4px_4px_0_#111] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <FiDownload size={18} />
                  Grab Resume
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: TYPOGRAPHY & STORY */}
          <motion.div 
            className="w-full flex-1 flex flex-col justify-center"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Giant Heading */}
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tighter mb-8 text-black">
              I analyze requirements & design <span className="inline-block bg-[#18d66b] text-black px-3 py-1 border-[3px] border-black shadow-[4px_4px_0_#111] -rotate-2 my-2">System Flows</span> to build better web experiences.
            </h2>

            {/* Narrative */}
            <div className="border-l-[6px] border-black pl-5 mb-10 max-w-2xl">
              <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed">
                Experienced in leading development lifecycles—from initial design to final deployment. 
                I prioritize data accuracy, high performance, and writing clean, iterative code that makes sense for organizations.
              </p>
            </div>

            {/* Arsenal / Tech Stack */}
            <div className="bg-[#eef3f6] border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_#111]">
              <div className="flex items-center gap-3 mb-6">
                <FiStar size={24} className="text-[#d49a20] fill-[#d49a20]" />
                <h3 className="text-2xl font-black uppercase tracking-tight">The Arsenal</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Core */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><FiCode /> Core</p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACK.core.map(tech => (
                      <span key={tech} className="bg-white border-2 border-black px-2.5 py-1 text-xs font-bold uppercase shadow-[2px_2px_0_#111]">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><FiLayout /> Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACK.frameworks.map(tech => (
                      <span key={tech} className="bg-[#111] text-white border-2 border-black px-2.5 py-1 text-xs font-bold uppercase shadow-[2px_2px_0_#111]">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><FiCpu /> Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACK.tools.map(tech => (
                      <span key={tech} className="bg-white border-2 border-black px-2.5 py-1 text-xs font-bold uppercase shadow-[2px_2px_0_#111]">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
