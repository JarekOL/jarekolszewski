"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { SecondBtn } from "@/components/Buttons/SecondBtn";

export default function DziekujePage() {
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 anim-opacity">
            <div className="max-w-xl p-1 w-full space-y-6">
                <h1 className="text-3xl font-bold text-[#be542aee]">
                    Dziękuje za wiadomość!
                </h1>
                <p className="text-gray-700 text-lg">
                    Twoja wiadomość została pomyślnie wysłana. Skontaktuje się z
                    Tobą jak najszybciej!
                </p>
                <SecondBtn>
                    <Link href="/">Powrót na stronę główną</Link>
                </SecondBtn>
            </div>
        </div>
    );
}
