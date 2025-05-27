"use client";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 800);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed z-[9999] right-4 bottom-6 md:bottom-12 p-2 rounded-full border bg-black text-white border-zinc-800
                transition-all duration-500 ease-in-out
                ${
                    visible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-full"
                }
            `}
            aria-label="Powrót na górę"
        >
            <IoIosArrowUp className="h-6 w-6"  />
        </button>
    );
}
