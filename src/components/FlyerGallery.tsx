"use client";

import { useEffect, useState } from "react";
import type { Flyer } from "@/lib/types";

export default function FlyerGallery({ flyers }: { flyers: Flyer[] }) {
  const [active, setActive] = useState<Flyer | null>(null);

  // Close on Escape; lock background scroll while the modal is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {flyers.map((f) => (
          <figure
            key={`${f.year}-${f.title}`}
            className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
          >
            <button
              type="button"
              onClick={() => setActive(f)}
              className="group block w-full cursor-zoom-in"
              aria-label={`View ${f.title} flyer`}
            >
              <div className="h-64 overflow-hidden bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.imageUrl}
                  alt={f.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="px-2 py-2 text-center text-sm font-semibold text-zinc-300">
                {f.title}
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-zinc-900/80 p-2 text-white hover:bg-zinc-800"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <figure
            className="flex max-h-full max-w-3xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.imageUrl}
              alt={active.title}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm font-semibold text-zinc-200">
              {active.title}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
