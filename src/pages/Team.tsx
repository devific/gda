import { motion } from "motion/react";
import { teamMembers } from "../data";

export default function Team() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-extrabold md:text-5xl">Our Team</h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            Meet the dedicated professionals behind GreenDog Academy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full aspect-square bg-slate-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mb-2 text-2xl font-bold">{member.name}</h3>
              <p className="mb-4 font-medium text-primary">{member.role}</p>
              <p className="text-slate-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
