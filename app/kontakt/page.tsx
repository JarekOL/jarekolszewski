export const dynamic = "force-static";
import ContactBtns from "@/components/ContactBtns";
import ContactForm from "@/components/ContactForm";
import TitleH1 from "@/components/TitleH1";
import { Metadata } from "next";

const pageTitle = "Kontakt - Jarek Olszewski | Fotograf Siedlce i okolice";
const pageDescription =
    "Skontaktuj się z Jarkiem Olszewskim - fotografem z Siedlec 📸 Zarezerwuj termin sesji 📅, zapytaj o ofertę i poznaj szczegóły współpracy 🤝";
const heroImage = "/Images/home/fotograf-siedlce-jarek-olszewski.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://jarekolszewski.pl/kontakt",
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

export default function ContactPage() {
    return (
        <div className="max-w-screen-md mx-auto px-4 anim-opacity py-6 text-gray-800 text-center">
            <div className="py-1 px-6 sm:px-12">
                <TitleH1
                    title="Porozmawiajmy o Fotografii"
                    desc="Masz pytania dotyczące oferty fotograficznej, chcesz sprawdzić
                dostępność terminu lub po prostu porozmawiać? Skontaktuj się ze
                mną - jako fotograf zawsze jestem otwarty na rozmowę i pomogę
                jak tylko potrafię."
                />
            </div>

            <ContactBtns />

            <section className="text-left">
                <ContactForm />
            </section>
        </div>
    );
}
