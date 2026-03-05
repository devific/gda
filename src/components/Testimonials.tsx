import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Jenkins',
    role: 'Golden Retriever Parent',
    text: "The change in Max's behavior was night and day. He came back a more confident and much calmer dog. Shashank truly has a gift.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxnyTl0twPsZjY-3uacKHnCz08LKswNUhTz11mLOBzVk5aJAZh-Vh2nvVgY0EEXHghUEgmv8e-o2biFBtyXhYMuEI3-rxzUVv7XbVmLNfhTXFC9sp9Tw-OMIUJf5qUUetnp4ZdfxarQzRv9Q0XUdjd7fPEKK49JxVqJqPhQw_TZeUj-0MJRIDscyuh9viUOJFEu1_a3exlK1e3TAmW2cZDoymVAH4ZTSHjVO9WJEX3YnCX5zkvQA93k2lwBOMzcc-eBLDZnnDYd_Jg',
  },
  {
    name: 'David Thompson',
    role: 'German Shepherd Parent',
    text: "Finally, a place that doesn't just 'watch' my dog but actually understands him. The boarding facility is immaculate and the structure is perfect.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1fly_5naP3hZkrDfYNkhH3967VhBzqCdwB8dw9AHahHpuziN7tocpKcsV7liRRmLtlxikz6705dokj0zjwG3Vd7Lf4UA_X7Y7ltw7hGXZdHm0jOtXLnFDXLJf4xHIDfz4aXffzHFBPf9-ShSr-s3g1i2F0UPoQVSGEAl-mTOTopXJuxGj8d1FekbEyS5M7NYJZE7szG0x_nJeGVlVPx9uV3m6xZ0zRQwWpsc7pPUFSvfj7bu-f5a8-srJFbemBzh4Gac09KKB0GEw',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Mixed Breed Parent',
    text: 'The online resources and the foundation training helped us as much as it helped our dog. Highly recommend for any serious owner.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFjDhwV_78JxOR1LusElHYS1Z6pWOo-U_CK-E6PuK53m2aH9p_sThqKszLL7vli8issk2fn3pgEFIxUBsP5wJCsH2P_SObRj42WMoOzqdRMTIN1_9udsXxmZ7aN6R9_l9dqTtzwEIDvjAIckT5Zl7p6nZCQgGh7VfsqRSg0PyL5XIFEo93tVyIwi3f7LHSgxwjAA1ccxu-S6Xe8xD-PZ_3YbvWA8PAfsytMmrjsowdBK4pH8rxFEwVhR35cmxcrJHScU82eEkiscjo',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center mb-16 italic"
        >
          Words from Our Pack
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="flex text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary" />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-tighter">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
