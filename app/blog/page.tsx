import { getBlogs } from "@/lib/getBlogs";
import BlogList from "@/components/BlogList";
import InviteSocialMedia from "@/components/InviteSocialMedia";
import { Metadata } from "next";

const pageTitle = "Blog - Jarek Olszewski | Fotograf Siedlce";
const pageDescription =
    "Inspiracje do sesji i kulisy pracy fotografa. Blog Jarka Olszewskiego - wszystko o fotografii ślubnej i nie tylko - prawdziwa fotografia";
const heroImage = "/Images/home/fotograf-siedlce-jarek-olszewski.webp";

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.jarekolszewski.pl/blog",
    },
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        images: [
            {
                url: heroImage,
                width: 900,
                height: 900,
                alt: pageTitle,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: [heroImage],
    },
};

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <div className="max-w-3xl mx-auto px-4 anim-opacity mb-8">
            <h1 className="text-2xl md:text-3xl font-extralight tracking-widest my-8 text-center">
                Prawdziwa Fotografia
            </h1>
            <BlogList blogs={blogs} columns={2} />
            <InviteSocialMedia
                text="Zapraszam do odwiedzenia"
                textColor="text-black"
            />
        </div>
    );
}
