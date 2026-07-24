import React, { useMemo } from 'react';
import './SeagullFlock.css';

interface BirdProps {
    id: number;
    top: string;
    scale: number;
    flapSpeed: number;
    flapDelay: number;
    driftSpeed: number;
    driftDelay: number;
    bobSpeed: number;
    bobDelay: number;
    zIndex: number;
    opacity: number;
}

const SeagullSVG = ({ flapSpeed, flapDelay }: { flapSpeed: number, flapDelay: number }) => {
    return (
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* BACK WING (Rendered behind the body) */}
            <g className="wing-back" style={{ animationDuration: `${flapSpeed}s`, animationDelay: `${flapDelay}s` }}>
                <path d="M 100 100 Q 130 40 170 30 Q 140 65 90 100 Z" fill="#90a4ae" />
                <path d="M 140 50 Q 160 35 170 30 Q 165 40 148 55 Z" fill="#263238" />
            </g>
            
            {/* TAIL */}
            <path d="M 75 105 L 30 95 L 35 110 Z" fill="#eceff1" />
            <path d="M 40 98 L 25 95 L 35 105 Z" fill="#263238" /> {/* Black feather tips */}
            
            {/* BODY */}
            <ellipse cx="100" cy="105" rx="35" ry="16" fill="#ffffff" />
            
            {/* HEAD & NECK */}
            <path d="M 115 95 Q 135 80 145 90 Q 135 110 115 115 Z" fill="#ffffff" />
            <circle cx="140" cy="88" r="10" fill="#ffffff" />
            
            {/* BEAK (Yellow) */}
            <polygon points="148,85 168,88 148,92" fill="#ffb300" />
            <polygon points="148,89 165,90 148,92" fill="#ff8f00" /> {/* Lower beak shadow */}
            
            {/* EYE */}
            <circle cx="143" cy="85" r="1.5" fill="#000000" />
            
            {/* FRONT WING (Rendered in front of the body) */}
            <g className="wing-front" style={{ animationDuration: `${flapSpeed}s`, animationDelay: `${flapDelay}s` }}>
                {/* Main Grey Wing */}
                <path d="M 100 105 Q 120 30 180 20 Q 140 65 85 105 Z" fill="#cfd8dc" />
                {/* Black Wing Tip */}
                <path d="M 145 40 Q 165 25 180 20 Q 170 35 150 50 Z" fill="#37474f" />
            </g>
        </svg>
    );
};

export default function SeagullFlock() {
    // Generate flock based on depth layers
    const birds = useMemo<BirdProps[]>(() => {
        const generated: BirdProps[] = [];
        let idCounter = 0;

        const addBirds = (
            count: number, 
            scaleRange: [number, number], 
            topRange: [number, number], 
            zIndex: number, 
            driftRange: [number, number],
            opacity: number
        ) => {
            for (let i = 0; i < count; i++) {
                const driftSpeed = driftRange[0] + Math.random() * (driftRange[1] - driftRange[0]);
                generated.push({
                    id: idCounter++,
                    top: `${topRange[0] + Math.random() * (topRange[1] - topRange[0])}%`,
                    scale: scaleRange[0] + Math.random() * (scaleRange[1] - scaleRange[0]),
                    flapSpeed: 0.5 + Math.random() * 0.3, // Flap duration between 0.5s and 0.8s
                    flapDelay: -Math.random() * 2, // Negative delay to desync immediately
                    driftSpeed: driftSpeed,
                    // Negative delay spreads them across the screen on initial load
                    driftDelay: -(Math.random() * driftSpeed), 
                    bobSpeed: 1.0 + Math.random() * 0.6,
                    bobDelay: -Math.random() * 2,
                    zIndex,
                    opacity,
                });
            }
        };

        // Layer 1 (Mid-Far): 2 birds, ~20-25% scale
        addBirds(2, [0.2, 0.25], [15, 25], 3, [60, 90], 0.7);
        
        // Layer 2 (Far): 4 birds, ~12-18% scale
        addBirds(4, [0.12, 0.18], [25, 35], 2, [80, 110], 0.6);
        
        // Layer 3 (Horizon): 6 birds, ~8-12% scale
        addBirds(6, [0.08, 0.12], [35, 45], 1, [100, 140], 0.4);

        return generated;
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
            {birds.map(bird => (
                <div 
                    key={bird.id}
                    className="seagull-drift"
                    style={{
                        position: 'absolute',
                        top: bird.top,
                        left: '-20%', // Start off-screen left (animated to 120vw via CSS)
                        zIndex: bird.zIndex,
                        opacity: bird.opacity,
                        animationDuration: `${bird.driftSpeed}s`,
                        animationDelay: `${bird.driftDelay}s`
                    }}
                >
                    <div 
                        className="seagull-bob"
                        style={{
                            animationDuration: `${bird.bobSpeed}s`,
                            animationDelay: `${bird.bobDelay}s`
                        }}
                    >
                        {/* 
                            The scale is applied to an inner wrapper. 
                            This ensures the drift (translateX) uses the viewport coordinates properly 
                            rather than being scaled down by the transform scale.
                        */}
                        <div style={{
                            width: '200px',
                            height: '200px',
                            transform: `scale(${bird.scale})`,
                            transformOrigin: 'center center'
                        }}>
                            <SeagullSVG flapSpeed={bird.flapSpeed} flapDelay={bird.flapDelay} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
