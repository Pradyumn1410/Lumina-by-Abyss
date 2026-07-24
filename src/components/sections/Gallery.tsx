import { useState } from "react";
import SectionWrapper from "../layout/SectionWrapper";

const GALLERY_ITEMS = [
    { id: 1, image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80", label: "Mariana Trench, 2023", span: "lg:col-span-2" },
    { id: 2, image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80", label: "Arctic Sea Ice, Svalbard", span: "" },
    { id: 3, image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80", label: "Coral Triangle, Banda Sea", span: "" },
    { id: 4, image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80", label: "Hydrothermal Vents, Azores", span: "" },
    { id: 5, image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80", label: "Sunfish, Pacific", span: "lg:col-span-2" },
    { id: 6, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", label: "Twilight Zone, Indian Ocean", span: "" },
];

export default function Gallery() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section id="gallery" className="section-pad">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <SectionWrapper>
                    <p className="text-xs uppercase tracking-widest mb-4 font-medium text-center" style={{ color: "#00D2FC", letterSpacing: "0.2em" }}>
                        Gallery
                    </p>
                    <h2
                        className="font-display font-light text-white text-center mb-16"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                    >
                        The ocean, witnessed.
                    </h2>
                </SectionWrapper>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {GALLERY_ITEMS.map((item, i) => (
                        <SectionWrapper key={item.id} delay={i * 0.06} className={item.span}>
                            <div
                                className="relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 group shadow-xl"
                                style={{
                                    aspectRatio: item.span ? "16/9" : "4/3",
                                    transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                                    transform: hovered === item.id ? "scale(1.02)" : "scale(1)",
                                }}
                                onMouseEnter={() => setHovered(item.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Image tag */}
                                <img
                                    src={item.image}
                                    alt={item.label}
                                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                                />

                                {/* Inner content */}
                                <div
                                    className="absolute inset-0 flex items-end p-6 z-10"
                                    style={{
                                        background: "linear-gradient(to top, rgba(10,25,47,0.9) 0%, transparent 60%)",
                                        opacity: hovered === item.id ? 1 : 0.8,
                                        transition: "opacity 0.4s ease",
                                    }}
                                >
                                    <p className="text-xs tracking-widest font-light text-white uppercase" style={{ letterSpacing: "0.15em" }}>
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        </SectionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
