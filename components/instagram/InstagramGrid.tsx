import InstagramPost from "./InstagramPost";

type InstaPost = {
    media_url: string;
    permalink: string;
    thumbnail_url?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

type InstaApiResponse = {
    data: Array<{
        media_url: string;
        permalink: string;
        thumbnail_url?: string;
        media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    }>;
};

async function fetchInstagramPosts(): Promise<InstaPost[]> {
    const userId = process.env.INSTAGRAM_USER_ID;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!userId || !accessToken) {
        console.error(
            "Brak INSTAGRAM_USER_ID lub INSTAGRAM_ACCESS_TOKEN w env"
        );
        return [];
    }

    try {
        const url = `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,thumbnail_url,media_type&access_token=${accessToken}&limit=6`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
            console.error("Błąd pobierania z Instagrama:", await res.text());
            return [];
        }

        const json: InstaApiResponse = await res.json();

        if (!Array.isArray(json.data)) {
            console.error("Niepoprawne dane z Instagrama", json);
            return [];
        }

        // Filtrujemy i zwracamy maksymalnie 6 postów
        return json.data
            .filter(
                (item): item is InstaPost =>
                    typeof item.media_url === "string" &&
                    typeof item.permalink === "string" &&
                    typeof item.media_type === "string"
            )
            .slice(0, 6);
    } catch (error) {
        console.error("Błąd fetch Instagram", error);
        return [];
    }
}

export default async function InstagramGrid() {
    const posts = await fetchInstagramPosts();

    const isEmpty = posts.length === 0;
    const fallbackCount = 6;
    const itemsToRender: (InstaPost | null)[] = isEmpty
        ? Array.from({ length: fallbackCount }, () => null)
        : posts;

    return (
        <section className="bg-white py-10">
            <h2 className="text-center text-2xl font-semibold mb-4">
                Zobacz więcej na Instagramie
            </h2>
            <p className="text-center text-sm mb-6">
                Świeże zdjęcia, kulisy sesji i więcej
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
                {itemsToRender.map((post, i) => (
                    <InstagramPost
                        key={i}
                        media_url={post?.media_url || null}
                        permalink={post?.permalink || null}
                        alt={`Instagram image ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
