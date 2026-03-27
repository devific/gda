import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import { imagekitBaseUrl, mentorsNotes } from "../data";

const trackItems = [...mentorsNotes, ...mentorsNotes, ...mentorsNotes];

export function MentorsNotes() {
  const [activeIndex, setActiveIndex] = useState(mentorsNotes.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);

  const [selectedNote, setSelectedNote] = useState<
    (typeof mentorsNotes)[0] | null
  >(null);

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth >= 1280) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);

      if (itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth);
      }
    };

    updateLayout();
    setIsMounted(true);
    window.addEventListener("resize", updateLayout);
    const timeoutId = setTimeout(updateLayout, 100);

    return () => {
      window.removeEventListener("resize", updateLayout);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (isMounted && !isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isMounted, isTransitioning]);

  const next = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleAnimationComplete = () => {
    if (activeIndex >= mentorsNotes.length * 2) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex - mentorsNotes.length);
    } else if (activeIndex <= 0) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex + mentorsNotes.length);
    }
  };

  // Handle ESC to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedNote(null);
    };
    if (selectedNote) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedNote]);

  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {" "}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            Notes from my Mentors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 hidden"
          ></motion.p>{" "}
        </div>
        ```
        <div className="relative">
          <button
            onClick={prev}
            aria-label="Previous notes"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            aria-label="Next notes"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="overflow-hidden px-2 py-8 -mx-2 -my-8">
            <motion.div
              className="flex gap-6 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -10000, right: 10000 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -50 || velocity.x < -500) {
                  next();
                } else if (offset.x > 50 || velocity.x > 500) {
                  prev();
                }
              }}
              animate={{ x: -activeIndex * (itemWidth + 24) }}
              transition={{
                type: isTransitioning ? "spring" : "tween",
                stiffness: 300,
                damping: 30,
                duration: isTransitioning ? undefined : 0,
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              {trackItems.map((note, index) => {
                return (
                  <motion.div
                    key={`${note.image}-${index}`}
                    ref={index === 0 ? itemRef : null}
                    className="flex-none w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                  >
                    <div className="bg-[#FDFBF7] rounded-xl shadow-sm border border-slate-100 p-8 h-full flex flex-col relative group transition-shadow hover:shadow-md">
                      <div className="sr-only">
                        <p>{note.quote}</p>
                        <p>— {note.author}</p>
                      </div>

                      <div
                        className="relative w-full flex-grow flex items-center justify-center"
                        style={{
                          aspectRatio: `${note.dimW} / ${note.dimH}`,
                        }}
                      >
                        <img
                          src={`${imagekitBaseUrl}${note.image}?tr=f-auto,q-auto,w-800`}
                          alt={`Handwritten note from ${note.author}`}
                          className="w-full h-full object-contain opacity-90 mix-blend-multiply"
                          draggable={false}
                          loading="lazy"
                        />
                      </div>

                      <button
                        onClick={() => setSelectedNote(note)}
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label={`Read note for ${note.author}`}
                      >
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {mentorsNotes.map((_, idx) => {
              const normalizedIndex = activeIndex % mentorsNotes.length;
              const isActive = idx === normalizedIndex;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isTransitioning) return;
                    const targetIndex = activeIndex - normalizedIndex + idx;
                    setActiveIndex(targetIndex);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    isActive ? "bg-primary" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to note ${idx + 1}`}
                  aria-current={isActive ? "true" : "false"}
                />
              );
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 z-10">
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 mb-4">Note</h3>

              <div className="prose prose-slate">
                <blockquote className="text-lg text-slate-700 italic border-l-4 border-primary pl-4 my-6">
                  "{selectedNote.quote}"
                </blockquote>
                <p className="text-right font-medium text-slate-900">
                  — {selectedNote.author}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
