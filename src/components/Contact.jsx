import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

const contactItems = [
  { icon: FiMail, label: "Email", value: "krisna@example.com", href: "mailto:krisna@example.com" },
  { icon: FiLinkedin, label: "LinkedIn", value: "linkedin.com/in/krisna", href: "https://linkedin.com/in/krisna" },
  { icon: FiGithub, label: "GitHub", value: "github.com/krisna", href: "https://github.com/krisna" },
  { icon: FiPhone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
];

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    window.setTimeout(() => setSubmitted(false), 2800);
  };

  return (
    <section id="contact" ref={ref} className="section-pad contact-section">
      <div className="container contact-grid">
        <motion.div className="contact-copy" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-kicker">Contact</span>
          <h2>Have a product idea that needs a steady builder?</h2>
          <p>
            Share what you are trying to build, fix, or clarify. I can help shape the technical path and move it toward something real.
          </p>

          <div className="availability-note">
            <FiMapPin size={18} />
            <span>Available for remote collaboration and selected long-term product work.</span>
          </div>

          <div className="contact-list">
            {contactItems.map((item) => (
              <a key={item.label} href={item.href}>
                <item.icon size={20} />
                <span>
                  <small>{item.label}</small>
                  {item.value}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form className="contact-form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          <label>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </label>

          <label>
            Message
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell me what you want to build" rows={6} required />
          </label>

          <button type="submit" className="btn btn-primary">
            Send Message
            <FiSend size={18} />
          </button>

          {submitted && <p className="form-success">Message queued. I will get back to you soon.</p>}
        </motion.form>
      </div>
    </section>
  );
}
