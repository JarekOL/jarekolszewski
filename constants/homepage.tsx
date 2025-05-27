import LinkShare from "@/components/ui/LinkShare";
import { ReactNode } from "react";

type Section = {
    title: string;
    keyword: string;
    content: ReactNode;
};

export const TEXT_SECTIONS: Section[] = [
    {
        title: "Dlaczego warto wybrać mnie jako fotografa?",
        keyword: "ślub i wesele",
        content: (
            <>
                Wybierając mnie na fotografa w Twoim ważnym dniu, zyskujesz coś
                więcej niż tylko piękne zdjęcia — otrzymujesz pełne
                zaangażowanie, spokój i pewność, że każda chwila zostanie
                uchwycona z wyczuciem. Pracuję dyskretnie, z empatią i sercem,
                dzięki czemu tworzę autentyczne kadry, które oddają naturalność
                i prawdziwe emocje. Dbam o detale, atmosferę i komfort — bo
                wiem, jak ważne są te momenty i jak bezcenne będą wspomnienia,
                do których będziesz wracać przez lata.
            </>
        ),
    },
    {
        title: "Fotografia ślubna - co mnie wyróżnia?",
        keyword: "polecany fotograf",
        content: (
            <>
                Fotografia towarzyszy mi od wielu lat — to nie tylko zawód, ale
                przede wszystkim pasja, która z biegiem czasu przerodziła się w
                pełne zaangażowania rzemiosło. Wieloletnie doświadczenie pozwala
                mi pracować swobodnie w różnych warunkach i sytuacjach, uchwycić
                to, co ulotne, i jednocześnie zadbać o każdy detal. Dzięki temu
                możesz mieć pewność, że niezależnie od okazji, powierzysz swoje
                wspomnienia w dobre ręce.
            </>
        ),
    },
    {
        title: "Najlepszy fotograf Siedlce? Sprawdź portfolio",
        keyword: "pozytywne opinie",
        content: (
            <>
                Szukasz fotografa, któremu możesz zaufać w ważnych momentach?
                Zachęcam do zajrzenia do sekcji{" "}
                <LinkShare href="/portfolio" title="PORTFOLIO" /> - to właśnie
                tam znajdziesz przekrój moich prac: od romantycznych sesji
                plenerowych, przez śluby, po rodzinne uroczystości. Zdjęcia
                powiedzą Ci więcej niż słowa - pokażą styl, emocje i atmosferę,
                którą mogę uchwycić również dla Ciebie.
            </>
        ),
    },
    {
        title: "Oferta fotograficzna - Cennik | Pakiet",
        keyword: "pełna oferta",
        content: (
            <>
                W mojej ofercie znajdziesz starannie przygotowane{" "}
                <LinkShare href="/oferta" title="pakiety fotograficzne" /> - od
                krótkich, nastrojowych sesji po pełne reportaże ślubne. Oferuję
                również <strong>fotografię reklamową</strong>,{" "}
                <strong>portrety</strong> oraz{" "}
                <strong>sesje okolicznościowe</strong>, dopasowane do
                wyjątkowych chwil i indywidualnych potrzeb. Każdy pakiet zawiera
                krótki opis, czas trwania, liczbę zdjęć oraz orientacyjną
                wycenę, abyś z łatwością mógł wybrać to, co najlepiej odpowiada
                Twoim oczekiwaniom.
            </>
        ),
    },
    {
        title: "Uwiecznij Najważniejsze Chwile - Fotograf Ślubny i Sesje Narzeczeńskie",
        keyword: "terenie całego kraju",
        content: (
            <>
                Jako fotograf z Siedlec, pracuję głównie na terenie regionu, ale
                z przyjemnością dojadę również dalej - bo pasja do fotografii
                nie zna granic. Jeśli masz pomysł na swoją sesję zdjęciową lub
                chcesz zapytać o dostępne terminy, serdecznie{" "}
                <LinkShare href="/kontakt" title="zapraszam do kontaktu" />. Z
                chęcią omówię wątpliwości, doradzę i wspólnie stworzymy coś
                wyjątkowego.
            </>
        ),
    },
];
