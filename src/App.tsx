import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import JourneyBar from "./components/layout/JourneyBar";
import FloatingParticles from "./components/decorative/FloatingParticles";
import FishSilhouettes from "./components/decorative/FishSilhouettes";
import Home from "./pages/Home";
import Expedition from "./pages/Expedition";
import Register from "./pages/Register";
import Logs from "./pages/Logs";
// New Footer Pages
import Expeditions from "./pages/Expeditions";
import Journey from "./pages/Journey";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Research from "./pages/Research";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

export default function App() {
    return (
        <div className="ocean-bg min-h-screen relative">
            {/* Noise texture overlay */}
            <div className="noise-overlay" />

            {/* Ambient decorative layer */}
            <FloatingParticles count={25} />
            <FishSilhouettes />

            {/* Navigation and Journey tracking */}
            <Navbar />
            <JourneyBar />

            {/* Pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/expedition" element={<Expedition />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logs" element={<Logs />} />
                
                {/* Footer Routes */}
                <Route path="/expeditions" element={<Expeditions />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/research" element={<Research />} />
                <Route path="/press" element={<Press />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Routes>
        </div>
    );
}