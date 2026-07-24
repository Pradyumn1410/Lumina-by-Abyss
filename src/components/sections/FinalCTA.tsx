import { Link } from "react-router-dom";
import SectionWrapper from "../layout/SectionWrapper";

export default function FinalCTA() {
    return (
        <section className="section-pad-lg relative overflow-hidden">
            {/* Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(129,140,248,0.20) 0%, transparent 70%)",
                }}
            />

            <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
                <SectionWrapper>
                    <p
                        className="text-xs uppercase tracking-widest mb-8 font-medium"
                        style={{ color: "#00D2FC", letterSpacing: "0.25em" }}
                    >
                        Your expedition awaits
                    </p>

                    <h2
                        className="font-display font-light text-white mb-8"
                        style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.1 }}
                    >
                        The ocean does not wait for the prepared.
                    </h2>

                    <p
                        className="text-base leading-loose mb-14 mx-auto"
                        style={{ color: "#B0C4D8", maxWidth: "520px" }}
                    >
                        Reserve your place among the few who have witnessed what lies beneath. Inquiries are reviewed personally and responded to within 48 hours.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        <Link to="/register" className="btn-primary" style={{ fontSize: "0.9rem", padding: "1rem 2.5rem" }}>
                            Begin Your Application
                        </Link>
                        <a href="mailto:expeditions@luminabyabyss.com" className="btn-outline" style={{ fontSize: "0.9rem", padding: "1rem 2.5rem" }}>
                            Contact the Team
                        </a>
                    </div>
                </SectionWrapper>
            </div>
        </section>
    );
}
