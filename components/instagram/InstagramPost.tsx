import Link from "next/link";
import ShimmerLoader from "../ShimmerLoader";
import Image from "next/image";
import LazyVideo from "../LazyVideo";

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
            title="Jarek Olszewski Fotograf - Instagram"
        >
            <div className="relative aspect-square overflow-hidden">
                <span className="sr-only">{`${alt} Instagram`}</span>
                {media_type === "VIDEO" ? (
                    <LazyVideo
                        src={media_url}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        placeholder={
                            <div className="w-full h-full bg-zinc-200">
                                <ShimmerLoader />
                            </div>
                        }
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
