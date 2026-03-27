import { motion } from "motion/react";

export default function Team() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Team</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Meet the dedicated professionals behind GreenDog Academy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Placeholder for team members */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="aspect-square rounded-full bg-slate-200 overflow-hidden mb-6 mx-auto w-48 h-48">
                <img
                  src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400&sig=${i}`}
                  alt={`Team member ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Team Member {i}</h3>
              <p className="text-primary font-medium mb-4">
                Canine Behaviorist
              </p>
              <p className="text-slate-600">
                Dedicated to helping dogs and their owners achieve harmony
                through understanding and clear communication.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
