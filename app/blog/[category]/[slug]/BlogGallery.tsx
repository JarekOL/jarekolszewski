"use client";

import { useState } from "react";
import Image from "next/image";

type BlogImage = {
    src: string;
    width: number;
    height: number;
};

export default function BlogGallery({ images }: { images: BlogImage[] }) {
    const [loadedImages, setLoadedImages] = useState<boolean[]>(
        Array(images.length).fill(false)
    );

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });
    };

    return (
        <div
            id="gallery"
            className="columns-1 md:columns-1 gap-1.5 max-w-4xl mx-auto mb-2 space-y-1.5"
        >
            {images.map(({ src, width, height }, index) => {
                const scaledWidth = Math.round(width);
                const scaledHeight = Math.round(height);

                return (
                    <a
                        key={index}
                        href={src}
                        data-pswp-width={width}
                        data-pswp-height={height}
                        target="_blank"
                        rel="noreferrer"
                        className="break-inside-avoid block overflow-hidden relative"
                    >
                        {!loadedImages[index] && (
                            <div className="absolute inset-0 animate-pulse bg-gray-300 z-0" />
                        )}
                        <Image
                            src={src}
                            alt={`Jarek Olszewski ${index}`}
                            width={scaledWidth}
                            height={scaledHeight}
                            priority={index < 2}
                            onLoad={() => handleImageLoad(index)}
                            className={`w-full h-auto object-cover transition-opacity duration-500 ${
                                loadedImages[index] ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    </a>
                );
            })}
        </div>
    );
}
