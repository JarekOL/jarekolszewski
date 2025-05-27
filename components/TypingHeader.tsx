"use client";
import { useEffect, useState } from "react";

const words = ["Cześć", "Hej", "Witaj"];

export default function TypingHeader() {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const currentWord = words[wordIndex % words.length];

        const timeout = setTimeout(() => {
            if (isDeleting) {
                setText((prev) => prev.slice(0, -1));
                setSpeed(70);
            } else {
                setText((prev) => currentWord.slice(0, prev.length + 1));
                setSpeed(150);
            }

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), 1000); // Delay before deleting
            }

            if (isDeleting && text === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, speed]);

    return (
        <div className="text-2xl md:text-3xl font-light text-center">
            <span className="text-brand-nav transition-all duration-200">
                {text}
            </span>
            <span className="animate-blink text-brand-nav">|</span>{" "}
            <span className="text-neutral-800">Miło mi, że tu jesteś</span>
        </div>
    );
}
