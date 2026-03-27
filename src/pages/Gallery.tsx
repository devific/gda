import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { imagekitBaseUrl, galleryImages as images } from "../data";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);

  const nextImage = () =>
    setSelectedIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // ✅ Keyboard Navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  // ✅ Infinite Scroll using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => (prev < images.length ? prev + 9 : prev));
      }
    });

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // ✅ Swipe handling
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) nextImage();
    if (info.offset.x > 100) prevImage();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.slice(0, visibleCount).map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="relative overflow-hidden cursor-pointer group rounded-2xl"
            >
              <img
                src={`${imagekitBaseUrl}/photos/${img}?tr=w-400,h-400,c-at_max,f-auto,q-40`}
                alt={`image-${i}`}
                loading="lazy"
                className="object-cover w-full h-full transition duration-500 aspect-square"
              />

              <div className="absolute inset-0 flex items-end p-4 transition opacity-0 bg-black/40 group-hover:opacity-100">
                <p className="font-semibold text-white">{i}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔻 Observer trigger */}
        <div ref={loaderRef} className="h-10" />

        {/* Loader text */}
        {visibleCount < images.length && (
          <p className="mt-6 text-center text-gray-500">
            Loading more images...
          </p>
        )}
      </div>

      {/* 🔥 LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedIndex(null)}
            />

            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute z-50 text-3xl text-white top-6 right-6"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              className="absolute z-50 text-4xl text-white left-6"
            >
              ‹
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              loading="lazy"
              src={`${imagekitBaseUrl}/photos/${
                images[selectedIndex]
              }?tr=w-700,h-500,c-at_max,f-auto,q-40`}
              alt="preview"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="z-40 max-h-[80vh] rounded-xl shadow-2xl cursor-grab active:cursor-grabbing"
            />

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute z-50 text-4xl text-white right-6"
            >
              ›
            </button>

            {/* Caption */}
            <p className="absolute z-50 text-white bottom-6">
              {images[selectedIndex]?.title || ""}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
