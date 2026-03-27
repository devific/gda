import { motion } from "motion/react";

export default function Gallery() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-extrabold md:text-5xl">
            Our Gallery
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            A glimpse into the daily life and training at GreenDog Academy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for gallery images */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden aspect-square rounded-2xl bg-slate-200"
            >
              <img
                src={`https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800&h=800&sig=${i}`}
                alt={`Gallery image ${i}`}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
