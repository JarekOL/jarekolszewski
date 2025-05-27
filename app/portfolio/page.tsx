import { MainBtn } from "@/components/Buttons/MainBtn";
import ContactForm from "@/components/ContactForm";
import CTASendMail from "@/components/CTASendMail";
import InstagramGrid from "@/components/instagram/InstagramGrid";
import OfertaSection from "@/components/OfertaSection";
import PhotoSwipe from "@/components/PhotoSwipe";
import TitleH1 from "@/components/TitleH1";
import { getImagesFromFolder } from "@/lib/getImagesFromFolder";
import { Metadata } from "next";
import Link from "next/link";

const pageTitle =
    "Jarek Olszewski - Fotograf ślubny Warszawa | Siedlce | Łuków";
const pageDescription =
    "Profesjonalna fotografia ślubna i sesje zdjęciowe w warszawie, siedlach , łukowie i okolicach. Fotograf z pasją, który uchwyci najważniejsze chwile Twojego życia. Naturalne zdjęcia pełne emocji.";
const heroImage = "/Images/home/fotograf-siedlce-jarek-olszewski.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/portfolio",
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

export default function PortfolioPage() {
    const imagesFromFolder = getImagesFromFolder(
        "/blogs/fotografia-slubna/top-fotografia-slubna",
        6
    );
    const imagesFromFolder2 = getImagesFromFolder(
        "/blogs/fotografia-chrztu/top-fotografia-chrztu",
        6
    );
    const formattedImages = imagesFromFolder.map((item) => ({
        src: item.responsiveImage.src.replace("//", "/"),
        width: item.responsiveImage.width,
        height: item.responsiveImage.height,
    }));
    const formattedImages2 = imagesFromFolder2.map((item) => ({
        src: item.responsiveImage.src.replace("//", "/"),
        width: item.responsiveImage.width,
        height: item.responsiveImage.height,
    }));
    return (
        <main className="bg-white text-gray-900 anim-opacity">
            <section className="relative py-12 space-y-6 px-6 bg-gray-100 flex flex-col items-center text-center mx-auto">
                <TitleH1
                    title="Bogate portfolio, to moja ogromna ciekawość fotografii."
                    desc="Na przestrzeni lat współpracowałem z wieloma osobami w
                        różnych zakątkach polski, realizując ich fotograficzne
                        potrzeby z różnych dziedzin fotografii. Co fotografuje i
                        jak to robię, można sprawdzić poniżej zaglądając do
                        konkretnego portfolio. Największą jednak frajdę sprawia
                        mi prezentowanie zdjęć na papierze, gdzie zyskują na
                        swojej wartości i odkrywają prawdziwą siłę."
                />
                <Link href="#portfolio">
                    <MainBtn>Zobacz portfolio</MainBtn>
                </Link>
            </section>

            <OfertaSection />

            <section id="portfolio" className="pt-12 bg-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-center text-2xl font-semibold mb-12">
                        Zobacz moje kadry
                    </h2>
                    <PhotoSwipe images={formattedImages} columns={3} />
                </div>
            </section>

            <section id="portfolio" className="py-12 bg-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-center text-2xl font-semibold mb-12">
                        Historia w obrazach
                    </h2>
                    <PhotoSwipe images={formattedImages2} columns={3} />
                </div>
            </section>
            <section className="bg-gray-200 text-black py-24 text-center px-4 space-y-6 z-[9999]">
                <h2 className="text-center text-2xl font-semibold mb-4">
                    Masz pytanie? Porozmawiajmy!
                </h2>
                <CTASendMail title="Wyślij wiadomość" />
            </section>

            <InstagramGrid />

            <div className="pb-12 pt-4">
                <ContactForm />
            </div>
        </main>
    );
}
