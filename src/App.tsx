import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";
import { ContactProvider } from "./context/ContactProvider";
import Legal from "./pages/Legal";
import Map from "./components/Map";
import CTA from "./components/CTA";

export default function App() {
  return (
    <ContactProvider>
      <div className="relative">
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
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
