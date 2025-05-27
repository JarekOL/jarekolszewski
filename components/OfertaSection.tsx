"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { OFERTALINKS } from "@/constants/Links";
import Image from "next/image";

export default function OfertaSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
        setScrollLeft(containerRef.current?.scrollLeft || 0);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // opór
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const endDrag = () => {
        setIsDragging(false);
    };

    return (
        <section className="bg-white py-12 mx-auto">
            <h2 className="text-center text-2xl font-semibold mb-6">
                Oferty fotografii:
            </h2>

            <div
                ref={containerRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-6 scroll-smooth cursor-grab active:cursor-grabbing select-none"
                style={{
                    scrollPaddingLeft: "50%",
                }}
            >
                <div className="shrink-0 w-0 lg:w-[20%]" aria-hidden />
                {OFERTALINKS.map(({ href, label, src }) => (
                    <Link
                        href={href}
                        key={label}
                        onClick={(e) => {
                            if (isDragging) e.preventDefault();
                        }}
                        draggable="false"
                        className="snap-none shrink-0 w-64 overflow-hidden bg-gradient-to-br from-gray-100 to-stone-200 rounded-sm shadow-lg hover:shadow-xl transition space-y-2 relative"
                    >
                        <div className="relative w-full h-40">
                            {src ? (
                                <Image
                                    src={src}
                                    fill
                                    sizes="180px"
                                    alt={label}
                                    title={`${label} - Jarel Olszewski`}
                                    className="object-cover"
                                    draggable="false"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                    Brak obrazka
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-center flex-col text-center pb-2">
                            <h3 className="text-lg font-semibold">{label}</h3>
                            <p className="text-sm text-gray-700">
                                Zobacz szczegóły
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
