import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCpu, FiLayers, FiShield, FiZap } from "react-icons/fi";

const principles = [
  {
    icon: FiZap,
    title: "Fast by default",
    desc: "Interfaces, APIs, and data flows are designed around real user speed.",
  },
  {
    icon: FiLayers,
    title: "System thinking",
    desc: "Architecture choices stay practical, observable, and easy to evolve.",
  },
  {
    icon: FiShield,
    title: "Production minded",
    desc: "Security, reliability, and maintainability are part of the build from day one.",
  },
  {
    icon: FiCpu,
    title: "Useful AI",
    desc: "AI features are scoped around workflow value, not novelty for its own sake.",
  },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="section-pad about-section">
      <div className="container two-column">
        <motion.div className="section-copy" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-kicker">About</span>
          <h2>Building software with the patience of a product partner.</h2>
          <p>
            I work across frontend, backend, cloud, and data systems. The sweet spot is translating uncertain product ideas into reliable software that teams can operate, measure, and improve.
          </p>
          <p>
            My process is direct: understand the business case, shape the technical path, ship usable increments, and keep the codebase calm enough for the next person to work in.
          </p>
        </motion.div>

        <div className="principle-grid">
          {principles.map((item, index) => (
            <motion.article key={item.title} className="info-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.08 }}>
              <item.icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
