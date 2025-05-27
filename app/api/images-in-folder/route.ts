import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
    const folder = req.nextUrl.searchParams.get("folder") || "";
    const targetDir = path.join(process.cwd(), "public/Images", folder);

    try {
        const entries = fs.readdirSync(targetDir, { withFileTypes: true });
        const imageFiles = entries
            .filter(
                (entry) =>
                    entry.isFile() &&
                    /\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)
            )
            .map((entry) => `${folder}/${entry.name}`.replace(/\\/g, "/"));

        return NextResponse.json({ files: imageFiles });
    } catch (err) {
        console.error("Błąd przy odczycie folderu:", err);
        return NextResponse.json({ files: [] });
    }
}
