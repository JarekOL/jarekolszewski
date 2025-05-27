import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Blog = {
    slug: string;
    title: string;
    image: string;
    content: string; // wymagane
    category: string;
};

const blogsDir = path.join(process.cwd(), "content/blogs");

export async function getBlogsByCategory(
    categoryFilter: string
): Promise<Blog[]> {
    const categoryPath = path.join(blogsDir, categoryFilter);

    if (!fs.existsSync(categoryPath)) {
        return []; // brak takiej kategorii
    }

    const files = fs.readdirSync(categoryPath);
    const blogs: Blog[] = [];

    for (const filename of files) {
        if (!filename.endsWith(".md")) continue;

        const filePath = path.join(categoryPath, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);  // <-- tutaj dodajemy content

        // zdjęcie główne - jeśli nie ma 'image', to próbujemy wziąć pierwsze z images[0].src
        let mainImage = data.image;
        if (
            !mainImage &&
            data.images &&
            Array.isArray(data.images) &&
            data.images.length > 0
        ) {
            mainImage = data.images[0].src || data.images[0]; // czasem images to tablica stringów, czasem obiektów
        }

        blogs.push({
            slug: data.slug || filename.replace(/\.md$/, ""),
            title: data.title || "Brak tytułu",
            image: mainImage || "",
            category: categoryFilter,
            content, // <-- dodajemy content tutaj
        });
    }

    return blogs;
}
