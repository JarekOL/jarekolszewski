import { type Blog } from "@/lib/getBlogs";
import BlogCard from "@/app/blog/BlogCard";

type Props = {
    blogs: Blog[];
    limit?: number;
    className?: string;
    columns?: number;
};

export default function BlogList({
    blogs,
    limit,
    className = "",
    columns = 2,
}: Props) {
    const visibleBlogs = limit ? blogs.slice(0, limit) : blogs;
    const gridCols = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`;

    return (
        <section className={`grid gap-4 ${gridCols} ${className}`}>
            {visibleBlogs.map((blog, i) =>
                blog ? (
                    <BlogCard
                        key={i}
                        title={blog.title}
                        image={blog.image}
                        desc={blog.content}
                        category={blog.category}
                        slug={blog.slug}
                    />
                ) : null
            )}
        </section>
    );
}
