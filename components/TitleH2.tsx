interface ImageComponentProps {
    title: string;
    desc: string;
}

export default function ImageComponent({ title, desc }: ImageComponentProps) {
    return (
        <div className="py-8 px-4 max-w-2xl mx-auto">
            <h2 className="text-xl lg:text-2xl font-light">{title}</h2>
            {desc && <p className="text-base pt-3">{desc}</p>}
        </div>
    );
}
