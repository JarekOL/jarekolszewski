// app/api/blogs/[slug]/route.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { writeFile, rename } from "fs/promises";

const BLOGS_PATH = path.join(process.cwd(), "content/blogs");
const IMAGES_PATH = path.join(process.cwd(), "public/Images/blogs");

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

export async function GET(
    _req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const params = await context.params;
    const slug = params.slug;

    let categories: string[] = [];
    try {
        categories = fs.readdirSync(BLOGS_PATH).filter((file) => {
            const fullPath = path.join(BLOGS_PATH, file);
            return fs.statSync(fullPath).isDirectory();
        });
    } catch {
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
                    date: data.date,
                    images: data.images || [],
                    image: data.image || null,
                });
            } catch {
                return NextResponse.json(
                    { error: "Błąd parsowania pliku" },
                    { status: 500 }
                );
            }
        }
    }

    return NextResponse.json(
        { error: "Nie znaleziono wpisu" },
        { status: 404 }
    );
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const params = await context.params;
    const oldSlug = params.slug;

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const paragraphs = JSON.parse(
        formData.get("paragraphs") as string
    ) as string[];
    const date = formData.get("date") as string;
    const heroIndex = formData.get("heroIndex")
        ? parseInt(formData.get("heroIndex") as string)
        : null;
    const newImages = formData.getAll("images") as File[];

    const newSlug = slugify(title);

    const oldBlogDir = path.join(BLOGS_PATH, category);
    const oldBlogFile = path.join(oldBlogDir, `${oldSlug}.md`);
    const newBlogFile = path.join(oldBlogDir, `${newSlug}.md`);

    const oldImageDir = path.join(IMAGES_PATH, category, oldSlug);
    const newImageDir = path.join(IMAGES_PATH, category, newSlug);

    // 1. Sprawdź istnienie bloga
    if (!fs.existsSync(oldBlogFile)) {
        return NextResponse.json(
            { error: "Nie znaleziono bloga" },
            { status: 404 }
        );
    }

    // 2. Wczytaj aktualne dane
    const fileContent = fs.readFileSync(oldBlogFile, "utf-8");
    const { data } = matter(fileContent);

    // 3. Obsługa folderu obrazków
    if (oldSlug !== newSlug && fs.existsSync(oldImageDir)) {
        await rename(oldImageDir, newImageDir);
    }

    if (!fs.existsSync(newImageDir)) {
        fs.mkdirSync(newImageDir, { recursive: true });
    }

    // 4. Zapisz nowe obrazy
    const savedImages = [...(data.images || [])];

    for (const image of newImages) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${image.name}`;
        const filePath = path.join(newImageDir, fileName);
        const imageUrl = `/Images/blogs/${category}/${newSlug}/${fileName}`;

        await writeFile(filePath, buffer);
        savedImages.push({ src: imageUrl });
    }

    const normalizeString = (str: string) => `${str.replace(/\n/g, "").trim()}`;

    const heroImage =
        heroIndex !== null && savedImages[heroIndex]
            ? normalizeString(savedImages[heroIndex].src)
            : null;

    const normalizedImages = savedImages.map((img) => ({
        src: normalizeString(img.src),
        width: img.width || undefined,
        height: img.height || undefined,
    }));

    const newFrontmatter = {
        ...data,
        title,
        slug: newSlug,
        category,
        date,
        images: normalizedImages,
        image: heroImage,
    };

    // 6. Zamień na Markdown z frontmatter
    const markdown = matter.stringify(paragraphs.join("\n\n"), newFrontmatter);

    // 7. Zapisz plik Markdown pod nowym slugiem
    fs.writeFileSync(newBlogFile, markdown, "utf-8");

    // 8. Usuń stary plik Markdown jeśli zmieniono slug
    if (oldSlug !== newSlug && fs.existsSync(oldBlogFile)) {
        fs.unlinkSync(oldBlogFile);
    }

    return NextResponse.json({ success: true, slug: newSlug });
}
