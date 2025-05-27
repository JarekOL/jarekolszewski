"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-light text-start mb-6">
                Najczęstsze pytania (FAQ) <br /> Fotograf Siedlce, Warszawa i
                okolice
            </h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        Ile kosztuje fotograf w Siedlcach?
                    </AccordionTrigger>
                    <AccordionContent>
                        Ceny usług fotograficznych w Siedlcach zaczynają się od
                        około 300 zł w zależności od rodzaju sesji, czasu jej
                        trwania oraz lokalizacji. Skontaktuj się, aby otrzymać
                        dokładną wycenę.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Jak długo czeka się na zdjęcia od fotografa z Siedlec?
                    </AccordionTrigger>
                    <AccordionContent>
                        Standardowy czas oczekiwania na gotowe zdjęcia to 3-14
                        dni roboczych, w zależności od liczby ujęć i typu sesji.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        Czy fotograf Siedlce wykonuje sesje w plenerze?
                    </AccordionTrigger>
                    <AccordionContent>
                        Tak, oferuję sesje plenerowe w Siedlcach i okolicach - w
                        parkach, lasach, nad wodą czy w centrum miasta.
                        Lokalizacja zależy od Twojej wizji.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        Czy mogę zamówić sesję zdjęciową na prezent?
                    </AccordionTrigger>
                    <AccordionContent>
                        Tak - oferuję vouchery prezentowe na sesje zdjęciowe w
                        Siedlcach. To idealny prezent na urodziny, rocznicę lub
                        inne okazje.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>
                        Czy fotograf Siedlce pomoże mi podczas pozowania?
                    </AccordionTrigger>
                    <AccordionContent>
                        Oczywiście - podczas sesji pomagam w ustawieniu pozycji,
                        byś wyglądał/a naturalnie i korzystnie, nawet jeśli to
                        Twoja pierwsza sesja.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
