import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WaveLayers from "../decorative/WaveLayers";
import SeagullFlock from "../decorative/SeagullFlock";

const HEADING_WORDS = ["DESCEND", "INTO THE", "UNKNOWN"];

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
            style={{ paddingTop: "72px" }}
        >
            {/* Ambient radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 35%, rgba(255,174,99,0.16) 0%, rgba(30,108,168,0.10) 60%, transparent 85%)",
                }}
            />

            {/* 2D Seagull Flock overlay */}
            <SeagullFlock />

            {/* Content — z-1 ensures content stays inside page content layer */}
            <div className="relative z-1 max-w-6xl mx-auto px-6">
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs uppercase tracking-widest mb-12 font-light"
                    style={{ color: "#00D2FC", letterSpacing: "0.25em" }}
                >
                    Luxury Deep Ocean Expeditions
                </motion.p>

                {/* Main heading — NO overflow-hidden to prevent text clipping */}
                <div>
                    {HEADING_WORDS.map((word, i) => (
                        <motion.h1
                            key={word}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.0,
                                delay: 0.4 + i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="font-display block m-0 leading-none text-white"
                            style={{
                                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                                fontWeight: 300,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {word}
                        </motion.h1>
                    ))}
                </div>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 mb-14 text-base md:text-lg font-light leading-relaxed mx-auto"
                    style={{
                        color: "#B0C4D8",
                        maxWidth: "560px",
                        letterSpacing: "0.01em",
                    }}
                >
                    Explore Earth's final frontier through luxury deep-ocean expeditions
                    inspired by the greatest marine documentaries ever filmed.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/register" className="btn-primary">
                        Begin Expedition
                    </Link>
                    <a href="#expeditions" className="btn-outline">
                        Explore Routes
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 1.2 }}
                    className="mt-24 flex flex-col items-center gap-3"
                >
                    <p className="text-xs uppercase tracking-widest" style={{ color: "#B0C4D8", letterSpacing: "0.2em" }}>
                        Scroll
                    </p>
                    <div
                        className="w-px h-12 rounded-full"
                        style={{
                            background: "linear-gradient(to bottom, #00D2FC, transparent)",
                            animation: "particleDrift 2s ease-in-out infinite",
                        }}
                    />
                </motion.div>
            </div>

            {/* SVG Waves at bottom */}
            <WaveLayers />
        </section>
    );
}
