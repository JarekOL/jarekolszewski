import { Metadata } from "next";

const pageTitle = "Regulamin i Polityka Prywatności | Jarek Olszewski";
const pageDescription =
    "Zapoznaj się z regulaminem oraz polityką prywatności serwisu Jarek Olszewski. Dowiedz się, jak chronimy Twoje dane osobowe i korzystamy z plików cookies, aby zapewnić bezpieczne i komfortowe korzystanie ze strony";
const heroImage = "/Images/home/fotograf-siedlce-jarek-olszewski.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/regulamin-i-polityka-prywatnoci",
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

export default function Page() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 py-12 lg:py-24 text-sm leading-relaxed text-gray-800 anim-opacity">
            <h1 className="text-2xl font-semibold mb-4">
                Regulamin i Polityka Prywatności
            </h1>

            <section>
                <h2 className="text-xl font-semibold mt-4 mb-2">
                    1. Informacje ogólne
                </h2>
                <p>
                    Właścicielem strony{" "}
                    <strong>https://jarekolszewski.pl</strong> oraz wszystkich
                    zamieszczonych na niej materiałów jest Jarosław Olszewski z
                    siedzibą przy ul. Ogrodowej 19, 08-114 Skórzec.
                </p>
                <p>
                    Serwis nie zbiera automatycznie żadnych informacji, poza
                    danymi zawartymi w plikach cookies.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4 mb-2">
                    2. Pliki cookies
                </h2>
                <p>
                    Pliki cookies („ciasteczka”) to dane tekstowe zapisywane w
                    urządzeniu końcowym użytkownika, służące do korzystania ze
                    stron internetowych serwisu.
                </p>
                <p>
                    Pliki te zazwyczaj zawierają nazwę strony, czas
                    przechowywania oraz unikalny identyfikator.
                </p>
                <p>
                    Podmiotem zamieszczającym cookies i uzyskującym do nich
                    dostęp jest operator serwisu jarekolszewski.pl.
                </p>

                <h3 className="font-medium mt-3 mb-1">
                    Cele wykorzystania cookies:
                </h3>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>
                        Dostosowanie zawartości strony do preferencji
                        użytkownika.
                    </li>
                    <li>Tworzenie statystyk ułatwiających rozwój serwisu.</li>
                    <li>Utrzymanie sesji po zalogowaniu.</li>
                </ul>

                <p>
                    W serwisie stosowane są cookies sesyjne (tymczasowe) oraz
                    stałe (zapisane na dłużej). Rodzaje cookies obejmują:
                </p>

                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>
                        Niezbędne - umożliwiające podstawowe funkcje serwisu.
                    </li>
                    <li>Bezpieczeństwa - zapobiegające nadużyciom.</li>
                    <li>Wydajnościowe - analityka zachowań użytkowników.</li>
                    <li>
                        Funkcjonalne - zapamiętywanie preferencji użytkownika.
                    </li>
                    <li>Reklamowe - dostosowywanie treści marketingowych.</li>
                </ul>

                <p>
                    Użytkownik może w każdej chwili zmienić ustawienia cookies w
                    swojej przeglądarce. Ograniczenia mogą jednak wpływać na
                    działanie niektórych funkcji serwisu.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4 mb-2">
                    3. Przetwarzanie danych
                </h2>
                <p>
                    Korzystanie z serwisu może wiązać się z przetwarzaniem
                    danych osobowych takich jak imię, nazwisko, numer telefonu,
                    e-mail, adres zamieszkania lub dane firmy.
                </p>
                <p>
                    Dane te są przetwarzane wyłącznie przez Jarosława
                    Olszewskiego w celu realizacji umowy lub przygotowania
                    oferty.
                </p>
                <p>
                    Użytkownik ma prawo dostępu do swoich danych i ich
                    poprawiania. Podanie danych jest dobrowolne, ale niezbędne
                    do skorzystania z serwisu.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4 mb-2">
                    4. Informacje dodatkowe
                </h2>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>
                        Cała zawartość strony{" "}
                        <strong>https://jarekolszewski.pl</strong> objęta jest
                        prawami autorskimi.
                    </li>
                    <li>
                        Kopiowanie treści lub zdjęć wymaga pisemnej zgody
                        właściciela strony.
                    </li>
                    <li>
                        E-maile użytkowników nie są przekazywane osobom trzecim
                        (polityka antyspamowa).
                    </li>
                    <li>
                        Podając adres e-mail lub numer telefonu, użytkownik
                        zgadza się na otrzymywanie wiadomości o promocjach i
                        usługach fotograficznych.
                    </li>
                </ul>
                <p className="mt-2 text-sm italic">
                    Wzór polityki cookies bazuje na materiale chronionym prawem
                    autorskim przez IAB Polska:{" "}
                    <a
                        href="http://wszystkoociasteczkach.pl"
                        className="text-blue-600 underline"
                        target="_blank"
                    >
                        wszystkoociasteczkach.pl
                    </a>
                </p>
            </section>
        </div>
    );
}
