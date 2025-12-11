import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";

// Custom components for MDX
const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text-gray-700 leading-relaxed mb-4" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2 ml-4" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="text-gray-700" {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="text-blue-600 hover:text-blue-800 underline underline-offset-2" {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="bg-[#0a0f1a] text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props} />
    ),
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-lg shadow-md my-6 max-w-full" alt={props.alt || ""} {...props} />
    ),
    hr: () => <hr className="my-8 border-gray-200" />,
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-200 rounded-lg" {...props} />
        </div>
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th className="bg-gray-100 px-4 py-2 text-left font-semibold text-gray-900 border-b" {...props} />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-4 py-2 border-b border-gray-100" {...props} />
    ),
};

// Generate static params for all posts
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: `${post.title} | Faky`,
        description: post.description,
    };
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-16 font-sans bg-[#f8f9fa]">
            <article className="max-w-3xl mx-auto px-6">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 mb-8 transition-colors"
                >
                    <span>←</span> Back to all posts
                </Link>

                {/* Post Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
                        <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                    </div>
                </header>

                {/* Post Content */}
                <div className="prose prose-lg max-w-none">
                    <MDXRemote
                        source={post.content}
                        components={components}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [
                                    [
                                        rehypePrettyCode,
                                        {
                                            theme: "one-dark-pro",
                                            keepBackground: false,
                                        },
                                    ],
                                ],
                            },
                        }}
                    />
                </div>

                {/* Post Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blog"
                            className="text-blue-700 font-medium hover:underline"
                        >
                            ← More write-ups
                        </Link>
                        <a
                            href={`https://github.com/ernestoCruz05`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-700 transition-colors"
                        >
                            Follow me on GitHub
                        </a>
                    </div>
                </footer>
            </article>
        </main>
    );
}
