import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper";

const STATS = [
    { value: 11034, suffix: "m", label: "Maximum depth explored", prefix: "" },
    { value: 47, suffix: "+", label: "Expeditions completed", prefix: "" },
    { value: 312, suffix: "+", label: "Species documented", prefix: "" },
    { value: 18, suffix: "", label: "Research institutions partnered", prefix: "" },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView || !ref.current) return;
        const duration = 1800;
        const start = performance.now();
        const el = ref.current;

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(eased * value);
            el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [isInView, value, suffix, prefix]);

    return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function Statistics() {
    return (
        <section className="section-pad">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <SectionWrapper>
                    <p className="text-xs uppercase tracking-[0.2em] mb-4 font-medium text-center text-[#00D2FC]">
                        By the numbers
                    </p>
                    <h2 className="font-display font-light text-white text-center mb-16 text-3xl md:text-5xl">
                        A decade at depth.
                    </h2>
                </SectionWrapper>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, i) => (
                        <SectionWrapper key={stat.label} delay={i * 0.08}>
                            <div className="glass-card text-center p-8 md:p-10 flex flex-col justify-center items-center h-full">
                                <p className="font-display font-light text-white mb-3 text-4xl md:text-5xl">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                                </p>
                                <p className="text-xs uppercase tracking-[0.15em] leading-relaxed text-[#B0C4D8] font-light">
                                    {stat.label}
                                </p>
                            </div>
                        </SectionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
