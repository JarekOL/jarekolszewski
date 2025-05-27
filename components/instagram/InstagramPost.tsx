import Link from "next/link";
import ShimmerLoader from "../ShimmerLoader";
import Image from "next/image";

type InstagramPostProps = {
    media_url: string | null;
    permalink: string | null;
    alt: string;
};

export default function InstagramPost({
    media_url,
    permalink,
    alt,
}: InstagramPostProps) {
    if (!media_url || !permalink) {
        return (
            <div className="aspect-square">
                <ShimmerLoader />
            </div>
        );
    }

    return (
        <Link href={permalink} target="_blank" rel="noopener noreferrer">
            <div className="relative aspect-square">
                 <Image
                    src={media_url}
                    alt={alt}
                    sizes="20vw"
                    fill
                    className="object-cover"
                    loading="lazy"
                    placeholder="empty"
                />
            </div>
        </Link>
    );
}
