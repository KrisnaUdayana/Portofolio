import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    feedback: "Krisna brought structure to a very messy product roadmap. The final platform felt polished, but the real value was how calm the delivery process became.",
  },
  {
    name: "Mike Chen",
    role: "Product Manager, StartUp X",
    feedback: "He moves quickly without making the codebase feel fragile. We had a usable MVP faster than expected and a path to keep improving it.",
  },
  {
    name: "Emma Davis",
    role: "CTO, DataFlow",
    feedback: "The data pipeline work was thoughtful, documented, and built with production realities in mind. It gave our team confidence to scale.",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [current, setCurrent] = useState(0);
  const active = testimonials[current];

  const next = () => setCurrent((value) => (value + 1) % testimonials.length);
  const prev = () => setCurrent((value) => (value - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" ref={ref} className="section-pad testimonials-section">
      <div className="container testimonial-layout">
        <motion.div className="section-copy" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-kicker">Clients</span>
          <h2>Good software is also a good working rhythm.</h2>
          <p>
            The best collaborations leave behind more than shipped features. They leave a clearer product, a steadier team, and a codebase people trust.
          </p>
        </motion.div>

        <div className="quote-panel">
          <AnimatePresence mode="wait">
            <motion.blockquote key={active.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
              <p>"{active.feedback}"</p>
              <footer>
                <strong>{active.name}</strong>
                <span>{active.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="quote-controls">
            <button type="button" onClick={prev} aria-label="Previous testimonial">
              <FiArrowLeft size={20} />
            </button>
            <div className="quote-dots" aria-hidden="true">
              {testimonials.map((item, index) => (
                <span key={item.name} className={index === current ? "active" : ""} />
              ))}
            </div>
            <button type="button" onClick={next} aria-label="Next testimonial">
              <FiArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
