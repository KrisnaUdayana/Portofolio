import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillGroups = [
  {
    title: "Frontend craft",
    note: "Interfaces that are responsive, accessible, and easy to maintain.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Design systems"],
  },
  {
    title: "Backend systems",
    note: "APIs and services with clean boundaries and production visibility.",
    skills: ["Node.js", "Python", "Laravel", "GraphQL", "PostgreSQL"],
  },
  {
    title: "Cloud and data",
    note: "Deployments, pipelines, and infrastructure that scale without drama.",
    skills: ["AWS", "Docker", "Kubernetes", "MongoDB", "ETL"],
  },
  {
    title: "Applied AI",
    note: "ML and LLM integrations that support real decisions and workflows.",
    skills: ["TensorFlow", "LLM APIs", "Data analysis", "Vector search", "Automation"],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.18, triggerOnce: true });

  return (
    <section id="skills" ref={ref} className="section-pad skills-section">
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">Capabilities</span>
          <h2>End-to-end engineering for modern product teams.</h2>
        </div>

        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <motion.article key={group.title} className="skill-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.08 }}>
              <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <p>{group.note}</p>
              <div className="tag-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
