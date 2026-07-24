import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle } from "lucide-react";
import { useTrivia } from "./TriviaContext";
import { TriviaQuestion } from "./TriviaQuestions";

interface TriviaCardProps {
    questionData: TriviaQuestion;
    onClose: () => void;
}

export default function TriviaCard({ questionData, onClose }: TriviaCardProps) {
    const { solvedOysters, addSolvedOyster, playAudio } = useTrivia();
    
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Viewport clamping and dynamic direction
    useLayoutEffect(() => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        
        // Mobile is handled via CSS (fixed inset-0 m-auto), only apply logic on desktop
        if (window.innerWidth >= 768) {
            const parentRect = card.parentElement?.getBoundingClientRect();
            
            if (parentRect) {
                // Viewport center
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                // Oyster center
                const parentCenterX = parentRect.left + parentRect.width / 2;
                const parentCenterY = parentRect.top + parentRect.height / 2;

                // Determine quadrants to open towards center
                const isLeft = parentCenterX < centerX;
                const isTop = parentCenterY < centerY;

                // Reset existing transform and apply absolute directional positioning
                card.style.position = 'absolute';
                card.style.transform = 'none';
                card.style.margin = '0';
                
                // If oyster is on the left, card opens to the right (positioned at left: 100%)
                if (isLeft) {
                    card.style.left = '100%';
                    card.style.right = 'auto';
                    card.style.marginLeft = '16px';
                } else {
                    card.style.left = 'auto';
                    card.style.right = '100%';
                    card.style.marginRight = '16px';
                }

                // If oyster is on top, card opens downwards (positioned at top: 100%)
                if (isTop) {
                    card.style.top = '100%';
                    card.style.bottom = 'auto';
                    card.style.marginTop = '16px';
                } else {
                    card.style.top = 'auto';
                    card.style.bottom = '100%';
                    card.style.marginBottom = '16px';
                }
            }

            // Post-positioning clamp to ensure 100% visibility (24px margin)
            const margin = 24;
            const newRect = card.getBoundingClientRect();
            
            let clampX = 0;
            let clampY = 0;

            if (newRect.right > window.innerWidth - margin) {
                clampX = window.innerWidth - margin - newRect.right;
            } else if (newRect.left < margin) {
                clampX = margin - newRect.left;
            }

            if (newRect.bottom > window.innerHeight - margin) {
                clampY = window.innerHeight - margin - newRect.bottom;
            } else if (newRect.top < margin) {
                clampY = margin - newRect.top;
            }
            
            if (clampX !== 0 || clampY !== 0) {
                card.style.transform = `translate(${clampX}px, ${clampY}px)`;
            }
        }
    }, [isSubmitted]); // Re-run when content expands

    const isCorrect = selectedOption === questionData.correctAnswerIndex;

    const handleSubmit = () => {
        if (selectedOption === null || isSubmitted) return;
        setIsSubmitted(true);

        if (isCorrect) {
            playAudio("correct");
            // Mark as solved only if correct, or does any answer count? 
            // "If correct: ... If incorrect: ... After reading the explanation: Show 'Continue Exploring'. Shell closes. Pearl Collected state."
            // The prompt implies the pearl is collected regardless of being correct/incorrect as long as they complete the interaction and read the explanation.
            addSolvedOyster(questionData.id);
        } else {
            playAudio("incorrect");
            addSolvedOyster(questionData.id);
        }
    };

    const handleContinue = () => {
        onClose();
        // Check for 8/8 celebration inside the context or progress component, but we can play audio here
        if (solvedOysters.length + 1 === 8 && !solvedOysters.includes(questionData.id)) {
            playAudio("celebrate");
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed md:absolute inset-0 md:inset-auto m-auto md:m-0 md:left-1/2 md:-translate-x-1/2 md:top-full md:mt-6 w-[90vw] md:w-96 h-fit max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 p-6 z-50 cursor-auto"
            style={{
                background: "rgba(10, 15, 30, 0.75)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicking the oyster behind it
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#B0C4D8] font-sans font-medium">
                    Pearl {solvedOysters.length} / 8
                </span>
                <button
                    onClick={onClose}
                    className="text-white/50 hover:text-white transition-colors focus:outline-none"
                    aria-label="Close Trivia"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Question */}
            <h3 className="font-display text-lg text-white font-light mb-6">
                {questionData.question}
            </h3>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-6">
                {questionData.options.map((option, idx) => {
                    let btnClass = "border-white/10 bg-white/5 text-[#E3F2FD] hover:bg-white/10";
                    
                    if (isSubmitted) {
                        if (idx === questionData.correctAnswerIndex) {
                            btnClass = "border-[#34D399] bg-[#34D399]/20 text-[#34D399]";
                        } else if (idx === selectedOption) {
                            btnClass = "border-[#EF4444] bg-[#EF4444]/20 text-[#EF4444]";
                        } else {
                            btnClass = "border-white/5 bg-transparent text-white/30";
                        }
                    } else if (selectedOption === idx) {
                        btnClass = "border-[#00D2FC] bg-[#00D2FC]/20 text-[#00D2FC]";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => !isSubmitted && setSelectedOption(idx)}
                            disabled={isSubmitted}
                            className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-sans transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#00D2FC] ${btnClass}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {/* Submit / Feedback Area */}
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.button
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className="w-full py-3 rounded-lg bg-[#00D2FC] text-[#0A192F] font-sans font-semibold text-sm transition-all hover:bg-[#E3F2FD] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        Submit Answer
                    </motion.button>
                ) : (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex flex-col gap-4 overflow-hidden"
                    >
                        {/* Feedback Banner */}
                        <div className="flex items-center gap-2">
                            {isCorrect ? (
                                <>
                                    <CheckCircle size={18} className="text-[#34D399]" />
                                    <span className="font-display text-[#34D399]">Correct!</span>
                                </>
                            ) : (
                                <>
                                    <XCircle size={18} className="text-[#EF4444]" />
                                    <span className="font-display text-[#EF4444]">Incorrect.</span>
                                </>
                            )}
                        </div>

                        {/* Educational Explanation */}
                        <p className="text-xs font-sans font-light leading-relaxed text-[#B0C4D8]">
                            {!isCorrect && (
                                <span className="block mb-2 text-white">
                                    The correct answer was: <strong>{questionData.options[questionData.correctAnswerIndex]}</strong>.
                                </span>
                            )}
                            {questionData.explanation}
                        </p>

                        <button
                            onClick={handleContinue}
                            className="w-full py-3 mt-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans font-medium text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                        >
                            Continue Exploring
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
