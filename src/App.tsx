import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Map from "./components/Map";
import CTA from "./components/CTA";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Legal from "./pages/Legal";
import About from "./pages/About";

import { ContactProvider } from "./context/ContactProvider";

export default function App() {
  const location = useLocation();

  // ✅ Meta Pixel PageView tracking on route change
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return (
    <ContactProvider>
      <div className="relative">
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/legal/:slug" element={<Legal />} />
        </Routes>

        <CTA />
        <Map />
        <Footer />
      </div>
    </ContactProvider>
  );
}
