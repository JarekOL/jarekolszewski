"use client";

import { OPINIONS } from "@/constants/Links";

export default function SeoHead() {
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

    const siteUrl = "https://jarekolszewski.pl/";
    const imageUrl = `${siteUrl}Images/fotograf-siedlce-jarek-olszewski.jpg`;
    const shortDescription =
        "Naturalna fotografia ślubna, sesje plenerowe i reportaże weselne z Siedlec — Jarek Olszewski.";

    const opinions = Array.isArray(OPINIONS) ? OPINIONS : [];
    const ratingCount = opinions.length;
    const ratingValue =
        ratingCount > 0
            ? Number(
                  (
                      opinions.reduce(
                          (s, o) => s + (Number(o.rating) || 0),
                          0
                      ) / ratingCount
                  ).toFixed(1)
              )
            : undefined;

    const organization = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#organization`,
        name: "Jarek Olszewski Fotografia",
        url: siteUrl,
        logo: imageUrl,
        image: {
            "@type": "ImageObject",
            url: imageUrl,
            caption: "Fotograf ślubny Siedlce - Jarek Olszewski",
            width: 1200,
            height: 630,
        },
        telephone: "+48507946719",
        email: "kontakt@jarekolszewski.pl",
        foundingDate: "2012",
        founder: { "@id": personData["@id"] },
        employee: { ...personData, jobTitle: "Fotograf" },
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
        description: shortDescription,
        sameAs: personData.sameAs,
        keywords:
            "fotograf siedlce, fotografia ślubna, fotograf ślubny, reportaż ślubny, sesja plenerowa, fotograf warszawa",
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+48507946719",
                contactType: "customer service",
                areaServed: "PL",
                availableLanguage: ["Polish", "English"],
            },
        ],
        ...(ratingCount > 0
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue,
                      ratingCount,
                      bestRating: 5,
                  },
              }
            : {}),
        review: opinions.map((opinia) => ({
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: opinia.rating,
                bestRating: 5,
            },
            author: {
                "@type": "Person",
                name: opinia.name,
            },
            reviewBody: opinia.text,
        })),
    };

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Jarek Olszewski Fotografia",
        url: siteUrl,
        potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}?s={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    const structuredData = [organization, website, personData];

    return (
        <>
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Jarek Olszewski" />
            <meta name="copyright" content="© 2025 Jarek Olszewski" />
            <meta
                name="google-site-verification"
                content="w0q-Q8zX94EcR4AuO8Pem81VxSmPM3mvrtSONwZupgw"
            />
            <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData, null, 2),
                }}
            />
        </>
    );
}
