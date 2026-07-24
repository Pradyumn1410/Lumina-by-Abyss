import { useEffect, useState } from "react";

export interface ResponsiveInfo {
    width: number;
    height: number;
    isMobile: boolean;
    pixelRatio: number;
}

export function useResponsive(): ResponsiveInfo {
    const [info, setInfo] = useState<ResponsiveInfo>(() => {
        const width = typeof window !== "undefined" ? window.innerWidth : 1024;
        const height = typeof window !== "undefined" ? window.innerHeight : 768;
        return {
            width,
            height,
            isMobile: width < 768,
            pixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
        };
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setInfo({
                width,
                height,
                isMobile: width < 768,
                pixelRatio: Math.min(window.devicePixelRatio, 2),
            });
        };

        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return info;
}
