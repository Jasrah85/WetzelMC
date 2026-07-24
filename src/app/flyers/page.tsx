import type { Metadata } from "next";
import { getFlyers } from "@/lib/contentful";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Past Party Flyers",
  description: "Every Wetzelland party flyer, from the beginning.",
};

export default async function FlyersPage() {
  const flyers = await getFlyers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">Past Party Flyers</h1>
      <p className="mt-2 text-zinc-400">
        Four decades of Wetzelland history, one flyer at a time.
      </p>

      {flyers.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {flyers.map((f) => (
            <figure
              key={`${f.year}-${f.title}`}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.imageUrl}
                alt={f.title}
                loading="lazy"
                className="w-full rounded"
              />
              <figcaption className="mt-2 text-center text-sm font-semibold text-zinc-300">
                {f.title}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-zinc-400">
          Flyers will appear here once uploaded to the CMS (one “Flyer” entry per
          year, newest first).
        </p>
      )}
    </div>
  );
}
