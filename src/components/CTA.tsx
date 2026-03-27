import { motion } from "motion/react";
import { useState } from "react";
import { useContact } from "../context/ContactProvider";

export default function CTA() {
  const [isOpen, setIsOpen] = useState(false);
  const { openContactDialog } = useContact();
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-primary"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8"
      >
        <h2 className="max-w-4xl mx-auto mb-8 text-4xl font-black md:text-5xl text-background-dark">
          Give Your Dog the Care and <br />
          Understanding They Deserve
        </h2>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <motion.button
            onClick={() => {
              setIsOpen(false);
              openContactDialog();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 text-lg font-bold text-white transition-transform shadow-2xl bg-background-dark rounded-xl"
          >
            Book a Consultation Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
