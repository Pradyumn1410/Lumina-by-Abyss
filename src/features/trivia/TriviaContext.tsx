import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TriviaContextProps {
    activeOysterId: string | null;
    setActiveOysterId: (id: string | null) => void;
    solvedOysters: string[];
    addSolvedOyster: (id: string) => void;
    playAudio: (type: "open" | "reveal" | "correct" | "incorrect" | "celebrate") => void;
    isAudioEnabled: boolean;
    setAudioEnabled: (val: boolean) => void;
}

const TriviaContext = createContext<TriviaContextProps | undefined>(undefined);

export function TriviaProvider({ children }: { children: ReactNode }) {
    const [activeOysterId, setActiveOysterId] = useState<string | null>(null);
    const [solvedOysters, setSolvedOysters] = useState<string[]>([]);
    const [isAudioEnabled, setAudioEnabled] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("lumina_solved_oysters");
            if (stored) {
                setSolvedOysters(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to parse solved oysters from localStorage");
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem("lumina_solved_oysters", JSON.stringify(solvedOysters));
    }, [solvedOysters]);

    // Handle scroll locking
    useEffect(() => {
        if (activeOysterId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeOysterId]);

    const addSolvedOyster = (id: string) => {
        if (!solvedOysters.includes(id)) {
            setSolvedOysters(prev => [...prev, id]);
        }
    };

    // Subtly synthesize audio to avoid needing external audio files
    const playAudio = (type: "open" | "reveal" | "correct" | "incorrect" | "celebrate") => {
        if (!isAudioEnabled) return;

        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            const now = ctx.currentTime;

            if (type === "open") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else if (type === "reveal") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.05, now + 0.3);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
                osc.start(now);
                osc.stop(now + 0.8);
            } else if (type === "correct") {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(554.37, now + 0.1);
                osc.frequency.setValueAtTime(659.25, now + 0.2); // A major arpeggio
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else if (type === "incorrect") {
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            } else if (type === "celebrate") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.setValueAtTime(659.25, now + 0.15);
                osc.frequency.setValueAtTime(783.99, now + 0.3);
                osc.frequency.setValueAtTime(1046.50, now + 0.45);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
                osc.start(now);
                osc.stop(now + 1.5);
            }
        } catch (e) {
            // Ignore audio context issues (e.g. strict autoplay policy before interaction)
        }
    };

    return (
        <TriviaContext.Provider value={{
            activeOysterId,
            setActiveOysterId,
            solvedOysters,
            addSolvedOyster,
            playAudio,
            isAudioEnabled,
            setAudioEnabled
        }}>
            {children}
        </TriviaContext.Provider>
    );
}

export function useTrivia() {
    const ctx = useContext(TriviaContext);
    if (!ctx) throw new Error("useTrivia must be used within TriviaProvider");
    return ctx;
}
