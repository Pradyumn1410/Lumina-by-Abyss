import SectionWrapper from "../layout/SectionWrapper";

export default function About() {
    return (
        <section id="about" className="section-pad">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image */}
                    <SectionWrapper delay={0}>
                        <div
                            className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            style={{ aspectRatio: "4/5" }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
                                alt="Deep ocean exploration"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                            <div
                                className="absolute bottom-0 left-0 right-0 p-8 z-10"
                                style={{ background: "linear-gradient(to top, rgba(10,25,47,0.95) 0%, transparent 100%)" }}
                            >
                                <p className="font-display text-4xl font-light text-white">11,034m</p>
                                <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "#00D2FC", letterSpacing: "0.15em" }}>
                                    Maximum depth reached
                                </p>
                            </div>
                        </div>
                    </SectionWrapper>

                    {/* Copy */}
                    <SectionWrapper delay={0.15}>
                        <p
                            className="text-xs uppercase tracking-widest mb-6 font-medium"
                            style={{ color: "#00D2FC", letterSpacing: "0.2em" }}
                        >
                            About HackOcean
                        </p>

                        <h2
                            className="font-display font-light leading-tight mb-8 text-white"
                            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
                        >
                            Where science meets the art of exploration.
                        </h2>

                        <p className="text-base leading-loose mb-6" style={{ color: "#B0C4D8" }}>
                            HackOcean was born from a singular obsession — to make humanity's relationship with the deep ocean
                            as intimate and accessible as the greatest natural history films ever made.
                        </p>

                        <p className="text-base leading-loose mb-10" style={{ color: "#B0C4D8" }}>
                            We design expeditions that merge the precision of oceanographic research with the reverence of
                            luxury travel. Every descent is curated. Every moment documented. Every discovery preserved.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-10">
                            {[["Est. 2019", "Year founded"], ["47 Expeditions", "Completed"], ["12 Nations", "Waters explored"]].map(([value, label]) => (
                                <div key={label}>
                                    <p className="font-display text-3xl font-light text-white">{value}</p>
                                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "#B0C4D8", letterSpacing: "0.12em" }}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </SectionWrapper>
                </div>
            </div>
        </section>
    );
}
