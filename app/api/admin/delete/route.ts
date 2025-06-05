import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
    try {
        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json(
                { error: "Missing slug or category" },
                { status: 400 }
            );
        }

        const filePath = path.join(
            process.cwd(),
            "content",
            "pages",
            `${slug}.md`
        );

        try {
            await fs.access(filePath);
        } catch {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        // Usuwamy plik
        await fs.unlink(filePath);

        return NextResponse.json(
            { message: "Blog deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
