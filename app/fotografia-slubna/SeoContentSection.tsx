// app/fotografia-slubna/_components/SeoContentSection.tsx

import {
    FiCamera,
    FiHeart,
    FiFilm,
    FiMapPin,
    FiCheckCircle,
    FiHelpCircle,
    FiFileText,
} from "react-icons/fi";

interface CardData {
    title: string;
    icon: React.ElementType;
    content: (
        | string
        | { type: "table"; headers: string[]; rows: string[][] }
    )[];
}

// === DANE ZGODNE Z TWOIM ORYGINALNYM TEKSTEM ===
const cardData: CardData[] = [
    {
        title: "Fotograf w Siedlcach",
        icon: FiCamera,
        content: [
            "**Kim jest fotograf ślubny?**",
            "Fotograf ślubny to specjalista, który dokumentuje dzień ślubu i wesele, tworząc reportaż ślubny. Jego zadaniem jest uchwycenie ulotnych momentów, pełnych emocji, od przygotowań, przez ceremonię, aż po przyjęcie weselne. Dobry fotograf ślubny Siedlce powinien charakteryzować się kreatywnością i profesjonalizmem, oferując usługi na najwyższym poziomie, co potwierdza jego portfolio.",
        ],
    },
    {
        title: "Fotografia i Reportaż Ślubny",
        icon: FiHeart,
        content: [
            "**Co to jest fotografia ślubna?**",
            "To sztuka uwieczniania najważniejszych chwil z dnia ślubu i wesela, tworząc trwałe wspomnienia dla nowożeńców. Obejmuje ona reportaż ślubny, sesje narzeczeńskie oraz sesje plenerowe. Kluczowym elementem jest naturalność - dążenie do uchwycenia autentycznych emocji, gestów i spojrzeń.",
            "**Dlaczego warto wybrać reportaż?**",
            "To decyzja, która gwarantuje uwiecznienie wszystkich kluczowych momentów w sposób naturalny i spontaniczny. Profesjonalny fotograf ślubny w Siedlcach potrafi uchwycić ulotne emocje, detale i interakcje, które tworzą unikalną narrację Waszego wyjątkowego dnia.",
        ],
    },
    {
        title: "Rodzaje Zdjęć Ślubnych",
        icon: FiFilm,
        content: [
            "W zakresie fotografii ślubnej wyróżniamy kilka rodzajów zdjęć, które kompleksowo dokumentują wydarzenie. Podstawą jest reportaż, ale coraz popularniejsze stają się też inne sesje:",
            "• Reportaż ślubny z dnia ślubu, obejmujący ceremonię i wesele.",
            "• Sesje narzeczeńskie, pozwalające oswoić się z obiektywem.",
            "• Sesje plenerowe w malowniczych sceneriach Mazowsza.",
            "**Przykłady reportaży** z portfolio prezentują różnorodność ujęć, od wzruszających przygotowań po radosne oczepiny, dokumentując interakcje i detale składające się na atmosferę dnia.",
        ],
    },
    {
        title: "Sesje Fotograficzne i Lokalizacje",
        icon: FiMapPin,
        content: [
            "**Czym jest sesja narzeczeńska?**",
            "To doskonała okazja, aby w luźnej atmosferze stworzyć piękne zdjęcia i poznać styl pracy fotografa jeszcze przed ślubem.",
            "**Sesja plenerowa - najlepsze lokalizacje w Siedlcach:**",
            {
                type: "table",
                headers: ["Lokalizacja", "Opis"],
                rows: [
                    ["Park Miejski Aleksandria", "Malowniczy park"],
                    ["Rezerwat Przyrody Stawy Siedleckie", "Obszar natury"],
                    ["Klimatyczne uliczki starego miasta", "Urokliwe zaułki"],
                    ["Pałac w Korczewie", "Obiekt historyczny"],
                ],
            },
        ],
    },
    {
        title: "Oferta, Cennik i Rezerwacja",
        icon: FiFileText,
        content: [
            "**Pakiety fotograficzne na wesele:**",
            "Przygotowaliśmy różnorodne pakiety, aby sprostać oczekiwaniom każdej pary. Każdy obejmuje profesjonalny reportaż, z opcją rozszerzenia o sesje narzeczeńskie czy plenerowe.",
            "**Cennik usług fotograficznych:**",
            "Jest dopasowany do zakresu usług, a pełną ofertę wraz z wyceną można otrzymać po kontakcie. Stawiamy na przejrzystość i elastyczność.",
            "**Jak zarezerwować fotografa na ślub?**",
            "Zalecamy kontakt z odpowiednim wyprzedzeniem. Po omówieniu oczekiwań podpisujemy umowę, która gwarantuje dostępność i szczegóły realizacji, zapewniając Wam spokój ducha.",
        ],
    },
];

const FaqData = [
    {
        question: "Jakie zdjęcia otrzymam po ślubie?",
        answer: "Otrzymacie kompleksowy reportaż ślubny, składający się z wyselekcjonowanych i profesjonalnie obrobionych zdjęć w formie cyfrowej, a także eleganckich odbitek (w zależności od pakietu). Wszystkie zdjęcia charakteryzują się naturalnością i wysoką jakością.",
    },
    {
        question: "Czy oferujecie sesje poślubne?",
        answer: "Tak, oczywiście. Sesja poślubna to doskonałe uzupełnienie reportażu. Daje możliwość stworzenia unikalnych zdjęć w dowolnie wybranej lokalizacji, bez presji czasu, która często towarzyszy w dniu ślubu.",
    },
    {
        question: "Jakie są terminy dostępności fotografa?",
        answer: "Terminy są zróżnicowane i uzależnione od sezonu. Zachęcamy do jak najwcześniejszego kontaktu w celu sprawdzenia wolnych dat. Staramy się być elastyczni i wychodzić naprzeciw oczekiwaniom par młodych.",
    },
];

export default function SeoContentSection() {
    return (
        <section className="bg-gray-50/70 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-light text-gray-800 tracking-tight">
                        Fotografia Weselna
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Zapraszamy do zapoznania się z kompleksowym
                        przewodnikiem po świecie fotografii ślubnej w Siedlcach,
                        gdzie profesjonalizm spotyka się z kreatywnością, aby
                        uwiecznić najpiękniejsze momenty Waszego dnia.
                    </p>
                </div>

                <div className="grid grid-cols-1 text-start gap-6 lg:gap-8">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 lg:p-8 border border-gray-200/80 rounded-2xl shadow-sm  flex flex-col"
                        >
                            <div className="flex items-center mb-4">
                                <span className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-nav/10 text-brand-nav">
                                    <card.icon className="h-7 w-7" />
                                </span>
                                <h3 className="font-semibold text-xl text-gray-900 ml-4">
                                    {card.title}
                                </h3>
                            </div>
                            <div className="space-y-4 text-gray-600 leading-relaxed flex-grow">
                                {card.content.map((item, itemIndex) => {
                                    if (typeof item === "string") {
                                        if (item.startsWith("•")) {
                                            return (
                                                <div
                                                    key={itemIndex}
                                                    className="flex items-start pl-4"
                                                >
                                                    <FiCheckCircle className="h-5 w-5 text-brand-nav/80 mr-3 mt-1 flex-shrink-0" />
                                                    <span>
                                                        {item.substring(2)}
                                                    </span>
                                                </div>
                                            );
                                        }
                                        // Specjalne formatowanie dla podtytułów
                                        if (
                                            item.startsWith("**") &&
                                            item.endsWith("**")
                                        ) {
                                            return (
                                                <p
                                                    key={itemIndex}
                                                    className="font-semibold text-gray-700 mt-3"
                                                >
                                                    {item.replaceAll("**", "")}
                                                </p>
                                            );
                                        }
                                        return <p key={itemIndex}>{item}</p>;
                                    } else if (item.type === "table") {
                                        return (
                                            <div
                                                key={itemIndex}
                                                className="mt-4 border border-gray-200/80 rounded-lg overflow-hidden"
                                            >
                                                <table className="min-w-full">
                                                    <thead className="bg-gray-100/70">
                                                        <tr>
                                                            {item.headers.map(
                                                                (header) => (
                                                                    <th
                                                                        key={
                                                                            header
                                                                        }
                                                                        className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                                                    >
                                                                        {header}
                                                                    </th>
                                                                )
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {item.rows.map(
                                                            (row, rowIndex) => (
                                                                <tr
                                                                    key={
                                                                        rowIndex
                                                                    }
                                                                >
                                                                    {row.map(
                                                                        (
                                                                            cell
                                                                        ) => (
                                                                            <td
                                                                                key={
                                                                                    cell
                                                                                }
                                                                                className="py-3 px-4 text-sm text-gray-700"
                                                                            >
                                                                                {
                                                                                    cell
                                                                                }
                                                                            </td>
                                                                        )
                                                                    )}
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 lg:mt-24">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-light text-gray-800">
                            Najczęściej Zadawane Pytania
                        </h3>
                    </div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                        {FaqData.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 lg:p-8 border border-gray-200/80 rounded-2xl shadow-sm text-center space-y-4"
                            >
                                <FiHelpCircle className="h-7 w-7 text-brand-nav/80 mx-auto" />

                                <p className="font-semibold text-lg text-gray-900">
                                    {faq.question}
                                </p>

                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
