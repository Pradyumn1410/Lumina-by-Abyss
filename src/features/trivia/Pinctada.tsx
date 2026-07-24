import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTrivia } from "./TriviaContext";
import { TriviaQuestion } from "./TriviaQuestions";
import TriviaCard from "./TriviaCard";

interface PinctadaProps {
    questionData: TriviaQuestion;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
}

const RARITY_COLORS = {
    Common: { pearl: "#E3F2FD", glowInner: "rgba(255,255,255,1)", glowMid: "rgba(227,242,253,0.8)", glowOuter: "rgba(100,181,246,0.5)" },
    Rare: { pearl: "#34D399", glowInner: "rgba(255,255,255,1)", glowMid: "rgba(52,211,153,0.8)", glowOuter: "rgba(5,150,105,0.5)" },
    Epic: { pearl: "#A78BFA", glowInner: "rgba(255,255,255,1)", glowMid: "rgba(167,139,250,0.8)", glowOuter: "rgba(109,40,217,0.5)" },
    Legendary: { pearl: "#FBBF24", glowInner: "rgba(255,255,255,1)", glowMid: "rgba(251,191,36,0.8)", glowOuter: "rgba(217,119,6,0.5)" },
};

export default function Pinctada({ questionData, top, left, right, bottom }: PinctadaProps) {
    const { activeOysterId, setActiveOysterId, solvedOysters, playAudio } = useTrivia();
    const [isHovered, setIsHovered] = useState(false);

    const isSolved = solvedOysters.includes(questionData.id);
    const isActive = activeOysterId === questionData.id;

    // Close logic
    const handleClose = () => {
        setActiveOysterId(null);
    };

    const handleClick = () => {
        if (isSolved) return;
        if (isActive) {
            handleClose();
        } else {
            playAudio("open");
            setTimeout(() => playAudio("reveal"), 300);
            setActiveOysterId(questionData.id);
        }
    };

    // Keyboard accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        } else if (e.key === "Escape" && isActive) {
            handleClose();
        }
    };

    const colors = RARITY_COLORS[questionData.rarity];

    // State Machine
    // When idle (not active, not solved), we want the slow 6-8s rotation/bob.
    // When active, we want it still and open.
    // When solved, it stays closed and resumes idle bobbing? The prompt: "After Answer Whether... the oyster should close smoothly, return to original orientation, resume idle floating animation".

    const isIdle = !isActive;

    return (
        <div className="absolute z-10" style={{ top, left, right, bottom }}>
            {/* SVG Defs for Oyster Clip Path */}
            <svg width="0" height="0" className="absolute pointer-events-none">
                <defs>
                    <clipPath id={`shell-shape-${questionData.id}`} clipPathUnits="objectBoundingBox">
                        <path d="M 0.25 0.1
                            L 0.75 0.1
                            C 1.0 0.1, 1.0 0.4, 1.0 0.6
                            C 1.0 0.9, 0.8 1.0, 0.5 1.0
                            C 0.2 1.0, 0.0 0.9, 0.0 0.6
                            C 0.0 0.4, 0.0 0.1, 0.25 0.1 Z" />
                    </clipPath>
                </defs>
            </svg>

            {/* The Scene Wrapper */}
            <div 
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                    width: "120px", // Scaled down from 380px for the UI
                    height: "120px",
                }}
            >
                {/* Idle Animation Wrapper */}
                <motion.div
                    style={{ transformStyle: "preserve-3d" }}
                    animate={
                        isIdle
                            ? {
                                y: [-4, 4, -4],
                                rotateZ: [-6, 6, -6],
                                rotateX: [55, 60, 55], // Include the base 55deg tilt from HTML oyster
                                scale: isHovered && !isSolved ? 1.05 : 1
                            }
                            : { y: 0, rotateZ: 0, rotateX: 55, scale: 1 }
                    }
                    transition={
                        isIdle
                            ? {
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                                rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: 0.3 }
                            }
                            : { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }
                    }
                    className="w-full h-full cursor-pointer focus:outline-none relative group"
                    tabIndex={isSolved ? -1 : 0}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    role="button"
                    aria-label={isSolved ? "Collected Pearl" : `Discover Pearl (${questionData.rarity})`}
                >
                    {/* Oyster Container */}
                    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                        
                        {/* Bottom Shell */}
                        <div className="absolute inset-0" style={{ transformOrigin: "50% 10%", transformStyle: "preserve-3d", transition: "transform 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)", transform: "rotateX(10deg)" }}>
                            <div className="absolute inset-0" style={{ clipPath: `url(#shell-shape-${questionData.id})`, backfaceVisibility: "hidden", background: "repeating-conic-gradient(from -90deg at 50% 10%, #111 0deg, #222 2deg, #111 4deg)", transform: "rotateX(180deg) translateZ(1px)" }} />
                            <div className="absolute inset-0" style={{ clipPath: `url(#shell-shape-${questionData.id})`, backfaceVisibility: "hidden", background: "linear-gradient(135deg, #b39ddb 10%, #4dd0e1 90%)", boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.9)", transform: "translateZ(1px)" }} />
                        </div>

                        {/* Pearl Shadow */}
                        <div className="absolute" style={{ width: "30%", height: "30%", top: "55%", left: "50%", transform: "translate(-50%, -50%) translateZ(2px)", background: "rgba(0, 0, 0, 0.9)", borderRadius: "50%", filter: "blur(4px)" }} />
                        
                        {/* Pearl Container */}
                        <div className="absolute pointer-events-none" style={{ top: "55%", left: "50%", width: "25%", height: "25%", transform: "translate(-50%, -50%) translateZ(8px)", transformStyle: "preserve-3d" }}>
                            <div className="absolute inset-0 rounded-full transition-all duration-1000 ease-in-out" 
                                style={{
                                    transform: "rotateX(-55deg)", // Counter rotate
                                    background: isActive
                                        ? `radial-gradient(circle at 35% 35%, #ffffff 0%, ${colors.pearl} 25%, #b39ddb 60%, #311b92 100%)`
                                        : isSolved
                                            ? `radial-gradient(circle at 35% 35%, #888 0%, #333 40%, #111 100%)` // Dim if solved
                                            : `radial-gradient(circle at 35% 35%, #fff 0%, ${colors.pearl} 60%, #111 100%)`, // Idle normal
                                    boxShadow: isActive
                                        ? `inset -4px -4px 8px rgba(0,0,0,0.5), 0 0 20px ${colors.glowMid}, 0 0 40px ${colors.glowOuter}`
                                        : isHovered && !isSolved
                                            ? `inset -4px -4px 8px rgba(0,0,0,0.8), 0 0 15px ${colors.glowOuter}`
                                            : `inset -4px -4px 8px rgba(0,0,0,0.9)`
                                }}
                            />
                        </div>

                        {/* Top Shell */}
                        <div className="absolute inset-0" style={{ 
                            transformOrigin: "50% 10%", 
                            transformStyle: "preserve-3d", 
                            transition: "transform 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)", 
                            transform: isActive ? "rotateX(-105deg)" : "rotateX(-10deg)" 
                        }}>
                            <div className="absolute inset-0" style={{ clipPath: `url(#shell-shape-${questionData.id})`, backfaceVisibility: "hidden", background: "repeating-conic-gradient(from -90deg at 50% 10%, #111 0deg, #222 2deg, #111 4deg)", transform: "translateZ(1px)" }} />
                            <div className="absolute inset-0" style={{ clipPath: `url(#shell-shape-${questionData.id})`, backfaceVisibility: "hidden", background: "linear-gradient(135deg, #b39ddb 10%, #4dd0e1 90%)", boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.9)", transform: "rotateX(180deg) translateZ(1px)" }} />
                        </div>

                    </div>
                    
                    {/* "Pearl Collected" Indicator */}
                    <AnimatePresence>
                        {isSolved && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, rotateX: -55 }}
                                animate={{ opacity: 1, y: 0, rotateX: -55 }} // Counter rotate so text is readable
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-widest text-[#B0C4D8] font-sans font-medium"
                            >
                                Pearl Collected
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Trivia Card Overlay */}
            <AnimatePresence>
                {isActive && (
                    <TriviaCard
                        questionData={questionData}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
