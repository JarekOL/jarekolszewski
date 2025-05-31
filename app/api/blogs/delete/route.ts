import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { slug, category } = await req.json();
        const blogPath = path.join(
            process.cwd(),
            "content/blogs",
            category,
            `${slug}.md`
        );

        // Usuń plik markdown
        await fs.unlink(blogPath);

        // Usuń folder ze zdjęciami (jeśli istnieje)
        const imgDir = path.join(
            process.cwd(),
            "public/Images/blogs",
            category,
            slug
        );

        try {
            await fs.rm(imgDir, { recursive: true, force: true });
        } catch (err) {
            console.warn("Brak folderu zdjęć lub błąd przy usuwaniu:", err);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
