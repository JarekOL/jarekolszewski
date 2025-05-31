"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";

export default function EditBlogPage() {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [heroIndex, setHeroIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        setTitle(data.title);
        setCategory(data.category);
        setParagraphs(data.paragraphs);
        setExistingImages(data.images.map((img: any) => img.src));
        setHeroIndex(
          data.images.findIndex((img: any) => img.src === data.image)
        );
      });
  }, [slug]);

  const handleRemoveExistingImage = async (index: number) => {
    const imgSrc = existingImages[index];
    const imageName = imgSrc.split("/").pop();

    if (!imageName) return;

    const confirmed = confirm("Czy na pewno chcesz usunąć to zdjęcie?");
    if (!confirmed) return;

    // Wywołaj endpoint DELETE
    const res = await fetch("/api/blogs/images", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageName }),
    });

    const json = await res.json();

    if (res.ok) {
      // Usuń z listy existingImages
      const updatedImages = existingImages.filter((_, i) => i !== index);
      setExistingImages(updatedImages);

      // Jeśli usunięte zdjęcie było hero - zresetuj heroIndex
      if (heroIndex === index) {
        setHeroIndex(null);
      } else if (heroIndex && heroIndex > index) {
        // Przesuń indeks hero, jeśli był po usuniętym zdjęciu
        setHeroIndex(heroIndex - 1);
      }

      alert("Zdjęcie usunięte");
    } else {
      alert(json.error || "Błąd przy usuwaniu zdjęcia");
    }
  };

  // Pozostałe metody (handleAddParagraph, handleRemoveParagraph, handleParagraphChange, handleImageUpload, handleSave) bez zmian

  // ... (skopiuj swój istniejący kod i dodaj powyższą metodę)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edytuj blog</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tytuł wpisu"
        className="w-full p-3 border mb-4 rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border mb-4 rounded"
      >
        <option value="">Wybierz kategorię</option>
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
              onChange={(e) => {
                const updated = [...paragraphs];
                updated[index] = e.target.value;
                setParagraphs(updated);
              }}
              placeholder={`Paragraf ${index + 1}`}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <button
              onClick={() => {
                const updated = paragraphs.filter((_, i) => i !== index);
                setParagraphs(updated);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setParagraphs([...paragraphs, ""])}
        className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <Plus /> Dodaj tekst
      </button>

      <div className="mt-6">
        <label className="block mb-2 font-medium">
          Dodaj nowe zdjęcia (opcjonalnie):
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setImages([...images, ...Array.from(e.target.files)]);
            }
          }}
        />
      </div>

      {(existingImages.length > 0 || images.length > 0) && (
        <div className="mt-6 mb-24">
          <label className="block font-medium mb-1">
            Wybierz zdjęcie główne (hero):
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {existingImages.map((src, i) => (
              <div key={i} className="relative border rounded p-2 text-sm text-left transition">
                <button
                  type="button"
                  onClick={() => setHeroIndex(i)}
                  className={`w-full text-left ${
                    heroIndex === i
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-300"
                  }`}
                >
                  <p className="truncate">{src.split("/").pop()}</p>
                  <img
                    src={src}
                    alt="Istniejące zdjęcie"
                    className="mt-1 max-h-32 object-contain"
                  />
                </button>
                <button
                  onClick={() => handleRemoveExistingImage(i)}
                  className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                  title="Usuń zdjęcie"
                  type="button"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={async () => {
          setIsSaving(true);
          const formData = new FormData();
          formData.append("title", title);
          formData.append("category", category);
          formData.append("slug", slug as string);
          formData.append("paragraphs", JSON.stringify(paragraphs));
          images.forEach((img) => formData.append("images", img));
          formData.append("heroIndex", heroIndex?.toString() ?? "");

          const res = await fetch(`/api/blogs/${slug}`, {
            method: "PUT",
            body: formData,
          });

          if (res.ok) {
            alert("Zapisano zmiany!");
            window.location.href = "/app/adm/blog";
          } else {
            alert("Błąd zapisu");
          }

          setIsSaving(false);
        }}
        disabled={isSaving}
        className="mt-8 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
      >
        {isSaving ? "Zapisuję..." : "Zapisz zmiany"}
      </button>
    </div>
  );
}
