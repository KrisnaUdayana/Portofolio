import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-scroll";

const navItems = [
  { label: "About", target: "about" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Lab", target: "lab" },
  { label: "Contact", target: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-nav z-[999] ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="hero" smooth duration={500} className="brand-mark" onClick={() => setIsOpen(false)}>
          <span>K</span>
          <strong>Krisna</strong>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.target} to={item.target} smooth duration={500} offset={-72}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="contact" smooth duration={500} offset={-72} className="nav-cta">
          Start a Project
        </Link>

        <button className="nav-toggle" type="button" aria-label="Toggle navigation" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <Link key={item.target} to={item.target} smooth duration={500} offset={-72} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="contact" smooth duration={500} offset={-72} className="mobile-cta" onClick={() => setIsOpen(false)}>
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}
