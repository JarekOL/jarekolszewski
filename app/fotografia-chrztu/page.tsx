import UniversalPage from "@/components/UniversalPage";
import { getBlogsByCategory } from "@/lib/getBlogsByCategory";
import { getImagesFromFolder } from "@/lib/getImagesFromFolder";
import { Metadata } from "next";

const pageTitle = "Fotografia Chrztu - uchwyć magię chwili";
const pageDescription =
    "Profesjonalne zdjęcia z chrztu dziecka — emocje, rodzina i piękna oprawa uroczystości.";
const heroImage = "/Images/fotografia-chrztu/fotografia-chrztu.jpeg";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/fotografia-chrztu",
    },
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        images: [
            {
                url: heroImage,
                width: 900,
                height: 900,
                alt: pageTitle,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: [heroImage],
    },
};

export default async function Page() {
    const blogs = await getBlogsByCategory("fotografia-chrztu");
    const images = getImagesFromFolder(
        "blogs/fotografia-chrztu/chrzest-ujecia-pelne-milosci",
        6
    );
    const gallery = getImagesFromFolder("PodglądoweZdjecia", 6);

    const content = {
        hero: {
            title: "Fotografia Chrztu",
            backgroundImages: [heroImage],
            paragraphs: [
                "Chrzest to wyjątkowy dzień pełen wzruszeń, symboliki i rodzinnego ciepła. Zatrzymaj te chwile na zawsze dzięki subtelnej i profesjonalnej fotografii.",
            ],
        },
        introTitle: "Dlaczego fotografia chrztu ma znaczenie?",

        gridImages: [
            {
                src: images[1].responsiveImage.src,
                position: "66% 0%",
                title: "Reportaż chrztu",
                desc: "Uchwyć emocje i piękno ceremonii — dyskretnie i autentycznie.",
            },
            {
                src: images[2].responsiveImage.src,
                position: "66% 0%",
                title: "Zdjęcia sakralne",
                desc: "Duchowy klimat i detale uchwycone z szacunkiem.",
            },
            {
                src: images[3].responsiveImage.src,
                position: "66% 0%",
                title: "Rodzinne kadry",
                desc: "Ciepło relacji w kadrach pełnych emocji.",
            },
        ],
        sections: [
            {
                h2: "Jak wygląda moja fotografia chrztu?",
                subSections: [
                    {
                        h3: "Naturalnie i z wyczuciem",
                        content:
                            "Staram się pozostać niewidoczny, by uchwycić autentyczne emocje — od łez wzruszenia po subtelne gesty rodziny. Każdy kadr oddaje prawdę tego dnia, bez sztuczności.",
                    },
                    {
                        h3: "Obecność od początku do końca",
                        content:
                            "Towarzyszę Wam od przygotowań, przez ceremonię, aż po ostatnie rodzinne uściski. Dzięki temu powstaje spójna, opowieść z chrztu - nie tylko z kościoła, ale z całego dnia.",
                    },
                ],
            },
            {
                h2: "Styl fotografii — nie tylko dokumentacja",
                subSections: [
                    {
                        h3: "Światło, detale i emocje",
                        content:
                            "Fotografia chrztu to dla mnie nie tylko dokumentacja, ale sztuka uchwycenia światła, emocji i atmosfery. Każde zdjęcie tworzy historię, która porusza.",
                    },
                    {
                        h3: "Dbałość o komfort",
                        content:
                            "Dzieci są nieprzewidywalne, dlatego pracuję z cierpliwością i spokojem, nie narzucając się nikomu. Rodzina czuje się swobodnie, co widać na zdjęciach.",
                    },
                ],
            },
        ],
        carousel: {
            title: "- Przykładowe zdjęcia z chrztu -",
            desc: "#chrzest #fotografia-chrztu #emocje",
            images: images.map((img) => ({ src: img.responsiveImage.src })),
        },

        blogs: {
            title: "- Kilka historii -",
            desc: "#fotografiachrztu #dzieńpełnemocji #reportaż",
            data: blogs,
        },

        bullets: {
            title: "Co zawiera reportaż z chrztu?",
            paragraph:
                "Każdy reportaż to pełna opowieść o dniu chrztu — od ciepłych przygotowań po rodzinne wzruszenia.",
            items: [
                "Minimum 700 profesjonalnych zdjęć",
                "Sesja rodzinna w dniu chrztu i poza nim",
                "Wysokiej jakości albumy i odbitki",
                "Dostawa pełnego materiału w 21 dni",
            ],
        },

        gallery,
    };

    return <UniversalPage content={content} />;
}
