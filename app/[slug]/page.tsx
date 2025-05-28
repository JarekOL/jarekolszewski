import { getPageDataFromMarkdown } from "@/lib/getPageDataFromMarkdown";
import UniversalPage from "@/components/UniversalPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GridImage } from "@/types/addPages";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const awaitedParams = await Promise.resolve(params);
    const { slug } = awaitedParams;
    try {
        const { metadata } = await getPageDataFromMarkdown(slug);
        return metadata;
    } catch {
        notFound();
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const awaitedParams = await Promise.resolve(params);
    const { slug } = awaitedParams;
    let content;

    try {
        ({ content } = await getPageDataFromMarkdown(slug));
    } catch {
        notFound();
    }

    if (
        Array.isArray(content.gridImages) &&
        content.gridImages.length > 0 &&
        Array.isArray(content.gallery) &&
        content.gallery.length > 0
    ) {
        content.gridImages = content.gridImages.map((gridItem: GridImage) => {
            const galleryItem = content.gallery[gridItem.index];
            return {
                ...gridItem,
                src: galleryItem?.responsiveImage?.src || "",
            };
        });
    }

    return <UniversalPage content={content} />;
}
