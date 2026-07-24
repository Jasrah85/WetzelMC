import { createClient, type EntriesQueries, type EntrySkeletonType } from "contentful";
import type { ClubEvent, FaqItem, Flyer, Post } from "./types";

/**
 * Contentful client. Set these in .env.local (see .env.example):
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_ACCESS_TOKEN         (Content Delivery API - published content)
 *   CONTENTFUL_PREVIEW_ACCESS_TOKEN (optional, for draft previews)
 *
 * When env vars are missing (e.g. first local run before the space exists),
 * fetchers return empty arrays so the site still renders with placeholder copy.
 */
const space = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_ACCESS_TOKEN;

const client =
  space && token
    ? createClient({ space, accessToken: token })
    : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySkeleton = EntrySkeletonType<Record<string, any>>;

async function getEntries(
  contentType: string,
  query: Record<string, unknown> = {},
) {
  if (!client) return [];
  try {
    const res = await client.getEntries({
      content_type: contentType,
      include: 2,
      ...query,
    } as EntriesQueries<AnySkeleton, undefined>);
    return res.items;
  } catch (err) {
    // Never let a CMS/network error break the build or a page render —
    // fall back to empty so placeholder/sample content shows instead.
    console.warn(
      `[contentful] Failed to fetch "${contentType}":`,
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assetUrl(asset: any): string | undefined {
  const url: string | undefined = asset?.fields?.file?.url;
  return url ? (url.startsWith("//") ? `https:${url}` : url) : undefined;
}

export async function getPosts(limit = 20): Promise<Post[]> {
  const items = await getEntries("post", {
    order: "-fields.publishDate",
    limit,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return items.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    publishDate: item.fields.publishDate,
    excerpt: item.fields.excerpt,
    body: item.fields.body,
    coverImageUrl: assetUrl(item.fields.coverImage),
    coverImageAlt: item.fields.coverImage?.fields?.description ?? item.fields.title,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const items = await getEntries("post", { "fields.slug": slug, limit: 1 });
  if (items.length === 0) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item: any = items[0];
  return {
    title: item.fields.title,
    slug: item.fields.slug,
    publishDate: item.fields.publishDate,
    excerpt: item.fields.excerpt,
    body: item.fields.body,
    coverImageUrl: assetUrl(item.fields.coverImage),
    coverImageAlt: item.fields.coverImage?.fields?.description ?? item.fields.title,
  };
}

export async function getEvents(): Promise<ClubEvent[]> {
  const items = await getEntries("event", { order: "fields.startDate" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return items.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    startDate: item.fields.startDate,
    endDate: item.fields.endDate,
    location: item.fields.location,
    description: item.fields.description,
    ticketUrl: item.fields.ticketUrl,
    flyerImageUrl: assetUrl(item.fields.flyerImage),
    category: item.fields.category,
  }));
}

export async function getFlyers(): Promise<Flyer[]> {
  const items = await getEntries("flyer", { order: "-fields.year" });
  return items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((item: any) => ({
      title: item.fields.title,
      year: item.fields.year,
      imageUrl: assetUrl(item.fields.image) ?? "",
    }))
    .filter((f) => f.imageUrl);
}

export async function getFaqs(): Promise<FaqItem[]> {
  const items = await getEntries("faqItem", { order: "fields.order" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return items.map((item: any) => ({
    question: item.fields.question,
    answer: item.fields.answer,
    order: item.fields.order,
  }));
}
