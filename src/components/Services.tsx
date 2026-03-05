import { motion } from 'motion/react';
import { Home, School, Brain, ExternalLink } from 'lucide-react';

const services = [
  {
    title: 'Dog Boarding',
    description: "Luxury stays in a structured environment that maintains your dog's routine and peace of mind.",
    icon: Home,
    link: '#',
  },
  {
    title: 'Dog Training',
    description: 'From foundational obedience to behavioral modification through psychological insights.',
    icon: School,
    link: '#',
  },
  {
    title: 'Play & Enrichment',
    description: 'Structured socialization and mental stimulation activities designed for canine fulfillment.',
    icon: Brain,
    link: '#',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4"
          >
            Our Professional Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600"
          >
            Comprehensive care and education tailored to your dog's unique personality and your lifestyle needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary transition-all shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
              <a
                href={service.link}
                className="inline-flex items-center text-sm font-bold text-primary group-hover:underline"
              >
                LEARN MORE <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
