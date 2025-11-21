"use client";

import { useEffect, useRef, useState } from "react";
import ShimmerLoader from "./ShimmerLoader";

type LazyVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
    src: string;
    className?: string;
    placeholder?: React.ReactNode;
};

export default function LazyVideo({
    src,
    className,
    placeholder,
    ...rest
}: LazyVideoProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        obs.disconnect();
                    }
                });
            },
            { rootMargin: "200px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Mount video only once it becomes visible to avoid repeated layout churn
    useEffect(() => {
        if (isVisible) setMounted(true);
    }, [isVisible]);

    // allow passing a wrapper className, but ensure the container
    // is always a square and hides overflow to keep consistent layout
    const wrapperClass = `relative aspect-square overflow-hidden ${
        className ?? ""
    }`;

    const { className: videoClassName, ...videoProps } = rest as any;

    return (
        <div ref={ref} className={wrapperClass}>
            {mounted ? (
                <video
                    src={src}
                    {...(videoProps as React.VideoHTMLAttributes<HTMLVideoElement>)}
                    className={`w-full h-full object-cover object-center ${
                        videoClassName ?? ""
                    }`}
                />
            ) : (
                placeholder ?? (
                    <div
                        className="w-full h-full bg-zinc-200 flex items-center justify-center"
                        aria-hidden
                    >
                        <ShimmerLoader />
                    </div>
                )
            )}
        </div>
    );
}
