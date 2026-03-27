import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { testimonials } from "../data";

const trackItems = [...testimonials, ...testimonials, ...testimonials];

const MAX_LENGTH = 220; // adjust threshold

function NameReveal({
  name,
  shouldAnimate,
  staggerDelay,
}: {
  name: string;
  shouldAnimate: boolean;
  staggerDelay: number;
}) {
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldAnimate && !hasAnimated.current) {
      hasAnimated.current = true;
      controls.start({
        width: "100%",
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          delay: staggerDelay,
        },
      });
    }
  }, [shouldAnimate, staggerDelay, controls]);

  return (
    <div className="inline-block">
      <motion.div
        initial={{ width: 0 }}
        animate={controls}
        className="overflow-hidden whitespace-nowrap"
      >
        <span className="font-handwriting text-2xl text-[#4A3F35] font-bold pr-2">
          - {name}
        </span>
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(testimonials.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [selectedNote, setSelectedNote] = useState<{
    quote: string;
    author: string;
  } | null>(null);

  const revealedIndices = useRef<Set<number>>(new Set());
  const [cardAnimStates, setCardAnimStates] = useState<
    Record<number, { shouldAnimate: boolean; staggerDelay: number }>
  >({});

  const getVisibleIndices = useCallback((index: number, count: number) => {
    const indices: number[] = [];
    for (let i = index; i < index + count && i < trackItems.length; i++) {
      indices.push(i);
    }
    return indices;
  }, []);

  const revealNewIndices = useCallback((newIndices: number[]) => {
    if (newIndices.length === 0) return;

    setCardAnimStates((prev) => {
      const next = { ...prev };
      newIndices.forEach((trackIdx, positionInBatch) => {
        next[trackIdx] = {
          shouldAnimate: true,
          staggerDelay: positionInBatch * 0.25,
        };
      });
      return next;
    });

    newIndices.forEach((idx) => revealedIndices.current.add(idx));
  }, []);

  const hasEnteredViewport = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEnteredViewport.current) {
            hasEnteredViewport.current = true;
            const visibleIndices = getVisibleIndices(activeIndex, visibleCount);
            const unrevealedIndices = visibleIndices.filter(
              (idx) => !revealedIndices.current.has(idx),
            );
            revealNewIndices(unrevealedIndices);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [activeIndex, visibleCount, getVisibleIndices, revealNewIndices]);

  const prevActiveIndex = useRef(activeIndex);

  useEffect(() => {
    if (!hasEnteredViewport.current) return;
    if (activeIndex === prevActiveIndex.current) return;

    const visibleIndices = getVisibleIndices(activeIndex, visibleCount);
    const unrevealedIndices = visibleIndices.filter(
      (idx) => !revealedIndices.current.has(idx),
    );

    if (unrevealedIndices.length > 0) {
      revealNewIndices(unrevealedIndices);
    }

    prevActiveIndex.current = activeIndex;
  }, [activeIndex, visibleCount, getVisibleIndices, revealNewIndices]);

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
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
    if (activeIndex >= testimonials.length * 2) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex - testimonials.length);
    } else if (activeIndex <= 0) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex + testimonials.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#EFEBE0] overflow-hidden relative"
    >
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold">What Dog Parents Say</h2>
          <p className="text-slate-600">
            Real experiences from families who trusted GreenDog Academy
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prev}
            className="absolute left-0 z-10 -translate-y-1/2 top-1/2"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-0 z-10 -translate-y-1/2 top-1/2"
          >
            <ChevronRight />
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -activeIndex * (itemWidth + 32) }}
              onAnimationComplete={handleAnimationComplete}
            >
              {trackItems.map((testimonial, index) => {
                const isLong = testimonial.quote.length > MAX_LENGTH;
                const preview = isLong
                  ? testimonial.quote.slice(0, MAX_LENGTH) + "..."
                  : testimonial.quote;

                const animState = cardAnimStates[index];

                return (
                  <div
                    key={`${testimonial.id}-${index}`}
                    ref={index === 0 ? itemRef : null}
                    className="flex-none w-full md:w-1/2 lg:w-1/3"
                  >
                    <div className="flex flex-col justify-between h-full p-6 bg-white rounded-xl">
                      <p className="text-lg font-handwriting">
                        {preview}{" "}
                        {isLong && (
                          <button
                            onClick={() =>
                              setSelectedNote({
                                quote: testimonial.quote,
                                author: testimonial.author,
                              })
                            }
                            className="mt-3 text-sm text-[#F4A623] hover:underline self-start inline"
                          >
                            Read more
                          </button>
                        )}
                      </p>

                      <div className="mt-6 text-right">
                        <NameReveal
                          name={testimonial.author}
                          shouldAnimate={animState?.shouldAnimate ?? false}
                          staggerDelay={animState?.staggerDelay ?? 0}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
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
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <blockquote className="text-lg italic">
                "{selectedNote.quote}"
              </blockquote>

              <p className="mt-4 font-medium text-right">
                — {selectedNote.author}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
