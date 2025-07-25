"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroOverlay() {
    const [text, setText] = useState("");
    const [shouldRender, setShouldRender] = useState(false);

    const fullText = "Witaj";

    useEffect(() => {
        const lastShown = localStorage.getItem("intro-shown-at");
        const now = Date.now();

        // 1 dzień = 86400000
        if (!lastShown || now - parseInt(lastShown) > 3600000) {
            localStorage.setItem("intro-shown-at", now.toString());
            setShouldRender(true);
        }
    }, []);

    useEffect(() => {
        if (!shouldRender) return;

        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) clearInterval(interval);
        }, 320 / fullText.length);


        const removeTimer = setTimeout(() => setShouldRender(false), 2500);

        return () => {
            clearInterval(interval);
            clearTimeout(removeTimer);
        };
    }, [shouldRender]);

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.3 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className="fixed z-[9999] top-0 left-0 w-full h-full bg-black flex items-center justify-center px-4"
                >
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="text-gray-200 text-5xl font-bold md:text-6xl lg:text-7xl tracking-wide"
                    >
                        {text.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                    filter: "blur(10px)",
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    filter: "blur(0px)",
                                }}
                                transition={{
                                    delay: index * 0.1 + 0.3,
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
