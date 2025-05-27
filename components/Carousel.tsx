"use client";

import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { AnimatePresence, motion } from "framer-motion";
import ShimmerLoader from "./ShimmerLoader";

const images = [
    {
        src: "/Images/carousel/01_fotografia_slubna_siedlce.avif",
        position: "53% 50%",
    },
    {
        src: "/Images/carousel/02_sesja_slubna_plener_siedlce.avif",
        position: "40% 40%",
    },
    { src: "/Images/carousel/fotografia-slubna.avif", position: "55% 100%" },
    { src: "/Images/carousel/pierwszy-taniec-foto.avif", position: "40% 10%" },
];

// autoplay plugin
function AutoplayPlugin(slider: KeenSliderInstance) {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    function clearNextTimeout() {
        clearTimeout(timeout);
    }

    function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
            slider.next();
        }, 4000); // zmień czas (ms) według uznania
    }

    slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
        });
        nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
}

const Carousel = () => {
    const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
    // const [activeIndex, setActiveIndex] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            dragSpeed: 0.8,
            slides: { perView: 1 },
            renderMode: "performance",
            mode: "snap",
            // slideChanged(slider) {
            //     const relative = slider.track.details.rel;
            //     setActiveIndex(relative);
            // },
        },
        [AutoplayPlugin]
    );

    return (
        <div className="relative w-screen xl:max-w-[1550px] h-[72vh] lg:h-[85vh] mx-auto overflow-hidden">
            <AnimatePresence>
                {!isFirstImageLoaded && (
                    <motion.div
                        className="w-full h-full absolute inset-0 z-10 bg-zinc-200"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ShimmerLoader />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Slider */}
            <div ref={sliderRef} className="keen-slider h-full cursor-grab">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="keen-slider__slide relative w-full h-full"
                    >
                        <Image
                            src={image.src}
                            alt={`Fotograf ${index + 1}`}
                            fill
                            className="object-cover"
                            style={{ objectPosition: image.position }}
                            priority={index === 0}
                            sizes="(max-width: 768px) 75vw, (max-width: 1200px) 75vw, 1550px"
                            onLoad={() => {
                                if (index === 0) setIsFirstImageLoaded(true);
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2"
                aria-label="Poprzedni slajd"
            >
                <SlArrowLeft className="text-4xl text-white/80 hover:text-white transition-colors duration-300" />
            </button>
            <button
                onClick={() => instanceRef.current?.next()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2"
                aria-label="Następny slajd"
            >
                <SlArrowRight className="text-4xl text-white/80 hover:text-white transition-colors duration-300" />
            </button>

            {/* Dots */}
            {/* <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20"
                role="presentation"
                aria-hidden="true"
            >
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => instanceRef.current?.moveToIdx(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            activeIndex === idx
                                ? "bg-white"
                                : "bg-white/30 hover:bg-white"
                        }`}
                        tabIndex={-1}
                    />
                ))}
            </div> */}
        </div>
    );
};

export default Carousel;
