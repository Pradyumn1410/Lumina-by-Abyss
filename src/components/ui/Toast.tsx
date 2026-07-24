import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

interface ToastProps {
    message: string;
    visible: boolean;
    onDismiss: () => void;
    duration?: number;
}

export default function Toast({ message, visible, onDismiss, duration = 3500 }: ToastProps) {
    useEffect(() => {
        if (!visible) return;
        const timer = setTimeout(onDismiss, duration);
        return () => clearTimeout(timer);
    }, [visible, duration, onDismiss]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed top-6 right-6 z-[1200] max-w-sm pointer-events-auto"
                >
                    <div
                        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-[#34D399]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(32px) saturate(180%)",
                            WebkitBackdropFilter: "blur(32px) saturate(180%)",
                        }}
                    >
                        <div className="w-6 h-6 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 flex items-center justify-center flex-shrink-0">
                            <Check size={13} className="text-[#34D399]" />
                        </div>
                        <p className="text-xs font-sans font-light text-[#E3F2FD] leading-relaxed flex-1">
                            {message}
                        </p>
                        <button
                            onClick={onDismiss}
                            className="text-white/30 hover:text-white/60 transition-colors cursor-pointer flex-shrink-0"
                            style={{ background: "none", border: "none" }}
                            aria-label="Dismiss"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
