import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Dogs Trained", value: 1000 },
  { label: "Happy Parents", value: 500 },
  { label: "Years Experience", value: 10 },
  { label: "Google Rating", value: 4.9, isRating: true },
];

function AnimatedCounter({
  target,
  isRating,
}: {
  target: number;
  isRating?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000;
        const start = Date.now();

        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(target * progress));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        animate();
        observer.disconnect();
      }
    });

    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-4xl font-black text-primary">
      {count}
      {isRating ? ".9" : "+"}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-12 bg-background-light border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white/40 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <AnimatedCounter target={stat.value} isRating={stat.isRating} />
                {stat.isRating && (
                  <Star className="w-8 h-8 text-primary fill-primary" />
                )}
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
