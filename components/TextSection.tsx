type TextSectionProps = {
    title: string;
    content: React.ReactNode;
};

export default function TextSection({ title, content }: TextSectionProps) {
    return (
        <div className="border-b border-neutral-300 pb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-neutral-800 mb-3">
                {title}
            </h2>
            <p className="text-neutral-700 leading-relaxed">{content}</p>
        </div>
    );
}
