import { useMemo } from "react";

interface Particle {
    id: number;
    left: string;
    top: string;
    size: number;
    delay: string;
    duration: string;
    color: string;
    opacity: number;
}

export default function FloatingParticles({ count = 25 }: { count?: number }) {
    const particles = useMemo<Particle[]>(() => {
        // Natural marine snow & tiny plankton colors (no neon)
        const colors = [
            "#E0DED8", // Dirty white marine snow
            "#D1D5DB", // Muted grey
            "#F3F4F6", // Off-white
            "#FFF1E6", // Very pale warm white (near surface)
        ];

        return Array.from({ length: count }, (_, i) => {
            const topPct = 5 + Math.random() * 90;
            const color = colors[i % colors.length];

            return {
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${topPct}%`,
                // Tiny natural sizes, no massive glowing orbs
                size: 0.5 + Math.random() * 1.5,
                delay: `${Math.random() * 12}s`,
                duration: `${15 + Math.random() * 20}s`, // Slower drift
                color,
                // Subtle opacity, no glowing box-shadows
                opacity: 0.15 + Math.random() * 0.25,
            };
        });
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: "absolute",
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        backgroundColor: p.color,
                        opacity: 0,
                        animationName: "particleDrift",
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        animationIterationCount: "infinite",
                        animationTimingFunction: "ease-in-out",
                    }}
                />
            ))}
        </div>
    );
}
