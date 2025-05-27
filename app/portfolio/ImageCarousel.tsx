"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type ImageCarouselProps = {
    images: string[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(
                        entry.target.getAttribute("data-index") || "0"
                    );
                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.6
                    ) {
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: container,
                threshold: 0.6,
            }
        );

        const items = container.querySelectorAll(".carousel-item");
        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 py-6"
        >
            {images.map((src, index) => (
                <div
                    key={index}
                    data-index={index}
                    className={clsx(
                        "carousel-item flex-shrink-0 w-[300px] h-[200px] snap-center transition-transform duration-300",
                        activeIndex === index
                            ? "scale-105 z-10"
                            : "scale-95 opacity-60"
                    )}
                >
                    <Image
                        src={src}
                        alt={`Zdjęcie ${index + 1}`}
                        width={300}
                        height={200}
                        className="rounded-xl object-cover w-full h-full"
                    />
                </div>
            ))}
        </div>
    );
}
