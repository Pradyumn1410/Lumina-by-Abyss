import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper";

const FAQS = [
    {
        id: 1,
        question: "What physical fitness is required for an expedition?",
        answer: "Our expeditions vary in physical demand. Submersible descents require no physical exertion beyond boarding — they are entirely passive experiences. Shallow diving programs require basic open-water certification. We provide a full medical consultation prior to booking.",
    },
    {
        id: 2,
        question: "How safe are deep-sea submersibles?",
        answer: "Our submersibles exceed all international safety standards and are certified by Lloyd's Register. They are equipped with redundant life support for 96 hours, independent ballast systems, and real-time satellite communication with surface vessels at all depths.",
    },
    {
        id: 3,
        question: "What is the minimum group size?",
        answer: "Most expeditions accommodate between 2 and 6 guests. Private charters are available for all routes. We intentionally limit group sizes to preserve the intimacy and scientific integrity of each descent.",
    },
    {
        id: 4,
        question: "Can I bring my own research equipment?",
        answer: "Absolutely. We actively welcome citizen science participation. Our operations team will work with you to ensure your equipment is rated for the relevant depth and can be safely deployed during the expedition.",
    },
    {
        id: 5,
        question: "What is the cancellation and rebooking policy?",
        answer: "Expeditions cancelled more than 90 days in advance receive a full credit toward a future booking. Cancellations within 90 days are subject to a 25% fee. We recommend comprehensive travel insurance for all guests.",
    },
];

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <section id="faq" className="section-pad">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <SectionWrapper>
                    <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium text-center text-[#00D2FC]">
                        FAQ
                    </p>
                    <h2 className="font-display font-light text-white text-center mb-16 text-3xl md:text-5xl">
                        Questions from the deep.
                    </h2>
                </SectionWrapper>

                <div className="glass-card p-6 md:p-10 flex flex-col">
                    {FAQS.map((faq, i) => (
                        <SectionWrapper key={faq.id} delay={i * 0.05}>
                            <div className={i > 0 ? "hairline" : ""}>
                                <button
                                    className="w-full flex items-center justify-between py-6 gap-6 text-left cursor-pointer transition-colors duration-300 group"
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    aria-expanded={openId === faq.id}
                                    style={{ background: "none", border: "none" }}
                                >
                                    <span className="font-display text-lg md:text-xl font-light text-white group-hover:text-[#34D399] transition-colors">
                                        {faq.question}
                                    </span>
                                    <span className="text-[#00D2FC] flex-shrink-0 transition-transform duration-300">
                                        {openId === faq.id ? <Minus size={18} /> : <Plus size={18} />}
                                    </span>
                                </button>

                                {openId === faq.id && (
                                    <p className="text-sm font-sans font-light leading-relaxed text-[#B0C4D8] pb-6 pr-6">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        </SectionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
