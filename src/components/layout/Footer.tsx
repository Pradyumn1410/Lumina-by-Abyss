import { Link } from "react-router-dom";

const FOOTER_LINKS = {
    Explore: ["Expeditions", "Journey", "Gallery", "About"],
    Company: ["Research", "Press", "Expeditions", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="hairline bg-[#010812]/80 backdrop-blur-xl relative z-1">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
                    {/* Brand column */}
                    <div className="md:col-span-2">
                        <p className="font-display text-3xl font-light tracking-[0.2em] text-white mb-4">
                            LUMINA BY ABYSS
                        </p>
                        <p className="text-sm font-sans font-light leading-relaxed text-[#B0C4D8]" style={{ maxWidth: "300px" }}>
                            Luxury deep-ocean exploration expeditions for those who seek Earth's last undiscovered frontier.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                        <div key={section}>
                            <p className="text-xs uppercase tracking-[0.18em] mb-5 font-medium text-[#00D2FC]">
                                {section}
                            </p>
                            <ul className="list-none m-0 p-0 flex flex-col gap-3">
                                {links.map((link) => {
                                    const routePath = `/${link.toLowerCase().replace(/\s+/g, '-')}`;
                                    return (
                                        <li key={link}>
                                            <Link
                                                to={routePath}
                                                className="text-sm font-sans font-light no-underline text-[#B0C4D8] hover:text-[#E3F2FD] transition-colors duration-300"
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="hairline pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-sans font-light text-[#B0C4D8]">
                        © {year} Lumina by Abyss. All rights reserved.
                    </p>
                    <Link to="/register" className="text-xs font-sans tracking-widest uppercase no-underline text-[#00D2FC] hover:text-[#34D399] transition-colors">
                        Begin Your Expedition →
                    </Link>
                </div>
            </div>
        </footer>
    );
}
