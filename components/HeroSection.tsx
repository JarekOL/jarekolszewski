"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";

interface HeroSectionProps {
    backgroundImages: string[];
    paragraphs: string[];
    title?: string;
}

export default function HeroSection({
    backgroundImages,
    paragraphs,
    title = "Tytuł sekcji",
}: HeroSectionProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [offsetY, setOffsetY] = useState(0);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 0);

            if (rafId.current === null) {
                rafId.current = requestAnimationFrame(() => {
                    setOffsetY(scrollY * 0.5);
                    rafId.current = null;
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div className="relative -z-50 overflow-hidden anim-opacity">
            {/* Tła z paralaksą */}
            {backgroundImages.map((img, idx) => (
                <div
                    key={idx}
                    className="fixed top-0 left-0 w-full h-[90vh] bg-cover bg-no-repeat bg-center -z-50 will-change-transform"
                >
                    <div
                        className="mt-10 w-full h-full relative"
                        style={{
                            transform: `translateY(-${offsetY}px)`,
                        }}
                    >
                        <Image
                            src={img}
                            fill
                            sizes="(max-width: 768px) 65vw, (max-width: 1200px) 75vw, 1250px"
                            alt="Hero - Jarek Olszewski"
                            priority
                            className="object-cover "
                        />
                        <div className="absolute inset-0 bg-black/45 lg:bg-black/55 z-30" />
                    </div>
                </div>
            ))}

            {/* Nakładka przyciemniająca */}

            {/* Tekst */}
            <div className="relative z-10 pt-[30vh] lg:pt-[40vh] pb-[10vh] lg:pb-[20vh] text-white text-center">
                <p className="text-3xl font-semibold max-w-3xl px-4 mx-auto">{title}</p>
                <div className="mt-4 px-6 max-w-screen-sm mx-auto space-y-4">
                    <p>{paragraphs}</p>
                </div>
            </div>

            {/* Strzałka */}
            <SlArrowDown
                className={`text-4xl text-white/80 mx-auto mb-2 transition-all duration-200 ${
                    isScrolled ? "translate-y-4 opacity-0" : "opacity-100"
                }`}
            />
        </div>
    );
}
