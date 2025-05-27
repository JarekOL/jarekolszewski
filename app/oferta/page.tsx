import Gallery from "./_components/Gallery";
import CTASendMail from "@/components/CTASendMail";
import { FaCheckCircle } from "react-icons/fa";
import { Metadata } from "next";
import { getImagesFromFolder } from "@/lib/getImagesFromFolder";
import OfertaSection from "@/components/OfertaSection";
import TitleH1 from "@/components/TitleH1";

const benefits = [
    [
        "Fotografuję osobiście",
        "wkładając w to całą zdobytą wiedzę i doświadczenie.",
    ],
    [
        "Indywidualne podejście",
        "każdy reprotaż i sesja jest szyta na miarę Twoich oczekiwań",
    ],
    [
        "Naturalna obróbka zdjęć",
        "każde zdjęcie musi wyglądać prawdziwie a przez to ponadczsowo.",
    ],
    [
        "Zdjęcia w wersji cyfrowej",
        "pliki w wysokiej rozdzielczości na USB bądź on-line",
    ],
    [
        "Foto produkty premium",
        "fotoalbumy, odbitki, fotoksiażki, obrazy na płótnie - zawsze od sprawdzonych dostawców",
    ],
    [
        "Spersonalizowane opakowania",
        "eleganckie i stylowe pudełka na zdjęcia i nośniki danych",
    ],
    [
        "Prywatna galeria internetowa",
        "łatwie i bezpieczne udostępnianie zdjęć bliskim",
    ],
    ["Szybka realizacja", "sprawna i terminowa dostawa gotowych materiałów"],
];

const pageTitle = "Cennik Fotograf - oferta sesji zdjęciowych śluby, reportaże";
const pageDescription =
    "Sprawdź aktualny cennik fotografa - oferta sesji ślubnych, portretowych, rodzinnych i reportaży. Przejrzyste pakiety, indywidualne podejście, bez ukrytych kosztów";
const heroImage = "/Images/home/fotograf-siedlce-jarek-olszewski.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/oferta",
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

export default async function OffertsPage() {
    const allImages = getImagesFromFolder("PodglądoweZdjecia", 6);

    return (
        <div className="overflow-hidden h-full w-full">
            <div className="bg-gray-100 py-12 px-6 lg:px-8 anim-opacity w-full overflow-hidden">
                <section className="max-w-7xl mx-auto space-y-12 text-stone-800 w-full overflow-hidden">
                    <TitleH1
                        title="Profesjonalny Fotograf"
                        desc="Szukasz fotografa, który uwieczni Twoje
                        chwile w sposób naturalny i ponadczasowy? Oferuję
                        kompleksową obsługę fotograficzną dostosowaną do Twoich
                        potrzeb - z pasją, precyzją i doświadczeniem."
                    />

                    <div className="space-y-12">
                        <h2 className="text-2xl font-light text-center">
                            Dlaczego warto wybrać mnie?
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            {benefits.map(([title, desc], i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-lg"
                                >
                                    <FaCheckCircle className="text-brand-nav mt-1 text-xl flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold">
                                            {title}
                                        </h3>
                                        <p className="text-sm text-stone-600">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-lg max-w-2xl mx-auto">
                                Jako <strong>Fotograf</strong> pomagam
                                uwieczniać najważniejsze chwile życia w formie
                                fotografii, która ma wartość nie tylko dziś, ale
                                i po latach. Zajrzyj do galerii i przekonaj się
                                sam!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <OfertaSection />

            <div className="max-w-screen-lg mt-5 mx-auto">
                <Gallery allImages={allImages} />
            </div>

            <div className="text-center mt-6 mb-12">
                <CTASendMail title="Zapytaj o Ofertę" />
            </div>
        </div>
    );
}
