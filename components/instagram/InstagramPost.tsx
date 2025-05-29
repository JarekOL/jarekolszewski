import Link from "next/link";
import ShimmerLoader from "../ShimmerLoader";
import Image from "next/image";

type InstagramPostProps = {
    media_url: string | null;
    permalink: string | null;
    alt: string;
    media_type?: string;
};

export default function InstagramPost({
    media_url,
    permalink,
    alt,
    media_type,
}: InstagramPostProps) {
    if (!media_url || !permalink) {
        return (
            <div className="aspect-square">
                <ShimmerLoader />
            </div>
        );
    }

    return (
        <Link
            href={permalink}
            target="_blank"
            rel="noopener noreferrer"
            title={alt}
        >
            <div className="relative aspect-square">
                <span className="sr-only">{`${alt} Instagram`}</span>
                {media_type === "VIDEO" ? (
                    <video
                        src={media_url}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <Image
                        src={media_url}
                        alt={alt}
                        sizes="20vw"
                        fill
                        className="object-cover"
                        loading="lazy"
                        placeholder="empty"
                    />
                )}
            </div>
        </Link>
    );
}
