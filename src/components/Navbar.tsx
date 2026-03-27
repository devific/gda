import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Leaf, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContact } from "../context/ContactProvider";

export const navItems = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Team", path: "/team" },
  { name: "Blog", path: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(248, 247, 245, 0)", "rgba(248, 247, 245, 0.8)"],
  );
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);
  const { openContactDialog } = useContact();

  return (
    <motion.header
      style={{
        backgroundColor,
        borderBottom: `1px solid rgba(244, 168, 37, ${borderOpacity.get()})`,
      }}
      className="sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-extrabold tracking-tight sr-only text-slate-900">
              GreenDog <span className="text-primary">Academy</span>
            </span>
            <img src="/logo.png" alt="GreenDog Academy" className="h-10 " />
          </Link>

          <nav className="hidden space-x-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold hover:text-primary transition-colors ${pathname === item.path ? "text-primary" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsOpen(false);
                openContactDialog();
              }}
              className="hidden lg:flex bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20"
            >
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
        className="overflow-hidden border-b md:hidden bg-background-light border-primary/10"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors ${pathname === item.path ? "bg-primary/10 text-primary" : "text-slate-900"}`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4">
            <button
              onClick={() => {
                setIsOpen(false);
                openContactDialog();
              }}
              className="flex items-center justify-center w-full gap-2 px-6 py-4 text-base font-bold rounded-lg shadow-lg bg-primary hover:bg-primary/90 text-background-dark shadow-primary/20"
            >
              Book a Consultation <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
