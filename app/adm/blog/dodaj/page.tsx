"use client";

import { useState } from "react";
import slugify from "slugify";
import { Trash2, Plus } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";



export default function AddBlogPage() {
    const [heroIndex, setHeroIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [paragraphs, setParagraphs] = useState<string[]>([""]);
    const [images, setImages] = useState<File[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const handleAddParagraph = () => setParagraphs([...paragraphs, ""]);

    const handleRemoveParagraph = (index: number) => {
        setParagraphs(paragraphs.filter((_, i) => i !== index));
    };

    const handleParagraphChange = (index: number, value: string) => {
        const updated = [...paragraphs];
        updated[index] = value;
        setParagraphs(updated);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const normalizeSlug = (text: string) =>
        slugify(text, { lower: true, strict: true, locale: "pl" });

    const handleSave = async () => {
        if (!category) {
            alert("Proszę wybrać kategorię przed zapisaniem.");
            return;
        }
        setIsSaving(true);
        const slug = normalizeSlug(title);
        const formData = new FormData();

        formData.append("title", title);
        formData.append("category", category);
        formData.append("slug", slug);
        formData.append("paragraphs", JSON.stringify(paragraphs));
        images.forEach((img) => formData.append("images", img));
        formData.append("heroIndex", heroIndex?.toString() ?? "");

        const res = await fetch("/api/blogs", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("Zapisano wpis i obrazy!");
            setTitle("");
            setParagraphs([""]);
            setImages([]);
            window.location.reload();
        } else {
            alert("Błąd zapisu");
        }

        setIsSaving(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Dodaj nowy wpis na bloga
            </h1>

            <input
                type="text"
                placeholder="Tytuł wpisu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border mb-4 rounded"
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border mb-4 rounded"
            >
                <option value=""> Wybierz kategorię</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <div className="space-y-4">
                {paragraphs.map((para, index) => (
                    <div key={index} className="flex gap-2">
                        <textarea
                            value={para}
                            onChange={(e) =>
                                handleParagraphChange(index, e.target.value)
                            }
                            placeholder={`Paragraf ${index + 1}`}
                            className="w-full p-2 border rounded"
                            rows={3}
                        />
                        <button
                            onClick={() => handleRemoveParagraph(index)}
                            className="text-red-500 hover:text-red-700"
                            title="Usuń paragraf"
                        >
                            <Trash2 />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAddParagraph}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
                <Plus /> Dodaj tekst
            </button>

            <div className="mt-6">
                <label className="block mb-2 font-medium">
                    Dodaj zdjęcia (możesz wiele na raz):
                </label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                />

               
            </div>

            {images.length > 0 && (
                <div className="mt-6 mb-24">
                    <label className="block font-medium mb-1">
                        Wybierz zdjęcie główne (hero):
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setHeroIndex(i)}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`relative border rounded p-2 text-sm text-left transition ${
                                    heroIndex === i
                                        ? "border-blue-500 ring-2 ring-blue-300"
                                        : "border-gray-300"
                                }`}
                            >
                                <p className="truncate">{img.name}</p>
                                {hoveredIndex === i && (
                                    <div className="absolute top-full left-0 z-10 mt-2 w-64 border bg-white shadow-lg rounded overflow-hidden">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="Preview"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="mt-8 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
            >
                {isSaving ? "Zapisuję..." : "Zapisz"}
            </button>
        </div>
    );
}
