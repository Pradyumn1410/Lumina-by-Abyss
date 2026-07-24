import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
    { label: "Expeditions", href: "/#expeditions" },
    { label: "Journey", href: "/#journey" },
    { label: "Gallery", href: "/#gallery" },
    { label: "About", href: "/#about" },
    { label: "Expedition Logs", href: "/logs", isRoute: true },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = location.pathname === "/";

    const navbarStyle: React.CSSProperties = isScrolled
        ? {
              background: "rgba(255, 255, 255, 0.025)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.35)",
              transition: "background-color 300ms ease-in-out, backdrop-filter 300ms ease-in-out, -webkit-backdrop-filter 300ms ease-in-out, border-color 300ms ease-in-out, box-shadow 300ms ease-in-out",
          }
        : {
              background: "rgba(10, 25, 47, 0.72)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.10)",
              boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 12px 40px rgba(0, 0, 0, 0.25)",
              transition: "background-color 300ms ease-in-out, backdrop-filter 300ms ease-in-out, -webkit-backdrop-filter 300ms ease-in-out, border-color 300ms ease-in-out, box-shadow 300ms ease-in-out",
          };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-[1000] isolate"
            style={navbarStyle}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between" style={{ height: "76px" }}>
                {/* Logo */}
                <Link to="/" className="font-display text-2xl font-light tracking-[0.2em] text-[#E3F2FD] no-underline hover:opacity-90 transition-opacity">
                    LUMINA BY ABYSS
                </Link>

                {/* Desktop navigation links */}
                <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            {link.isRoute ? (
                                <Link
                                    to={link.href}
                                    className="relative text-xs font-sans font-light tracking-[0.15em] uppercase no-underline transition-colors duration-300 py-1 group"
                                    style={{ color: isScrolled ? "#B0C4D8" : "#E3F2FD" }}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00D2FC] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ) : (
                                <a
                                    href={isHome ? link.href.replace("/#", "#") : link.href}
                                    className="relative text-xs font-sans font-light tracking-[0.15em] uppercase no-underline transition-colors duration-300 py-1 group"
                                    style={{ color: isScrolled ? "#B0C4D8" : "#E3F2FD" }}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00D2FC] transition-all duration-300 group-hover:w-full" />
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/register" className="btn-primary text-xs" style={{ padding: "0.6rem 1.6rem" }}>
                        Book Expedition
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                display: "block",
                                width: "22px",
                                height: "1px",
                                background: "#E3F2FD",
                                transition: "all 0.3s ease",
                                transform:
                                    menuOpen && i === 0 ? "translateY(8px) rotate(45deg)"
                                    : menuOpen && i === 1 ? "scaleX(0)"
                                    : menuOpen && i === 2 ? "translateY(-8px) rotate(-45deg)"
                                    : "none",
                            }}
                        />
                    ))}
                </button>
            </nav>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="md:hidden glass border-t border-white/10 p-6 flex flex-col gap-6 relative z-[1100]">
                    <ul className="list-none m-0 p-0 flex flex-col gap-5">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                {link.isRoute ? (
                                    <Link
                                        to={link.href}
                                        className="text-xs font-sans tracking-[0.15em] uppercase no-underline text-[#E3F2FD] hover:text-white"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={isHome ? link.href.replace("/#", "#") : link.href}
                                        className="text-xs font-sans tracking-[0.15em] uppercase no-underline text-[#E3F2FD] hover:text-white"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Link to="/register" className="btn-primary text-xs w-full justify-center" onClick={() => setMenuOpen(false)}>
                        Book Expedition
                    </Link>
                </div>
            )}
        </header>
    );
}
