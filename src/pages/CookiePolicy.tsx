import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function CookiePolicy() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Cookie Policy</h1>
                <p className="text-[#B0C4D8] text-sm uppercase tracking-widest font-light mb-16">
                    Effective Date: October 2026
                </p>
            </SectionWrapper>

            <SectionWrapper delay={0.1}>
                <div className="glass-panel p-8 md:p-12 rounded-2xl flex flex-col gap-10">
                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">What Are Cookies?</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            Cookies are small data files placed on your device when you visit our platform. They are essential 
                            for enabling the cinematic 3D rendering environments and ensuring a seamless browsing experience 
                            across different depth zones of the website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">Types of Cookies We Use</h2>
                        
                        <div className="flex flex-col gap-6 mt-4">
                            <div className="border-l-2 border-[#00D2FC]/50 pl-4">
                                <h3 className="text-lg text-white font-display font-light mb-2">Essential Cookies</h3>
                                <p className="text-[#B0C4D8] font-light text-sm">
                                    Required for the core functionality of the site, including WebGL context retention, secure 
                                    registration form submissions, and expedition booking sessions. These cannot be disabled.
                                </p>
                            </div>
                            
                            <div className="border-l-2 border-[#34D399]/50 pl-4">
                                <h3 className="text-lg text-white font-display font-light mb-2">Performance & Analytics</h3>
                                <p className="text-[#B0C4D8] font-light text-sm">
                                    Used to monitor site performance and understand how users interact with our content. We use 
                                    this data to optimize the 3D rendering pipeline for different devices.
                                </p>
                            </div>

                            <div className="border-l-2 border-[#818CF8]/50 pl-4">
                                <h3 className="text-lg text-white font-display font-light mb-2">Preferences</h3>
                                <p className="text-[#B0C4D8] font-light text-sm">
                                    Allows the platform to remember your choices, such as reducing motion or disabling high-density 
                                    particle effects for better performance on older hardware.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">Managing Your Preferences</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            You can control or delete cookies through your browser settings. However, disabling essential 
                            cookies may cause the WebGL background and registration forms to malfunction.
                        </p>
                    </section>
                </div>
            </SectionWrapper>
        </main>
    );
}
