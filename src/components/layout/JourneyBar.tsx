import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ZONES = [
    {
        label: "Surface",
        id: "hero",
        depth: "0 m",
        fact: "Over 90% of all known marine life exists within sunlight.",
    },
    {
        label: "Epipelagic",
        id: "about",
        depth: "0–200 m",
        fact: "Photosynthesis is still possible at this depth.",
    },
    {
        label: "Mesopelagic",
        id: "journey",
        depth: "200–1000 m",
        fact: "Most creatures here generate their own light through bioluminescence.",
    },
    {
        label: "Bathypelagic",
        id: "expeditions",
        depth: "1000–4000 m",
        fact: "Sunlight never reaches this zone.",
    },
    {
        label: "Abyssopelagic",
        id: "gallery",
        depth: "4000–6000 m",
        fact: "Water pressure exceeds hundreds of times atmospheric pressure.",
    },
    {
        label: "Hadal Trench",
        id: "faq",
        depth: "6000–11000 m",
        fact: "Only a tiny fraction of Earth's oceans have ever been explored.",
    },
];

export default function JourneyBar() {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const docElement = document.documentElement;
            const docHeight = docElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const pct = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
            setScrollPercent(pct);

            // Find current section using midpoint tracking
            let currentIdx = 0;
            const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
            const viewportCenter = window.innerHeight * 0.5;

            if (isAtBottom) {
                currentIdx = ZONES.length - 1;
            } else {
                for (let i = 0; i < ZONES.length; i++) {
                    const el = document.getElementById(ZONES[i].id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        // Active if section top has entered upper half of screen
                        if (rect.top <= viewportCenter) {
                            currentIdx = i;
                        }
                    }
                }
            }
            setActiveIndex(currentIdx);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initial trigger
        setTimeout(handleScroll, 100);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigate = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center gap-6 pointer-events-auto">
            {/* Title / Label indicator */}
            <div className="flex flex-col items-end gap-10 select-none">
                {ZONES.map((zone, idx) => {
                    const isActive = idx === activeIndex;
                    const isCompleted = idx < activeIndex;
                    const isFuture = idx > activeIndex;

                    return (
                        <div
                            key={zone.label}
                            onClick={() => handleNavigate(zone.id)}
                            className="flex flex-col items-end cursor-pointer group transition-all duration-500"
                            style={{
                                opacity: isActive ? 1.0 : isCompleted ? 0.45 : 0.20,
                                transform: isActive ? "scale(1.05) translateX(0)" : "scale(0.95) translateX(4px)",
                            }}
                        >
                            <span
                                className="text-xs uppercase font-light tracking-widest text-right transition-colors duration-300"
                                style={{
                                    color: isActive ? "#00D2FC" : "#E3F2FD",
                                    letterSpacing: "0.15em",
                                }}
                            >
                                {zone.label}
                            </span>
                            <span className="text-[10px] font-sans font-extralight tracking-wider opacity-60 text-right">
                                {zone.depth}
                            </span>

                            {/* Active Scientific Fact */}
                            <AnimatePresence mode="wait">
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="text-[11px] max-w-[200px] text-right font-sans font-light mt-1.5 leading-relaxed text-[#B0C4D8]"
                                        style={{
                                            textShadow: "0 2px 4px rgba(0,0,0,0.4)"
                                        }}
                                    >
                                        {zone.fact}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Vertical progress bar */}
            <div className="relative w-1 h-[320px] bg-white/5 rounded-full overflow-visible">
                {/* Foreground active line */}
                <div
                    className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#34D399] to-[#00D2FC] rounded-full transition-all duration-300 ease-out"
                    style={{
                        height: `${scrollPercent * 100}%`,
                        boxShadow: "0 0 10px rgba(0,210,252,0.5)",
                    }}
                />

                {/* Ticks for each zone */}
                {ZONES.map((zone, idx) => {
                    const posPct = (idx / (ZONES.length - 1)) * 100;
                    const isActive = idx === activeIndex;
                    const isCompleted = idx < activeIndex;

                    return (
                        <div
                            key={zone.id}
                            onClick={() => handleNavigate(zone.id)}
                            className="absolute left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-500"
                            style={{
                                top: `${posPct}%`,
                                transform: `translate(-50%, -50%) ${isActive ? "scale(1.4)" : "scale(1)"}`,
                            }}
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full border transition-all duration-500"
                                style={{
                                    background: isActive || isCompleted ? "#00D2FC" : "rgba(10, 25, 47, 0.9)",
                                    borderColor: isActive || isCompleted ? "#34D399" : "rgba(255, 255, 255, 0.2)",
                                    boxShadow: isActive ? "0 0 8px #00D2FC" : "none",
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
