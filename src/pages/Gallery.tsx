import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { imagekitBaseUrl, galleryImages as images } from "../data";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);
  const gridRef = useRef(null);

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

  // ✅ Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => (prev < images.length ? prev + 9 : prev));
      }
    });

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  // ✅ Masonry calculation
  const resizeGridItem = (item) => {
    const grid = gridRef.current;
    if (!grid) return;

    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"),
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("gap"),
    );

    const content = item.querySelector("img");
    if (!content) return;

    const rowSpan = Math.ceil(
      (content.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap),
    );

    item.style.gridRowEnd = `span ${rowSpan}`;
  };

  const handleImageLoad = (e) => {
    const item = e.target.parentElement;
    resizeGridItem(item);
  };

  // ✅ Swipe
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) nextImage();
    if (info.offset.x > 100) prevImage();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="px-4 mx-auto max-w-7xl">
        {/* 🔥 Masonry Grid */}
        <div
          ref={gridRef}
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gridAutoRows: "10px",
          }}
        >
          {images.slice(0, visibleCount).map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="relative overflow-hidden cursor-pointer group rounded-2xl"
            >
              <img
                src={`${imagekitBaseUrl}/photos/${img}?tr=w-500,f-auto,q-50`}
                alt=""
                loading="lazy"
                onLoad={handleImageLoad}
                className="w-full rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Loader trigger */}
        <div ref={loaderRef} className="h-10" />

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
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedIndex(null)}
            />

            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute z-50 text-3xl text-white top-6 right-6"
            >
              ✕
            </button>

            <button
              onClick={prevImage}
              className="absolute z-50 text-4xl text-white left-6"
            >
              ‹
            </button>

            <motion.img
              key={selectedIndex}
              src={`${imagekitBaseUrl}/photos/${
                images[selectedIndex]
              }?tr=w-900,f-auto,q-70`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="z-40 max-h-[80vh] rounded-xl shadow-2xl"
            />

            <button
              onClick={nextImage}
              className="absolute z-50 text-4xl text-white right-6"
            >
              ›
            </button>

            <p className="absolute z-50 text-white bottom-6">
              {images[selectedIndex]?.title || ""}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
