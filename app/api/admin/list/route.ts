// app/api/admin/list/route.ts (lub pages/api/admin/list.ts - zależnie od struktury)

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
  const pagesDir = path.join(process.cwd(), "content/pages");
  
  // Czytamy wszystkie pliki *.md w katalogu content/pages
  const files = await fs.readdir(pagesDir);
  
  const allPages = [];
  
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const filePath = path.join(pagesDir, file);
    const fileContents = await fs.readFile(filePath, "utf-8");
    const { data } = matter(fileContents);
    
    allPages.push({
      title: data.title || "Brak tytułu",
      slug: data.slug || file.replace(/\.md$/, ""),
      heroSrc: data.heroImage || data.image || "", // dopasuj do frontmatter
      category: data.blogCategory || data.category || "default",
      date: data.date || null,
    });
  }
  
  // Sortowanie malejąco po dacie (najnowsze na górze)
  allPages.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return NextResponse.json(allPages);
}
