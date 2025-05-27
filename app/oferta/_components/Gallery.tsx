"use client";

import { useEffect, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import Image from "next/image";
import ShimmerLoader from "@/components/ShimmerLoader";

type ResponsiveImage = {
    width: number;
    height: number;
    src: string;
};

type GalleryImage = {
    responsiveImage: ResponsiveImage;
};

type GalleryProps = {
    allImages: GalleryImage[];
};

export default function Gallery({ allImages }: GalleryProps) {
    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: ".pswp-gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
        };
    }, [allImages]);

    return (
        <div className="py-2">
            <div className="pswp-gallery grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 m-2 py-3">
                {allImages.map((image, index) => (
                    <ImgGallery key={index} image={image} />
                ))}
            </div>
        </div>
    );
}

type ImgGalleryProps = {
    image: GalleryImage;
};

function ImgGallery({ image }: ImgGalleryProps) {
    const [loaded, setLoaded] = useState(false);

    const widthHeightRatio =
        image.responsiveImage.height / image.responsiveImage.width;
    const galleryHeight = Math.ceil(200 * widthHeightRatio);
    const imageSpans = Math.ceil(galleryHeight / 10) + 1;

    return (
        <div style={{ gridRow: `span ${imageSpans}` }}>
            <a
                href={image.responsiveImage.src}
                data-pswp-width={image.responsiveImage.width}
                data-pswp-height={image.responsiveImage.height}
                target="_blank"
                rel="noreferrer"
                className="group relative block w-full h-full"
            >
                {!loaded && <ShimmerLoader />}
                <Image
                    className={`object-cover w-full h-full transition-opacity duration-500 ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
                    src={image.responsiveImage.src}
                    alt="Fotografia z galerii Jarek Olszewski"
                    height={image.responsiveImage.height / 4}
                    width={image.responsiveImage.width / 4}
                    onLoadingComplete={() => setLoaded(true)}
                />
            </a>
        </div>
    );
}
