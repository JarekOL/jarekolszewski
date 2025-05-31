import HeroSection from "@/components/HeroSection";
import TitleH2 from "@/components/TitleH2";
import ImageComponent from "@/components/ImageComponent";
import CarouselProps from "@/components/CarouselProps";
import BlogList from "@/components/BlogList";
import ParagraphWithBullets from "@/components/ParagraphWithBullets";

import Opinions from "@/components/Opinions";
import ContactForm from "@/components/ContactForm";
import InstagramGrid from "@/components/instagram/InstagramGrid";
import LinkShare from "@/components/ui/LinkShare";
import { FaStar } from "react-icons/fa";
import ContactBtns from "./ContactBtns";
import CTASendMail from "./CTASendMail";

type UniversalPageContent = {
    hero: {
        title: string;
        backgroundImages: string[];
        paragraphs: string[];
    };
    introTitle: string;
    introDesc?: string;
    gridImages: {
        src: string;
        title: string;
        desc: string;
    }[];
    sections: {
        h2?: string;
        subSections?: {
            h3?: string;
            content: string;
        }[];
    }[];
    carousel?: {
        title: string;
        desc: string;
        images: {
            src: string;
            alt?: string;
        }[];
    };
    blog?: {
        title: string;
        desc: string;
    };
    blogs?: {
        data: {
            title: string;
            slug: string;
            image: string;
            date?: string;
            excerpt?: string;
            content: string;
            category: string;
        }[];
    };
    bullets?: {
        title: string;
        paragraph: string;
        items: string[];
    };
    gallery?: {
        responsiveImage: {
            width: number;
            height: number;
            src: string;
        };
    }[];
    h2Sections?: {
        title: string;
        desc?: string;
        componentType?: "default" | "gallery" | "contact";
    }[];
};

function SectionWithSubSections({
  section,
  sectionKeyPrefix,
}: {
  section: {
    h2?: string;
    subSections?: {
      h3?: string;
      content: string;
    }[];
  };
  sectionKeyPrefix: string;
}) {
  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  }

  return (
    <section
      className="px-4 sm:px-6 py-16 sm:py-20 max-w-4xl mx-auto"
      aria-labelledby={`section-h2-${slugify(section.h2 ?? "")}`}
      key={sectionKeyPrefix}
    >
     {section.h2 && (
  <header className="text-center mb-12 sm:mb-16">
    <h2
      id={`section-h2-${slugify(section.h2)}`}
      className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 mb-6"
    >
      {section.h2}
    </h2>
    <div className="flex items-center justify-center">
      <svg width="100" height="20" viewBox="0 0 100 20" className="text-gray-300">
        {/* Aperture/diaphragm icon */}
        <g transform="translate(50, 10)">
          <circle cx="0" cy="0" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
          <path
            d="M-4.2,-4.2 L4.2,4.2 M4.2,-4.2 L-4.2,4.2 M0,-6 L0,6 M-6,0 L6,0"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </g>
        {/* Decorative lines */}
        <line x1="10" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1" />
        <line x1="65" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  </header>
)}

      <div className="space-y-8 sm:space-y-12">
        {section.subSections?.map((sub, j) => (
          <article key={`${sectionKeyPrefix}-subsection-${j}`} className="max-w-2xl mx-auto">
            {sub.h3 && (
              <h3
                id={`subsection-h3-${slugify(sub.h3)}`}
                className="text-xl sm:text-2xl font-medium text-gray-800 mb-4 sm:mb-6 text-left"
              >
                {sub.h3}
              </h3>
            )}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-7 sm:leading-8 text-base sm:text-lg text-left">
                {sub.content.trim()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function UniversalPage({
    content,
}: {
    content: UniversalPageContent;
}) {
    return (
        <>
            <HeroSection
                title={content.hero.title}
                backgroundImages={content.hero.backgroundImages}
                paragraphs={content.hero.paragraphs}
            />
            
            <main className="bg-white">
                <div className="w-full">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                        
                        {/* Główny nagłówek */}
                        <header className="text-center mb-16 sm:mb-20">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 mb-6 sm:mb-8 leading-tight max-w-4xl mx-auto">
                                {content.introTitle}
                            </h1>
                            {content.introDesc && (
                                <div className="max-w-3xl mx-auto">
                                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-center">
                                        {content.introDesc}
                                    </p>
                                </div>
                            )}
                        </header>

                        {/* Siatka obrazów */}
                        {content.gridImages?.length > 0 && (
                            <section className="mb-16 sm:mb-20">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                    {content.gridImages.map((img, index) =>
                                        img?.src && img?.title && img?.desc ? (
                                            <ImageComponent
                                                key={index}
                                                index={index}
                                                img={img.src}
                                                title={img.title}
                                                desc={img.desc}
                                            />
                                        ) : null
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Pierwsza sekcja treści */}
                        {content.sections?.length > 0 && (
                            <>
                                {content.sections
                                    .slice(0, 1)
                                    .map((section, i) => (
                                        <SectionWithSubSections
                                            key={`section-0-${i}`}
                                            section={section}
                                            sectionKeyPrefix={`section-0-${i}`}
                                        />
                                    ))}
                            </>
                        )}
                    </div>

                    {/* Sekcja CTA */}
                    <section className="border-t border-b border-gray-100 py-16 sm:py-20 bg-gray-50">
                        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3">
                                Napisz do mnie
                            </h2>
                            <p className="text-gray-700 mb-8 text-center max-w-lg mx-auto">
                                Omówmy szczegóły
                            </p>
                            <CTASendMail title="Wyślij wiadomość" />
                        </div>
                    </section>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6">
                        {/* Karuzela */}
                        {content.carousel && (
                            <section className="py-16 sm:py-20">
                                <div className="text-center mb-12 sm:mb-16">
                                    <TitleH2
                                        title={content.carousel.title}
                                        desc={content.carousel.desc}
                                    />
                                </div>
                                <div className="max-w-2xl mx-auto">
                                    <CarouselProps
                                        images={content.carousel.images}
                                    />
                                </div>
                            </section>
                        )}

                        {/* Druga sekcja */}
                        {content.sections?.length > 0 && (
                            <>
                                {content.sections
                                    .slice(1, 2)
                                    .map((section, i) => (
                                        <SectionWithSubSections
                                            key={`section-1-${i}`}
                                            section={section}
                                            sectionKeyPrefix={`section-1-${i}`}
                                        />
                                    ))}
                            </>
                        )}

                        {/* Blog */}
                        {content.blog && (
                            <section className="py-16 sm:py-20">
                                <div className="text-center mb-12 sm:mb-16">
                                    <TitleH2
                                        title={content.blog.title}
                                        desc={content.blog.desc}
                                    />
                                </div>
                                {content.blogs && (
                                    <div className="max-w-4xl mx-auto">
                                        <BlogList
                                            blogs={content.blogs.data}
                                            limit={6}
                                            columns={2}
                                        />
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Lista punktowana */}
                        {content.bullets && (
                            <section className="py-16 sm:py-20">
                                <div className="max-w-2xl mx-auto">
                                    <ParagraphWithBullets
                                        title={content.bullets.title}
                                        paragraph={content.bullets.paragraph}
                                        bullets={content.bullets.items}
                                    />
                                </div>
                            </section>
                        )}

                        {/* Średnia sekcja kontaktu */}
                        <section className="py-16 sm:py-20 border-t border-b border-gray-100 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6">
                            <div className="max-w-2xl mx-auto text-center">
                                <ContactBtns />
                            </div>
                        </section>

                        {/* Trzecia sekcja */}
                        {content.sections?.length > 0 && (
                            <>
                                {content.sections
                                    .slice(2, 3)
                                    .map((section, i) => (
                                        <SectionWithSubSections
                                            key={`section-2-${i}`}
                                            section={section}
                                            sectionKeyPrefix={`section-2-${i}`}
                                        />
                                    ))}
                            </>
                        )}

                        {/* Opinie klientów */}
                        <section className="py-16 sm:py-20">
                            <div className="max-w-3xl mx-auto">
                                <header className="text-center mb-12 sm:mb-16">
                                    <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
                                        Opinie klientów
                                    </h2>
                                    <div className="w-12 h-px bg-gray-300 mx-auto"></div>
                                </header>
                                
                                <Opinions />
                                
                                <footer className="text-center mt-8 space-y-3">
                                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-600">
                                        <span>Opinie z</span>
                                        <LinkShare
                                            title="Google"
                                            target="_blank"
                                            href="https://www.google.com/search?q=jarekolszewski"
                                        />
                                    </div>
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="text-base font-medium text-gray-700">5,0</span>
                                        <div className="flex space-x-0.5 mx-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">(44)</span>
                                    </div>
                                </footer>
                            </div>
                        </section>

                        {/* Formularz kontaktowy */}
                        <section className="py-16 sm:py-20">
                            <ContactForm />
                        </section>

                        {/* Pozostałe sekcje */}
                        {content.sections?.length > 0 && (
                            <>
                                {content.sections.slice(3).map((section, i) => (
                                    <SectionWithSubSections
                                        key={`section-${i + 3}`}
                                        section={section}
                                        sectionKeyPrefix={`section-${i + 3}`}
                                    />
                                ))}
                            </>
                        )}

                        {/* Instagram */}
                        <section className="py-16 sm:py-20">
                            <div className="max-w-3xl mx-auto">
                                <InstagramGrid />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}