import React from 'react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../components/layout/SectionWrapper';

export default function Expeditions() {
    const expeditions = [
        { id: 1, name: "Mariana Trench Deep Dive", depth: "10,994m", duration: "12 Hours", difficulty: "Extreme", image: "rgba(10, 25, 47, 0.4)" },
        { id: 2, name: "Titanic Wreck Survey", depth: "3,800m", duration: "8 Hours", difficulty: "Advanced", image: "rgba(10, 25, 47, 0.4)" },
        { id: 3, name: "Mid-Atlantic Ridge", depth: "2,500m", duration: "6 Hours", difficulty: "Intermediate", image: "rgba(10, 25, 47, 0.4)" },
        { id: 4, name: "Galápagos Hydrothermal Vents", depth: "2,400m", duration: "7 Hours", difficulty: "Advanced", image: "rgba(10, 25, 47, 0.4)" },
        { id: 5, name: "Monterey Canyon Abyss", depth: "3,200m", duration: "10 Hours", difficulty: "Extreme", image: "rgba(10, 25, 47, 0.4)" },
        { id: 6, name: "Great Blue Hole Submersion", depth: "124m", duration: "3 Hours", difficulty: "Beginner", image: "rgba(10, 25, 47, 0.4)" },
    ];

    return (
        <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen relative z-10">
            <SectionWrapper>
                <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">Our Expeditions</h1>
                <p className="text-[#B0C4D8] max-w-2xl text-lg font-light mb-16">
                    Discover our upcoming luxury deep-ocean routes. Each expedition is designed and led by veteran oceanographers, offering unparalleled access to Earth's final frontier.
                </p>
            </SectionWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {expeditions.map((exp, idx) => (
                    <SectionWrapper key={exp.id} delay={idx * 0.1}>
                        <div className="glass-panel p-6 h-full flex flex-col hover:border-[#00D2FC]/40 transition-colors duration-500 rounded-2xl">
                            <div className="h-48 rounded-xl mb-6 flex items-center justify-center border border-white/5" style={{ background: exp.image }}>
                                <span className="text-[#00D2FC] uppercase tracking-widest text-xs font-light">Visual Feed Offline</span>
                            </div>
                            <h3 className="text-xl text-white font-display font-light mb-2">{exp.name}</h3>
                            <div className="flex-grow flex flex-col gap-2 mb-8 mt-4">
                                <p className="text-sm text-[#B0C4D8] font-light"><span className="text-[#00D2FC] mr-2">Depth:</span> {exp.depth}</p>
                                <p className="text-sm text-[#B0C4D8] font-light"><span className="text-[#00D2FC] mr-2">Duration:</span> {exp.duration}</p>
                                <p className="text-sm text-[#B0C4D8] font-light"><span className="text-[#00D2FC] mr-2">Difficulty:</span> {exp.difficulty}</p>
                            </div>
                            <Link to="/expedition" className="btn-outline w-full text-center">View Details</Link>
                        </div>
                    </SectionWrapper>
                ))}
            </div>
        </main>
    );
}
