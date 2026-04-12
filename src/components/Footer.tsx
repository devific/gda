import { Link } from "react-router-dom";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Share2,
} from "lucide-react";
import { navItems } from "./Navbar";
import {
  SiInstagram,
  SiFacebook,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

const socials = [
  { icon: SiInstagram, href: "https://www.instagram.com/greendog_academy" },
  { icon: SiYoutube, href: "https://www.youtube.com/@greendogacademy" },
  {
    icon: SiFacebook,
    href: "https://www.facebook.com/profile.php?id=61550998962841",
  },
];

export default function Footer() {
  return (
    <footer className="py-16 bg-background-dark text-slate-400">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6 text-white">
              <img
                src="/logo-white.png"
                alt="GreenDog Academy"
                className="h-10"
              />
            </div>
            <p className="max-w-sm mb-6 text-sm leading-relaxed">
              Greendog Academy offers top-notch boarding and training facilities
              based on outstanding care and enduring trust. It prioritises a
              safe, secure, and caring environment where each dog feels at home
              while collaborating with seasoned professionals.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-slate-400 hover:text-white"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold tracking-widest text-white uppercase">
              Contact
            </h4>
            <ul className="flex flex-col space-y-4 text-sm">
              <a href="https://maps.app.goo.gl/7qFFmzep5BKwTH3W8">
                {" "}
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-primary shrink-0" />
                  115/4, Hoskote Taluk, Kambalipura, Hoskote, Kambalipura,
                  Karnataka 562165
                </li>
              </a>
              <a href="mailto:infogreendogacademy@gmail.com">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 text-primary shrink-0" />
                  infogreendogacademy@gmail.com
                </li>
              </a>
              <a href="tel:+916362946590">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 text-primary shrink-0" />
                  +91 636 294 6590
                </li>
              </a>
              <a href="tel:+917975460376">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 text-primary shrink-0" />
                  +91 797 546 0376
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs border-t border-slate-800 md:flex-row">
          <p>©2026 GreenDog Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              to="/legal/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/legal/terms"
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <a
        href="https://devific.in/?ref=greendogacademy.in"
        target="_blank"
        className="hidden"
      >
        Devific
      </a>
    </footer>
  );
}
