"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsMessenger } from "react-icons/bs";

export default function Messenger() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const showAfterTimeout = setTimeout(() => {
            setVisible(true);
        }, 3000);

        const handleScroll = () => {
            if (window.scrollY > 600) {
                setVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(showAfterTimeout);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Link
            href="https://m.me/JarekOlszewskiFotografia"
            className={`
                fixed z-50 left-4 bottom-6 md:bottom-12 p-2 rounded-full bg-white border text-white shadow-xl
                transition-all duration-500 ease-in-out
                ${
                    visible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-full"
                }
            `}
            aria-label="Messenger"
        >
            <BsMessenger className="h-7 w-7 text-blue-500" />
            <div className="w-2 h-2 bg-red-600 absolute rounded-full top-0.5 right-0.5" />
            <div className="w-3 h-3 bg-blue-300 absolute rounded-full top-0 right-0 animate-ping" />
        </Link>
    );
}
