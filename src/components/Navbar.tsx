import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Leaf, Calendar } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(248, 247, 245, 0)", "rgba(248, 247, 245, 0.8)"],
  );
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

  return (
    <motion.header
      style={{
        backgroundColor,
        borderBottom: `1px solid rgba(244, 168, 37, ${borderOpacity.get()})`,
      }}
      className="sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <span className="text-xl font-extrabold tracking-tight text-slate-900 sr-only">
            GreenDog <span className="text-primary">Academy</span>
          </span>
          <img src="/logo.png" alt="GreenDog Academy" className="h-10 " />

          <nav className="hidden md:flex space-x-10">
            {["Philosophy", "Services", "Facility", "Insights"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden lg:flex bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
              Book a Consultation
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-900"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        className="md:hidden overflow-hidden bg-background-light border-b border-primary/10"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {["Philosophy", "Services", "Facility", "Insights"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-3 py-4 text-base font-semibold text-slate-900 hover:bg-primary/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-4">
            <button className="w-full bg-primary hover:bg-primary/90 text-background-dark px-6 py-4 rounded-lg font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              Book a Consultation <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
