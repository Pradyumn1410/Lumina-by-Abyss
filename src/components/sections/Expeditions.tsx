import { useState } from "react";
import { Link } from "react-router-dom";
import SectionWrapper from "../layout/SectionWrapper";

const EXPEDITIONS = [
    {
        id: "mariana",
        title: "Mariana Trench",
        subtitle: "Pacific Ocean",
        depth: "10,900m",
        duration: "14 days",
        guests: "2 guests",
        description: "Descend to the deepest point on Earth in our flagship research submersible. Witness the extraordinary fauna of the Challenger Deep.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "coral",
        title: "Coral Triangle",
        subtitle: "Indo-Pacific",
        depth: "200m",
        duration: "10 days",
        guests: "4 guests",
        description: "Explore the world's most biodiverse marine ecosystem. Drift through ancient reef structures teeming with undocumented species.",
        image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "arctic",
        title: "Arctic Twilight",
        subtitle: "Svalbard, Norway",
        depth: "800m",
        duration: "12 days",
        guests: "2 guests",
        description: "Journey beneath Arctic sea ice into a twilight world of extraordinary clarity. Encounter narwhals and beluga whales in their polar habitat.",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "azores",
        title: "Azores Abyss",
        subtitle: "Mid-Atlantic Ridge",
        depth: "3,200m",
        duration: "8 days",
        guests: "4 guests",
        description: "Follow the spine of the Atlantic along hydrothermal vent fields. Discover ecosystems that exist entirely independent of sunlight.",
        image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80",
    },
];

export default function Expeditions() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <section id="expeditions" className="section-pad">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <SectionWrapper>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium text-[#00D2FC]">
                                Expeditions
                            </p>
                            <h2 className="font-display font-light text-white m-0 text-3xl md:text-5xl">
                                Choose your descent.
                            </h2>
                        </div>
                        <Link to="/register" className="btn-outline text-xs flex-shrink-0">
                            View All Expeditions
                        </Link>
                    </div>
                </SectionWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {EXPEDITIONS.map((exp, i) => (
                        <SectionWrapper key={exp.id} delay={i * 0.08}>
                            <div
                                className="glass-card relative overflow-hidden group cursor-pointer h-full flex flex-col justify-between"
                                onMouseEnter={() => setHovered(exp.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Photo background */}
                                <img
                                    src={exp.image}
                                    alt={exp.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-35 group-hover:scale-105 group-hover:opacity-45"
                                />

                                {/* Dark Gradient Overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(10,25,47,0.4) 0%, rgba(10,25,47,0.92) 100%)",
                                    }}
                                />

                                <div className="relative p-8 md:p-10 z-10 flex flex-col justify-between h-full">
                                    <div>
                                        {/* Tags */}
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            {[exp.depth, exp.duration, exp.guests].map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[11px] font-sans px-3 py-1 rounded-full backdrop-blur-md bg-[#00D2FC]/10 border border-[#00D2FC]/25 text-[#34D399] tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="text-xs uppercase tracking-[0.18em] mb-2 text-[#B0C4D8] font-light">
                                            {exp.subtitle}
                                        </p>
                                        <h3 className="font-display text-3xl md:text-4xl font-light text-white mb-4">
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm font-sans leading-relaxed text-[#B0C4D8] font-light">
                                            {exp.description}
                                        </p>
                                    </div>

                                    <div className="mt-10 pt-6 hairline">
                                        <Link to="/register" className="text-xs uppercase tracking-widest no-underline font-medium text-[#00D2FC] hover:text-[#34D399] transition-colors inline-flex items-center gap-2">
                                            Reserve Expedition <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SectionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
