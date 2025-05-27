import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Blog } from "./getBlogs";

const blogsDir = path.join(process.cwd(), "content/blogs");

export async function getBlogsByCategory(categoryFilter: string): Promise<Blog[]> {
  const categoryPath = path.join(blogsDir, categoryFilter);
  if (!fs.existsSync(categoryPath)) return [];

  const files = fs.readdirSync(categoryPath);
  const blogs: Blog[] = [];

  for (const filename of files) {
    if (!filename.endsWith(".md")) continue;

    const filePath = path.join(categoryPath, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    // Jeśli masz w frontmatter tablicę images z obiektami {src: string}
    // wybierz główne zdjęcie (image lub pierwsze z images)
    let mainImage = data.image;
    if (!mainImage && Array.isArray(data.images) && data.images.length > 0) {
      if (typeof data.images[0] === "string") {
        mainImage = data.images[0];
      } else if (data.images[0].src) {
        mainImage = data.images[0].src;
      }
    }

    blogs.push({
      slug: data.slug || filename.replace(/\.md$/, ""),
      title: data.title || "Brak tytułu",
      image: mainImage || "",
      content,
      category: categoryFilter,
    });
  }

  return blogs;
}
