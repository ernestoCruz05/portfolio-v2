import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    readingTime: string;
    published: boolean;
    draft: boolean;
}

export interface Post extends PostMeta {
    content: string;
}

// Calculate reading time
function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

// Get all posts metadata (for listing)
export function getAllPosts(): PostMeta[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || "Untitled",
                date: data.date || new Date().toISOString(),
                description: data.description || "",
                tags: data.tags || [],
                readingTime: calculateReadingTime(content),
                published: data.published !== false,
                draft: data.draft === true,
            };
        })
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || "Untitled",
            date: data.date || new Date().toISOString(),
            description: data.description || "",
            tags: data.tags || [],
            readingTime: calculateReadingTime(content),
            published: data.published !== false,
            draft: data.draft === true,
            content,
        };
    } catch {
        return null;
    }
}

// Get all post slugs (for static generation)
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
