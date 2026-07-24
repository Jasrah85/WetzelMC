import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getEvents, getPosts } from "@/lib/contentful";
import FacebookFeed from "@/components/FacebookFeed";

export const revalidate = 3600; // re-fetch CMS content at most hourly

export const metadata: Metadata = {
  title: "Wetzel Motorcycle Club | Wetzelland — Ohio's Longest-Running Biker Party",
};

export default async function Home() {
  const [events, posts] = await Promise.all([getEvents(), getPosts(3)]);
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.endDate ?? e.startDate) >= now)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        {/* Banner artwork of the Wetzelland entrance gate */}
        <div className="absolute inset-0">
          <Image
            src="/wetzelland-banner-dark.webp"
            alt="Illustration of the Wetzelland entrance gate at dusk, orange sun setting over the road"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Subtle fade into the page background at the bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pt-40 pb-20 sm:pt-56 sm:pb-24 text-center">
          <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">
            Celebrating 40 Years
          </p>
          <h1 className="mt-4 text-4xl sm:text-6xl font-black text-white drop-shadow-lg">
            WETZELLAND <span className="text-orange-500">2026</span>
          </h1>
          <p className="mt-4 text-xl text-zinc-200 max-w-2xl mx-auto drop-shadow">
            Ohio&apos;s longest-running biker party. July 23–26, 2026 —
            live music, bike games, camping, and unforgettable memories.
          </p>
          <p className="mt-2 text-sm text-zinc-400 font-semibold drop-shadow">
            21+ only · ID required at entry
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://ticketstripe.com/wetzelland2026"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-orange-600 px-8 py-3 font-bold text-white hover:bg-orange-500 transition-colors"
            >
              Get Tickets Now
            </a>
            <Link
              href="/wetzelland"
              className="rounded border border-zinc-600 px-8 py-3 font-bold text-white hover:bg-zinc-800 transition-colors"
            >
              Party Details
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">Upcoming Events</h2>
          <Link href="/events" className="text-sm font-semibold text-orange-500 hover:underline">
            View calendar →
          </Link>
        </div>
        {upcoming.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {upcoming.map((e) => (
              <Link
                key={e.slug}
                href={`/events#${e.slug}`}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-orange-600/60 transition-colors"
              >
                <p className="text-sm font-semibold text-orange-500">
                  {new Date(e.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mt-1 font-bold text-white">{e.title}</h3>
                {e.location && <p className="mt-1 text-sm text-zinc-400">{e.location}</p>}
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-zinc-400">
            Events will appear here once published in the CMS. Meanwhile, follow us on{" "}
            <a href="https://www.facebook.com/wetzelland/" className="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>{" "}
            for the latest.
          </p>
        )}
      </section>

      {/* Latest news + Facebook feed */}
      <section className="border-t border-zinc-800 bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Latest News</h2>
              <Link href="/news" className="text-sm font-semibold text-orange-500 hover:underline">
                All news →
              </Link>
            </div>
            {posts.length > 0 ? (
              <div className="mt-6 space-y-4">
                {posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/news/${p.slug}`}
                    className="block rounded-lg border border-zinc-800 bg-zinc-900 p-5 hover:border-orange-600/60 transition-colors"
                  >
                    <p className="text-xs font-semibold text-zinc-500">
                      {new Date(p.publishDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="mt-1 font-bold text-white">{p.title}</h3>
                    {p.excerpt && <p className="mt-1 text-sm text-zinc-400">{p.excerpt}</p>}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-zinc-400">
                News posts will appear here once published in the CMS.
              </p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">From Our Facebook</h2>
            <div className="mt-6">
              <FacebookFeed />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
