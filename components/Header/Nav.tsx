"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MenuBurger from "@/components/Header/MenuBurger";
import { NAVLINKS } from "@/constants/Links";
import { TiSocialFacebook } from "react-icons/ti";
import { FiInstagram } from "react-icons/fi";
import { Logo } from "./Logo";

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setShowMenu(false);
    }, [pathname]);
    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showMenu]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const menu = document.querySelector(".mobile-menu");
            const burger = document.querySelector(".menu-burger-button");

            if (
                showMenu &&
                menu &&
                burger &&
                !menu.contains(target) &&
                !burger.contains(target)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showMenu]);

    return (
        <>
            {showMenu && (
                <div
                    className="fixed inset-0 anim-opacity bg-black/30 backdrop-blur-md z-[40] lg:hidden"
                    onClick={() => setShowMenu(false)}
                    aria-hidden="true"
                />
            )}
            <header
                className={`top-0 z-50 backdrop-blur-md transition-all duration-300 w-full bg-white/90 text-black `}
            >
                <div className="mx-auto flex items-center justify-between p-4 max-w-screen-2xl">
                    <Logo />
                    <MenuBurger
                        handleShowMenu={() => setShowMenu(!showMenu)}
                        showMenu={showMenu}
                    />

                    <div
                        className={`mobile-menu fixed left-0 top-0 z-[50] h-screen w-[280px] bg-[#6e2a23] text-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                            showMenu ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <div className="flex gap-5 mt-auto mb-10 p-6">
                            <Link
                                href="https://www.facebook.com/JarekOlszewskiFotografia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="text-white hover:text-[#ffcbc4] transition-all text-2xl"
                            >
                                <TiSocialFacebook />
                            </Link>
                            <Link
                                href="https://www.instagram.com/jarek.olszewski.fotografia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="text-white hover:text-[#ffcbc4] transition-all text-xl"
                            >
                                <FiInstagram />
                            </Link>
                        </div>
                        <div className="flex flex-col h-full px-6">
                            <nav aria-label="Menu mobilne">
                                <ul className="flex flex-col space-y-6">
                                    {NAVLINKS.map((link, index) => (
                                        <li
                                            key={link.label}
                                            className={`transition-all duration-300 ${
                                                showMenu
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                            style={{
                                                transitionDelay: `${
                                                    index * 60
                                                }ms`,
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() =>
                                                    setShowMenu(false)
                                                }
                                                className={`block py-1 text-lg uppercase font-medium transition-all ${
                                                    pathname === link.href
                                                        ? "text-white font-bold"
                                                        : "text-gray-200"
                                                }`}
                                                aria-current={
                                                    pathname === link.href
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <nav className="hidden lg:block">
                        <ul className="flex items-center justify-center xl:space-x-4 space-x-1 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                            {NAVLINKS.map((link) => (
                                <li key={link.label} className="relative">
                                    <Link
                                        href={link.href}
                                        className={`block w-max py-4 px-1 uppercase lg:text-sm transition-all hover:text-brand-navHover ${
                                            pathname === link.href
                                                ? "text-brand-nav font-bold"
                                                : ""
                                        }`}
                                        aria-current={
                                            pathname === link.href
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            href="https://www.facebook.com/JarekOlszewskiFotografia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-brand-navHover transition-all text-2xl"
                        >
                            <TiSocialFacebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/jarek.olszewski.fotografia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-brand-navHover transition-all text-xl"
                        >
                            <FiInstagram />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
