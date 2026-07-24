import { useMemo } from "react";

interface FishInstance {
    id: number;
    type: "clownfish" | "blueTang" | "yellowTang" | "angelfish" | "butterfly" | "sardine";
    top: string;
    scale: number;
    duration: string;
    delay: string;
    direction: "left" | "right";
    opacity: number;
    offsetY: number;
}

// Detailed SVG renderers for realistic species
function RenderFishSpecies({ type, scale }: { type: FishInstance["type"]; scale: number }) {
    const w = 48 * scale;
    const h = 32 * scale;

    switch (type) {
        case "clownfish":
            return (
                <svg width={w} height={h} viewBox="0 0 50 35" fill="none">
                    {/* Tail fin */}
                    <path d="M5,17.5 L0,8 C0,8 3,17.5 0,27 Z" fill="#FF6B00" />
                    {/* Body */}
                    <ellipse cx="24" cy="17.5" rx="18" ry="11" fill="#FF6B00" />
                    {/* White stripes */}
                    <path d="M16,7.5 Q18,17.5 16,27.5 M26,6.8 Q28,17.5 26,28.2 M36,9 Q37.5,17.5 36,26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Eye */}
                    <circle cx="36" cy="14" r="1.5" fill="#1A192B" />
                </svg>
            );
        case "blueTang":
            return (
                <svg width={w} height={h} viewBox="0 0 50 35" fill="none">
                    {/* Tail */}
                    <path d="M6,17.5 L0,7 L2,17.5 L0,28 Z" fill="#FFD000" />
                    {/* Main Oval Body */}
                    <ellipse cx="26" cy="17.5" rx="19" ry="12" fill="#0066FF" />
                    {/* Black ribbon pattern */}
                    <path d="M12,17.5 C16,10 24,8 32,10 C24,14 18,22 12,17.5 Z" fill="#0A192F" opacity="0.8" />
                    {/* Eye */}
                    <circle cx="38" cy="14" r="1.5" fill="#FFFFFF" />
                </svg>
            );
        case "yellowTang":
            return (
                <svg width={w} height={h} viewBox="0 0 50 35" fill="none">
                    {/* Leaf Body */}
                    <path d="M10,17.5 C14,2 34,4 42,17.5 C34,31 14,33 10,17.5 Z" fill="#FFEA00" />
                    {/* Tail */}
                    <path d="M10,17.5 L2,10 L4,17.5 L2,25 Z" fill="#FFD000" />
                    {/* Eye */}
                    <circle cx="36" cy="14" r="1.5" fill="#1A192B" />
                </svg>
            );
        case "angelfish":
            return (
                <svg width={w} height={h * 1.3} viewBox="0 0 45 50" fill="none">
                    {/* Dorsal extended fin */}
                    <path d="M22,25 L12,0 L26,12 Z" fill="#818CF8" />
                    {/* Ventral fin */}
                    <path d="M22,25 L14,50 L26,38 Z" fill="#34D399" />
                    {/* Body */}
                    <ellipse cx="24" cy="25" rx="14" ry="12" fill="#00D2FC" />
                    {/* Stripes */}
                    <path d="M18,14 L18,36 M26,13 L26,37" stroke="#0A192F" strokeWidth="2" opacity="0.6" />
                    {/* Eye */}
                    <circle cx="32" cy="22" r="1.5" fill="#FFFFFF" />
                </svg>
            );
        case "butterfly":
            return (
                <svg width={w} height={h} viewBox="0 0 50 35" fill="none">
                    {/* Body */}
                    <path d="M12,17.5 C16,4 32,5 40,17.5 C32,30 16,31 12,17.5 Z" fill="#FFB800" />
                    {/* White patch */}
                    <path d="M22,8 C26,8 30,12 28,26 C24,26 20,20 22,8 Z" fill="#FFFFFF" />
                    {/* Eye stripe */}
                    <path d="M34,8 L32,27" stroke="#1A192B" strokeWidth="2.5" />
                    <circle cx="34" cy="13" r="1.5" fill="#FFFFFF" />
                </svg>
            );
        case "sardine":
        default:
            return (
                <svg width={w * 0.8} height={h * 0.5} viewBox="0 0 45 18" fill="none">
                    <ellipse cx="22" cy="9" rx="18" ry="6" fill="#B0C4D8" opacity="0.85" />
                    <path d="M4,9 L0,4 L1,9 L0,14 Z" fill="#00D2FC" />
                    <circle cx="34" cy="8" r="1" fill="#0A192F" />
                </svg>
            );
    }
}

export default function FishSilhouettes() {
    const fishList = useMemo<FishInstance[]>(() => {
        const speciesTypes: FishInstance["type"][] = [
            "clownfish",
            "blueTang",
            "yellowTang",
            "angelfish",
            "butterfly",
            "sardine",
            "sardine",
            "blueTang",
            "clownfish",
            "yellowTang",
            "angelfish",
            "sardine",
        ];

        return speciesTypes.map((type, i) => {
            const depthFactor = i / speciesTypes.length; // 0 (near top) to 1 (deep)
            // Color attenuation with depth: near top = higher opacity & bright, deep = muted silhouette
            const baseOpacity = depthFactor < 0.4 ? 0.40 - depthFactor * 0.15 : 0.18 - depthFactor * 0.08;

            return {
                id: i,
                type,
                top: `${12 + i * 7.5}%`,
                scale: 0.6 + (i % 4) * 0.25,
                duration: `${18 + (i % 5) * 5}s`,
                delay: `${i * 3.5}s`,
                direction: i % 2 === 0 ? "left" : "right",
                opacity: baseOpacity,
                offsetY: (i % 3) * 6,
            };
        });
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {fishList.map((f) => (
                <div
                    key={f.id}
                    style={{
                        position: "absolute",
                        top: f.top,
                        left: 0,
                        opacity: f.opacity,
                        animationName: f.direction === "left" ? "fishSwimLeft" : "fishSwimRight",
                        animationDuration: f.duration,
                        animationDelay: f.delay,
                        animationIterationCount: "infinite",
                        animationTimingFunction: "linear",
                        filter: f.top.includes("7") || f.top.includes("8") ? "grayscale(40%) blur(0.5px)" : "none",
                    }}
                >
                    <RenderFishSpecies type={f.type} scale={f.scale} />
                </div>
            ))}
        </div>
    );
}
