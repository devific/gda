import { motion } from "motion/react";

const articles = [
  {
    category: "Behavior",
    title: "Decoding the Calm: Understanding Passive States",
    description:
      "Learn why a dog's state of mind is more important than their physical activity level...",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=500&auto=format&fit=crop",
  },
  {
    category: "Training",
    title: "The First 5 Minutes: Setting the Tone for Every Interaction",
    description:
      "Every time you see your dog, you're training them. Here's how to start right...",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=500&auto=format&fit=crop",
  },
  {
    category: "Socialization",
    title: "Why Your Dog Doesn't Need 'Dog Park Friends'",
    description:
      "Debunking myths about socialization and what your dog actually needs to feel secure...",
    image:
      "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?q=80&w=500&auto=format&fit=crop",
  },
];

const Insights = () => {
  return (
    <section id="insights" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold mb-4">
              Insights into Canine Minds
            </h2>
            <p className="text-slate-600">
              Educating owners for a more harmonious life together.
            </p>
          </motion.div>
          <a href="#" className="text-primary font-bold hidden md:block">
            Read All Articles
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                {article.category}
              </span>
              <h3 className="text-xl font-bold mt-2 mb-4 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {article.description}
              </p>
              <span className="font-bold text-sm">Read More</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
