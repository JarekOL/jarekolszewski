import UniversalPage from "@/components/UniversalPage";
import { getBlogsByCategory } from "@/lib/getBlogsByCategory";
import { getImagesFromFolder } from "@/lib/getImagesFromFolder";
import { Metadata } from "next";

const pageTitle = "Fotograf Ślubny Warszawa - Emocje, Styl, Ponadczasowe kadry";
const pageDescription =
    "Szukasz fotografa ślubnego w Warszawie? Uchwycę Wasz dzień z klasą i emocją - naturalnie, subtelnie i bez pozowania.";
const heroImage =
    "/Images/blogs/fotografia-slubna/top-fotografia-slubna/22_mloda_zabawa_sesja_slubna.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/fotografia-slubna-warszawa",
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
    const blogs = await getBlogsByCategory("fotografia-slubna");
    const images = getImagesFromFolder(
        "blogs/fotografia-slubna/top-fotografia-slubna",
        6
    );

    const content = {
        hero: {
            title: "Fotograf Ślubny Warszawa",
            backgroundImages: [heroImage],
            paragraphs: [
                "Fotografia ślubna to nie tylko zdjęcia - to wspomnienia zaklęte w obrazach. Jako fotograf ślubny w Warszawie, pomagam Wam zatrzymać ulotne momenty i stworzyć piękną opowieść o Waszym dniu.",
            ],
        },
        introTitle:
            "Fotograf Ślubny Warszawa - naturalność, emocje i ponadczasowe kadry",
        gridImages: [
            {
                src: images[1].responsiveImage.src,
                position: "66% 0%",
                title: "Reportaż ślubny",
                desc: "Uchwycę najważniejsze momenty - bez sztuczności, z dyskrecją i wyczuciem chwili.",
            },
            {
                src: images[2].responsiveImage.src,
                position: "66% 0%",
                title: "Sesja plenerowa",
                desc: "Warszawa to idealne tło do naturalnych i romantycznych zdjęć - od Łazienek po Starówkę.",
            },
            {
                src: images[3].responsiveImage.src,
                position: "66% 0%",
                title: "Detale i emocje",
                desc: "Od łez wzruszenia po subtelne spojrzenia - dbam o każdy szczegół tej historii.",
            },
        ],
        sections: [
            {
                h2: "Jak pracuję jako fotograf ślubny?",
                subSections: [
                    {
                        h3: "Naturalność ponad wszystko",
                        content:
                            "Nie ustawiam i nie reżyseruję wydarzeń. Moim celem jest uchwycenie prawdziwego przebiegu dnia ślubu - tak, jak go przeżywacie. Styl reportażowy pozwala na swobodę i autentyczność.",
                    },
                    {
                        h3: "Obecność przez cały dzień",
                        content:
                            "Jestem z Wami od przygotowań, przez ceremonię, aż po ostatnie chwile wesela. Dzięki temu powstaje pełna, spójna opowieść - nie tylko zdjęcia, ale historia miłości.",
                    },
                ],
            },
            {
                h2: "Fotograf ślubny Warszawa - moje podejście",
                subSections: [
                    {
                        h3: "Światło, kompozycja i moment",
                        content:
                            "Każdy kadr komponuję z myślą o emocjach i estetyce. Warszawa daje ogrom możliwości - od miejskiego klimatu po romantyczną zieleń, a ja potrafię je wykorzystać w pełni.",
                    },
                    {
                        h3: "Komfort i zaufanie",
                        content:
                            "Wiem, że dla wielu osób sesja zdjęciowa może być stresująca. Dlatego pracuję w sposób dyskretny i spokojny, tworząc atmosferę, w której możecie być sobą.",
                    },
                ],
            },
        ],
        carousel: {
            title: "- Przykładowe zdjęcia ślubne -",
            desc: "#fotografslubnywarszawa #reportażślubny #ślubnemomenty",
            images: images.map((img) => ({ src: img.responsiveImage.src })),
        },
        blogs: {
            title: "- Historie miłosne -",
            desc: "#ślubwwarszawie #fotografiaślubna #emocje",
            data: blogs,
        },
        bullets: {
            title: "Co oferuję",
            paragraph:
                "Fotografuję od początku przygotowań ślubnych do ostatnich uroczystości weselnych.",
            items: [
                "Fotografuję od początku przygotowań ślubnych do ostatnich uroczystości weselnych",
                "Minimum 700 fotografii z reportażu (zdjęcia poddane autorskiej obróbce - naturalne i prawdziwe fotografie)",
                "Sesja ślubna w dniu ślubu - krótka sesja w okolicach przyjęcia weselnego (by nie tracić cennego czasu)",
                "Sesja ślubna innego dnia, w wybranym przez Was miejscu",
                "Sesja narzeczeńska",
                "Foto-albumy, wydruki cyfrowe, fotoobrazy, zdjęcia na płótnie, portrety w ramkach (możliwość podlinkowania do oferty z fotoproduktami)",
                "Wydruki w dniu ślubu (pocztówki, portrety dla rodziców)",
                "Nośnik danych (pendrive)",
                "Zapis na chmurze - link do pobrania, bez ograniczeń i na dowolne urządzenie",
                "Galeria internetowa chroniona hasłem",
                "Szybki termin realizacji - zdjęcia gotowe w 21 dni",
            ],
        },

    };

    return <UniversalPage content={content} />;
}
