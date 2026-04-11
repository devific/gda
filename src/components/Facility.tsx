import { motion } from "motion/react";
import { Link } from "react-router-dom";

const images = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcggThiQmiitwlw0WaepTWQeQOxvnDJJpbu7yjVTy7BtF6YO1_zh6LFq-A8BIP5_ZlsX25vb_OKWeKxwZ445Tn82-3Avn_hOrGr3aRrh90ftY_0T8x49HJG_bh8kcnf3_6ZVRlwPRiWmTjYkeMkDiqi4XzT7O9gZc-GXnfGeJL1O9tIT0FCPSJqNHYVQ0V-hNSEbK7XlxtxpgNS-oNZfMWUr-rgC3CqcHxR9CqtXkrtmuZk3euz5g3ifSs62WY117JDHqjtajzeEj8",
    alt: "Training yard",
    className: "md:col-span-2 md:row-span-2 h-[500px]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiz0-rdEPx7FhdhMT3bCZ8KSXo50lZW9t4vvp7Ri6NbulEUveZqwmaOO2Cv5mLSNZvt9v2iCzzisVDHiLzWdSClULgWEk7YWnw8xM2PtzGm02J1ZFj1uFxDFlNAAT5vIst5FlKTaGcSndHyJiUJwE86swezYRofGPww-u5J6gjEjeOLHKgAwycXiD-3xkb_evsPo_LkFcMGiMHFopl_dZEo4dXX0lwo0vEJrY5ETi8_zQZQHIzP8XugRGkt3Q0OWQ2UGFNCgL7C2IC",
    alt: "Indoor kennels",
    className: "h-[242px]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIhvWdizUXZHlGx9woMb8FASGDornTlkGA_E5mBm8S2sOmPqRuA-rJeLD5eCwDhNN7rlru3uAvqGckqNbV7hSXq4I5whUsjSln6nAlfW8ewsNiCoLiZDXdGgqYd-_3zR9V-PqwjmKtYVrcLCdMX2rMvXODhgdXeMe4zC9XZrUah7g9FPO03REpIsRuNImeCTkYVPY8evgSngp5ssvULms2JxqdslPqJLYsPWK6QMdhwoHgTGRbIbIWMBcX-3pRsYjqWiT4sEip9osF",
    alt: "Agility zone",
    className: "h-[242px]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxDh4FT0JOmMkY5jKfvF3gwSrivmhoDI91Rs7nCYq2cN87u1A3MzuwUt5eYAqiqwZK6vx-ND1jswUNCIQ1fRmHRhRss9LAbxSyshvmBnzKq7JGmIN6ap3CzsH7Ww3jucrzQO8tutMuV2aEZxEBOQAAwz2im_LXqWR0r-FTcAZoo9vlYiQG5_WOJ4xBGBlpTcX6Dp5H1fNc0t4wjGuA9nurKk20Ysbs7Q6UG40prGv8MjQOG24xCliUlMyLefNkrmaIqnK08LUfOiS5",
    alt: "Relaxation area",
    className: "md:col-span-2 h-[242px]",
  },
];

export default function Facility() {
  return (
    <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
      <iframe
        src="https://player.vimeo.com/video/1180771480?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        title="Greendog Academy Location"
      ></iframe>
    </div>
  );

  return (
    <section id="facility" className="py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-extrabold">
              A World-Class Facility
            </h2>
            <p className="text-slate-600">
              Clean, secure, and designed for optimal dog comfort and learning.
            </p>
          </motion.div>
          <Link to="/gallery">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden px-6 py-3 text-sm font-bold text-white rounded-lg md:block bg-slate-900"
            >
              View Gallery
            </motion.span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden group relative ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100">
                <span className="text-lg font-bold text-white">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
