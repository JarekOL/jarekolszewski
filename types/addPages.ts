export interface GridImage {
    index: number;
    position: string;
    title: string;
    desc: string;
}

export interface SubSection {
    h3: string;
    content: string;
}

export interface Section {
    h2: string;
    subSections: SubSection[];
}

export interface FormData {
    title: string;
    description: string;
    blogCategory: string;
    heroImage: string;
    imageFolder: string;
    galleryFolder: string;
    content: {
        hero: {
            title: string;
            backgroundImages: string[];
            paragraphs: string[];
        };
        introTitle: string;
        introDesc: string;
        carousel: {
            title: string;
            desc: string;
        };
        blog: {
            title: string;
            desc: string;
        };
        bullets?: {
            title?: string;
            paragraph?: string;
            items: { value: string }[];
        };
        gridImages: GridImage[];
    };
    sections: Section[];
}
