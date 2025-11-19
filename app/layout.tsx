import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Header/Nav";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SeoHead from "@/components/SeoHead";
import Messenger from "@/components/Messenger";
import { cookies } from "next/headers";
import CookieBanner from "@/components/CookieBanner";
import IntroOverlay from "@/components/IntroOverlay";
import FacebookPixel from "@/lib/FacebookPixel";
import GAnalytics from "@/lib/Analytics/GAnalytics";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://jarekolszewski.pl"),
    keywords: [
        "fotograf siedlce",
        "fotografia ślubna",
        "fotograf ślubny",
        "reportaż ślubny",
        "Jarek Olszewski",
        "fotograf warszawa",
    ],
    openGraph: {
        url: "https://jarekolszewski.pl/",
        siteName: "Jarek Olszewski - Fotograf",
        locale: "pl_PL",
        type: "website",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const cookiesAccepted =
        cookieStore.get("cookies-accepted")?.value === "true";
    return (
        <html lang="pl">
            <head>
                <SeoHead />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var last=localStorage.getItem('intro-shown-at');var now=Date.now();if(last && (now - parseInt(last,10)) < 3600000){document.documentElement.dataset.intro='skip';}else{document.documentElement.dataset.intro='show';}}catch(e){} })();`,
                    }}
                />
                <link
                    rel="preload"
                    href="/_next/static/media/569ce4b8f30dc480-s.p.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <FacebookPixel />
            </head>
            <body className={`${geistSans.className} overflow-y-auto`}>
                <IntroOverlay />
                <div
                    id="site-root"
                    className="flex flex-col min-h-screen w-full font-light antialiased touch-auto"
                >
                    <Nav />
                    <main className="flex-1 w-full overflow-x-hidden relative min-h-[90vh]">
                        {children}
                    </main>
                    {!cookiesAccepted && <CookieBanner />}

                    <Messenger />
                    <ScrollToTopButton />
                    <Footer />
                    <GAnalytics />
                </div>
            </body>
        </html>
    );
}
