import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArchive, FiArrowRight, FiChevronDown, FiFolder, FiImage } from "react-icons/fi";
import { Link } from "react-scroll";

const experiences = [
  {
    role: "Senior Fullstack Developer",
    company: "TechCorp International",
    period: "2022 - Present",
    description: "Led product engineering for scalable web platforms, cloud deployments, and internal developer workflows.",
    highlights: ["React", "Node.js", "Kubernetes", "AWS"],
    archive: ["Platform architecture", "Release dashboard", "Team workflow"],
  },
  {
    role: "Lead Data Scientist",
    company: "DataFlow AI",
    period: "2020 - 2022",
    description: "Built data pipelines and predictive models for high-volume analytics products used by operational teams.",
    highlights: ["Python", "TensorFlow", "Spark", "Kafka"],
    archive: ["Prediction pipeline", "Data quality map", "Model report"],
  },
  {
    role: "Backend Engineer",
    company: "StartUp Ventures",
    period: "2018 - 2020",
    description: "Designed APIs, realtime services, and database optimizations for fast-moving product launches.",
    highlights: ["Node.js", "PostgreSQL", "Redis", "MongoDB"],
    archive: ["Realtime service", "API contract", "Query tuning"],
  },
  {
    role: "Full Stack Developer",
    company: "Digital Solutions Inc",
    period: "2016 - 2018",
    description: "Delivered responsive web applications, payment integrations, and reusable UI components.",
    highlights: ["React", "Laravel", "MySQL", "Docker"],
    archive: ["UI components", "Payment flow", "Client handoff"],
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [openArchive, setOpenArchive] = useState(experiences[0].role);

  return (
    <section id="experience" ref={ref} className="section-pad experience-section">
      <div className="container two-column">
        <div className="section-copy sticky-copy">
          <span className="section-kicker">Experience</span>
          <h2>A track record across product, data, and infrastructure.</h2>
          <p>
            I have worked from early product discovery through production systems, with a focus on teams that need dependable delivery and thoughtful technical leadership.
          </p>
          <Link to="contact" smooth duration={500} offset={-72} className="text-link">
            Work together
            <FiArrowRight size={18} />
          </Link>
        </div>

        <div className="timeline">
          {experiences.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              className={`timeline-item ${openArchive === item.role ? "is-open" : ""}`}
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.09 }}
            >
              <div className="timeline-meta">{item.period}</div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
                <p>{item.description}</p>
                <div className="tag-list">
                  {item.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="archive-toggle"
                  aria-expanded={openArchive === item.role}
                  onClick={() => setOpenArchive((current) => (current === item.role ? "" : item.role))}
                >
                  <span>
                    <FiFolder size={18} />
                    Project Archive
                  </span>
                  <FiChevronDown className="archive-chevron" size={18} />
                </button>

                <AnimatePresence initial={false}>
                  {openArchive === item.role && (
                    <motion.div
                      className="archive-grid"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      {item.archive.map((entry, entryIndex) => (
                        <div key={entry} className="archive-file">
                          {entryIndex === 0 ? <FiArchive size={18} /> : <FiImage size={18} />}
                          <span>{entry}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
