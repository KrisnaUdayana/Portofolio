import React from "react";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Link } from "react-scroll";

const socials = [
  { icon: FiGithub, label: "GitHub", href: "#" },
  { icon: FiLinkedin, label: "LinkedIn", href: "#" },
  { icon: FiMail, label: "Email", href: "mailto:krisna@example.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="hero" smooth duration={500} className="brand-mark footer-brand">
            <span>K</span>
            <strong>Krisna</strong>
          </Link>
          <p>Fullstack developer for thoughtful web, cloud, and AI products.</p>
        </div>

        <div className="footer-links">
          {socials.map((social) => (
            <a key={social.label} href={social.href} aria-label={social.label}>
              <social.icon size={19} />
              {social.label}
            </a>
          ))}
        </div>

        <div className="footer-meta">
          <span>© {year} Krisna. All rights reserved.</span>
          <a href="#contact">
            Start a conversation
            <FiArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
