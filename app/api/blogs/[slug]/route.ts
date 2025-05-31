// app/api/blogs/[slug]/route.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

const BLOGS_PATH = path.join(process.cwd(), "content/blogs");

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  let categories: string[] = [];
  try {
    categories = fs.readdirSync(BLOGS_PATH).filter((file) => {
      const fullPath = path.join(BLOGS_PATH, file);
      return fs.statSync(fullPath).isDirectory();
    });
  } catch (e) {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }

  for (const category of categories) {
    const blogPath = path.join(BLOGS_PATH, category, `${slug}.md`);
    if (fs.existsSync(blogPath)) {
      try {
        const fileContent = fs.readFileSync(blogPath, "utf-8");
        const { data, content } = matter(fileContent);

        const paragraphs = content.split(/\n\s*\n/);

        return NextResponse.json({
          title: data.title || "",
          category, // Zwracamy kategorię
          paragraphs,
          images: data.images || [],
          image: data.image || null,
        });
      } catch (err) {
        return NextResponse.json({ error: "Błąd parsowania pliku" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ error: "Nie znaleziono wpisu" }, { status: 404 });
}
