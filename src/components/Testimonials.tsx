import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "GreenDog Academy completely changed how we understand our dog. The calm leadership approach made our home peaceful again.",
    name: "Aarav Mehta",
  },
  {
    id: 2,
    text: "The structured boarding is unlike anything else. I finally have peace of mind knowing my anxious rescue is in a calm, safe environment.",
    name: "Sarah Jenkins",
  },
  {
    id: 3,
    text: "Shashank's philosophy is brilliant. We stopped treating symptoms and started addressing the root cause. Our Golden is a new dog.",
    name: "David Thompson",
  },
  {
    id: 4,
    text: "I was skeptical about 'psychology-based' training, but the results speak for themselves. The staff is incredibly knowledgeable.",
    name: "Elena Rodriguez",
  },
  {
    id: 5,
    text: "It's not just a facility; it's an education for both dogs and owners. The daily routine they established saved our sanity.",
    name: "Michael Chen",
  },
  {
    id: 6,
    text: "Professional, clean, and truly caring. They don't just watch your dog; they actively improve their state of mind.",
    name: "Jessica Taylor",
  },
];

const trackItems = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(testimonials.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);

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
    <section className="py-24 bg-[#EFEBE0] overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
        .font-handwriting {
          font-family: 'Patrick Hand', cursive;
        }
        .paper-lines {
          background-image: repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.2) 32px);
          background-attachment: local;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            What Dog Parents Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600"
          >
            Real experiences from families who trusted GreenDog Academy
          </motion.p>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:text-[#F4A623] hover:bg-[#f0ead6] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:text-[#F4A623] hover:bg-[#f0ead6] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider */}
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
              {trackItems.map((testimonial, index) => {
                const isVisible =
                  index >= activeIndex && index < activeIndex + visibleCount;
                const rotation =
                  testimonial.id % 3 === 0
                    ? -1
                    : testimonial.id % 2 === 0
                      ? 1.5
                      : -0.5;

                return (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    ref={index === 0 ? itemRef : null}
                    className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -4,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      className="bg-white rounded-xl shadow-sm p-8 h-full flex flex-col justify-between paper-lines relative"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      <p className="font-handwriting text-xl leading-[32px] text-[#4A3F35] pt-1">
                        "{testimonial.text}"
                      </p>

                      <div className="mt-8 flex justify-end">
                        <div className="inline-block">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              isVisible ? { width: "100%" } : { width: 0 }
                            }
                            transition={{
                              duration: 1.2,
                              ease: "easeInOut",
                              delay: 0.2,
                            }}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            <span className="font-handwriting text-2xl text-[#4A3F35] font-bold pr-2">
                              - {testimonial.name}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
