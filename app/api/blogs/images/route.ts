import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const IMAGES_PATH = path.join(process.cwd(), "public", "Images");

export async function DELETE(req: Request) {
    try {
        const { imageName } = await req.json();

        if (!imageName) {
            return NextResponse.json(
                { error: "Brak nazwy pliku" },
                { status: 400 }
            );
        }

        const imagePath = path.join(IMAGES_PATH, imageName);

        if (!fs.existsSync(imagePath)) {
            return NextResponse.json(
                { error: "Plik nie istnieje" },
                { status: 404 }
            );
        }

        fs.unlinkSync(imagePath);

        return NextResponse.json({ message: "Usunięto zdjęcie" });
    } catch (error) {
        return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
    }
}
