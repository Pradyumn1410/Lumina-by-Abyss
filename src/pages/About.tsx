import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function About() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">About Lumina by Abyss</h1>
                <p className="text-[#B0C4D8] text-lg font-light mb-16 leading-relaxed max-w-3xl">
                    Lumina by Abyss is a premium cinematic exploration platform inspired by real-world ocean research and 
                    the greatest marine documentaries ever filmed. We bridge the gap between scientific discovery and 
                    luxury adventure, offering unprecedented access to the deep ocean.
                </p>
            </SectionWrapper>

            <div className="flex flex-col gap-12">
                <SectionWrapper delay={0.1}>
                    <div className="glass-panel p-8 md:p-12 rounded-2xl border-l-4 border-[#00D2FC]/30">
                        <h2 className="text-3xl text-white font-display font-light mb-4">Our Mission</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            To unveil the mysteries of the deep ocean to those who seek Earth's last undiscovered frontier. 
                            We believe that direct human experience in the deep sea fosters a profound respect for our planet's 
                            most critical ecosystem. By facilitating these journeys, we fund essential marine research and 
                            conservation efforts.
                        </p>
                    </div>
                </SectionWrapper>

                <SectionWrapper delay={0.2}>
                    <div className="glass-panel p-8 md:p-12 rounded-2xl border-l-4 border-[#34D399]/30">
                        <h2 className="text-3xl text-white font-display font-light mb-4">Vision</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            A world where the abyss is no longer a void of darkness, but a beacon of inspiration. 
                            We envision a future where deep-sea exploration is as revered and technologically advanced 
                            as space travel, cultivating a global community of ocean stewards.
                        </p>
                    </div>
                </SectionWrapper>

                <SectionWrapper delay={0.3}>
                    <div className="glass-panel p-8 md:p-12 rounded-2xl border-l-4 border-[#818CF8]/30">
                        <h2 className="text-3xl text-white font-display font-light mb-4">Technology & Safety</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed mb-6">
                            Our fleet utilizes state-of-the-art titanium and acrylic pressure spheres capable of withstanding 
                            up to 16,000 psi. Equipped with cinematic 8K lighting arrays and ultra-sensitive sonar, our 
                            submersibles are marvels of modern engineering.
                        </p>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            Safety is our absolute priority. Every expedition undergoes rigorous multi-stage redundancy checks, 
                            is tracked in real-time by our surface support vessels, and is piloted by veterans with thousands 
                            of hours logged in the bathypelagic zone.
                        </p>
                    </div>
                </SectionWrapper>

                <SectionWrapper delay={0.4}>
                    <div className="glass-panel p-8 md:p-12 rounded-2xl border-l-4 border-[#FBBF24]/30">
                        <h2 className="text-3xl text-white font-display font-light mb-4">Scientific Inspiration</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            Lumina by Abyss was born from a singular obsession — to make humanity's relationship with the deep ocean. 
                            Born from a love of natural history programming and the pioneering spirit of early oceanographers, 
                            Lumina by Abyss aims to capture the awe-inspiring beauty of the Blue Planet. We work closely with 
                            marine biologists to ensure our operations leave zero footprint while contributing valuable data 
                            to global oceanic databases.
                        </p>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
