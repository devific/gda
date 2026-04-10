import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const features = [
  {
    name: "Care Philosophy",
    typical: "Containment based",
    greendog: "Psychology & Leadership",
  },
  {
    name: "Socialization",
    typical: "Free-for-all chaos",
    greendog: "Structured & Supervised",
  },
  {
    name: "Staff Expertise",
    typical: "General caretakers",
    greendog: "Trained Behaviorists",
  },
  {
    name: "Daily Routine",
    typical: "Irregular exercise",
    greendog: "Precision Schedule",
  },
];

export default function Comparison() {
  return (
    <section className="py-24 bg-background-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            The GreenDog Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600"
          >
            Why choosing professional psychology-based care matters.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white"
        >
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="sticky left-0 z-20 bg-slate-50 p-3 lg:px-8 lg:py-6 text-sm font-bold uppercase tracking-wider border-r border-slate-200">
                  Features
                </th>
                <th className="p-3 lg:px-8 lg:py-6 text-sm font-bold uppercase tracking-wider text-slate-400">
                  Typical Boarding
                </th>
                <th className="p-3 lg:px-8 lg:py-6 text-sm font-bold uppercase tracking-wider text-primary">
                  GreenDog Academy
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {features.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group  transition-colors"
                >
                  <td className="sticky left-0 z-10 bg-white  p-3 lg:px-8 lg:py-6 font-medium border-r border-slate-200 transition-colors">
                    {feature.name}
                  </td>
                  <td className="p-3 lg:px-8 lg:py-6 text-slate-500">
                    {feature.typical}
                  </td>
                  <td className="p-3 lg:px-8 lg:py-6 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />{" "}
                    {feature.greendog}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
