import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/contentful";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "News",
  description: "News and announcements from Wetzel Motorcycle Club and Wetzelland.",
};

export default async function NewsPage() {
  const posts = await getPosts(50);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">News &amp; Announcements</h1>
      <p className="mt-2 text-zinc-400">
        Band announcements, ticket info, schedule updates, and club news.
      </p>

      {posts.length > 0 ? (
        <div className="mt-8 space-y-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/news/${p.slug}`}
              className="block rounded-lg border border-zinc-800 bg-zinc-900 p-6 hover:border-orange-600/60 transition-colors"
            >
              <p className="text-xs font-semibold text-zinc-500">
                {new Date(p.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">{p.title}</h2>
              {p.excerpt && <p className="mt-2 text-zinc-400">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-zinc-400">
          No posts published yet. Once the CMS is connected, posts appear here
          automatically.
        </p>
      )}
    </div>
  );
}
