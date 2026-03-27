import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { useContact } from "../context/ContactProvider";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { openContactDialog } = useContact();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background-light via-background-light/60 to-transparent"></div>
        <motion.img
          style={{ y: y1 }}
          alt="Dog in motion"
          className="object-cover w-full h-full"
          src="/image.png"
        />
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
            Where Every Dog <br />
            <span className="italic text-primary">Is Understood</span>
          </h1>
          <p className="mb-10 text-lg leading-relaxed md:text-xl text-slate-600">
            A professional dog training and boarding academy built on canine
            psychology, calm leadership, and structured care.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.button
              onClick={openContactDialog}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-bold transition-all rounded-lg shadow-xl bg-primary hover:bg-primary/90 text-background-dark shadow-primary/30"
            >
              Book a Consultation <Calendar className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-bold transition-all border rounded-lg bg-white/50 hover:bg-white backdrop-blur-sm border-slate-200"
            >
              Explore Our Approach <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
