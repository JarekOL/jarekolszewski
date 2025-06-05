"use client";

import { MainBtn } from "@/components/Buttons/MainBtn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PageMeta {
    title: string;
    slug: string;
    heroSrc: string;
}

export default function PageListPage() {
    const [pages, setPages] = useState<PageMeta[]>([]);

    useEffect(() => {
        fetch("/api/admin/list")
            .then((res) => res.json())
            .then((data) => setPages(data))
            .catch(console.error);
    }, []);

    const handleDelete = async (slug: string) => {
        const confirmed = confirm("Czy na pewno chcesz usunąć strone?");
        if (!confirmed) return;

        try {
            const res = await fetch("/api/admin/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug }),
            });

            if (res.ok) {
                setPages((prev) => prev.filter((page) => page.slug !== slug));
            } else {
                alert("Błąd podczas usuwania pagea.");
            }
        } catch {
            alert("Wystąpił błąd.");
        }
    };

    if (pages.length === 0) {
        return (
            <div className="p-6 max-w-4xl mx-auto flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-transparent animate-spin border-t-blue-500 rounded-full" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista Stron</h1>
                <Link href="/adm/strona/dodaj">
                    <MainBtn>Dodaj stronę</MainBtn>
                </Link>
            </div>

            <ul className="space-y-4 py-4">
                {pages.map((page) => (
                    <li
                        key={page.slug}
                        className="p-2 border hover:bg-gray-50 transition-colors rounded flex justify-between items-center"
                    >
                        <div className="flex items-center">
                            <Image
                                height={150}
                                width={150}
                                src={page.heroSrc}
                                alt={page.title}
                                className="rounded"
                            />
                            <div className="text-start ml-4">
                                <h2 className="text-lg font-semibold max-w-96">
                                    {page.title}
                                </h2>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <Link
                                href={`/${page.slug}`}
                                className="text-blue-600 hover:underline"
                            >
                                Podgląd
                            </Link>
                            <button
                                onClick={() => handleDelete(page.slug)}
                                className="text-red-600 hover:underline"
                            >
                                Usuń
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
