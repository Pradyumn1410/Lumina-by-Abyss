import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Anchor, Calendar, Users, Clock, ArrowDown, MapPin } from "lucide-react";
import SectionWrapper from "../components/layout/SectionWrapper";

import { ExpeditionLog, EXPEDITION_LOGS } from "../data/expeditionLogs";

function getSubmarineColor(sub: string): string {
    if (sub.includes("Titan")) return "#00D2FC";
    if (sub.includes("Voyager")) return "#818CF8";
    return "#34D399";
}

function getStatusColor(status: string): string {
    if (status === "Completed" || status === "Successful") return "#34D399";
    if (status.includes("Research") || status.includes("Data")) return "#818CF8";
    return "#00D2FC";
}

export default function Logs() {
    return (
        <div className="min-h-screen relative z-1 pb-32">
            {/* Back link */}
            <Link
                to="/"
                className="fixed top-8 left-8 flex items-center gap-2 text-xs no-underline transition-colors duration-300 font-sans tracking-widest uppercase z-1 text-[#B0C4D8] hover:text-[#E3F2FD]"
            >
                <ChevronLeft size={16} />
                Return
            </Link>

            {/* Page Header */}
            <div className="pt-32 pb-20 px-6 md:px-12 text-center max-w-3xl mx-auto">
                <SectionWrapper>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#00D2FC] font-sans font-medium block mb-4">
                        Mission Archive // Lumina by Abyss Command
                    </span>
                    <h1 className="font-display text-4xl md:text-6xl font-light text-white mb-6">
                        Expedition Logs
                    </h1>
                    <p className="text-sm font-sans font-light leading-relaxed text-[#B0C4D8] max-w-lg mx-auto">
                        A chronological archive of every descent. Each mission log represents verified data from our deep-ocean exploration fleet.
                    </p>
                </SectionWrapper>

                {/* Stats bar */}
                <SectionWrapper delay={0.15}>
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
                        {[
                            { label: "Total Expeditions", value: EXPEDITION_LOGS.length.toString() },
                            { label: "Deepest Descent", value: "10,984m" },
                            { label: "Active Since", value: "2023" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="font-display text-2xl font-light text-white">{stat.value}</p>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-[#B0C4D8] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </SectionWrapper>
            </div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 relative">
                {/* Vertical timeline line */}
                <div
                    className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, #00D2FC, #818CF8, #0A192F)",
                        transform: "translateX(-50%)",
                    }}
                />

                <div className="flex flex-col gap-16">
                    {EXPEDITION_LOGS.map((log, i) => {
                        const subColor = getSubmarineColor(log.submarine);
                        const statusColor = getStatusColor(log.status);
                        const isLeft = i % 2 === 0;

                        return (
                            <SectionWrapper key={log.id} delay={i * 0.06}>
                                <div className={`relative flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8 md:gap-12`}>
                                    {/* Timeline dot */}
                                    <div
                                        className="absolute left-8 md:left-1/2 w-3 h-3 rounded-full flex-shrink-0"
                                        style={{
                                            transform: "translate(-50%, 28px)",
                                            background: subColor,
                                            boxShadow: `0 0 16px ${subColor}50`,
                                            border: `2px solid ${subColor}`,
                                        }}
                                    />

                                    {/* Card */}
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.01 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className={`ml-16 md:ml-0 md:w-[45%] ${isLeft ? "md:text-right md:mr-auto" : "md:text-left md:ml-auto"}`}
                                    >
                                        <div
                                            className="rounded-[24px] p-6 md:p-8 border border-white/8 group cursor-default transition-all duration-500 hover:border-white/15"
                                            style={{
                                                background: "rgba(255,255,255,0.03)",
                                                backdropFilter: "blur(24px) saturate(160%)",
                                                WebkitBackdropFilter: "blur(24px) saturate(160%)",
                                                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.25)",
                                            }}
                                        >
                                            {/* Header: Badge + Date */}
                                            <div className={`flex items-center gap-3 mb-4 flex-wrap ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                                                <span
                                                    className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                                                    style={{
                                                        color: subColor,
                                                        background: `${subColor}12`,
                                                        border: `1px solid ${subColor}30`,
                                                    }}
                                                >
                                                    EXP #{log.number}
                                                </span>
                                                <span className="text-[10px] font-sans text-[#B0C4D8] tracking-wider flex items-center gap-1.5">
                                                    <Calendar size={10} />
                                                    {log.date}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-1">
                                                {log.destination}
                                            </h3>
                                            <p className="text-xs font-sans text-[#B0C4D8] mb-5 flex items-center gap-1.5" style={isLeft ? { justifyContent: "flex-end" } : {}}>
                                                <MapPin size={10} />
                                                {log.region}
                                            </p>

                                            {/* Submarine class */}
                                            <p className="text-xs font-sans font-medium mb-4 flex items-center gap-1.5" style={{ color: subColor, ...(isLeft ? { justifyContent: "flex-end" } : {}) }}>
                                                <Anchor size={11} />
                                                {log.submarine}
                                            </p>

                                            {/* Stats grid */}
                                            <div className="grid grid-cols-3 gap-4 mb-5 hairline pt-5">
                                                <div className={isLeft ? "text-right" : "text-left"}>
                                                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1 flex items-center gap-1" style={isLeft ? { justifyContent: "flex-end" } : {}}>
                                                        <ArrowDown size={9} /> Depth
                                                    </p>
                                                    <p className="text-sm font-sans font-light text-[#E3F2FD]">{log.maxDepth}</p>
                                                </div>
                                                <div className={isLeft ? "text-right" : "text-left"}>
                                                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1 flex items-center gap-1" style={isLeft ? { justifyContent: "flex-end" } : {}}>
                                                        <Clock size={9} /> Duration
                                                    </p>
                                                    <p className="text-sm font-sans font-light text-[#E3F2FD]">{log.duration}</p>
                                                </div>
                                                <div className={isLeft ? "text-right" : "text-left"}>
                                                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1 flex items-center gap-1" style={isLeft ? { justifyContent: "flex-end" } : {}}>
                                                        <Users size={9} /> Crew
                                                    </p>
                                                    <p className="text-sm font-sans font-light text-[#E3F2FD]">{log.crew} Members</p>
                                                </div>
                                            </div>

                                            {/* Summary */}
                                            <p className={`text-xs font-sans font-light leading-relaxed text-[#B0C4D8] mb-5 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                                                {log.summary}
                                            </p>

                                            {/* Status chip */}
                                            <div className={`flex ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                                                <span
                                                    className="text-[10px] font-sans font-medium uppercase tracking-[0.15em] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5"
                                                    style={{
                                                        color: statusColor,
                                                        background: `${statusColor}10`,
                                                        border: `1px solid ${statusColor}25`,
                                                    }}
                                                >
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full"
                                                        style={{ background: statusColor }}
                                                    />
                                                    {log.status}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </SectionWrapper>
                        );
                    })}
                </div>

                {/* End of timeline marker */}
                <SectionWrapper delay={0.3}>
                    <div className="flex flex-col items-center mt-20 text-center">
                        <div
                            className="w-4 h-4 rounded-full mb-6"
                            style={{
                                background: "linear-gradient(135deg, #00D2FC, #818CF8)",
                                boxShadow: "0 0 20px rgba(0,210,252,0.3)",
                            }}
                        />
                        <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#B0C4D8] mb-2">
                            End of Archive
                        </p>
                        <p className="text-[10px] font-sans text-white/30">
                            {EXPEDITION_LOGS.length} missions logged • {EXPEDITION_LOGS[EXPEDITION_LOGS.length - 1].year} – {EXPEDITION_LOGS[0].year}
                        </p>
                    </div>
                </SectionWrapper>
            </div>
        </div>
    );
}
