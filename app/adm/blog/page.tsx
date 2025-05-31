"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogMeta {
    title: string;
    slug: string;
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

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista blogów</h1>
                <Link
                    href="/app/adm/blog/dodaj"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                    Dodaj blog
                </Link>
            </div>

            {blogs.length === 0 ? (
                <p>Brak blogów.</p>
            ) : (
                <ul className="space-y-4">
                    {blogs.map((blog) => (
                        <li
                            key={blog.slug}
                            className="p-4 border rounded flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {blog.title}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {blog.category} • {blog.date.slice(0, 10)}
                                </p>
                            </div>
                            <Link
                                href={`/adm/blog/edytuj/${blog.slug}`}
                                className="text-blue-600 hover:underline"
                            >
                                Edytuj
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
