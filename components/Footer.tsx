import { NAVLINKS } from "@/constants/Links";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-12 px-6 border-t border-zinc-800 z-[9998]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div>
                    <p className="text-lg font-bold mb-3">Jarek Olszewski</p>
                    <p className="text-sm text-neutral-400">
                        Profesjonalna fotografia ślubna, rodzinna i portretowa w
                        Siedlcach i okolicach.
                    </p>
                </div>

                <div>
                    <p className="font-semibold mb-3">Nawigacja</p>
                    <ul className="space-y-2 text-sm">
                        {NAVLINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    aria-label={link.label}
                                    className="text-neutral-300 hover:text-white transition"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        <li key="regulamin">
                            <Link
                                href="/regulamin-i-polityka-prywatnoci"
                                aria-label="regulamin polityka-prywatnoci"
                                className="text-neutral-300 hover:text-white transition"
                            >
                                regulamin, polityka-prywatnosci
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="font-semibold mb-3">Znajdź mnie</p>
                    <div className="flex gap-4 mb-4">
                        <Link
                            href="https://www.facebook.com/JarekOlszewskiFotografia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition"
                            aria-label="Facebook"
                        >
                            <FaFacebook size={20} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/jarek.olszewski.fotografia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-400 transition"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={20} />
                        </Link>
                        <Link
                            href="https://g.co/kgs/BeBrn5X"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-700 transition"
                            aria-label="Google"
                        >
                            <FaGoogle size={20} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm text-neutral-300 mt-12">
                &copy; {new Date().getFullYear()} Jarek Olszewski. Wszelkie
                prawa zastrzeżone.
            </div>
        </footer>
    );
}
