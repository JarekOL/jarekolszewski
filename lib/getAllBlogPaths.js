import fs from "fs";
import path from "path";

export async function getAllBlogPaths() {
  const blogDir = path.join(process.cwd(), "content", "blogs");
  const categories = fs.readdirSync(blogDir).filter((name) =>
    fs.statSync(path.join(blogDir, name)).isDirectory()
  );

  const paths = [];

  for (const category of categories) {
    const files = fs
      .readdirSync(path.join(blogDir, category))
      .filter((f) => f.endsWith(".md"));
    files.forEach((file) => {
      const slug = file.replace(/\.md$/, "");
      paths.push({
        loc: `/blog/${category}/${slug}`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });
  }

  return paths;
}
