import SectionWrapper from "../layout/SectionWrapper";

const ZONES = [
    {
        label: "Surface",
        depth: "0 — 10m",
        description: "The ocean begins here. Sunlight floods the shallows, illuminating a world teeming with colour and life.",
        accent: "#34D399",
    },
    {
        label: "Sunlight Zone",
        depth: "10 — 200m",
        description: "The epipelagic zone — home to coral reefs, whale sharks, and the vast majority of marine biodiversity.",
        accent: "#00D2FC",
    },
    {
        label: "Twilight Zone",
        depth: "200 — 1,000m",
        description: "Light dissolves into shadow. Bioluminescent creatures hunt in near-darkness. The pressure becomes palpable.",
        accent: "#818CF8",
    },
    {
        label: "Midnight Zone",
        depth: "1,000 — 4,000m",
        description: "Total darkness. Eternal cold. Life persists through chemical energy — strange, silent, and extraordinarily rare.",
        accent: "#164170",
    },
    {
        label: "Abyss",
        depth: "4,000 — 6,000m",
        description: "The abyssal plain stretches across 60% of the ocean floor. Almost entirely unexplored. An alien wilderness.",
        accent: "#122D4F",
    },
    {
        label: "Hadal Trench",
        depth: "6,000 — 11,034m",
        description: "The deepest places on Earth. Immense pressure, sub-zero temperatures, and a silence no human has yet fully heard.",
        accent: "#0D2847",
    },
];

export default function OceanJourney() {
    return (
        <section id="journey" className="section-pad-lg">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <SectionWrapper>
                    <p className="text-xs uppercase tracking-widest mb-4 font-medium text-center" style={{ color: "#00D2FC", letterSpacing: "0.2em" }}>
                        The Descent
                    </p>
                    <h2
                        className="font-display font-light text-center text-white mb-20"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                    >
                        Journey Through the Ocean
                    </h2>
                </SectionWrapper>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
                        style={{
                            background: "linear-gradient(to bottom, #00D2FC, #0D2847)",
                            transform: "translateX(-50%)",
                        }}
                    />

                    <div className="flex flex-col gap-16">
                        {ZONES.map((zone, i) => (
                            <SectionWrapper key={zone.label} delay={i * 0.08}>
                                <div className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8 md:gap-16`}>
                                    {/* Dot */}
                                    <div
                                        className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full border flex-shrink-0"
                                        style={{
                                            transform: "translate(-50%, 4px)",
                                            background: zone.accent,
                                            borderColor: zone.accent,
                                            boxShadow: `0 0 20px ${zone.accent}40`,
                                        }}
                                    />

                                    {/* Card */}
                                    <div className={`ml-12 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:text-right" : "md:text-left md:ml-auto"}`}>
                                        <div
                                            className="glass rounded-xl p-6"
                                            style={{ borderColor: `${zone.accent}20` }}
                                        >
                                            <p
                                                className="text-xs uppercase tracking-widest mb-1 font-medium"
                                                style={{ color: zone.accent, letterSpacing: "0.15em" }}
                                            >
                                                {zone.depth}
                                            </p>
                                            <p className="font-display text-2xl font-light text-white mb-3">{zone.label}</p>
                                            <p className="text-sm leading-relaxed" style={{ color: "#B0C4D8" }}>
                                                {zone.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SectionWrapper>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
