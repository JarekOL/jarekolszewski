"use client";

import { MainBtn } from "@/components/Buttons/MainBtn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogMeta {
    title: string;
    slug: string;
    heroSrc: string;
    category: string;
    date: string;
}

export default function BlogListPage() {
    const [blogs, setBlogs] = useState<BlogMeta[]>([]);

    useEffect(() => {
        fetch("/api/blogs/list")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch(console.error);
    }, []);

    const handleDelete = async (slug: string, category: string) => {
        const confirmed = confirm("Czy na pewno chcesz usunąć tego bloga?");
        if (!confirmed) return;

        try {
            const res = await fetch("/api/blogs/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, category }),
            });

            if (res.ok) {
                setBlogs((prev) => prev.filter((blog) => blog.slug !== slug));
            } else {
                alert("Błąd podczas usuwania bloga.");
            }
        } catch (err) {
            console.error(err);
            alert("Wystąpił błąd.");
        }
    };

    // Sort
    const sortedBlogs = blogs.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista blogów</h1>
                <Link href="/adm/blog/dodaj">
                    <MainBtn>Dodaj blog</MainBtn>
                </Link>
            </div>

            {sortedBlogs.length === 0 ? (
                <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-transparent animate-spin border-t-blue-500 rounded-full " />
                </div>
            ) : (
                <ul className="space-y-4 py-4">
                    {sortedBlogs.map((blog) => (
                        <li
                            key={blog.slug}
                            className="p-2 border hover:border-blue-300 transition-colors rounded flex justify-between items-center"
                        >
                            <div className="flex items-center">
                                <Image
                                    height={150}
                                    width={150}
                                    src={blog.heroSrc}
                                    alt={blog.title}
                                />
                                <div className="text-start ml-4">
                                    <h2 className="text-lg font-semibold">
                                        {blog.title}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {blog.category} •{" "}
                                        {blog.date.slice(0, 10)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Link
                                    href={`/blog/${blog.category}/${blog.slug}`}
                                    className="text-gray-600 hover:underline"
                                >
                                    Podgląd
                                </Link>
                                <Link
                                    href={`/adm/blog/edytuj/${blog.slug}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edytuj
                                </Link>
                                <button
                                    onClick={() =>
                                        handleDelete(blog.slug, blog.category)
                                    }
                                    className="text-red-600 hover:underline"
                                >
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
