import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function PrivacyPolicy() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Privacy Policy</h1>
                <p className="text-[#B0C4D8] text-sm uppercase tracking-widest font-light mb-16">
                    Last Updated: October 2026
                </p>
            </SectionWrapper>

            <SectionWrapper delay={0.1}>
                <div className="glass-panel p-8 md:p-12 rounded-2xl flex flex-col gap-10">
                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">1. Information We Collect</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed mb-4">
                            When you register for a Lumina by Abyss expedition, we collect personal information necessary to ensure your 
                            safety and facilitate your journey. This includes your name, contact information, medical history 
                            (as required for high-pressure environments), and emergency contacts.
                        </p>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            We also automatically collect technical data regarding your interaction with our digital platforms, 
                            including IP addresses, browser types, and usage patterns to optimize the cinematic web experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">2. How We Use Your Data</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed mb-4">
                            Your personal and medical data is used strictly for logistical and safety purposes during the 
                            expedition planning and execution phases. We do not sell your personal data to third parties.
                        </p>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            Anonymized, aggregated usage data may be shared with our scientific partners to improve the accessibility 
                            of oceanographic research presented on this platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">3. Data Security</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            We employ military-grade encryption to protect your sensitive information. Access to medical records 
                            is restricted exclusively to our Chief Medical Officer and the expedition dive master assigned to your 
                            submersible.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">4. Your Rights</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            You have the right to request access to, modification of, or deletion of your personal data at any time. 
                            Please contact our data protection officer at <a href="mailto:privacy@luminabyabyss.com" className="text-[#00D2FC] hover:text-white transition-colors">privacy@luminabyabyss.com</a> to exercise these rights.
                        </p>
                    </section>
                </div>
            </SectionWrapper>
        </main>
    );
}
