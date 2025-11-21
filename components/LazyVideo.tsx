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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const obs = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setMounted(true);
                        obs.disconnect();
                        break;
                    }
                }
            },
            { rootMargin: "200px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // wrapper: keep square aspect and allow custom wrapper class
    const wrapperClass = `relative aspect-square overflow-hidden ${
        className ?? ""
    }`;

    return (
        <div ref={ref} className={wrapperClass}>
            {mounted ? (
                <video
                    src={src}
                    {...(rest as React.VideoHTMLAttributes<HTMLVideoElement>)}
                    className={"w-full h-full object-cover object-center"}
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
