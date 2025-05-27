import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface SesjaComponentProps {
    img: string | StaticImageData;
    href: string;
    position: string;
    title: string;
}

export default function SesjaComponent({
    img,
    href,
    position,
    title,
}: SesjaComponentProps) {
    return (
        <div className="relative -space-x-10 lg:space-x-8 mt-12 mb-12 ml-12 px-3 w-[80%] sm:w-3/4 lg:w-[86%] h-64">
            <Image
                src={img}
                alt={title}
                style={{ objectPosition: position }}
                sizes="250px"
                className="object-cover"
                fill
                quality={75}
            />
            <div className="-bottom-16 left-0 z-10 absolute bg-black/60 backdrop-blur-sm px-8 py-6 w-full h-max text-start">
                <p className="mb-2 text-white text-xl capitalize">{title}</p>
                <Link
                    href={href}
                    aria-label={title}
                    className="hover:bg-white/20 px-4 py-1 border border-white text-white text-sm transition-colors"
                >
                    Zobacz
                </Link>
            </div>
        </div>
    );
}
