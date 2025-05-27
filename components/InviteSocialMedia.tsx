"use client";

import Link from "next/link";
import React from "react";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";

type InviteSocialMediaProps = {
    text: string;
    textColor?: string; // np. "text-white", "text-black", "text-red-500"
};

const InviteSocialMedia: React.FC<InviteSocialMediaProps> = ({
    text,
    textColor = "text-white",
}) => {
    return (
        <div
            className={`text-base lg:text-lg flex items-center justify-center pt-20 gap-4 ${textColor}`}
        >
            <p className="font-extralight">{text}</p>
            <div className="flex gap-3">
                <Link
                    href="https://www.facebook.com/JarekOlszewskiFotografia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition"
                    aria-label="Facebook"
                >
                    <FaFacebook size={23} />
                </Link>
                <Link
                    href="https://www.instagram.com/jarek.olszewski.fotografia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition"
                    aria-label="Instagram"
                >
                    <FaInstagram size={23} />
                </Link>
                <Link
                    href="https://g.co/kgs/BeBrn5X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition"
                    aria-label="Google"
                >
                    <FaGoogle size={23} />
                </Link>
            </div>
        </div>
    );
};

export default InviteSocialMedia;
