// External
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

// Components
import { MainBtn } from "@/components/Buttons/MainBtn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { OFERTAIMAGES } from "@/constants/Links";
import { TEXT_SECTIONS } from "@/constants/homepage";
import LinkShare from "@/components/ui/LinkShare";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import TypingHeader from "@/components/TypingHeader";

// Dynamic Components
const Carousel = dynamic(() => import("@/components/Carousel"), { ssr: true });
const SesjaComponent = dynamic(() => import("@/components/SesjaComponent"));
const CTASendMail = dynamic(() => import("@/components/CTASendMail"));
const InviteSocialMedia = dynamic(
    () => import("@/components/InviteSocialMedia")
);
const InstagramGrid = dynamic(
    () => import("@/components/instagram/InstagramGrid")
);
const Opinions = dynamic(() => import("@/components/Opinions"));
const StepsWithLazyBackground = dynamic(
    () => import("@/components/StepsWithLazyBackground")
);

const pageTitle = "Fotograf Siedlce: Fotografia Ślubna i Artystyczna, Foto";
const pageDescription =
    "Fotograf Siedlce: Jarek Olszewski fotografia ślubna i reportaże. Najlepszy fotograf ślubny w Siedlcach. Zobacz portfolio i zamów sesję!";
const heroImage = "/Images/home/fotograf-siedlce-jarek-olszewski.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/",
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

export default function Home() {
    return (
        <div className="anim-opacity">
            <Carousel />
            <div className="relative mx-auto p-2 py-4 max-w-screen-xl text-center">
                <TypingHeader />

                <FadeInOnScroll delay={0.1}>
                    <div className="relative flex lg:flex-row flex-col justify-center items-center lg:mt-16 mt-20 text-start">
                        <Image
                            src="/Images/home/fotograf-siedlce-jarek-olszewski.avif"
                            alt="fotograf siedlce jarek-olszewski"
                            className=" object-cover"
                            width={250}
                            height={300}
                            priority
                        />
                        <div className="bg-black/60 backdrop-blur-sm -mt-12 lg:mt-0 lg:-ml-20 px-8 py-6 w-[330px] lg:w-[400px] text-white text-xs tracking-tight">
                            <h1 className="mb-2 font-semibold text-xl">
                                Fotograf Ślubny Siedlce - Jarek Olszewski |
                                Fotografia Ślubna
                            </h1>
                            <p>
                                Zajmuję się uwiecznianiem wyjątkowych chwil w
                                życiu - od pełnych emocji ślubów, chrztów,
                                komunii i sesji narzeczeńskich, po sesje
                                rodzinne, plenerowe, noworodkowe, kobiece i
                                okolicznościowe. Każda z nich to dla mnie osobna
                                opowieść, którą tworzę z pasją, wrażliwością i
                                dbałością o każdy detal - tak, by zatrzymać
                                emocje na dłużej.
                            </p>
                        </div>
                    </div>
                </FadeInOnScroll>

                <div className="my-10">
                    <FadeInOnScroll delay={0.1}>
                        <h2 className="py-4 text-xl">
                            Szukasz fotografa ślubnego? Reportaż ślubny
                        </h2>
                    </FadeInOnScroll>
                    <FadeInOnScroll delay={0.3}>
                        <p className="mx-auto px-3 max-w-3xl">
                            Szukasz kogoś, kto w sposób dyskretny i
                            profesjonalny uwieczni dzień Waszego ślubu? Oferuję
                            pakiety fotograficzne dopasowane do Waszych potrzeb.
                            Moja fotografia to coś więcej niż tylko zdjęcia. To
                            historia Waszej miłości, którą chcę opowiedzieć
                            kadrami. Każdy reportaż tworzę indywidualnie, z
                            dbałością o każdy szczegół - od przygotowań, przez
                            ceremonię do oczepin. Klienci cenią mnie za
                            profesjonalizm, podejście do pracy i naturalny styl.
                        </p>
                    </FadeInOnScroll>
                </div>

                <section className="relative grid grid-cols-1 lg:grid-cols-4 my-8 w-full h-full">
                    <div className="relative -space-x-10 lg:drop-shadow-xl lg:space-x-0 lg:col-span-4 lg:mx-auto mt-12 mb-12 lg:mb-16 ml-12 px-3 lg:w-full lg:max-w-2xl w-[80%] sm:w-3/4 h-64 lg:h-96">
                        <Image
                            src="/Images/carousel/01_fotografia_slubna_siedlce.avif"
                            alt="Fotografia ślubna Para Młoda podczas ceremonii"
                            sizes="(max-width: 768px) 300px, 400px"
                            fill
                            className="object-cover"
                            quality={75}
                        />
                        <div className="lg:bottom-6 -bottom-12 left-0 lg:left-1/2 z-10 absolute bg-black/60 backdrop-blur-sm px-8 py-6 w-full lg:w-1/2 lg:py-8 h-max text-start lg:-translate-x-1/2">
                            <p className="mb-2 text-white text-xl lg:text-3xl capitalize">
                                reportaż ślubny
                            </p>
                            <Link
                                href="fotografia-slubna"
                                aria-label="Fotografia Slubna"
                                className="hover:bg-white/20 px-4 py-1 border border-white text-white text-sm transition-colors"
                            >
                                Zobacz
                            </Link>
                        </div>
                    </div>
                    {OFERTAIMAGES.map((img, index) => (
                        <SesjaComponent
                            key={index}
                            img={img.src}
                            position={img.position}
                            title={img.title}
                            href={img.href}
                        />
                    ))}

                    <Link
                        href="/oferta"
                        aria-label="oferta"
                        className="top-12 -right-[14%] hover:bg-black mx-auto mt-24 lg:mt-12 px-12 py-8 border-2 border-black w-max h-max font-semibold hover:text-white transition-color-colors"
                    >
                        <p className="text-center uppercase">
                            {["i", "wiele", "więcej"].map((word, index) => (
                                <span key={index} className="block">
                                    {word}
                                </span>
                            ))}
                        </p>
                    </Link>
                </section>
            </div>

            <section className="bg-white px-4 py-12">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-12 font-light text-neutral-900 text-3xl tracking-tight">
                        Opinie klientów
                    </p>
                    <Opinions />
                    <div className="flex justify-center items-center">
                        <p className="mr-2">Opinie z </p>
                        <LinkShare
                            title="Google"
                            target="_blank"
                            href="https://www.google.com/search?sca_esv=36354fdb691823cb&rlz=1C5CHFA_enPL994PL994&sxsrf=AHTn8zocdBNdDop6JxFkDh7ZvwmBGz-yQA:1747759200679&q=jarekolszewski&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzSHL3h72FHJno5lAMGESINrEPckvvMSP28qIzP1NmX36Zu8MiyMs01d8X2DaqEuEVDJ_aYs%3D&uds=ABqPDvzh2Ji1Kqt-7EMvWRUQDfyq32fE0uGbr4uJQc4sQZqDb8FkSTC7VC6zBtw9Ms1apU7KPJzGzztDOCAB1tHAo1cvIm1_8fG54_w7B1HbpkvD_2-_u34&sa=X&ved=2ahUKEwjoxryyvrKNAxWlR_EDHTPOImYQ3PALegQIHhAE&biw=1680&bih=963&dpr=2"
                        />
                    </div>

                    <div className="mt-12">
                        <Link
                            href="/portfolio"
                            aria-label="Przejdz do portfolio"
                        >
                            <MainBtn>Moje portfolio</MainBtn>
                        </Link>
                    </div>
                </div>
            </section>
            <InstagramGrid />
            <StepsWithLazyBackground />
            <div className="flex flex-col justify-center items-center space-y-4 bg-gray-100 py-24 px-12 text-black">
                <FadeInOnScroll delay={0.1}>
                    <h3 className="text-2xl text-center">
                        Porozmawiajmy o Twoim pomyśle na zdjęcia{" "}
                    </h3>
                </FadeInOnScroll>

                <CTASendMail title="Napisz Do Mnie" />
            </div>

            <FaqAccordion />

            <div className="bg-gray-100 mt-4 px-6 md:px-12 py-16">
                <section className="space-y-16 md:space-y-24 mx-auto max-w-6xl">
                    {TEXT_SECTIONS.map(({ title, keyword, content }, index) => {
                        const isReversed = index % 2 === 1;

                        return (
                            <div
                                key={index}
                                className={`
                        md:flex md:items-center md:justify-between md:gap-12 pb-8
                        ${isReversed ? "md:flex-row-reverse md:text-end" : ""}
                    `}
                                style={{ scrollMarginTop: "5rem" }}
                            >
                                <div
                                    className={`
                            md:w-1/3 mb-8 md:mb-0 px-4 
                            border-brand-nav 
                            ${
                                isReversed
                                    ? "border-l-4 md:border-l-0 md:border-r-4 "
                                    : "border-l-4 "
                            }
                        `}
                                >
                                    <h2 className="drop-shadow-sm mb-2 font-semibold text-gray-900 text-xl md:text-3xl">
                                        {title}
                                    </h2>
                                    {keyword && (
                                        <p
                                            className={`bg-brand-nav text-white text-xs w-max font-semibold px-3 py-1 rounded-full capitalize ${
                                                isReversed ? "md:ml-auto" : ""
                                            }`}
                                        >
                                            {keyword}
                                        </p>
                                    )}
                                </div>
                                <div className="px-4 md:w-2/3">
                                    <p className="text-gray-700 text-base lg:text-lg text-start leading-relaxed">
                                        {content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>

            <div className="bg-neutral-900 pb-20">
                <InviteSocialMedia
                    text="Więcej znajdziesz na"
                    textColor="text-white"
                />
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2450.5668306245725!2d22.124585399999997!3d52.105814599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471f4f75292183f3%3A0x4d6060c876f5795!2sJarek%20Olszewski%20-%20Fotograf!5e0!3m2!1spl!2spl!4v1747762167147!5m2!1spl!2spl"
                title="Lokalizacja studia fotograficznego Jarek Olszewski na mapie Google"
                loading="lazy"
                className="w-full h-96"
            ></iframe>
        </div>
    );
}
