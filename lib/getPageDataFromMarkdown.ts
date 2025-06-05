import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getBlogsByCategory } from "./getBlogsByCategory";
import { getImagesFromFolder } from "./getImagesFromFolder";

export async function getPageDataFromMarkdown(slug: string) {
    const filePath = path.join(process.cwd(), "content/pages", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    const blogs = await getBlogsByCategory(data.blogCategory);
    const images = getImagesFromFolder(data.imageFolder, 6);
    const gallery = getImagesFromFolder(data.galleryFolder, 6);

    return {
        metadata: {
            alternates: {
                canonical: `https://www.jarekolszewski.pl/${slug}`,
            },
            title: data.title,
            description: data.description,
            openGraph: {
                title: data.title,
                description: data.description,
                images: [
                    {
                        url: data.heroImage,
                        width: 900,
                        height: 900,
                        alt: data.title,
                    },
                ],
            },
        },
        content: {
            ...data.content,
            blogs: {
                title: "Fotografia Jarek Olszewski",
                desc: "#reportaż #chrzest #rodzina #ślub",
                data: blogs,
            },
            carousel: {
                ...data.content.carousel,
                images: images.map((img) => ({ src: img.responsiveImage.src })),
            },
            gallery,
        },
    };
}
