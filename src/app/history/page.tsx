import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

/** True if a /public file actually exists — lets photo slots degrade cleanly. */
const hasPhoto = (p: string) => existsSync(path.join(process.cwd(), "public", p));

export const metadata: Metadata = {
  title: "History",
  description:
    "The origin story of Wetzel Motorcycle Club — from a spray-painted gas tank in 1986 to Ohio's longest-running biker party.",
};

type Milestone = {
  year: string;
  title: string;
  body: string;
  photo?: string; // optional file in /public/history
  photoPosition?: string;
  featuredPhoto?: boolean;
  gallery?: {
    src: string;
    alt: string;
    position?: string;
  }[];
};

const MILESTONES: Milestone[] = [
  {
    year: "1986",
    title: "The Spray-Painted Tank",
    body: "On a summer afternoon, a group of friends gathered at a motorcycle garage before a road trip. One buddy needed a bigger gas tank — so while he was at work, the others swapped it, painted it with flames, and added \"Property of Wetzel MC.\" That night at the watering hole he didn't even recognize his own bike. A name was born.",
    photo: "/history/rock-n-roll-bike.webp",
  },
  {
    year: "January 1987",
    title: "The First Meeting",
    body: "Wetzel MC held its first official meeting, founded to embrace motorcycle culture while challenging the tired stereotypes about bikers. From day one it was about family, friendship, and giving back — a group bound not just by motorcycles, but by shared values.",
    photo: "/history/2017-wetzel-brother.webp",
  },
  {
    year: "1987",
    title: "The First Party",
    body: "Later that year the club threw its first party. Fewer than 500 people came and the members paid out of pocket — but the spirit was undeniable. A local farmer offered his land, word started to spread, and the seeds of Wetzelland were planted.",
  },
  {
    year: "1991",
    title: "A Permanent Home",
    body: "Wetzel MC incorporated and purchased its permanent home, transforming it into the vibrant hub known today as Wetzelland — the grounds thousands of riders return to every July.",
    photo: "/history/sky-view-of-wetzelland.webp",
    photoPosition: "center 48%",
  },
  {
    year: "Every July",
    title: "Wetzelland",
    body: "Thousands of bikers, a weekend of bike games, live music, and camaraderie. From Puddle of Mudd, Theory of a Deadman, Lynyrd Skynyrd, Ted Nugent, and Buckcherry to the roar of engines and the laughter of old friends — Wetzelland is the club's heartbeat.",
    photo: "/history/2017-band-and-crowd.webp",
    gallery: [
      {
        src: "/history/2023-wetzelland-at-night.webp",
        alt: "Nighttime aerial view of Wetzelland",
      },
    ],
  },
  {
    year: "Giving Back",
    title: "More Than a Party",
    body: "Over the years the club has donated to local EMS units, schools, and youth programs, funded scholarships for Vantage students, adopted highways, run toy drives with ABATE and the Salvation Army, and brought flat-track racing back to the Van Wert Fairgrounds.",
    photo: "/history/2024-toy-run.webp",
  },
  {
    year: "June 23, 2024",
    title: "Fallen Bikers Memorial",
    body: "Wetzel MC dedicated the Fallen Bikers Memorial at Wetzelland to honor brothers and sisters lost in motorcycle accidents. The monument was dedicated with the names of 14 bikers engraved in stone, and the motorcycle on display belonged to Old Man, standing as a tribute to all who are no longer with us.",
    photo: "/history/fallen-bikers-memorial.webp",
    photoPosition: "center 38%",
    featuredPhoto: true,
    gallery: [
      {
        src: "/history/fallen-bikers-memorial-sign.webp",
        alt: "Fallen Bikers Memorial Ride Free sign",
      },
      {
        src: "/history/wetzel-brothers-building-memorial.webp",
        alt: "Wetzel MC members building the memorial stonework",
      },
      {
        src: "/history/fallen-bikers-memorial-engraving-mikes-corner.webp",
        alt: "Mike's Corner memorial engraving",
      },
    ],
  },
  {
    year: "Today",
    title: "A Legacy on Two Wheels",
    body: "Wetzel MC is more than a club — it's a legacy of friendship, resilience, and the open road. From that first spray-painted tank to the community it is today, it proves that bikers aren't just riders. They're family, making a difference one mile at a time.",
  },
];

export default function HistoryPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Staggered faded photo collage (uses background-image so missing
          files simply show nothing — no broken icons). Drop landscape
          photos in /public/history to fill these in. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {[
          "/history/rock-n-roll-bike.webp",
          "/history/sky-view-of-wetzelland.webp",
          "/history/2024-toy-run.webp",
          "/history/fallen-bikers-memorial.webp",
        ]
          .filter(hasPhoto)
          .map((src, i) => (
            <div
              key={src}
              className="absolute h-72 w-72 rounded-2xl bg-cover bg-center opacity-[0.08] grayscale blur-[1px] sm:h-96 sm:w-96"
              style={{
                backgroundImage: `url(${src})`,
                top: `${12 + i * 30}%`,
                [i % 2 === 0 ? "right" : "left"]: "-4%",
              }}
            />
          ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-12">
        <p className="font-bold uppercase tracking-widest text-orange-500 text-sm">
          Since 1986
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-white">
          The Story of Wetzel Motorcycle Club
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-300">
          It started with a joke and a can of spray paint. Four decades later,
          it&apos;s Ohio&apos;s longest-running biker party.
        </p>

        {/* Timeline */}
        <div className="relative mt-12 pl-8 sm:pl-10">
          {/* Spine */}
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange-500 via-orange-600/60 to-transparent sm:left-3" />

          <div className="space-y-10">
            {MILESTONES.map((m) => (
              <article key={m.title} className="relative">
                {/* Node */}
                <span className="absolute -left-[26px] top-1.5 h-4 w-4 rounded-full border-2 border-orange-500 bg-zinc-950 sm:-left-[30px]" />
                <p className="text-sm font-black uppercase tracking-wide text-orange-500">
                  {m.year}
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">{m.title}</h2>
                <div className="mt-3 space-y-4">
                  <p className="text-zinc-300 leading-relaxed">{m.body}</p>
                  {m.photo && hasPhoto(m.photo) && (
                    <div
                      className={`w-full rounded-lg border border-zinc-800 bg-cover ${
                        m.featuredPhoto ? "h-64 sm:h-80" : "h-48"
                      }`}
                      style={{
                        backgroundImage: `url(${m.photo})`,
                        backgroundPosition: m.photoPosition ?? "center",
                      }}
                      role="img"
                      aria-label={`${m.title} photo`}
                    />
                  )}
                  {m.gallery && (
                    <div className="grid gap-3 sm:grid-cols-3">
                      {m.gallery.filter((photo) => hasPhoto(photo.src)).map((photo) => (
                        <div
                          key={photo.src}
                          className="h-32 rounded-lg border border-zinc-800 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${photo.src})`,
                            backgroundPosition: photo.position ?? "center",
                          }}
                          role="img"
                          aria-label={photo.alt}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
