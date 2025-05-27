import Link from "next/link";

export function Logo() {
    return (
        <Link
            href="/"
            aria-label="Strona główna"
            className="font-extralight tracking-wide  lg:mr-8 uppercase text-xl lg:text-2xl"
        >
            Jarek Olszewski
        </Link>
    );
}
