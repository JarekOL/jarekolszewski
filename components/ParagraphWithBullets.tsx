type Props = {
    title?: string;
    paragraph?: string;
    bullets: string[];
    className?: string;
};

export default function ParagraphWithBullets({
    title,
    paragraph,
    bullets,
    className = "",
}: Props) {
    return (
        <div className={`space-y-4 px-6 text-base ${className}`}>
            {title && <h2 className="text-xl font-medium">{title}</h2>}
            {paragraph && (
                <p className=" text-gray-800 font-medium border-y py-2">{paragraph}</p>
            )}
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-start">
                {bullets.map((point, idx) => (
                    <li key={idx}>{point}</li>
                ))}
            </ul>
        </div>
    );
}
