"use client";

import AddButton from "@/components/common/AddButton";
import BulletsForm from "@/components/common/BulletsForm";
import FormInput from "@/components/common/FormInput";
import SectionCard from "@/components/common/SectionCard";
import CategorySelect from "@/components/form-fields/CategorySelect";
import SubSection from "@/components/form-fields/SubSection";
import { FormData } from "@/types/addPages";
import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler, Path } from "react-hook-form";
import slugify from "slugify";

const AddPage: React.FC = () => {
    const [galleryFolders, setGalleryFolders] = useState<string[]>([]);
    const [imageFolders, setImageFolders] = useState<string[]>([]);
    const [folders, setFolders] = useState<string[]>([]);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        fetch("/api/image-folders")
            .then((res) => res.json())
            .then((data) => {
                console.log("Folders:", data.folders);
                setFolders(data.folders);
            });
    }, []);

    useEffect(() => {
        if (selectedFolder) {
            fetch(
                `/api/images-in-folder?folder=${encodeURIComponent(
                    selectedFolder
                )}`
            )
                .then((res) => res.json())
                .then((data) => setImages(data.files));
        } else {
            setImages([]);
        }
    }, [selectedFolder]);

    useEffect(() => {
        fetch("/api/image-folders")
            .then((res) => res.json())
            .then((data) => {
                setGalleryFolders(data.folders);
                setImageFolders(data.folders); // Jeśli chcesz mieć ten sam zestaw folderów
            });
    }, []);
    const { register, handleSubmit, control, reset, setValue } =
        useForm<FormData>({
            defaultValues: getDefaultValues(),
        });

    const { fields: gridImageFields } = useFieldArray({
        control,
        name: "content.gridImages",
    });

    const { fields: sectionFields, append: appendSection } = useFieldArray({
        control,
        name: "sections",
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!data.title) {
            alert("Tytuł jest wymagany");
            return;
        }

        data.content.hero.backgroundImages = [data.heroImage || ""];
        const slug = slugify(data.title, { lower: true });
        const payload = { ...data, slug };

        const res = await fetch("/api/admin/add-page", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert("Strona dodana!");
            reset();
        } else {
            alert(
                res.status === 409
                    ? "Strona o takim tytule już istnieje."
                    : "Błąd podczas zapisu."
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-5xl mx-auto p-8 space-y-8"
        >
            <h1 className="text-4xl font-bold text-center mb-6">
                📝 Dodaj stronę
            </h1>

            <SectionCard title="📄 MetaTag">
                {renderInputs(
                    [
                        { label: "Title MetaTag / Slug", name: "title" },
                        { label: "Opis Meta Tag", name: "description" },
                    ],
                    register
                )}
            </SectionCard>

            <SectionCard title="📄 Hero Zdjecie Główne">
                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Wybierz folder z obrazkami
                    </label>
                    <select
                        className="w-full border rounded-md px-3 py-2"
                        value={selectedFolder}
                        onChange={(e) => setSelectedFolder(e.target.value)}
                    >
                        <option value="">-- Wybierz folder --</option>
                        {folders.map((folder) => (
                            <option key={folder} value={folder}>
                                {folder}
                            </option>
                        ))}
                    </select>
                </div>

                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 max-h-96 overflow-y-scroll p-2">
                        {images.map((imgPath) => (
                            <div
                                key={imgPath}
                                className={`border rounded p-1 cursor-pointer hover:shadow ${
                                    selectedImage === `/Images/${imgPath}`
                                        ? "ring-2 ring-blue-500"
                                        : ""
                                }`}
                                onClick={() => {
                                    setSelectedImage(`/Images/${imgPath}`);
                                    setValue("heroImage", `/Images/${imgPath}`);
                                }}
                            >
                                <img
                                    src={`/Images/${imgPath}`}
                                    alt="hero option"
                                    className="object-cover w-full h-32 rounded"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {selectedImage && (
                    <div className="mt-2 text-sm text-gray-600">
                        Wybrany: <code>{selectedImage}</code>
                        <img
                            src={selectedImage}
                            alt="Wybrany Hero"
                            className="mt-2 rounded shadow max-h-48"
                        />
                    </div>
                )}

                {renderInputs(
                    [{ label: "Tytuł Hero", name: "content.hero.title" }],
                    register
                )}
                {renderInputs(
                    [
                        {
                            label: "Paragraf Hero",
                            name: "content.hero.paragraphs",
                        },
                    ],
                    register
                )}
            </SectionCard>

            <SectionCard title="📄 Informacje główne">
                {renderInputs(
                    [
                        { label: "H1", name: "content.introTitle" },
                        {
                            label: "Paragraf pod H1 (opcionalnie)",
                            name: "content.introDesc",
                        },
                    ],
                    register
                )}
            </SectionCard>

            <SectionCard title="🖼️ Obrazki Grid (max 3)">
                <div className="p-4">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Folder galerii
                        </label>
                        <select
                            {...register("galleryFolder")}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="">-- Wybierz folder --</option>
                            {galleryFolders.map((folder) => (
                                <option key={folder} value={folder}>
                                    {folder}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {gridImageFields.map((field, i) => (
                    <div
                        key={field.id}
                        className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-md"
                    >
                        {renderInputs(
                            [
                                {
                                    label: "Index",
                                    name: `content.gridImages.${i}.index`,
                                    type: "number",
                                    defaultValue: field.index.toString(),
                                },
                                {
                                    label: "Pozycja",
                                    name: `content.gridImages.${i}.position`,
                                    defaultValue: field.position,
                                },
                                {
                                    label: "Tytuł",
                                    name: `content.gridImages.${i}.title`,
                                    defaultValue: field.title,
                                },
                                {
                                    label: "Opis",
                                    name: `content.gridImages.${i}.desc`,
                                    defaultValue: field.desc,
                                },
                            ],
                            register
                        )}
                    </div>
                ))}
            </SectionCard>

            <SectionCard title="🧩 Wprowadzenie i Karuzela">
                {renderInputs(
                    [
                        {
                            label: "Tytuł karuzeli",
                            name: "content.carousel.title",
                        },
                        {
                            label: "Opis karuzeli",
                            name: "content.carousel.desc",
                        },
                    ],
                    register
                )}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Folder karuzeli
                    </label>
                    <select
                        {...register("imageFolder")}
                        className="w-full border rounded-md px-3 py-2"
                    >
                        <option value="">-- Wybierz folder --</option>
                        {imageFolders.map((folder) => (
                            <option key={folder} value={folder}>
                                {folder}
                            </option>
                        ))}
                    </select>
                </div>
            </SectionCard>
            <SectionCard title="🧩 Kilka historii (blog)">
                {renderInputs(
                    [
                        {
                            label: "Tytuł historii",
                            name: "content.blog.title",
                        },
                        {
                            label: "Opis historii",
                            name: "content.blog.desc",
                        },
                    ],
                    register
                )}
                <CategorySelect register={register} />
            </SectionCard>

            <SectionCard title="📌 Lista punktowana">
                <BulletsForm control={control} register={register} />
            </SectionCard>

            <SectionCard title="📚 Sekcje z podtytułami">
                {sectionFields.map((section, i) => (
                    <div
                        key={section.id}
                        className="mb-6 p-4 border bg-white rounded-md shadow-sm"
                    >
                        <FormInput
                            label={`Sekcja ${i + 1} - H2`}
                            {...register(`sections.${i}.h2`)}
                        />
                        <SubSection
                            control={control}
                            nestIndex={i}
                            register={register}
                        />
                    </div>
                ))}
                <AddButton
                    onClick={() => appendSection({ h2: "", subSections: [] })}
                    label="Dodaj sekcję"
                />
            </SectionCard>

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    💾 Zapisz stronę
                </button>
            </div>
        </form>
    );
};

export default AddPage;

function getDefaultValues(): FormData {
    return {
        title: "",
        description: "",
        blogCategory: "",
        heroImage: "",
        imageFolder: "",
        galleryFolder: "",
        content: {
            hero: {
                title: "",
                backgroundImages: [""],
                paragraphs: [""],
            },
            introTitle: "",
            introDesc: "",
            carousel: {
                title: "",
                desc: "",
            },
            blog: {
                title: "",
                desc: "",
            },
            gridImages: [1, 2, 3].map((i) => ({
                index: i,
                position: "66% 0%",
                title: "",
                desc: "",
            })),
        },
        sections: [],
    };
}

function renderInputs(
    fields: {
        label: string;
        name: Path<FormData>;
        type?: string;
        defaultValue?: string;
    }[],
    register: ReturnType<typeof useForm<FormData>>["register"]
): React.ReactNode {
    return fields.map(({ label, name, type = "text", defaultValue }) => (
        <FormInput
            key={name}
            label={label}
            type={type}
            defaultValue={defaultValue}
            {...register(name)}
        />
    ));
}
