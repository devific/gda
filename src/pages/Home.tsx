import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Founder from "../components/Founder";
import Services from "../components/Services";
import Facility from "../components/Facility";
import Comparison from "../components/Comparison";
import Insights from "../components/Insights";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import { MentorsNotes } from "../components/MentorsNotes";

export default function Home() {
  const { hash } = useLocation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <main>
        <Hero />
        <Stats />
        <Founder />
        <Services />
        <Facility />
        <Comparison />
        <Testimonials />
        <MentorsNotes />
        <Insights />
        <FAQ />
      </main>
    </>
  );
}
