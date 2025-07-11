import InstagramPost from "./InstagramPost";

type InstaPost = {
    media_url: string;
    permalink: string;
    thumbnail_url?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    altImg: string;
};


export default async function InstagramGrid() {


    const fallbackPosts: InstaPost[] = [
        {
            media_url: "/Images/instagram/fotograf-slubny-siedlce.webp",
            permalink: "https://www.instagram.com/p/CD57_wnlgVC/",
            media_type: "IMAGE",
            altImg: "Fotograf Ślubny siedlce",
        },
        {
            media_url: "/Images/instagram/fotografia-slubna-siedlce.webp",
            permalink: "https://www.instagram.com/p/CuCj17XoRpj/",
            media_type: "IMAGE",
            altImg: "Fotograf slubny siedlce",
        },
        {
            media_url: "/Images/instagram/v1.mp4",
            permalink:
                "https://www.instagram.com/jarek.olszewski.fotografia/reel/DFvsxipit49/",
            media_type: "VIDEO",
            altImg: "x",
        },

        {
            media_url: "/Images/instagram/fotograf-slubny.webp",
            permalink: "https://www.instagram.com/p/DJ0_SrUCe4p/",
            media_type: "IMAGE",
            altImg: "x",
        },
        {
            media_url: "/Images/instagram/fotograf-sokolow-podlaski.webp",
            permalink: "https://www.instagram.com/p/DFVjuSeCcby/",
            media_type: "IMAGE",
            altImg: "fotograf sokolow podlaski",
        },
        {
            media_url: "/Images/instagram/v2.mp4",
            permalink:
                "https://www.instagram.com/p/DFTE89YigVG/",
            media_type: "VIDEO",
            altImg: "x",
        },
    ];

    return (
        <section className="bg-white py-10">
            <h2 className="text-center text-2xl font-semibold mb-4">
                Zobacz więcej na Instagramie
            </h2>
            <p className="text-center text-sm mb-6">
                Świeże zdjęcia, kulisy sesji i więcej
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
                {fallbackPosts.map((post, i) => (
                    <InstagramPost
                        key={i}
                        media_url={post.media_url}
                        permalink={post.permalink}
                        media_type={post.media_type}
                        alt={post.altImg}
                    />
                ))}
            </div>
        </section>
    );
}
