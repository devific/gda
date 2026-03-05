import { motion } from 'motion/react';

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-black text-background-dark mb-8 max-w-4xl mx-auto">
          Give Your Dog the Care and <br />
          Understanding They Deserve
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-background-dark text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl transition-transform"
          >
            Book a Consultation Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 border border-background-dark/20 text-background-dark px-10 py-5 rounded-xl font-bold text-lg backdrop-blur-sm transition-transform"
          >
            Contact Our Team
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
