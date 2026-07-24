import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function Research() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Scientific Research</h1>
                <p className="text-[#B0C4D8] text-lg font-light mb-16 leading-relaxed">
                    HackOcean is committed to advancing human knowledge of the deep sea. Every commercial expedition 
                    we launch carries specialized sensory equipment, and a portion of all proceeds directly funds 
                    global oceanographic research initiatives.
                </p>
            </SectionWrapper>

            <div className="flex flex-col gap-12">
                <SectionWrapper delay={0.1}>
                    <div className="space-y-16">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-2xl font-display text-white mb-4">Hadal Zone Mapping</h2>
                                <p className="text-sm text-[#B0C4D8] leading-relaxed mb-6">
                                    The Challenger Deep remains less mapped than the surface of Mars. Using state-of-the-art 
                                    multibeam sonar attached to our Titan Class submersibles, we are currently generating 
                                    the highest resolution topographic map of the Mariana Trench ever created.
                                </p>
                            </div>
                            <div className="h-64 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                <span className="text-[#00D2FC] font-mono text-sm tracking-widest">SONAR_IMAGING_OFFLINE</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 h-64 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                <span className="text-[#00D2FC] font-mono text-sm tracking-widest">BIO_SAMPLE_CATALOG_v2</span>
                            </div>
                            <div className="order-1 md:order-2">
                                <h2 className="text-2xl font-display text-white mb-4">Extremophile Documentation</h2>
                                <p className="text-sm text-[#B0C4D8] leading-relaxed mb-6">
                                    Life finds a way. In the crushing pressures of the abyssopelagic zone, we routinely document 
                                    species previously unknown to science. Our exterior robotic manipulator arms collect sediment 
                                    and water samples, which are preserved in pressurized containment units for surface analysis.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-2xl font-display text-white mb-4">Submersible Material Science</h2>
                                <p className="text-sm text-[#B0C4D8] leading-relaxed mb-6">
                                    In partnership with leading engineering universities, Lumina by Abyss serves as a testing ground 
                                for next-generation ROVs (Remotely Operated Vehicles) and AUVs (Autonomous Underwater Vehicles). 
                                We push the boundaries of battery longevity, high-pressure robotics, and acoustic underwater 
                                communication systems.
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
