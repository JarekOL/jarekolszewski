import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Blog = {
    slug: string;
    title: string;
    image: string;
    content: string;
    date: string;
    category: string;
    images: string[];
};

const blogsDir = path.join(process.cwd(), "content/blogs");

export async function getRelatedBlogsByCategory(
    category: string,
    excludeSlug: string
): Promise<Blog[]> {
    const categoryPath = path.join(blogsDir, category);

    if (!fs.existsSync(categoryPath)) return [];

    const filenames = fs.readdirSync(categoryPath);

    const blogs: Blog[] = filenames
        .filter((file) => file.endsWith(".md"))
        .map((filename) => {
            const filePath = path.join(categoryPath, filename);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContent);

            const slug = data.slug || filename.replace(/\.md$/, "");

            return {
                slug,
                title: data.title || "Brak tytułu",
                image: data.image || data.images[0],
                images: data.images || [],
                content,
                date: data.date || new Date().toISOString(),
                category,
            };
        })
        .filter((blog) => blog.slug !== excludeSlug) // wyklucz aktualny post
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // sortuj po dacie
        .slice(0, 4); // ogranicz do 4

    return blogs;
}
