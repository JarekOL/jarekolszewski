interface ImageComponentProps {
    title: string;
    desc: string;
}

export default function TitleH1({ title, desc }: ImageComponentProps) {
    return (
        <div className="px-4 flex items-center justify-center text-center flex-col">
            <h1 className="text-2xl md:text-4xl font-semibold mb-5 max-w-2xl">
                {title}
            </h1>
            {desc && <p className="text-lg max-w-3xl">{desc}</p>}
        </div>
    );
}
