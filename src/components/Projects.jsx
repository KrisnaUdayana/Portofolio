import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    id: 1,
    title: "AI Analytics Workspace",
    description: "A decision dashboard that turns messy operational data into forecasts, alerts, and executive-ready insight.",
    category: "AI",
    tech: ["React", "Node.js", "TensorFlow", "PostgreSQL"],
    image: "https://placehold.co/800x500/1a1a2e/ffffff?text=AI+Analytics",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Commerce Operations Platform",
    description: "Inventory, payments, order routing, and admin tooling for a multi-channel retail team.",
    category: "Web App",
    tech: ["Next.js", "Stripe", "MongoDB", "AWS"],
    image: "https://placehold.co/800x500/0f2027/ffffff?text=Commerce+Platform",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Fitness Coaching Mobile App",
    description: "Personalized workouts, habit streaks, and coach feedback built around daily engagement.",
    category: "Mobile",
    tech: ["React Native", "Firebase", "ML"],
    image: "https://placehold.co/800x500/16213e/ffffff?text=Fitness+App",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Financial Reporting System",
    description: "Real-time financial reporting with audit-friendly data models and export-ready views.",
    category: "Dashboard",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
    image: "https://placehold.co/800x500/0d1b2a/ffffff?text=Finance+Dashboard",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Campus Event Management",
    description: "End-to-end event ticketing, schedule management, and attendee tracking for university events.",
    category: "Web App",
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
    image: "https://placehold.co/800x500/1b1b2f/ffffff?text=Event+Management",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Inventory Control System",
    description: "Barcode-based stock tracking, supplier management, and low-stock alert automation.",
    category: "Dashboard",
    tech: ["React", "Express", "MySQL", "Chart.js"],
    image: "https://placehold.co/800x500/162447/ffffff?text=Inventory+System",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Social Media Scheduler",
    description: "Queue, preview, and auto-publish content across Instagram, Twitter, and LinkedIn from one place.",
    category: "AI",
    tech: ["Next.js", "OpenAI", "Redis", "Prisma"],
    image: "https://placehold.co/800x500/1c1c3a/ffffff?text=Social+Scheduler",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 8,
    title: "Health Tracker App",
    description: "Daily nutrition logging, BMI trends, and personalized diet recommendations via ML models.",
    category: "Mobile",
    tech: ["Flutter", "Firebase", "Python", "TensorFlow"],
    image: "https://placehold.co/800x500/0a3d62/ffffff?text=Health+Tracker",
    link: "#",
    github: "#",
    featured: false,
  },
];

const FILTERS = ["All", "Web Design", "UI/UX", "Data Science"];
const INITIAL_VISIBLE = 6;

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE && !showAll;

  return (
    <section id="projects" className="relative w-full bg-[#f4f4f5] py-24 px-4 md:px-8 border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div>
            <span className="inline-block px-4 py-1.5 border-[2px] border-black rounded-full text-xs font-bold uppercase tracking-widest bg-white mb-4">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Projects</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setShowAll(false);
                }}
                className={`px-5 py-2 rounded-full border-[2.5px] font-bold text-sm uppercase tracking-wide transition-all duration-200
                  ${activeFilter === f ? "bg-black text-white border-black shadow-[3px_3px_0_rgba(0,0,0,0.3)]" : "bg-white text-black border-black hover:shadow-[3px_3px_0_#111] hover:-translate-y-0.5"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Count */}
        <motion.p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          Showing {visible.length} of {filtered.length} projects
        </motion.p>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                className="group relative border-[3px] border-black rounded-[24px] bg-white overflow-hidden shadow-[6px_6px_0_#111] hover:shadow-[10px_10px_0_#111] hover:-translate-y-1 hover:-translate-x-0.5 transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-52">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                    <a
                      href={project.link}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-extrabold text-xs uppercase rounded-full border-2 border-white hover:bg-transparent hover:text-white transition-colors"
                    >
                      <FiExternalLink size={14} />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-white font-extrabold text-xs uppercase rounded-full border-2 border-white/60 hover:border-white transition-colors"
                    >
                      <FiGithub size={14} />
                      Code
                    </a>
                  </div>
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 z-20 px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">{project.category}</span>
                  {project.featured && <span className="absolute top-3 right-3 z-20 px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full border-2 border-black">Featured</span>}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 leading-tight">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 font-medium line-clamp-2">{project.description}</p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase border border-gray-200 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <a href={project.link} className="flex items-center gap-1.5 text-black font-bold text-xs uppercase tracking-wider hover:underline">
                      <FiArrowUpRight size={14} />
                      Live Demo
                    </a>
                    <a href={project.github} className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase tracking-wider hover:text-black transition-colors">
                      <FiGithub size={14} />
                      Source
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More Button */}
        {hasMore && (
          <motion.div className="flex justify-center mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 px-10 py-4 border-[3px] border-black rounded-full bg-black text-white font-extrabold text-sm uppercase tracking-wide shadow-[5px_5px_0_#555] hover:shadow-[8px_8px_0_#555] hover:-translate-y-1 transition-all duration-200"
            >
              Show More
              <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-black flex items-center justify-center">{filtered.length - INITIAL_VISIBLE}</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
