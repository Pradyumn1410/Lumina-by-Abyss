import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function Journey() {
    const zones = [
        {
            name: "Surface & Sunlight Zone",
            scientific: "Epipelagic Zone",
            depth: "0m – 200m",
            description: "The top layer of the ocean where enough sunlight penetrates for photosynthesis to occur. This zone is home to 90% of all marine life.",
            facts: ["Contains most of the ocean's coral reefs", "Water temperature ranges from -2°C to 36°C", "Primary domain of sharks, tuna, and sea turtles"],
            color: "border-[#00D2FC]/30"
        },
        {
            name: "Twilight Zone",
            scientific: "Mesopelagic Zone",
            depth: "200m – 1,000m",
            description: "A faintly lit zone where only a small amount of light penetrates. Animals here often have bioluminescent capabilities to camouflage or attract prey.",
            facts: ["Home to the largest animal migration on Earth (diel vertical migration)", "Pressure can reach up to 1,470 psi", "Sperm whales hunt giant squid here"],
            color: "border-[#00838f]/30"
        },
        {
            name: "Midnight Zone",
            scientific: "Bathypelagic Zone",
            depth: "1,000m – 4,000m",
            description: "Completely pitch black, this zone relies entirely on marine snow (falling organic matter) for food. The only light comes from bioluminescent creatures.",
            facts: ["Temperatures hover near freezing at 4°C", "Vampire squids and anglerfish inhabit this region", "Pressure exceeds 5,800 psi"],
            color: "border-[#1a237e]/30"
        },
        {
            name: "The Abyss",
            scientific: "Abyssopelagic Zone",
            depth: "4,000m – 6,000m",
            description: "A freezing, crushing environment covering 83% of the total area of the ocean and 60% of the Earth's surface.",
            facts: ["Completely devoid of light", "Home to tripod fish and deep-sea octopuses", "Incredible pressure of up to 11,000 psi"],
            color: "border-white/10"
        },
        {
            name: "The Trenches",
            scientific: "Hadalpelagic Zone",
            depth: "6,000m – 11,000m",
            description: "The deepest parts of the ocean, found primarily in deep water trenches and canyons. Explored by fewer humans than the surface of the moon.",
            facts: ["Named after Hades, the Greek god of the underworld", "Pressure is a crushing 16,000 psi", "Life here includes amphipods and snailfish"],
            color: "border-black/50"
        },
    ];

    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">The Journey Down</h1>
                <p className="text-[#B0C4D8] text-lg font-light mb-16">
                    Our expeditions descend through five distinct oceanic zones. Each layer presents unique challenges, 
                    drastic changes in pressure, and entirely alien ecosystems.
                </p>
            </SectionWrapper>

            <div className="flex flex-col gap-12">
                {zones.map((zone, idx) => (
                    <SectionWrapper key={zone.name} delay={idx * 0.1}>
                        <div className={`glass-panel p-8 md:p-12 rounded-2xl border-l-4 ${zone.color}`}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                                <div>
                                    <h2 className="text-3xl text-white font-display font-light mb-1">{zone.name}</h2>
                                    <p className="text-[#00D2FC] tracking-widest uppercase text-xs">{zone.scientific}</p>
                                </div>
                                <div className="text-[#E3F2FD] font-mono text-xl">{zone.depth}</div>
                            </div>
                            
                            <p className="text-[#B0C4D8] font-light leading-relaxed mb-8">
                                {zone.description}
                            </p>
                            
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">Scientific Facts</h4>
                                <ul className="list-disc pl-5 flex flex-col gap-2">
                                    {zone.facts.map((fact, i) => (
                                        <li key={i} className="text-[#B0C4D8] font-light text-sm">{fact}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </SectionWrapper>
                ))}
            </div>
        </main>
    );
}
