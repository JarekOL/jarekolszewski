import { writeFile, mkdir, access } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "content/pages");

function sanitizeFilename(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "")
        .toLowerCase();
}

function indent(line: string, level: number): string {
    return "  ".repeat(level) + line;
}

function escapeYamlString(str: string | undefined | null): string {
    if (!str) return "";
    return String(str).replace(/"/g, '\\"');
}

interface GridImage {
    index: number;
    position: string;
    title: string;
    desc: string;
}

interface SubSection {
    h3: string;
    content: string;
}

interface Section {
    h2: string;
    subSections?: SubSection[];
}

interface HeroContent {
    title?: string;
    backgroundImages?: string[];
    paragraphs?: string;
}

interface Content {
    hero?: HeroContent;
    introTitle?: string;
    introDesc?: string;
    carousel?: {
        title?: string;
        desc?: string;
    };
    blog?: {
        title?: string;
        desc?: string;
    };
    bullets: {
        title: string;
        paragraph: string;
        items: { value: string }[];
    };
    gridImages?: GridImage[];
    sections?: Section[];
}

interface PageData {
    slug?: string;
    title: string;
    description?: string;
    blogCategory?: string;
    heroImage?: string;
    imageFolder?: string;
    galleryFolder?: string;
    content?: Content;
    sections?: Section[];
}

export async function POST(req: Request) {
    try {
        const data: PageData = await req.json();

        const slug = sanitizeFilename(data.slug ?? data.title ?? "strona");
        const filePath = path.join(PAGES_DIR, `${slug}.md`);

        try {
            await access(filePath);
            return new NextResponse("File already exists", { status: 409 });
        } catch {
            // File does not exist - proceed
        }

        await mkdir(PAGES_DIR, { recursive: true });

        const heroTitle = data.content?.hero?.title ?? "";
        const heroParagraphs = data.content?.hero?.paragraphs ?? "";
        const heroBackgroundImages = data.content?.hero?.backgroundImages ?? [
            "",
        ];
        const introTitle = data.content?.introTitle ?? "";
        const carouselTitle = data.content?.carousel?.title ?? "";
        const carouselDesc = data.content?.carousel?.desc ?? "";
        const blogTitle = data.content?.blog?.title ?? "";
        const blogDesc = data.content?.blog?.desc ?? "";
        const gridImages = data.content?.gridImages ?? [];
        const sections = data.sections ?? [];

        const gridImagesYaml = gridImages
            .map((img) =>
                [
                    indent(`- index: ${img.index}`, 2),
                    indent(`position: "${escapeYamlString(img.position)}"`, 3),
                    indent(`title: "${escapeYamlString(img.title)}"`, 3),
                    indent(`desc: "${escapeYamlString(img.desc)}"`, 3),
                ].join("\n")
            )
            .join("\n");

        const sectionsYaml = sections
            .map((section) => {
                const subSectionsYaml = (section.subSections ?? [])
                    .map((sub) =>
                        [
                            indent(`- h3: "${escapeYamlString(sub.h3)}"`, 3),
                            indent(
                                `content: "${escapeYamlString(sub.content)}"`,
                                4
                            ),
                        ].join("\n")
                    )
                    .join("\n");

                return (
                    indent(`- h2: "${escapeYamlString(section.h2)}"`, 2) +
                    "\n" +
                    indent("subSections:", 3) +
                    "\n" +
                    subSectionsYaml
                );
            })
            .join("\n");

        const bulletItems = data.content?.bullets?.items ?? [];

        const bulletsYaml = data.content?.bullets
            ? [
                  indent("bullets:", 1),
                  indent(
                      `title: "${escapeYamlString(
                          data.content.bullets.title
                      )}"`,
                      3
                  ),
                  indent(
                      `paragraph: "${escapeYamlString(
                          data.content.bullets.paragraph
                      )}"`,
                      3
                  ),
                  indent("items:", 3),
                  ...bulletItems.map((item) =>
                      indent(`- "${escapeYamlString(item.value)}"`, 4)
                  ),
              ].join("\n")
            : "";

        const md = `---
title: "${escapeYamlString(data.title)}"
description: "${escapeYamlString(data.description ?? "")}"
blogCategory: "${escapeYamlString(data.blogCategory ?? "")}"
heroImage: "${escapeYamlString(data.heroImage ?? "")}"
imageFolder: "${escapeYamlString(data.imageFolder ?? "")}"
galleryFolder: "${escapeYamlString(data.galleryFolder ?? "")}"
content:
  hero:
    title: "${escapeYamlString(heroTitle)}"
    backgroundImages:
${heroBackgroundImages
    .map((img) => indent(`- "${escapeYamlString(img)}"`, 3))
    .join("\n")}
    paragraphs: "${escapeYamlString(heroParagraphs)}"
  introTitle: "${escapeYamlString(introTitle)}"
  introDesc: "${escapeYamlString(introTitle)}"
  carousel:
    title: "${escapeYamlString(carouselTitle)}"
    desc: "${escapeYamlString(carouselDesc)}"
  blog:
    title: "${escapeYamlString(blogTitle)}"
    desc: "${escapeYamlString(blogDesc)}"
${bulletsYaml}
  gridImages:
${gridImagesYaml}
  sections:
${sectionsYaml}

---
`;

        await writeFile(filePath, md, "utf-8");

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error writing page:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
