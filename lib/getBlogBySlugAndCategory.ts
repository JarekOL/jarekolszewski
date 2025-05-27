import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogDetails = {
    slug: string;
    title: string;
    category: string;
    date: string;
    images: { src: string; width: number; height: number }[];
    content: string;
};

const blogsRoot = path.join(process.cwd(), "content/blogs");

export async function getBlogBySlugAndCategory(
    category: string,
    slug: string
): Promise<BlogDetails | null> {
    const filePath = path.join(blogsRoot, category, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
        slug: data.slug || slug,
        title: data.title || "Brak tytułu",
        category,
        date: data.date || "",
        images: data.images || [],
        content,
    };
}
