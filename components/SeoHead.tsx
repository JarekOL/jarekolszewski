export default function SeoHead() {
    return (
        <>
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Jarek Olszewski" />
            <meta name="copyright" content="© 2025 Jarek Olszewski" />
           <meta name="google-site-verification" content="w0q-Q8zX94EcR4AuO8Pem81VxSmPM3mvrtSONwZupgw" />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Photographer",
                    name: "Jarek Olszewski",
                    url: "https://jarekolszewski.pl/",
                    image: "https://jarekolszewski.pl/Images/fotograf-siedlce-jarek-olszewski.jpg",
                    description:
                        "Fotograf ślubny w Siedlcach - Jarek Olszewski.",
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Siedlce",
                        addressCountry: "PL",
                    },
                })}
            </script>
        </>
    );
}
