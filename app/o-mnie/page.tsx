import InstagramGrid from "@/components/instagram/InstagramGrid";
import Opinions from "@/components/Opinions";
import PhotoSwipe from "@/components/PhotoSwipe";
import TitleH1 from "@/components/TitleH1";
import LinkShare from "@/components/ui/LinkShare";
import { getImagesFromFolder } from "@/lib/getImagesFromFolder";
import { Metadata } from "next";

const pageTitle =
    "Jarek Olszewski - Fotograf ślubny Siedlce | Sesje, Reportaże";
const pageDescription =
    "Profesjonalna fotografia ślubna i sesje zdjęciowe w Siedlcach. Jarek Olszewski - fotograf z pasją, który uchwyci najważniejsze chwile Twojego życia. Naturalne zdjęcia pełne emocji.";
const heroImage = "/Images/home/fotograf-siedlce-jarek-olszewski.webp";

export const metadata: Metadata = {
     alternates: {
        canonical: "https://www.jarekolszewski.pl/o-mnie",
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

export default function AboutMePage() {
    const imagesFromFolder = getImagesFromFolder(
        "/blogs/fotografia-slubna/top-fotografia-slubna",
        6
    );
    const formattedImages = imagesFromFolder.map((item) => ({
        src: item.responsiveImage.src.replace("//", "/"),
        width: item.responsiveImage.width,
        height: item.responsiveImage.height,
    }));
    return (
        <div className="bg-white text-gray-800 anim-opacity">
            <div className="text-center bg-gray-100">
                <div className="py-12 px-6 sm:px-12">
                    <TitleH1
                        title="Jarek Olszewski - Fotograf i człowiek z pasją"
                        desc="Poznaj moją historię i sposób, w jaki patrzę na świat przez obiektyw aparatu."
                    />
                </div>
            </div>
            <section className="max-w-4xl mx-auto px-4 py-10 space-y-12 bg-white">
                <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-700">
                    <p className="border-l-4 border-brand pl-4">
                        Pokrótce? szczęśliwy człowiek! od urodzenia wszędzie
                        było mnie pełno i tak pozostało mi do dziś. pozytywnie
                        zakręcony facet. dla dobrego zdjęcia wcisnę się w
                        miejsca pozornie niedostępne, ba! jak potrzeba utaplam
                        się w błocie. uwielbiam gdy wokół wiele się dzieje.
                    </p>

                    <p>
                        Moja przygoda z fotografią zaczęła się przez przypadek i
                        to najlepszy przypadek, jaki mógł mnie spotkać w życiu!
                        gdy w 2008 roku podczas meczu lokalnej drużyny zrobiłem
                        pierwsze zdjęcia, nie spodziewałem się, że będzie to
                        początek pięknej pasji, która w kolejnych latach będzie
                        tylko rosnąć na sile.
                    </p>

                    <p>
                        Przez te wszystkie lata zdążyłem poznać wiele świetnych
                        osób, dzięki którym mogłem spróbować sprawdzić się w
                        wielu dziedzinach fotografii.
                    </p>

                    <p>
                        Najbardziej lubię fotografować to co niedostrzeżone
                        przez wielu “chwile i momenty” ustawiając się z boku,
                        nikomu nie przeszkadzając.{" "}
                        <strong className="font-light">
                            fotografując śluby
                        </strong>
                        , chrzty czy inne uroczystości rodzinne mogę właśnie to
                        robić - łapać momenty, które inni chcą zapamiętać na
                        całe życie. to daje ogromną satysfakcję, gdy widzę, że
                        moja praca wywołuje uśmiech, a czasami łzy szczęścia.
                    </p>
                    <p>
                        <strong className="font-light">
                            Fotografuję głównie w województwie mazowieckim
                        </strong>{" "}
                        - okolice siedlec. odległość nigdy nie była dla mnie
                        problemem. z moimi klientami zwiedziłem już prawie całą
                        polskę, za co jestem im ogromnie wdzięczny, lecz po
                        cichu liczę na więcej…
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-center mb-8 text-black">
                    Zobacz moje kadry
                </h3>
                <PhotoSwipe
                    images={formattedImages}
                    columns={3}
                    className="p-4"
                />
            </section>

            <section className="bg-white py-12">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-12 font-semibold text-neutral-900 text-2xl tracking-tight">
                        Klienci o zdjęciach i odrobinę o mnie
                    </h2>
                    <Opinions />
                    <div className="flex justify-center items-center">
                        <p className="mr-2">Opinie z </p>
                        <LinkShare
                            title="Google"
                            target="_blank"
                            href="https://www.google.com/search?sca_esv=36354fdb691823cb&rlz=1C5CHFA_enPL994PL994&sxsrf=AHTn8zocdBNdDop6JxFkDh7ZvwmBGz-yQA:1747759200679&q=jarekolszewski&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzSHL3h72FHJno5lAMGESINrEPckvvMSP28qIzP1NmX36Zu8MiyMs01d8X2DaqEuEVDJ_aYs%3D&uds=ABqPDvzh2Ji1Kqt-7EMvWRUQDfyq32fE0uGbr4uJQc4sQZqDb8FkSTC7VC6zBtw9Ms1apU7KPJzGzztDOCAB1tHAo1cvIm1_8fG54_w7B1HbpkvD_2-_u34&sa=X&ved=2ahUKEwjoxryyvrKNAxWlR_EDHTPOImYQ3PALegQIHhAE&biw=1680&bih=963&dpr=2"
                        />
                    </div>
                </div>
            </section>

            <InstagramGrid />
        </div>
    );
}
