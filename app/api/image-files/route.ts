import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getAllImageFiles(dir: string, base = ""): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files: string[] = [];

    for (const entry of entries) {
        const relativePath = path.join(base, entry.name);
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            files = files.concat(getAllImageFiles(fullPath, relativePath));
        } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
            files.push(relativePath.replace(/\\/g, "/")); // normalize path separators
        }
    }

    return files;
}

export async function GET() {
    const imagesPath = path.join(process.cwd(), "public/Images");

    try {
        const files = getAllImageFiles(imagesPath);
        return NextResponse.json({ files });
    } catch (error) {
        console.error("Błąd odczytu plików:", error);
        return NextResponse.json(
            { error: "Błąd podczas odczytu plików" },
            { status: 500 }
        );
    }
}
