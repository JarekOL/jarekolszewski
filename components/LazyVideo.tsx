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

    return (
        <div ref={ref} className={className}>
            {mounted ? (
                <video src={src} {...rest} />
            ) : (
                placeholder ?? (
                    <div className="w-full h-full bg-zinc-200">
                        <ShimmerLoader />
                    </div>
                )
            )}
        </div>
    );
}
