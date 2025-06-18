'use client';

import { OPINIONS } from "@/constants/Links";

export default function SeoHead() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://jarekolszewski.pl/#jarekolszewski",
    name: "Jarek Olszewski",
    url: "https://jarekolszewski.pl/",
    image: {
      "@type": "ImageObject",
      url: "https://jarekolszewski.pl/Images/fotograf-siedlce-jarek-olszewski.jpg",
      caption: "Fotograf ślubny Siedlce - Jarek Olszewski",
      width: 800,
      height: 800,
    },
    jobTitle: "Fotograf ślubny, Fotograf Siedlce, Fotograf Sokołów Podlaski",
    description:
      "Jarek Olszewski - fotograf ślubny z Siedlec i Sokołowa Podlaskiego. Naturalna fotografia ślubna, sesje plenerowe i reportaże weselne pełne emocji. Obsługuje także Warszawę i Lublin.",
    email: "mailto:kontakt@jarekolszewski.pl",
    telephone: "+48507946719",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Siedlce",
      addressCountry: "PL",
    },
    knowsLanguage: ["pl-PL", "en-GB"],
    sameAs: [
      "https://www.facebook.com/JarekOlszewskiFotografia",
      "https://www.instagram.com/jarek.olszewski.fotografia",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Fotograf Siedlce - Jarek Olszewski",
      url: "https://jarekolszewski.pl/",
      logo: {
        "@type": "ImageObject",
        url: "https://jarekolszewski.pl/Images/fotograf-siedlce-jarek-olszewski.jpg",
      },
      foundingDate: "2012",
      founder: {
        "@type": "Person",
        name: "Jarek Olszewski",
      },
      brand: {
        "@type": "Brand",
        name: "Jarek Olszewski Fotograf",
      },
      areaServed: [
        { "@type": "City", name: "Siedlce" },
        { "@type": "City", name: "Sokołów Podlaski" },
        { "@type": "City", name: "Łuków" },
        { "@type": "City", name: "Warszawa" },
        { "@type": "City", name: "Lublin" },
        { "@type": "Country", name: "Polska" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: OPINIONS.length,
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
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
