import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Volume2, VolumeX } from "lucide-react";
import { useTrivia } from "./TriviaContext";

export default function PearlProgress() {
    const { solvedOysters, isAudioEnabled, setAudioEnabled } = useTrivia();
    const [showAchievement, setShowAchievement] = useState(false);
    const [hasSeenAchievement, setHasSeenAchievement] = useState(false);

    const totalPearls = 8;
    const collected = solvedOysters.length;

    // Check achievement state
    useEffect(() => {
        try {
            const seen = localStorage.getItem("lumina_achievement_seen");
            if (seen === "true") {
                setHasSeenAchievement(true);
            }
        } catch (e) {
            // ignore
        }
    }, []);

    // Trigger achievement
    useEffect(() => {
        if (collected === totalPearls && !hasSeenAchievement) {
            // Slight delay so they can read the final trivia explanation before being blasted with the achievement
            const timer = setTimeout(() => {
                setShowAchievement(true);
                setHasSeenAchievement(true);
                localStorage.setItem("lumina_achievement_seen", "true");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [collected, hasSeenAchievement]);

    return (
        <>
            {/* Floating HUD at bottom left */}
            <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
                <div
                    className="rounded-full px-4 py-2 border border-white/10 flex items-center gap-3 shadow-lg"
                    style={{
                        background: "rgba(10, 15, 30, 0.6)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    {/* Tiny glowing pearl icon */}
                    <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                            background: "radial-gradient(circle at 30% 30%, #fff, #00D2FC)",
                            boxShadow: "0 0 8px rgba(0, 210, 252, 0.6)",
                        }}
                    />
                    <span className="text-xs font-sans uppercase tracking-widest text-[#E3F2FD] font-medium">
                        {collected} / {totalPearls} Pearls
                    </span>
                </div>
                
                {/* Audio Toggle */}
                <button
                    onClick={() => setAudioEnabled(!isAudioEnabled)}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors hover:bg-white/5"
                    style={{
                        background: "rgba(10, 15, 30, 0.6)",
                        backdropFilter: "blur(12px)",
                    }}
                    aria-label={isAudioEnabled ? "Mute Trivia Audio" : "Enable Trivia Audio"}
                >
                    {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>
            </div>

            {/* Achievement Modal Overlay */}
            <AnimatePresence>
                {showAchievement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowAchievement(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="max-w-md w-full rounded-3xl p-8 text-center border border-white/20 relative overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, rgba(10, 25, 47, 0.95), rgba(0, 210, 252, 0.15))",
                                boxShadow: "0 25px 50px -12px rgba(0, 210, 252, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Decorative background glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,210,252,0.15),transparent_70%)]" />

                            <div className="relative z-10">
                                <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#00D2FC] to-[#818CF8] flex items-center justify-center shadow-[0_0_30px_rgba(0,210,252,0.5)]">
                                    <Award size={32} className="text-[#0A192F]" />
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#00D2FC] font-sans font-semibold block mb-3">
                                    Achievement Unlocked
                                </span>
                                
                                <h2 className="font-display text-4xl text-white font-light mb-4">
                                    Ocean Explorer
                                </h2>
                                
                                <p className="text-sm font-sans font-light leading-relaxed text-[#B0C4D8] mb-8">
                                    Congratulations! You have discovered every hidden pearl and completed the educational journey. The depths hold no more secrets for you.
                                </p>
                                
                                <button
                                    onClick={() => setShowAchievement(false)}
                                    className="w-full py-4 rounded-xl font-sans font-medium text-sm transition-all text-[#0A192F] bg-white hover:bg-[#E3F2FD] shadow-[0_0_20px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-4 focus:ring-white/20"
                                >
                                    Continue Descent
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
