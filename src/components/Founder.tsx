import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { imagekitBaseUrl } from "../data";
import { Link } from "react-router-dom";

export default function Founder() {
  return (
    <section id="philosophy" className="py-24 overflow-hidden">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-1/2"
          >
            <div className="absolute w-24 h-24 rounded-full -top-4 -left-4 bg-primary/20 blur-3xl"></div>
            <div className="relative overflow-hidden shadow-2xl rounded-2xl">
              <img
                alt="Shashank with a dog"
                className="w-full h-[600px] object-cover"
                src={`${imagekitBaseUrl}/notes/shash.webp?tr=f-auto,q-auto,w-800`}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute hidden p-8 -bottom-6 -right-6 bg-primary rounded-2xl md:block"
            >
              <p className="text-xl italic font-black leading-tight text-background-dark">
                "Leadership is not <br />
                about dominance; <br />
                it's about clarity."
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="mb-8 text-4xl font-extrabold leading-tight">
              A Philosophy Rooted in{" "}
              <span className="text-primary">Calm Leadership</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                GreenDog Academy was founded by Shashank, whose journey began
                with a simple observation: most dog training addresses symptoms,
                not the underlying psychology.
              </p>
              <p>
                Over the last decade, Shashank has developed a method that
                emphasizes structural care and the owner's role as a calm,
                confident leader. By understanding how dogs perceive the world,
                we bridge the communication gap between species.
              </p>
              <p>
                Our approach doesn't just teach tricks; it fosters a state of
                mind where dogs are relaxed, attentive, and secure in their
                environment.
              </p>
            </div>
            <div className="mt-10">
              <Link to="/about">
                <motion.span
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2 font-bold transition-transform text-primary hover:translate-x-2"
                >
                  Read Our Full Story <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
