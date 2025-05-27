import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageComponentProps {
    index: number;
    img: string | StaticImageData;
    title: string;
    desc: string;
}

export default function ImageComponent({
    index,
    img,
    title,
    desc,
}: ImageComponentProps) {
    return (
        <div className="relative flex flex-wrap items-center justify-center aspect-[4/2] sm:aspect-[8/6]">
            <Image
                src={img}
                alt={title}
                title={`${title} - Jarek Olszewski`}
                fill
                sizes="320px"
                priority={index === 0}
                className="object-cover w-full h-full aspect-[4/2] sm:aspect-[8/6] opacity-80"
                quality={70}
            />

            <div className="absolute bottom-0 right-0 lg:left-0 bg-black/45 text-center p-3 z-10 h-full w-full flex items-center justify-center flex-col">
                <p className="capitalize text-white text-xl sm:text-lg md:text-xl lg:text-2xl mb-2 font-semibold">
                    {title}
                </p>
                {desc && (
                    <p className="text-white text-base sm:text-sm md:text-base lg:text-lg py-1">
                        {desc}
                    </p>
                )}
            </div>

            {/* <div className="absolute -bottom-2 right-0 lg:left-0 bg-black/60 text-start px-4 py-3 backdrop-blur-sm z-10 h-max lg:w-[95%] w-[90%]">
                <p className="capitalize text-white text-xl font-medium">
                    {title}
                </p>
                {desc && <p className="text-white text-sm py-1">{desc}</p>}
            </div> */}
        </div>
    );
}
