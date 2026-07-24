import type { Metadata } from "next";
import { getEvents } from "@/lib/contentful";
import { SAMPLE_EVENTS } from "@/lib/sample-events";
import EventCalendar from "@/components/EventCalendar";
import RichText from "@/components/RichText";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Event Calendar",
  description:
    "Upcoming Wetzel MC events — Wetzelland party weekend, bike games, live music, charity rides, and more.",
};

export default async function EventsPage() {
  const cmsEvents = await getEvents();
  const usingSampleData = cmsEvents.length === 0;
  const events = usingSampleData ? SAMPLE_EVENTS : cmsEvents;
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.endDate ?? e.startDate) >= now);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">Event Calendar</h1>
      <p className="mt-2 text-zinc-400">
        Everything happening at Wetzelland and around the club. The party is always
        the last full weekend of July.
      </p>
      {usingSampleData && (
        <p className="mt-3 inline-block rounded border border-amber-600/40 bg-amber-950/40 px-3 py-1.5 text-sm text-amber-400">
          Showing sample events — publish <code>event</code> entries in Contentful to replace these.
        </p>
      )}

      <div className="mt-8">
        <EventCalendar
          events={events.map((e) => ({
            title: e.title,
            slug: e.slug,
            startDate: e.startDate,
            endDate: e.endDate,
            category: e.category,
          }))}
        />
      </div>

      <h2 className="mt-14 text-2xl font-black text-white">Upcoming Events</h2>
      {upcoming.length > 0 ? (
        <div className="mt-6 space-y-6">
          {upcoming.map((e) => (
            <article
              key={e.slug}
              id={e.slug}
              className="scroll-mt-24 rounded-lg border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold text-white">{e.title}</h3>
                <p className="text-sm font-semibold text-orange-500">
                  {new Date(e.startDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {e.endDate &&
                    ` – ${new Date(e.endDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    })}`}
                </p>
              </div>
              {e.location && <p className="mt-1 text-sm text-zinc-400">{e.location}</p>}
              <div className="mt-3">
                <RichText document={e.description} />
              </div>
              {e.ticketUrl && (
                <a
                  href={e.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded bg-orange-600 px-5 py-2 text-sm font-bold text-white hover:bg-orange-500"
                >
                  Get Tickets
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-zinc-400">
          No upcoming events published yet — check back soon, or follow us on{" "}
          <a
            href="https://www.facebook.com/wetzelland/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            Facebook
          </a>
          .
        </p>
      )}
    </div>
  );
}
