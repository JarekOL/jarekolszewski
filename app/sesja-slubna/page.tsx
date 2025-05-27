import { Metadata } from "next";
import { getImagesFromFolder } from "@/lib/getImagesFromFolder";
import { getBlogsByCategory } from "@/lib/getBlogsByCategory";
import UniversalPage from "@/components/UniversalPage";

const pageTitle = "Fotografia ślubna - uchwyć magię najważniejszego dnia";
const pageDescription =
    "Twój ślub to wyjątkowe wydarzenie, pełne wzruszeń, radości i niezapomnianych chwil. Profesjonalna fotografia ślubna to sposób, by zatrzymać te momenty na zawsze. Jako doświadczeni fotografowie ślubni wiemy, jak ważne jest dla Was, aby każdy uśmiech, każdy gest i każda emocja zostały pięknie uwiecznione.";
const heroImage =
    "/Images/blogs/sesja-slubna/agata-i-pawel/216_agata-i-pawel-plener-slubny-nad-morzem-jarek-olszewski-fotografia.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/sesja-slubna",
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
    const blogs = await getBlogsByCategory("sesja-slubna");
    const images = getImagesFromFolder("blogs/sesja-slubna/agata-i-pawel", 6);

    const content = {
        hero: {
            title: "Sesja Ślubna",
            backgroundImages: [heroImage],
            paragraphs: [
                "To nie tylko zdjęcia. To powrót do emocji, które czuliście w dniu ślubu — za każdym razem, gdy otworzycie album.",
            ],
        },

        introTitle: "Czym jest sesja ślubna — naprawdę?",

        gridImages: [
            {
                src: images[1].responsiveImage.src,
                position: "50% 0%",
                title: "Plener ślubny",
                desc: "W górach, nad jeziorem, w lesie — sesja tam, gdzie czujecie się sobą.",
            },
            {
                src: images[2].responsiveImage.src,
                position: "50% 0%",
                title: "Kadry pełne emocji",
                desc: "Naturalność, miłość, spojrzenia. Prawdziwa historia Was dwojga.",
            },
            {
                src: images[3].responsiveImage.src,
                position: "50% 0%",
                title: "Wasz własny film w kadrach",
                desc: "Niepozowane, filmowe ujęcia pełne światła i klimatu.",
            },
        ],

        sections: [
            {
                h2: "Dlaczego warto zrobić sesję po ślubie?",
                subSections: [
                    {
                        h3: "Więcej swobody, więcej bliskości",
                        content:
                            "W dniu ślubu dzieje się wiele. Sesja ślubna w innym terminie daje przestrzeń — bez presji czasu, gości i emocji dnia. Możecie być tylko dla siebie. Bez pośpiechu, w pełnym świetle Waszego uczucia.",
                    },
                    {
                        h3: "Plener, który Was wyraża",
                        content:
                            "Wybieramy miejsce, które coś dla Was znaczy: góry, las, ruiny zamku czy industrialne wnętrze. Albo po prostu złote pole w zachodzącym słońcu. Opowiadam historię taką, jaką chcecie ją zapamiętać.",
                    },
                ],
            },
            {
                h2: "Jak pracuję podczas sesji ślubnej?",
                subSections: [
                    {
                        h3: "Atmosfera bez napięcia",
                        content:
                            "Nie ustawiam, nie narzucam. Podpowiadam, inspiruję, ale nie ingeruję w Waszą naturalność. Najlepsze kadry to te, które są prawdziwe — nie wyreżyserowane.",
                    },
                    {
                        h3: "Światło, klimat, ruch",
                        content:
                            "Uwielbiam miękkie światło, momenty przejściowe, lekki wiatr w sukni i spojrzenia mówiące więcej niż słowa. Pracuję z aparatem jak z kamerą — żebyście po latach poczuli ten dzień na nowo.",
                    },
                    {
                        h3: "Zdjęcia gotowe do oprawienia",
                        content:
                            "Dostajecie dopracowaną galerię online, gotową do pobrania, udostępnienia lub zamówienia albumu. To Wasza historia w najlepszym świetle.",
                    },
                ],
            },
        ],

        carousel: {
            title: "- Zobacz sesje ślubne -",
            desc: "#sesjaslubna #fotografia #plenerslubny",
            images: images.map((img) => ({ src: img.responsiveImage.src })),
        },

        blogs: {
            title: "- Historie par po ślubie -",
            desc: "#miłość #sesje #reportaż",
            data: blogs,
        },

        bullets: {
            title: "Co otrzymujecie",
            paragraph:
                "Reportaż poślubny w Waszym stylu — z przestrzenią na emocje i bliskość.",
            items: [
                "Min. 60 ujęć w pełnej jakości",
                "Wspólne planowanie miejsca i klimatu sesji",
                "Dojazd na plener wliczony w cenę (do 100 km)",
                "Zdjęcia gotowe w 10-14 dni",
            ],
        },
    };

    return <UniversalPage content={content} />;
}
