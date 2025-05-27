import Link from "next/link";
import React from "react";

import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const contactDetails = [
    {
        href: "tel:507946719",
        icon: FaPhoneAlt,
        text: "507 946 719",
        label: "Zadzwoń do fotografa",
    },
    {
        href: "mailto:kontakt@jarekolszewski.pl",
        icon: IoMdMail,
        text: "kontakt@jarekolszewski.pl",
        label: "Napisz do fotografa",
    },
];

export default function ContactBtns() {
    return (
        <section className="flex flex-col mx-auto sm:flex-row justify-center items-center gap-4 my-4 text-white">
            <div className="bg-brand w-full h-px hidden lg:block" />
            {contactDetails.map(({ href, icon: Icon, text, label }, index) => (
                <Link
                    key={index}
                    href={href}
                    aria-label={label}
                    className="flex lg:w-max w-full text-center items-center gap-2 px-4 py-2 bg-brand"
                >
                    <Icon className="" />
                    <span className="font-medium w-max">{text}</span>
                </Link>
            ))}
            <div className="bg-brand w-full h-px hidden lg:block " />
        </section>
    );
}
