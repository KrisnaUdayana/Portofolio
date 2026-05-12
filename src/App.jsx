import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Playground from "./components/Playground";
import Statistics from "./components/Statistics";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import GeistVillage from "./components/GeistVillage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  return (
    <div className="site-shell">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Playground />
        <Statistics />
        <Testimonials />
        <Contact />
      </main>
      <GeistVillage />
      <Footer />
    </div>
  );
}
