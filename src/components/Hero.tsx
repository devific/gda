import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background-light via-background-light/60 to-transparent z-10"></div>
        <motion.img
          style={{ y: y1 }}
          alt="Dog in motion"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuATlepkm2ki1b9ngR6xsMv2xhKDKWuzwfTOV4JMJ506_YqmLJECMiHfk_4BmcSX2mTAb5hB9flWQUz4GvFqu9Vpy3ab8N1Tq4BXHci4aQpjqs_Vl2rSeaZPjUYOflUSqG7genKYgXIeEkhZda4PsJUO1xRYwvrrDNRski8smDNl-u6qUmkSs-2C_RQmRJdy8z6NrSjHk0OT99tXFGEB4EOzsDcBe-oN4u_j2mQMMiQFAOKA4dUMXhisDC8Riyr0AilY-lUKgc6Xhuae"
        />
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute inset-0"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
            Where Every Dog <br />
            <span className="text-primary italic">Is Understood</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            A professional dog training and boarding academy built on canine
            psychology, calm leadership, and structured care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 rounded-lg font-bold text-base transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
            >
              Book a Consultation <Calendar className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/50 hover:bg-white backdrop-blur-sm border border-slate-200 px-8 py-4 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              Explore Our Approach <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
