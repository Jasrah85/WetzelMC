import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPosts } from "@/lib/contentful";
import RichText from "@/components/RichText";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts(100);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold text-orange-500">
        {new Date(post.publishDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-black text-white">{post.title}</h1>
      {post.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt={post.coverImageAlt ?? post.title}
          className="mt-6 w-full rounded-lg"
        />
      )}
      <div className="mt-8">
        <RichText document={post.body} />
      </div>
    </article>
  );
}
