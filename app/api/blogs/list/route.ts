import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
    const blogRoot = path.join(process.cwd(), "content/blogs");
    const categories = await fs.readdir(blogRoot);
    const allBlogs = [];

    for (const cat of categories) {
        const catPath = path.join(blogRoot, cat);
        const files = await fs.readdir(catPath);
        for (const file of files) {
            const filePath = path.join(catPath, file);
            const content = await fs.readFile(filePath, "utf-8");
            const { data } = matter(content);

            allBlogs.push({
                title: data.title,
                slug: data.slug,
                category: data.category,
                date: data.date,
            });
        }
    }

    return NextResponse.json(allBlogs);
}
