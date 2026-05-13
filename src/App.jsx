import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
// import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import GeistVillage from "./components/GeistVillage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";
import PetCharacters from "./components/PetCharacters";

export default function App() {
  return (
    <div className="site-shell">
      <CursorGlow />
      <PetCharacters />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        {/* <Testimonials /> */}
        <GeistVillage />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
