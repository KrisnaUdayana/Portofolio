import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowUpRight, FiBarChart2, FiGithub } from "react-icons/fi";

const projects = [
  {
    id: 1,
    title: "AI Analytics Workspace",
    description: "A decision dashboard that turns messy operational data into forecasts, alerts, and executive-ready insight.",
    category: "AI",
    tech: ["React", "Node.js", "TensorFlow", "PostgreSQL"],
    accent: "teal",
    label: "Forecasting",
    metrics: [
      { value: "91%", label: "Accuracy" },
      { value: "4x", label: "Faster reports" },
      { value: "Live", label: "Signals" },
    ],
  },
  {
    id: 2,
    title: "Commerce Operations Platform",
    description: "Inventory, payments, order routing, and admin tooling for a multi-channel retail team.",
    category: "Web App",
    tech: ["Next.js", "Stripe", "MongoDB", "AWS"],
    accent: "amber",
    label: "Retail ops",
    metrics: [
      { value: "12k", label: "Orders" },
      { value: "8", label: "Channels" },
      { value: "99%", label: "Uptime" },
    ],
  },
  {
    id: 3,
    title: "Fitness Coaching Mobile App",
    description: "Personalized workouts, habit streaks, and coach feedback built around daily engagement.",
    category: "Mobile",
    tech: ["React Native", "Firebase", "ML"],
    accent: "rose",
    label: "Mobile UX",
    metrics: [
      { value: "42%", label: "Retention" },
      { value: "24/7", label: "Coach flow" },
      { value: "Beta", label: "Status" },
    ],
  },
  {
    id: 4,
    title: "Financial Reporting System",
    description: "Real-time financial reporting with audit-friendly data models and export-ready views.",
    category: "Dashboard",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
    accent: "ink",
    label: "Finance",
    metrics: [
      { value: "Real", label: "Time" },
      { value: "0.8s", label: "Exports" },
      { value: "Audit", label: "Ready" },
    ],
  },
];

const filters = ["All", "AI", "Web App", "Mobile", "Dashboard"];

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" ref={ref} className="section-pad projects-section">
      <div className="container">
        <div className="section-heading project-heading">
          <div>
            <span className="section-kicker">Selected work</span>
            <h2>Focused builds with measurable product outcomes.</h2>
          </div>
          <div className="filter-row" aria-label="Project filters">
            {filters.map((filter) => (
              <button key={filter} type="button" className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <motion.article key={project.id} layout className={`project-card accent-${project.accent}`} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.08 }}>
              <div className="project-visual" aria-hidden="true">
                <div className="project-visual-label">
                  <FiBarChart2 size={20} />
                  <span>{project.label}</span>
                </div>
                <div className="project-screen">
                  <div className="screen-topbar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="visual-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <span className="case-overlay">View Case Study</span>
              </div>

              <div className="project-body">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-metrics">
                  {project.metrics.map((metric) => (
                    <div key={`${project.id}-${metric.label}`}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <div className="tag-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-actions">
                <a href="#" aria-label={`${project.title} live demo`}>
                  <FiArrowUpRight size={18} />
                  Live
                </a>
                <a href="#" aria-label={`${project.title} source code`}>
                  <FiGithub size={18} />
                  Code
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
