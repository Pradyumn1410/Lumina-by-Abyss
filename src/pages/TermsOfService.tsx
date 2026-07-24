import React from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function TermsOfService() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Terms of Service</h1>
                <p className="text-[#B0C4D8] text-sm uppercase tracking-widest font-light mb-16">
                    Effective Date: October 2026
                </p>
            </SectionWrapper>

            <SectionWrapper delay={0.1}>
                <div className="glass-panel p-8 md:p-12 rounded-2xl flex flex-col gap-10">
                    <section>
                        <h2 className="text-2xl text-white font-display font-light mb-4">1. Acceptance of Terms</h2>
                        <p className="text-[#B0C4D8] font-light leading-relaxed">
                            By accessing the Lumina by Abyss platform or registering for an expedition, you agree to be bound by 
                            these Terms of Service. If you do not agree with any part of these terms, you may not 
                            access the service.
                        </p>

                        <h2 className="text-xl font-display text-white mt-12 mb-4">2. Eligibility and Certification</h2>
                        <p className="mb-4">
                            Participation in a Lumina by Abyss submersible expedition requires participants to be at least 18 years 
                            old and possess valid medical clearance. You are responsible for ensuring that your physical 
                            condition allows for deep-sea travel. We reserve the right to deny boarding if safety 
                            standards are not met.
                        </p>

                        <h2 className="text-xl font-display text-white mt-12 mb-4">3. Booking and Cancellations</h2>
                        <p className="mb-4">
                            All bookings are subject to availability and weather conditions. A non-refundable deposit is 
                            required to secure your expedition slot. Cancellations made within 30 days of the scheduled 
                            departure will incur a 50% penalty fee. Lumina by Abyss reserves the right to reschedule dives 
                            due to adverse maritime conditions.
                        </p>

                        <h2 className="text-xl font-display text-white mt-12 mb-4">4. Intellectual Property</h2>
                        <p className="mb-8">
                            All content on this website, including but not limited to images, 3D models, branding, 
                            and text, is the exclusive property of Lumina by Abyss. You may not reproduce, distribute, or create 
                            derivative works without explicit written permission.
                        </p>
                    </section>
                </div>
            </SectionWrapper>
        </main>
    );
}
