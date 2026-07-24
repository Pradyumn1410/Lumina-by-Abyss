import React, { useState } from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("success");
        setTimeout(() => setStatus("idle"), 5000);
    };

    return (
        <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Contact Control</h1>
                    <p className="text-[#B0C4D8] text-lg font-light max-w-2xl mx-auto">
                        Whether you are inquiring about a private charter, a scientific partnership, or general information, 
                        our surface command team is ready to assist you.
                    </p>
                </div>
            </SectionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <SectionWrapper delay={0.1}>
                    <div className="glass-panel p-8 md:p-10 rounded-2xl h-full relative overflow-hidden">
                        {status === "success" ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#010812]/90 backdrop-blur-md z-10 text-center animate-fade-in">
                                <div className="w-16 h-16 rounded-full bg-[#00D2FC]/20 flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#00D2FC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl text-white font-display font-light mb-2">Message Transmitted</h3>
                                <p className="text-[#B0C4D8] font-light">Surface control will review your inquiry and respond shortly.</p>
                            </div>
                        ) : null}

                        <h2 className="text-2xl text-white font-display font-light mb-8">Send a Transmission</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#B0C4D8] mb-2">Full Name</label>
                                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D2FC]/50 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#B0C4D8] mb-2">Email Address</label>
                                    <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D2FC]/50 transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#B0C4D8] mb-2">Subject</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D2FC]/50 transition-colors appearance-none">
                                    <option className="bg-[#010812]">General Inquiry</option>
                                    <option className="bg-[#010812]">Private Charter</option>
                                    <option className="bg-[#010812]">Scientific Partnership</option>
                                    <option className="bg-[#010812]">Press & Media</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#B0C4D8] mb-2">Message</label>
                                <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D2FC]/50 transition-colors resize-none"></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 mt-2">Initiate Transmission</button>
                        </form>
                    </div>
                </SectionWrapper>

                {/* Contact Info */}
                <SectionWrapper delay={0.2}>
                    <div className="flex flex-col gap-8 h-full">
                        <div className="glass-panel p-8 rounded-2xl">
                            <span className="text-[#00D2FC] uppercase tracking-widest text-xs mb-2 block">Global Headquarters</span>
                            <h3 className="text-xl text-white font-display font-light mb-4">Port of Monaco</h3>
                            <p className="text-[#B0C4D8] font-light leading-relaxed mb-6">
                                Lumina by Abyss Base Command<br />
                                Quai Antoine 1er<br />
                                98000 Monaco
                            </p>
                            <div className="flex flex-col gap-3">
                                <a href="mailto:info@luminabyabyss.com" className="text-white hover:text-[#00D2FC] transition-colors font-light flex items-center gap-3">
                                    <span className="text-white/30 text-sm">✉</span> info@luminabyabyss.com
                                </a>
                                <a href="tel:+37793100000" className="text-white hover:text-[#00D2FC] transition-colors font-light flex items-center gap-3">
                                    <span className="text-white/30 text-sm">☏</span> +377 93 10 00 00
                                </a>
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl flex-grow">
                            <span className="text-[#00D2FC] uppercase tracking-widest text-xs mb-4 block">Social Networks</span>
                            <div className="flex flex-col gap-4">
                                <a href="#instagram" className="text-white hover:text-[#00D2FC] transition-colors font-light flex items-center justify-between group border-b border-white/5 pb-3">
                                    <span>Instagram</span>
                                    <span className="text-white/30 group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                                <a href="#twitter" className="text-white hover:text-[#00D2FC] transition-colors font-light flex items-center justify-between group border-b border-white/5 pb-3">
                                    <span>X (Twitter)</span>
                                    <span className="text-white/30 group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                                <a href="#linkedin" className="text-white hover:text-[#00D2FC] transition-colors font-light flex items-center justify-between group">
                                    <span>LinkedIn</span>
                                    <span className="text-white/30 group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </main>
    );
}
