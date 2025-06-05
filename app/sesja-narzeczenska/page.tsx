import { Metadata } from "next";
export const dynamic = "force-static";
import { getImagesFromFolder } from "@/lib/getImagesFromFolder";
import { getBlogsByCategory } from "@/lib/getBlogsByCategory";
import UniversalPage from "@/components/UniversalPage";

const pageTitle = "Sesja Narzeczeńska - naturalne zdjęcia | Siedlce i okolice";

const pageDescription =
    "💕 Sesja narzeczeńska to wyjątkowy sposób, by uchwycić Waszą miłość 💕 przed ślubem. Tworzymy naturalne, pełne emocji 😍 zdjęcia zakochanych par, które staną się piękną pamiątką na całe życie 📷";

const heroImage =
    "/Images/blogs/sesja-narzeczenska/magia-sesji-narzeczenskiej/IMG_003sesja-narzeczenska-roksana-kamil-fotograf-jarek-olszewski.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://jarekolszewski.pl/sesja-narzeczenska",
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
    const blogs = await getBlogsByCategory("sesja-narzeczenska");
    const images = getImagesFromFolder(
        "blogs/sesja-narzeczenska/magia-sesji-narzeczenskiej",
        6
    );
    const gallery = getImagesFromFolder("PodglądoweZdjecia", 6);

    const content = {
        hero: {
            title: "Sesja Narzeczeńska",
            backgroundImages: [heroImage],
            paragraphs: [
                "Miłość, która dopiero co rozkwita, zasługuje na swoje miejsce w kadrach. Zatrzymajmy ten czas — zanim rozpoczniecie wspólną drogę jako małżeństwo.",
            ],
        },

        introTitle: "Dlaczego warto wybrać sesję narzeczeńską?",

        gridImages: [
            {
                src: images[1].responsiveImage.src,
                position: "50% 0%",
                title: "Naturalne ujęcia",
                desc: "Bez pozowania, bez stresu. Tylko Wy — tacy, jacy jesteście.",
            },
            {
                src: images[2].responsiveImage.src,
                position: "50% 0%",
                title: "Wyjątkowe miejsca",
                desc: "Las, miasto, góry, jezioro? Dobieramy miejsce do Waszej historii.",
            },
            {
                src: images[3].responsiveImage.src,
                position: "50% 0%",
                title: "Zmysłowy klimat",
                desc: "Delikatność spojrzeń i intymność bliskości w nastrojowych kadrach.",
            },
        ],

        sections: [
            {
                h2: "Czym jest sesja narzeczeńska?",
                subSections: [
                    {
                        h3: "Wasza historia przed ślubem",
                        content:
                            "Sesja narzeczeńska to intymny reportaż Waszej miłości — zanim padnie sakramentalne „tak”. To czas, kiedy możecie poczuć się sobą przed obiektywem, bez presji i scenariusza. Zdjęcia mogą posłużyć do zaproszeń, dekoracji sali, prezentacji ślubnej… albo po prostu do wspólnego wspominania.",
                    },
                    {
                        h3: "Spontanicznie i naturalnie",
                        content:
                            "Nie oczekuję od Was doświadczenia przed aparatem. Wystarczy Wasza obecność, spojrzenia, dotyk. Reszta dzieje się sama. Dbam o luźną atmosferę, dzięki której powstają prawdziwe, autentyczne kadry — nie wystudiowane pozy.",
                    },
                ],
            },
            {
                h2: "Jak wygląda sesja narzeczeńska ze mną?",
                subSections: [
                    {
                        h3: "Wybór miejsca i stylu",
                        content:
                            "Każda para ma swoją energię i historię. Wspólnie wybieramy lokalizację — od miejskich zaułków po górskie szlaki. To Wy decydujecie, co Was wyraża.",
                    },
                    {
                        h3: "Luźna atmosfera i bliskość",
                        content:
                            "Nie reżyseruję — podpowiadam. Czekam na momenty, które są Wasze. Dzięki temu zdjęcia nie są sztuczne, ale ciepłe i osobiste.",
                    },
                    {
                        h3: "Gotowe zdjęcia pełne emocji",
                        content:
                            "Po sesji otrzymujecie galerię online, gotową do pobrania lub udostępnienia. Wszystko w wysokiej jakości i z autorską obróbką.",
                    },
                ],
            },
        ],

        carousel: {
            title: "- Zobacz nasze narzeczeńskie sesje -",
            desc: "#miłość #sesjanarzeczeńska #zaręczyny",
            images: images.map((img) => ({ src: img.responsiveImage.src })),
        },

        blogs: {
            title: "- Historie pełne emocji -",
            desc: "#miłośćwobiektywie #narzeczeni #reportaż",
            data: blogs,
        },

        bullets: {
            title: "Dlaczego pary wybierają mnie?",
            paragraph:
                "Tworzę przestrzeń do bycia sobą. Bez presji, za to z uważnością na emocje i Waszą więź.",
            items: [
                "Pomoc w wyborze lokalizacji i stylizacji",
                "Min. 50 zdjęć w pełnej rozdzielczości",
                "Galeria online gotowa do udostępniania",
                "Gotowe zdjęcia w 7-14 dni",
            ],
        },

        gallery,
    };

    return <UniversalPage content={content} />;
}
