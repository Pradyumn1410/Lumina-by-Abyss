import SectionWrapper from "../layout/SectionWrapper";

interface AtmosphericSpacerProps {
    depth: string;
    label: string;
    quote?: string;
}

export default function AtmosphericSpacer({ depth, label, quote }: AtmosphericSpacerProps) {
    return (
        <div className="py-32 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <SectionWrapper>
                <div className="flex flex-col items-center gap-3">
                    {/* Vertical line indicator */}
                    <div className="w-px h-16 bg-gradient-to-b from-[#00D2FC]/40 via-[#00D2FC]/10 to-transparent" />

                    {/* Depth Badge */}
                    <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-[#00D2FC]">
                        {depth} // {label}
                    </span>

                    {quote && (
                        <p className="font-display italic text-sm font-light text-[#B0C4D8]/60 max-w-sm mt-2 leading-relaxed">
                            "{quote}"
                        </p>
                    )}

                    {/* Faint downward chevron */}
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#00D2FC]/10 to-[#00D2FC]/40 mt-2" />
                </div>
            </SectionWrapper>
        </div>
    );
}
