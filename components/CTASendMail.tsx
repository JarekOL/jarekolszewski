"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MainBtn } from "./Buttons/MainBtn";
import { IoMdClose } from "react-icons/io";
import ContactForm from "./ContactForm";

export default function CTASendMail({ title }: { title: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <MainBtn className="uppercase" onClick={() => setIsModalOpen(true)}>
                {title}
            </MainBtn>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed -top-6 left-0 h-[110%] w-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-6 shadow-lg max-w-lg w-[90%] -mt-20 relative"
                        >
                            <button
                                className="absolute top-2 right-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <IoMdClose className="text-2xl text-black" />
                            </button>
                            <ContactForm />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
