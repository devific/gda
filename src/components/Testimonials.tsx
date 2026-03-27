import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, X } from "lucide-react";
import { testimonials as stories } from "../data";

const duplicatedStories = [...stories, ...stories];

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<
    (typeof stories)[0] | null
  >(null);

  // Handle ESC to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTestimonial(null);
    };
    if (selectedTestimonial) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedTestimonial]);

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden bg-stone-50"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .pause-on-hover:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="px-4 mx-auto mb-16 text-center max-w-7xl sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block mb-4 text-sm font-bold tracking-wider uppercase text-primary"
        >
          Success Stories
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-4xl font-extrabold md:text-5xl text-slate-900"
        >
          Words of praise from others
          <br />
          about our presence.
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden pause-on-hover">
        {/* Gradient masks for smooth fade on edges */}
        <div className="absolute top-0 left-0 z-10 w-16 h-full pointer-events-none md:w-32 bg-gradient-to-r from-stone-50 to-transparent"></div>
        <div className="absolute top-0 right-0 z-10 w-16 h-full pointer-events-none md:w-32 bg-gradient-to-l from-stone-50 to-transparent"></div>

        <div className="flex py-4 w-max animate-marquee">
          {duplicatedStories.map((story, index) => {
            const isLong = story.quote.length > 130;
            const displayQuote = isLong
              ? `${story.quote.substring(0, 130)}...`
              : story.quote;

            return (
              <div key={index} className="w-[320px] md:w-[400px] shrink-0 mr-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-[280px] flex flex-col hover:shadow-md transition-shadow relative">
                  <Quote className="absolute w-8 h-8 mb-4 shrink-0 text-primary/10 bottom-8 right-8 fill-primary/10 " />

                  <p className="flex-grow leading-relaxed text-slate-700">
                    "{displayQuote}"
                    {isLong && (
                      <button
                        onClick={() => setSelectedTestimonial(story)}
                        className="inline-flex items-center ml-2 text-sm font-semibold text-primary hover:underline"
                      >
                        Read more
                      </button>
                    )}
                  </p>

                  <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-50">
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold rounded-full bg-primary/10 text-primary shrink-0">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{story.author}</p>
                      <p className="text-sm text-slate-500">{story.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transcript Dialog */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute p-2 transition-colors rounded-full top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <Quote className="w-10 h-10 mb-6 text-primary fill-primary/10" />

              <div className="prose prose-slate">
                <p className="mb-8 text-lg leading-relaxed text-slate-700">
                  "{selectedTestimonial.quote}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-bold rounded-full bg-primary/10 text-primary shrink-0">
                    {selectedTestimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">
                      {selectedTestimonial.author}
                    </p>
                    <p className="text-sm text-slate-500">
                      {selectedTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
