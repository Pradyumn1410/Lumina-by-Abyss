import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function Press() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Press & Media</h1>
                <p className="text-[#B0C4D8] text-lg font-light mb-16 leading-relaxed">
                    Official announcements, brand assets, and media contact information for Lumina by Abyss.
                </p>
            </SectionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <SectionWrapper delay={0.1}>
                    <div className="glass-panel p-8 h-full rounded-2xl border-t border-white/10">
                        <span className="text-[#00D2FC] uppercase tracking-widest text-xs mb-3 block">Latest Announcement</span>
                        <h3 className="text-2xl text-white font-display font-light mb-4">Project Deep Blue Initiated</h3>
                        <p className="text-[#B0C4D8] font-light text-sm leading-relaxed mb-6">
                            Lumina by Abyss successfully completes the maiden voyage of the Triton 3300/3 to the bottom of the 
                            Mariana Trench, capturing the first-ever 8K cinematic footage of the Challenger Deep.
                        </p>
                        <a href="#read-more" className="text-[#00D2FC] hover:text-white transition-colors text-sm uppercase tracking-widest">Read Press Release →</a>
                    </div>
                </SectionWrapper>

                <SectionWrapper delay={0.2}>
                    <div className="glass-panel p-8 h-full rounded-2xl border-t border-white/10 flex flex-col justify-between">
                        <div>
                            <span className="text-[#00D2FC] uppercase tracking-widest text-xs mb-3 block">Media Kit</span>
                            <h3 className="text-2xl text-white font-display font-light mb-4">Download Assets</h3>
                            <p className="text-[#B0C4D8] font-light text-sm leading-relaxed mb-6">
                                Access our official media kit containing high-resolution logos, brand guidelines, and 
                                press-approved expedition photography.
                            </p>
                        </div>
                        <button className="btn-outline w-full text-center py-3">Download ZIP (142 MB)</button>
                    </div>
                </SectionWrapper>
            </div>

            <SectionWrapper delay={0.3}>
                <div className="glass-panel p-8 md:p-12 rounded-2xl text-center">
                    <h2 className="text-3xl text-white font-display font-light mb-4">Press Contact</h2>
                    <p className="text-[#B0C4D8] font-light mb-6">
                        For interview requests, media inquiries, and press access to our facilities, please contact our 
                        public relations team.
                    </p>
                    <a href="mailto:press@luminabyabyss.com" className="text-2xl font-light text-[#00D2FC] hover:text-white transition-colors">
                        press@luminabyabyss.com
                    </a>
                </div>
            </SectionWrapper>
        </main>
    );
}
