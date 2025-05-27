"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CloudOff } from "lucide-react";

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-b from-white to-blue-50"
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
            >
                <CloudOff className="w-16 h-16 text-blue-400" />
            </motion.div>

            <motion.h1
                className="text-4xl sm:text-5xl font-bold mb-4 text-zinc-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Error 404 🤔
            </motion.h1>

            <motion.p
                className="text-muted-foreground max-w-md mb-8 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                Wygląda na to, że taka strona nie istnieje... Może została
                przeniesiona albo nigdy nie istniała.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <Link href="/">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 shadow-lg transition">
                        Powrót na stronę główną
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );
}
