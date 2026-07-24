import React, { useState } from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    gradient: string;
}

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const items: GalleryItem[] = [
        { id: 1, title: "Triton 3300/3 Submarine", category: "Submarines", gradient: "linear-gradient(to bottom right, #00D2FC, #0a192f)" },
        { id: 2, title: "Bioluminescent Jellyfish", category: "Marine Life", gradient: "linear-gradient(to bottom right, #34D399, #0a192f)" },
        { id: 3, title: "Mariana Trench Descent", category: "Deep Sea", gradient: "linear-gradient(to bottom right, #164170, #010812)" },
        { id: 4, title: "Black Smoker Vents", category: "Hydrothermal Vents", gradient: "linear-gradient(to bottom right, #FF6B00, #0a192f)" },
        { id: 5, title: "RMS Titanic Bow", category: "Wrecks", gradient: "linear-gradient(to bottom right, #818CF8, #0a192f)" },
        { id: 6, title: "Surface Recovery", category: "Expeditions", gradient: "linear-gradient(to bottom right, #FCD34D, #00D2FC)" },
        { id: 7, title: "Deep Rover 2", category: "Submarines", gradient: "linear-gradient(to bottom right, #00D2FC, #164170)" },
        { id: 8, title: "Giant Squid Observation", category: "Marine Life", gradient: "linear-gradient(to bottom right, #A78BFA, #010812)" },
        { id: 9, title: "Abyssal Plain", category: "Ocean", gradient: "linear-gradient(to bottom right, #0f172a, #010812)" },
    ];

    return (
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Expedition Gallery</h1>
                <p className="text-[#B0C4D8] max-w-2xl text-lg font-light mb-16">
                    A cinematic collection of humanity's greatest descents. Explore high-resolution imagery from our deep-ocean 
                    deployments, marine life encounters, and historic wreck surveys.
                </p>
            </SectionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, idx) => (
                    <SectionWrapper key={item.id} delay={idx * 0.05}>
                        <div 
                            className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] border border-white/5"
                            onClick={() => setSelectedImage(item)}
                            style={{ background: item.gradient }}
                        >
                            <div className="absolute inset-0 bg-[#010812]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                                <span className="text-[#00D2FC] uppercase tracking-widest text-xs mb-3">{item.category}</span>
                                <h3 className="text-xl text-white font-display font-light">{item.title}</h3>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                <span className="text-white/70 text-sm font-light">{item.title}</span>
                            </div>
                        </div>
                    </SectionWrapper>
                ))}
            </div>

            {/* Simple Lightbox */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[2000] bg-[#010812]/95 backdrop-blur-2xl flex items-center justify-center p-6 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <div 
                            className="w-full aspect-video rounded-xl shadow-2xl mb-8 flex items-center justify-center border border-white/10"
                            style={{ background: selectedImage.gradient }}
                        >
                            <p className="text-white/30 font-display text-2xl tracking-widest uppercase">Visual Feed Active</p>
                        </div>
                        <div className="text-center">
                            <span className="text-[#00D2FC] uppercase tracking-widest text-sm mb-2 block">{selectedImage.category}</span>
                            <h2 className="text-3xl text-white font-display font-light">{selectedImage.title}</h2>
                        </div>
                        <button 
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors text-4xl font-light"
                            onClick={() => setSelectedImage(null)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
