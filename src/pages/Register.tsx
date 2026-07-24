import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Compass, ShieldAlert, Award, Check, Loader2 } from "lucide-react";
import SubmarineCanvas from "../components/decorative/SubmarineCanvas";
import TitanSubmarineCanvas from "../components/decorative/TitanSubmarineCanvas";
import Toast from "../components/ui/Toast";
import { generateRecommendations, RecommendationResult } from "../features/recommendation/Engine";

const EXPEDITION_OPTIONS = [
    "Mariana Trench — Pacific Ocean (11,000m)",
    "Coral Triangle — Indo-Pacific (200m)",
    "Arctic Twilight — Svalbard, Norway (800m)",
    "Azores Abyss — Mid-Atlantic Ridge (3,200m)",
    "Other / Custom Science Route",
];

const EXPERIENCE_OPTIONS = [
    "First ocean expedition",
    "Recreational open-water diver",
    "Technical trimix / deep diver",
    "Scientific researcher / oceanographer",
    "Professional underwater filmmaker",
];

const MEDICAL_CLEARANCE_OPTIONS = [
    "Full physical clearance from hyperbaric physician",
    "General medical fitness clearance",
    "Pending medical review (will submit prior to launch)",
];

const INITIAL_FORM = {
    name: "",
    email: "",
    age: "",
    country: "",
    expedition: "",
    submarine: "titan",
    emergencyContact: "",
    medicalClearance: "",
    experience: "",
    agree: false,
};

function generateRefId(): string {
    const num = Math.floor(Math.random() * 99000) + 100;
    return `HX-2026-${String(num).padStart(5, "0")}`;
}

export default function Register() {
    const [form, setForm] = useState({ ...INITIAL_FORM });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [refId, setRefId] = useState("");
    const [submittedName, setSubmittedName] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    
    // Dynamic Recommendations
    const [recommendations] = useState<RecommendationResult>(() => generateRecommendations());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSelectSubmarine = (subId: string) => {
        setForm((prev) => ({ ...prev, submarine: subId }));
    };

    const handleDismissToast = useCallback(() => setToastVisible(false), []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return; // Prevent duplicate submissions

        setSubmitting(true);
        const name = form.name.split(" ")[0] || "Explorer";
        const id = generateRefId();

        // Simulate network request
        setTimeout(() => {
            setSubmittedName(name);
            setRefId(id);
            setSubmitted(true);
            setSubmitting(false);
            setToastVisible(true);
            setForm({ ...INITIAL_FORM }); // Reset all inputs, dropdowns, submarine selection, checkboxes immediately!
        }, 1400);
    };

    const handleNewRegistration = () => {
        setForm({ ...INITIAL_FORM });
        setSubmitted(false);
        setRefId("");
        setSubmittedName("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const inputClass = "glass-input placeholder:text-white/20";
    const selectClass = "glass-input cursor-pointer";
    const labelStyle: React.CSSProperties = {
        display: "block",
        fontSize: "0.72rem",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "#B0C4D8",
        marginBottom: "0.5rem",
        fontFamily: "Inter, sans-serif",
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 md:px-8 py-28 relative z-1">
            {/* Toast notification */}
            <Toast
                message="Expedition application submitted successfully."
                visible={toastVisible}
                onDismiss={handleDismissToast}
            />

            {/* Back link */}
            <Link
                to="/"
                className="fixed top-8 left-8 flex items-center gap-2 text-xs no-underline transition-colors duration-300 font-sans tracking-widest uppercase z-1 text-[#B0C4D8]"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E3F2FD")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#B0C4D8")}
            >
                <ChevronLeft size={16} />
                Return
            </Link>

            <div className="w-full max-w-5xl">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* 1. Registration Hero */}
                            <div className="mb-20 text-center max-w-2xl mx-auto">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#00D2FC] font-sans font-medium">
                                    Expedition Terminal // Lumina by Abyss
                                </span>
                                <h1 className="font-display text-4xl md:text-6xl font-light text-white mt-4 mb-4">
                                    Submersible Selection & Command Registry
                                </h1>
                                <p className="text-sm font-sans font-light leading-relaxed text-[#B0C4D8]">
                                    Review our fleet of deep-sea exploration vessels. Choose your vessel class and complete the expedition clearance application below.
                                </p>
                            </div>

                            {/* Submarine Selection Section (Vertical Presentation) */}
                            <div className="flex flex-col gap-12">
                                
                                {/* 2. Recommendation Engine Output */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 pl-1 border-l-2 border-[#00D2FC] mb-6">
                                        <Award size={18} className="text-[#00D2FC]" />
                                        <h2 className="text-xs uppercase tracking-widest text-white font-sans font-medium">
                                            Recommended For You
                                        </h2>
                                    </div>
                                    
                                    <div className="backdrop-blur-[40px] bg-white/[0.05] rounded-[30px] border border-[#00D2FC]/40 p-8 shadow-[0_0_30px_rgba(0,210,252,0.15)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,252,0.1),transparent_50%)]" />
                                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {recommendations.badges.map(badge => (
                                                        <span key={badge} className="text-[10px] uppercase tracking-widest text-[#00D2FC] bg-[#00D2FC]/10 border border-[#00D2FC]/20 px-3 py-1 rounded-full font-medium">
                                                            ✓ {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-sm font-sans font-light leading-relaxed text-[#B0C4D8]">
                                                    {recommendations.reasoning}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    handleSelectSubmarine(recommendations.recommendedSubmarine);
                                                    document.getElementById(recommendations.recommendedSubmarine + "-card")?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }}
                                                className="btn-primary whitespace-nowrap"
                                            >
                                                Select Recommendation
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Previous Explorer Insights */}
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {recommendations.reviews.map((rev, i) => (
                                            <div key={i} className="backdrop-blur-[20px] bg-white/[0.03] rounded-2xl border border-white/5 p-5">
                                                <p className="text-xs font-sans italic text-[#E3F2FD] mb-4">
                                                    {rev.text}
                                                </p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-[10px] uppercase tracking-widest text-[#B0C4D8] font-medium">{rev.sub}</span>
                                                    <div className="flex gap-0.5 text-[#FBBF24]">
                                                        {[...Array(rev.stars)].map((_, j) => <span key={j} className="text-[10px]">★</span>)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contextual Feedback for current selection */}
                                <AnimatePresence mode="wait">
                                    <motion.div 
                                        key={form.submarine}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-center bg-[#00D2FC]/5 border border-[#00D2FC]/20 rounded-xl p-4 mb-4"
                                    >
                                        <p className="text-xs font-sans text-[#E3F2FD] tracking-wide">
                                            {recommendations.contextualMessages[form.submarine]}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex items-center gap-3 pl-1 border-l-2 border-[#00D2FC]">
                                    <Compass size={18} className="text-[#00D2FC]" />
                                    <h2 className="text-xs uppercase tracking-widest text-white font-sans font-medium">
                                        Submersible Fleet Showcase
                                    </h2>
                                </div>

                                {/* 2. Nautilus Class — 60/40 text-left, model-right layout */}
                                <div
                                    id="nautilus-card"
                                    onClick={() => handleSelectSubmarine("nautilus")}
                                    className={`backdrop-blur-[40px] bg-white/[0.08] rounded-[30px] border p-8 transition-all duration-500 cursor-pointer relative ${
                                        form.submarine === "nautilus"
                                            ? "border-[#00D2FC] shadow-[0_0_40px_rgba(0,210,252,0.18)]"
                                            : recommendations.recommendedSubmarine === "nautilus"
                                                ? "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:border-amber-500/50"
                                                : "border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {recommendations.recommendedSubmarine === "nautilus" && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20">
                                            Recommended
                                        </div>
                                    )}
                                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                                        {/* Text — 60% */}
                                        <div className="flex-[6] flex flex-col justify-center order-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-display text-3xl font-light text-white">Nautilus Class</h3>
                                                <span className="text-xs font-sans text-[#00D2FC] bg-[#00D2FC]/10 px-3 py-1 rounded-full border border-[#00D2FC]/20">
                                                    4,000m Limit
                                                </span>
                                            </div>
                                            <p className="text-xs font-sans italic text-[#B0C4D8] mb-6">
                                                Unrivaled luxury and panoramic field of view for epipelagic and mesopelagic research.
                                            </p>
                                            <div className="hairline pt-4 flex flex-col gap-3 mb-6">
                                                <div className="flex justify-between text-xs font-sans">
                                                    <span className="text-white/40">Capacity</span>
                                                    <span className="text-[#E3F2FD]">5 Crew members</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-sans">
                                                    <span className="text-white/40">Propulsion</span>
                                                    <span className="text-[#E3F2FD]">Hydrodynamic water-jet propulsion</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectSubmarine("nautilus");
                                                }}
                                                className={`w-full py-3 rounded-xl text-xs font-sans uppercase tracking-widest font-medium transition-all duration-300 border flex items-center justify-center gap-2 ${
                                                    form.submarine === "nautilus"
                                                        ? "bg-[#00D2FC] text-[#0A192F] border-[#00D2FC] shadow-[0_4px_16px_rgba(0,210,252,0.25)]"
                                                        : "bg-transparent text-white/70 border-white/10 hover:text-white"
                                                }`}
                                            >
                                                {form.submarine === "nautilus" && <Check size={14} />}
                                                {form.submarine === "nautilus" ? "Selected Vessel" : "Select Nautilus Class"}
                                            </button>
                                        </div>

                                        {/* Model — 40% */}
                                        <div className="flex-[4] relative rounded-2xl overflow-hidden bg-black/10 min-h-[280px] order-2">
                                            <SubmarineCanvas type="nautilus" />
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Voyager Class — 60/40 text-left, model-right layout */}
                                <div
                                    id="voyager-card"
                                    onClick={() => handleSelectSubmarine("voyager")}
                                    className={`backdrop-blur-[40px] bg-white/[0.08] rounded-[30px] border p-8 transition-all duration-500 cursor-pointer relative ${
                                        form.submarine === "voyager"
                                            ? "border-[#00D2FC] shadow-[0_0_40px_rgba(0,210,252,0.18)]"
                                            : recommendations.recommendedSubmarine === "voyager"
                                                ? "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:border-amber-500/50"
                                                : "border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {recommendations.recommendedSubmarine === "voyager" && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20">
                                            Recommended
                                        </div>
                                    )}
                                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                                        {/* Text — 60% */}
                                        <div className="flex-[6] flex flex-col justify-center order-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-display text-3xl font-light text-white">Voyager Class</h3>
                                                <span className="text-xs font-sans text-[#00D2FC] bg-[#00D2FC]/10 px-3 py-1 rounded-full border border-[#00D2FC]/20">
                                                    6,000m Limit
                                                </span>
                                            </div>
                                            <p className="text-xs font-sans italic text-[#B0C4D8] mb-6">
                                                Optimized for scientific research, bathypelagic sampling, and hydrothermal vent analysis.
                                            </p>
                                            <div className="hairline pt-4 flex flex-col gap-3 mb-6">
                                                <div className="flex justify-between text-xs font-sans">
                                                    <span className="text-white/40">Capacity</span>
                                                    <span className="text-[#E3F2FD]">4 Crew members</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-sans">
                                                    <span className="text-white/40">Propulsion</span>
                                                    <span className="text-[#E3F2FD]">Four vector-control maneuver thrusters</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectSubmarine("voyager");
                                                }}
                                                className={`w-full py-3 rounded-xl text-xs font-sans uppercase tracking-widest font-medium transition-all duration-300 border flex items-center justify-center gap-2 ${
                                                    form.submarine === "voyager"
                                                        ? "bg-[#00D2FC] text-[#0A192F] border-[#00D2FC] shadow-[0_4px_16px_rgba(0,210,252,0.25)]"
                                                        : "bg-transparent text-white/70 border-white/10 hover:text-white"
                                                }`}
                                            >
                                                {form.submarine === "voyager" && <Check size={14} />}
                                                {form.submarine === "voyager" ? "Selected Vessel" : "Select Voyager Class"}
                                            </button>
                                        </div>

                                        {/* Model — 40% */}
                                        <div className="flex-[4] relative rounded-2xl overflow-hidden bg-black/10 min-h-[280px] order-2">
                                            <SubmarineCanvas type="voyager" />
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Titan Class (Hero Showcase — 60/40 text-left, GLB model-right) */}
                                <div
                                    id="titan-card"
                                    onClick={() => handleSelectSubmarine("titan")}
                                    className={`backdrop-blur-[40px] bg-white/[0.08] rounded-[30px] border p-8 md:p-12 transition-all duration-500 cursor-pointer relative ${
                                        form.submarine === "titan"
                                            ? "border-[#00D2FC] shadow-[0_0_40px_rgba(0,210,252,0.25)]"
                                            : recommendations.recommendedSubmarine === "titan"
                                                ? "border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:border-amber-500/50"
                                                : "border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {recommendations.recommendedSubmarine === "titan" && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20">
                                            Recommended
                                        </div>
                                    )}
                                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                                        {/* Text — 60% */}
                                        <div className="flex-[6] flex flex-col justify-center order-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#00D2FC] font-sans font-medium">
                                                        Flagship Submersible // Challenger Deep Rating
                                                    </span>
                                                    <h3 className="font-display text-4xl md:text-5xl font-light text-white mt-1">Titan Class</h3>
                                                </div>
                                                <span className="text-xs font-sans text-[#00D2FC] bg-[#00D2FC]/10 px-4 py-1.5 rounded-full border border-[#00D2FC]/30 self-start sm:self-center">
                                                    11,000m Hadal Limit
                                                </span>
                                            </div>

                                            <p className="text-sm font-sans italic text-[#B0C4D8] max-w-2xl mb-6">
                                                The definitive Titan Class model engineered for ultra-deep Hadal trench descents. Equipped with titanium pressure sphere and dual high-torque thrusters.
                                            </p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 hairline pt-6 mb-6">
                                                <div className="flex justify-between text-xs font-sans">
                                                    <span className="text-white/40">Capacity</span>
                                                    <span className="text-[#E3F2FD]">3 Crew members</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-sans">
                                                    <span className="text-white/40">Propulsion Unit</span>
                                                    <span className="text-[#E3F2FD]">Dual high-torque electric thrusters</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectSubmarine("titan");
                                                }}
                                                className={`w-full py-4 rounded-xl text-xs font-sans uppercase tracking-widest font-medium transition-all duration-300 border flex items-center justify-center gap-2 ${
                                                    form.submarine === "titan"
                                                        ? "bg-[#00D2FC] text-[#0A192F] border-[#00D2FC] shadow-[0_4px_20px_rgba(0,210,252,0.3)]"
                                                        : "bg-transparent text-white/70 border-white/10 hover:text-white"
                                                }`}
                                            >
                                                {form.submarine === "titan" && <Check size={14} />}
                                                {form.submarine === "titan" ? "Selected Titan Vessel" : "Select Titan Class"}
                                            </button>
                                        </div>

                                        {/* GLB Model — 40% */}
                                        <div className="flex-[4] relative rounded-2xl overflow-hidden bg-transparent min-h-[320px] order-2">
                                            <TitanSubmarineCanvas />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 5. Registration Form */}
                            <div className="mt-[180px] mx-auto w-[92vw] max-w-[900px]">
                                <div className="backdrop-blur-[40px] bg-white/[0.08] rounded-[30px] p-8 md:p-14 border border-white/10">
                                    <div className="flex items-center gap-3 mb-8 pl-1 border-l-2 border-[#00D2FC]">
                                        <Award size={18} className="text-[#00D2FC]" />
                                        <h2 className="text-xs uppercase tracking-widest text-white font-sans font-medium">
                                            Expedition Command Application
                                        </h2>
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
                                        {/* Name and Email Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label style={labelStyle}>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Alexandra Harrington"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="alexandra@frontier.com"
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        {/* Age and Country Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label style={labelStyle}>Age</label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={form.age}
                                                    onChange={handleChange}
                                                    required
                                                    min="18"
                                                    max="90"
                                                    placeholder="35"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Country of Residence</label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={form.country}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Switzerland"
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>

                                        {/* Preferred Expedition & Preferred Submarine */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label style={labelStyle}>Preferred Expedition</label>
                                                <select
                                                    name="expedition"
                                                    value={form.expedition}
                                                    onChange={handleChange}
                                                    required
                                                    className={selectClass}
                                                >
                                                    <option value="" disabled>Choose route depth...</option>
                                                    {EXPEDITION_OPTIONS.map((opt) => (
                                                        <option key={opt} value={opt} style={{ background: "#0A192F" }}>
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Preferred Submarine</label>
                                                <select
                                                    name="submarine"
                                                    value={form.submarine}
                                                    onChange={handleChange}
                                                    required
                                                    className={selectClass}
                                                >
                                                    <option value="titan" style={{ background: "#0A192F" }}>Titan Class (11,000m)</option>
                                                    <option value="nautilus" style={{ background: "#0A192F" }}>Nautilus Class (4,000m)</option>
                                                    <option value="voyager" style={{ background: "#0A192F" }}>Voyager Class (6,000m)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Emergency Contact & Medical Clearance */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label style={labelStyle}>Emergency Contact</label>
                                                <input
                                                    type="text"
                                                    name="emergencyContact"
                                                    value={form.emergencyContact}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Name & Relationship (e.g. John Harrington - Partner)"
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Medical Clearance Status</label>
                                                <select
                                                    name="medicalClearance"
                                                    value={form.medicalClearance}
                                                    onChange={handleChange}
                                                    required
                                                    className={selectClass}
                                                >
                                                    <option value="" disabled>Select clearance certificate...</option>
                                                    {MEDICAL_CLEARANCE_OPTIONS.map((opt) => (
                                                        <option key={opt} value={opt} style={{ background: "#0A192F" }}>
                                                            {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Experience Level */}
                                        <div>
                                            <label style={labelStyle}>Experience Level</label>
                                            <select
                                                name="experience"
                                                value={form.experience}
                                                onChange={handleChange}
                                                required
                                                className={selectClass}
                                            >
                                                <option value="" disabled>Select depth qualifications...</option>
                                                {EXPERIENCE_OPTIONS.map((opt) => (
                                                    <option key={opt} value={opt} style={{ background: "#0A192F" }}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Safety Disclaimer */}
                                        <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] flex items-start gap-3">
                                            <ShieldAlert className="text-amber-500/60 mt-0.5 flex-shrink-0" size={16} />
                                            <p className="text-xs leading-relaxed text-amber-200/50">
                                                Sub-surface operations occur under pressure exceeding 1,000 atmospheres. Successful application requires verification of medical history, open-ocean capabilities, and mandatory physiological training.
                                            </p>
                                        </div>

                                        {/* Agreement Checkbox */}
                                        <label className="flex items-start gap-3 cursor-pointer text-[#B0C4D8] hover:text-[#E3F2FD] transition-colors duration-300 mt-2 select-none">
                                            <input
                                                type="checkbox"
                                                name="agree"
                                                checked={form.agree}
                                                onChange={handleChange}
                                                required
                                                className="mt-0.5 w-4 h-4 accent-[#00D2FC] cursor-pointer"
                                            />
                                            <span className="text-[11px] leading-relaxed">
                                                I formally authorize the Lumina by Abyss medical board to review my fitness records. I acknowledge deep-sea risk variables, and verify that the provided credentials are valid.
                                            </span>
                                        </label>

                                        {/* Submit Application */}
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className={`btn-primary w-full justify-center py-4 rounded-xl mt-4 font-medium tracking-widest text-sm shadow-[0_0_30px_rgba(0,210,252,0.15)] transition-all duration-300 ${
                                                submitting
                                                    ? "opacity-70 cursor-not-allowed"
                                                    : "hover:shadow-[0_0_40px_rgba(0,210,252,0.3)] hover:scale-[1.01]"
                                            }`}
                                        >
                                            {submitting ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Submitting...
                                                </span>
                                            ) : (
                                                "Transmit Application"
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ═══════════ SUCCESS CONFIRMATION PANEL ═══════════ */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center justify-center min-h-[60vh]"
                        >
                            <div
                                className="rounded-[30px] p-10 md:p-14 text-center max-w-xl mx-auto border border-white/10 shadow-[0_15px_60px_rgba(0,0,0,0.4)]"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(40px) saturate(180%)",
                                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                                }}
                            >
                                {/* Animated checkmark */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(0,210,252,0.15))",
                                        border: "1px solid rgba(52,211,153,0.3)",
                                        boxShadow: "0 0 40px rgba(52,211,153,0.15)",
                                    }}
                                >
                                    <motion.svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#34D399"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </motion.svg>
                                </motion.div>

                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-[10px] uppercase tracking-[0.3em] text-[#00D2FC] font-sans font-medium block mb-3"
                                >
                                    Application Received
                                </motion.span>

                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="font-display text-3xl md:text-4xl font-light text-white mb-4"
                                >
                                    Thank you, {submittedName}.
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="text-sm font-sans font-light leading-relaxed mb-8 text-[#B0C4D8]"
                                >
                                    Thank you for registering for the Lumina by Abyss Expedition. Our exploration team has received your application. You will receive further expedition details shortly.
                                </motion.p>

                                {/* Reference ID */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="hairline py-6 mb-8"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#B0C4D8] font-sans mb-2">
                                        Reference ID
                                    </p>
                                    <p
                                        className="font-mono text-2xl font-light tracking-widest"
                                        style={{ color: "#00D2FC" }}
                                    >
                                        {refId}
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <button
                                        onClick={handleNewRegistration}
                                        className="btn-outline flex-1 justify-center"
                                    >
                                        Register Another
                                    </button>
                                    <Link to="/" className="btn-primary flex-1 justify-center">
                                        Return to Command Center
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
