import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Founder() {
  return (
    <section id="philosophy" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                alt="Shashank with a dog"
                className="w-full h-[600px] object-cover"
                src="https://greendogacademy.in/wp-content/uploads/2025/12/shash.webp"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl hidden md:block"
            >
              <p className="text-background-dark font-black text-xl italic leading-tight">
                "Leadership is not <br />
                about dominance; <br />
                it's about clarity."
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl font-extrabold mb-8 leading-tight">
              A Philosophy Rooted in <span className="text-primary">Calm Leadership</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                GreenDog Academy was founded by Shashank, whose journey began with a simple observation: most dog training addresses symptoms, not the underlying psychology.
              </p>
              <p>
                Over the last decade, Shashank has developed a method that emphasizes structural care and the owner's role as a calm, confident leader. By understanding how dogs perceive the world, we bridge the communication gap between species.
              </p>
              <p>
                Our approach doesn't just teach tricks; it fosters a state of mind where dogs are relaxed, attentive, and secure in their environment.
              </p>
            </div>
            <div className="mt-10">
              <motion.button
                whileHover={{ x: 10 }}
                className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform"
              >
                Read Our Full Story <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
