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
    <section className="relative py-24 overflow-hidden bg-stone-50">
      {" "}
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {" "}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-extrabold"
          >
            Notes from my Mentors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden text-slate-600"
          ></motion.p>{" "}
        </div>
        <div className="relative">
          <button
            onClick={prev}
            aria-label="Previous notes"
            className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 transition-colors -translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 lg:-translate-x-12 text-slate-600 hover:text-primary hover:bg-slate-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            aria-label="Next notes"
            className="absolute right-0 z-10 flex items-center justify-center w-12 h-12 transition-colors translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 lg:translate-x-12 text-slate-600 hover:text-primary hover:bg-slate-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="px-2 py-8 -mx-2 -my-8 overflow-hidden">
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
                        className="relative flex items-center justify-center flex-grow w-full"
                        style={{
                          aspectRatio: `${note.dimW} / ${note.dimH}`,
                        }}
                      >
                        <img
                          src={`${imagekitBaseUrl}${note.image}?tr=f-auto,q-auto,w-800`}
                          alt={`Handwritten note from ${note.author}`}
                          className="object-contain w-full h-full opacity-90 mix-blend-multiply"
                          draggable={false}
                          loading="lazy"
                        />
                      </div>

                      <button
                        onClick={() => setSelectedNote(note)}
                        className="absolute flex items-center justify-center w-10 h-10 transition-colors bg-white border rounded-full shadow-sm opacity-0 bottom-4 right-4 border-slate-100 text-slate-400 hover:text-primary hover:bg-slate-50 group-hover:opacity-100 focus:opacity-100"
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
            <motion.div className="relative z-10 w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl">
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute p-2 transition-colors rounded-full top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="mb-4 text-xl font-bold text-slate-900">Note</h3>

              <div className="prose prose-slate">
                <blockquote className="pl-4 my-6 text-lg italic border-l-4 text-slate-700 border-primary">
                  "{selectedNote.quote}"
                </blockquote>
                <p className="font-medium text-right text-slate-900">
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
