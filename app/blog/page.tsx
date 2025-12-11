import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
    title: "Blog | Faky",
    description: "Technical write-ups on systems engineering, networking, and infrastructure.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen pt-24 pb-16 font-sans bg-[#f8f9fa]">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-blue-100 font-mono">
                        /var/log/thoughts
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Write-ups
                    </h1>
                    <p className="text-xl text-gray-600">
                        Technical deep-dives, lessons learned, and things I find interesting.
                    </p>
                </div>

                {/* Posts List */}
                {posts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                        <p className="text-gray-600">
                            I&apos;m working on some write-ups. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="block group"
                            >
                                <article className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>{new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}</span>
                                        <span>•</span>
                                        <span>{post.readingTime}</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
