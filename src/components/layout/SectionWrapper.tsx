import { useRef, useEffect } from "react";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    id?: string;
}

export default function SectionWrapper({ children, className = "", delay = 0, id }: SectionWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Apply staggered delay via CSS custom property
        if (delay > 0) {
            el.style.transitionDelay = `${delay}s`;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Set revealed — this is permanent, text will NEVER disappear again
                    el.setAttribute("data-revealed", "true");
                    // Stop observing — no further toggling possible
                    observer.unobserve(el);
                }
            },
            { threshold: 0.05 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [delay]);

    return (
        <div
            id={id}
            ref={ref}
            className={`section-reveal ${className}`}
        >
            {children}
        </div>
    );
}
