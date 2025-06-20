'use client';

import { OPINIONS } from "@/constants/Links";

export default function SeoHead() {
  // Definiujemy dane osoby, aby uniknąć powtórzeń i móc się do nich odwoływać
  const personData = {
    "@type": "Person",
    "@id": "https://jarekolszewski.pl/#jarekolszewski",
    name: "Jarek Olszewski",
    url: "https://jarekolszewski.pl/",
    knowsLanguage: ["pl-PL", "en-GB"],
    sameAs: [
      "https://www.facebook.com/JarekOlszewskiFotografia",
      "https://www.instagram.com/jarek.olszewski.fotografia",
    ],
  };

  // Główny schemat opisuje Twoją firmę jako usługę profesjonalną, co jest kluczowe dla SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // ZMIANA: Z Person na ProfessionalService - to jest firma
    "@id": "https://jarekolszewski.pl/#organization", // ZMIANA: Unikalne ID dla Twojej organizacji
    name: "Jarek Olszewski Fotografia", // ZMIANA: Oficjalna nazwa Twojej firmy/marki
    url: "https://jarekolszewski.pl/",
    logo: "https://jarekolszewski.pl/Images/fotograf-siedlce-jarek-olszewski.jpg",
    image: {
      "@type": "ImageObject",
      url: "https://jarekolszewski.pl/Images/fotograf-siedlce-jarek-olszewski.jpg",
      caption: "Fotograf ślubny Siedlce - Jarek Olszewski",
      width: 800,
      height: 800,
    },
    telephone: "+48507946719",
    email: "kontakt@jarekolszewski.pl", // POPRAWKA: Usunięto "mailto:"
    foundingDate: "2012",
    
    // POPRAWKA: Prawidłowe powiązanie osoby z firmą
    founder: {
      "@id": personData["@id"] // Odniesienie do zdefiniowanej osoby
    },
    employee: {
        ...personData, // Rozszerzamy o dane osoby
        jobTitle: "Fotograf" // POPRAWKA: Czysty i prawidłowy tytuł zawodowy
    },
    
    address: {
      "@type": "PostalAddress",
      addressLocality: "Siedlce",
      addressCountry: "PL",
    },
    areaServed: [
      { "@type": "City", name: "Siedlce" },
      { "@type": "City", name: "Sokołów Podlaski" },
      { "@type": "City", name: "Łuków" },
      { "@type": "City", name: "Warszawa" },
      { "@type": "City", name: "Lublin" },
      { "@type": "Country", name: "Polska" },
    ],
    description:
      "Jarek Olszewski - fotograf ślubny z Siedlec i Sokołowa Podlaskiego. Naturalna fotografia ślubna, sesje plenerowe i reportaże weselne pełne emocji. Obsługuje także Warszawę i Lublin.",
    
    // Sekcja opinii i ocen - teraz przypisana do firmy, co jest logiczne
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: OPINIONS.length, // ZMIANA: Użycie 'ratingCount' jest bardziej standardowe
      bestRating: "5",
    },
    review: OPINIONS.map((opinia) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: opinia.rating,
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: opinia.name,
      },
      reviewBody: opinia.text,
    })),
  };

  return (
    <>
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Jarek Olszewski" />
      <meta name="copyright" content="© 2025 Jarek Olszewski" />
      <meta
        name="google-site-verification"
        content="w0q-Q8zX94EcR4AuO8Pem81VxSmPM3mvrtSONwZupgw"
      />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }} // Dodano null, 2 dla czytelności w źródle strony
      />
    </>
  );
}