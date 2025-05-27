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
      className="px-4 py-10 max-w-3xl mx-auto text-center space-y-12"
      aria-labelledby={`section-h2-${slugify(section.h2 ?? "")}`}
      key={sectionKeyPrefix}
    >
      {section.h2 && (
        <h2
          id={`section-h2-${slugify(section.h2)}`}
          className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-800"
        >
          {section.h2}
        </h2>
      )}

      {section.subSections?.map((sub, j) => (
        <div key={`${sectionKeyPrefix}-subsection-${j}`} className="space-y-4">
          {sub.h3 && (
            <h3
              id={`subsection-h3-${slugify(sub.h3)}`}
              className="text-xl sm:text-2xl font-light text-left sm:text-center text-neutral-700"
            >
              {sub.h3}
            </h3>
          )}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed text-left sm:text-center">
            {sub.content.trim()}
          </p>
        </div>
      ))}
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
            <div className="text-center bg-white w-full">
                <div className="w-full py-10">
                    <div className="max-w-5xl mx-auto px-4">
                        <h1 className="text-2xl lg:text-3xl max-w-4xl mx-auto font-light text-center mb-10">
                            {content.introTitle}
                        </h1>
                        {content.introDesc && (
                            <p className="text-base lg:font-extralight text-gray-700 max-w-5xl lg:text-lg text-center mb-10">
                                {content.introDesc}
                            </p>
                        )}
                        {content.gridImages?.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-3 gap-8 md:gap-6">
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
                        )}

                        {content.sections?.length > 0 && (
                            <>
                                {content.sections
                                    .slice(0, 1)
                                    .map((section, i) => (
                                        <SectionWithSubSections
                                            key={`section-0-2-${i}`}
                                            section={section}
                                            sectionKeyPrefix={`section-0-2-${i}`}
                                        />
                                    ))}
                            </>
                        )}
                    </div>

                    <div className="border-y p-12 mx-auto bg-gray-100">
                        <p className="text-2xl font-medium pb-2">
                            Napisz do mnie
                        </p>
                        <CTASendMail title="Wyślij wiadomość" />
                    </div>
                    <div>
                        {content.carousel && (
                            <>
                                <TitleH2
                                    title={content.carousel.title}
                                    desc={content.carousel.desc}
                                />
                                <div className="max-w-2xl mx-auto">
                                    <CarouselProps
                                        images={content.carousel.images}
                                    />
                                </div>
                            </>
                        )}
                        {content.sections?.length > 0 && (
                            <>
                                {content.sections
                                    .slice(1, 2)
                                    .map((section, i) => (
                                        <SectionWithSubSections
                                            key={`section-2-4-${i}`}
                                            section={section}
                                            sectionKeyPrefix={`section-2-4-${i}`}
                                        />
                                    ))}
                            </>
                        )}

                        {content.blog && (
                            <TitleH2
                                title={content.blog.title}
                                desc={content.blog.desc}
                            />
                        )}
                        {content.blogs && (
                            <>
                                <div className="max-w-3xl mx-auto">
                                    <BlogList
                                        blogs={content.blogs.data}
                                        limit={6}
                                        columns={2}
                                    />
                                </div>
                            </>
                        )}

                        {content.bullets && (
                            <div className="max-w-2xl mx-auto my-12">
                                <ParagraphWithBullets
                                    title={content.bullets.title}
                                    paragraph={content.bullets.paragraph}
                                    bullets={content.bullets.items}
                                />
                            </div>
                        )}

                        <div className="mt-12 py-10 border-y flex items-center justify-center text-center w-full bg-gray-100">
                            <ContactBtns />
                        </div>

                        {content.sections?.length > 0 && (
                            <>
                                {" "}
                                {content.sections
                                    .slice(2, 3)
                                    .map((section, i) => (
                                        <SectionWithSubSections
                                            key={`section-3-x-${i}`}
                                            section={section}
                                            sectionKeyPrefix={`section-2-4-${i}`}
                                        />
                                    ))}
                            </>
                        )}

                        <section className="bg-white py-12">
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="font-light text-neutral-900 text-xl tracking-tight">
                                    Opinie klientów
                                </p>
                                <Opinions />
                                <div className="flex justify-center items-center">
                                    <p className="mr-2">Opinie z</p>
                                    <LinkShare
                                        title="Google"
                                        target="_blank"
                                        href="https://www.google.com/search?q=jarekolszewski"
                                    />
                                </div>
                                <div className="flex items-center justify-center space-x-0.5 mt-2">
                                    <span className="text-sm">5,0</span>
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <span className="text-sm">(44)</span>
                                </div>
                            </div>
                        </section>

                        <div className="mt-8">
                            <ContactForm />
                        </div>
                        {content.sections?.length > 0 && (
                            <>
                                {content.sections.slice(3).map((section, i) => (
                                    <SectionWithSubSections
                                        key={`section-4-end-${i}`}
                                        section={section}
                                        sectionKeyPrefix={`section-4-end-${i}`}
                                    />
                                ))}
                            </>
                        )}

                        <div className="mt-12 max-w-3xl mx-auto">
                            <InstagramGrid />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
