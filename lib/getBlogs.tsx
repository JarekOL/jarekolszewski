import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Blog = {
  slug: string;
  title: string;
  image: string;
  content: string;
  category: string;
};

const blogsDir = path.join(process.cwd(), "content/blogs");

export async function getBlogs(): Promise<Blog[]> {
  const categories = fs.readdirSync(blogsDir);

  const blogs: Blog[] = [];

  for (const category of categories) {
    const categoryPath = path.join(blogsDir, category);
    const files = fs.readdirSync(categoryPath);

    for (const filename of files) {
      if (!filename.endsWith(".md")) continue;

      const filePath = path.join(categoryPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      const images: string[] = data.images || [];

      blogs.push({
        slug: data.slug || filename.replace(/\.md$/, ""),
        title: data.title || "Brak tytułu",
        image: data.image || images[0],
        content,
        category,
      });
    }
  }

  return blogs;
}
