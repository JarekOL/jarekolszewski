import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getAllFolders(dir: string, base = ""): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    let folders: string[] = [];

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const relativePath = path.join(base, entry.name);
            folders.push(relativePath); // np. blog/2024/jan
            const subfolders = getAllFolders(path.join(dir, entry.name), relativePath);
            folders = folders.concat(subfolders);
        }
    }

    return folders;
}

export async function GET() {
    const publicImagesPath = path.join(process.cwd(), "public/Images");

    try {
        const folders = getAllFolders(publicImagesPath);
        return NextResponse.json({ folders });
    } catch (error) {
        console.error("Błąd odczytu folderów:", error);
        return NextResponse.json({ error: "Błąd podczas odczytu folderów" }, { status: 500 });
    }
}
