import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Founder from './components/Founder';
import Services from './components/Services';
import Facility from './components/Facility';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Founder />
        <Services />
        <Facility />
        <Comparison />
        <Testimonials />
        <Insights />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
