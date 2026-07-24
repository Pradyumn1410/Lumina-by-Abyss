import SectionWrapper from "../layout/SectionWrapper";

const TESTIMONIALS = [
    {
        id: 1,
        quote: "To descend into the Mariana Trench with Lumina by Abyss was to be reminded of one's profound smallness — and the extraordinary beauty that lies within it.",
        author: "Dr. Elara Voss",
        role: "Marine Biologist, Woods Hole Oceanographic Institution",
    },
    {
        id: 2,
        quote: "The preparation, the team, the vessel — everything communicated one thing: absolute mastery. This is what luxury exploration should feel like.",
        author: "James Harrington",
        role: "Conservation Photographer, National Geographic",
    },
    {
        id: 3,
        quote: "I have dived in 60 countries. Nothing has come close to the silence of the abyss. Lumina by Abyss gave me that gift.",
        author: "Mia Tanaka",
        role: "Freedive World Champion",
    },
];

export default function Testimonials() {
    return (
        <section className="section-pad">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <SectionWrapper>
                    <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium text-center text-[#00D2FC]">
                        Voices from the deep
                    </p>
                    <h2
                        className="font-display font-light text-white text-center mb-16 text-3xl md:text-5xl"
                    >
                        Those who have descended.
                    </h2>
                </SectionWrapper>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <SectionWrapper key={t.id} delay={i * 0.1}>
                            <div className="glass-card p-8 md:p-10 flex flex-col justify-between h-full">
                                <div>
                                    <p className="font-display font-light mb-4 text-[#00D2FC] text-5xl leading-none">
                                        "
                                    </p>
                                    <p className="font-display text-xl font-light italic leading-relaxed text-white mb-8">
                                        {t.quote}
                                    </p>
                                </div>
                                <div className="hairline pt-6">
                                    <p className="text-sm font-medium text-white">{t.author}</p>
                                    <p className="text-xs mt-1 text-[#B0C4D8] font-light">{t.role}</p>
                                </div>
                            </div>
                        </SectionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
