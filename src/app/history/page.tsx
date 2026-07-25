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
};

type BackgroundPhoto = {
  src: string;
  top: string;
  side: "left" | "right";
  offset: string;
  width: string;
  aspect: string;
  rotate: string;
  position?: string;
};

const BACKGROUND_PHOTOS: BackgroundPhoto[] = [
  {
    src: "/history/rock-n-roll-bike.webp",
    top: "5%",
    side: "right",
    offset: "clamp(-7rem, -12vw, -3rem)",
    width: "clamp(12rem, 34vw, 22rem)",
    aspect: "16 / 10",
    rotate: "5deg",
  },
  {
    src: "/history/2017-wetzel-brother.webp",
    top: "16%",
    side: "left",
    offset: "clamp(-8rem, -14vw, -3rem)",
    width: "clamp(12rem, 32vw, 20rem)",
    aspect: "5 / 4",
    rotate: "-6deg",
  },
  {
    src: "/history/sky-view-of-wetzelland.webp",
    top: "28%",
    side: "right",
    offset: "clamp(-5rem, -10vw, -2rem)",
    width: "clamp(10rem, 30vw, 18rem)",
    aspect: "3 / 4",
    rotate: "4deg",
    position: "center 48%",
  },
  {
    src: "/history/2017-band-and-crowd.webp",
    top: "40%",
    side: "left",
    offset: "clamp(-6rem, -12vw, -2rem)",
    width: "clamp(14rem, 38vw, 26rem)",
    aspect: "16 / 9",
    rotate: "-4deg",
  },
  {
    src: "/history/2023-wetzelland-at-night.webp",
    top: "52%",
    side: "right",
    offset: "clamp(-8rem, -14vw, -3rem)",
    width: "clamp(13rem, 36vw, 24rem)",
    aspect: "16 / 9",
    rotate: "6deg",
  },
  {
    src: "/history/2024-toy-run.webp",
    top: "62%",
    side: "left",
    offset: "clamp(-7rem, -12vw, -3rem)",
    width: "clamp(12rem, 34vw, 22rem)",
    aspect: "4 / 3",
    rotate: "5deg",
  },
  {
    src: "/history/fallen-bikers-memorial2.webp",
    top: "69%",
    side: "left",
    offset: "clamp(-8rem, -14vw, -3rem)",
    width: "clamp(13rem, 34vw, 22rem)",
    aspect: "16 / 10",
    rotate: "-3deg",
    position: "center 38%",
  },
  {
    src: "/history/fallen-bikers-memorial-engraving-mikes-corner.webp",
    top: "76%",
    side: "right",
    offset: "clamp(-9rem, -15vw, -4rem)",
    width: "clamp(12rem, 30vw, 19rem)",
    aspect: "16 / 10",
    rotate: "7deg",
  },
  {
    src: "/history/fallen-bikers-memorial.webp",
    top: "82%",
    side: "right",
    offset: "clamp(-6rem, -12vw, -3rem)",
    width: "clamp(14rem, 38vw, 26rem)",
    aspect: "4 / 3",
    rotate: "-5deg",
    position: "center 38%",
  },
  {
    src: "/history/fallen-bikers-memorial-sign.webp",
    top: "89%",
    side: "left",
    offset: "clamp(-5rem, -10vw, -2rem)",
    width: "clamp(10rem, 28vw, 17rem)",
    aspect: "4 / 3",
    rotate: "-7deg",
  },
  {
    src: "/history/wetzel-brothers-building-memorial.webp",
    top: "94%",
    side: "right",
    offset: "clamp(-9rem, -15vw, -4rem)",
    width: "clamp(12rem, 32vw, 20rem)",
    aspect: "4 / 3",
    rotate: "4deg",
  },
];

const MILESTONES: Milestone[] = [
  {
    year: "1986",
    title: "The Spray-Painted Tank",
    body: "On a summer afternoon, a group of friends gathered at a motorcycle garage before a road trip. One buddy needed a bigger gas tank — so while he was at work, the others swapped it, painted it with flames, and added \"Property of Wetzel MC.\" That night at the watering hole he didn't even recognize his own bike. A name was born.",
  },
  {
    year: "January 1987",
    title: "The First Meeting",
    body: "Wetzel MC held its first official meeting, founded to embrace motorcycle culture while challenging the tired stereotypes about bikers. From day one it was about family, friendship, and giving back — a group bound not just by motorcycles, but by shared values.",
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
  },
  {
    year: "Every July",
    title: "Wetzelland",
    body: "Thousands of bikers, a weekend of bike games, live music, and camaraderie. From Puddle of Mudd, Theory of a Deadman, Lynyrd Skynyrd, Ted Nugent, and Buckcherry to the roar of engines and the laughter of old friends — Wetzelland is the club's heartbeat.",
  },
  {
    year: "Giving Back",
    title: "More Than a Party",
    body: "Over the years the club has donated to local EMS units, schools, and youth programs, funded scholarships for Vantage students, adopted highways, run toy drives with ABATE and the Salvation Army, and brought flat-track racing back to the Van Wert Fairgrounds.",
  },
  {
    year: "June 23, 2024",
    title: "Fallen Bikers Memorial",
    body: "In June 2024, the club dedicated the Fallen Bikers Memorial just outside the Wetzelland grounds — a lasting tribute to the brothers and sisters lost in motorcycle accidents. On June 23, beneath the covered monument, the names of fourteen riders were engraved in stone, and Old Man's motorcycle was raised alongside them in honor of all we've lost. Under a single charge — Ride Free — it stands as a permanent place to gather, remember, and ride on for those who no longer can.",
  },
  {
    year: "Today",
    title: "A Legacy on Two Wheels",
    body: "Wetzel MC is more than a club — it's a legacy of friendship, resilience, and the open road. From that first spray-painted tank to the community it is today, it proves that bikers aren't just riders. They're family, making a difference one mile at a time.",
  },
];

export default function HistoryPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {BACKGROUND_PHOTOS.filter((photo) => hasPhoto(photo.src)).map((photo) => (
          <div
            key={photo.src}
            className="absolute rounded-lg border border-white/10 bg-cover opacity-[0.1] grayscale shadow-2xl shadow-black/50 blur-[0.3px] sm:opacity-[0.18]"
            style={{
              backgroundImage: `url(${photo.src})`,
              backgroundPosition: photo.position ?? "center",
              top: photo.top,
              [photo.side]: photo.offset,
              width: photo.width,
              aspectRatio: photo.aspect,
              transform: `rotate(${photo.rotate})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-zinc-950/70" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-zinc-950 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12">
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

        <div className="mt-12">
          <div className="space-y-11">
            {MILESTONES.map((m) => (
              <article key={m.title}>
                <p className="text-sm font-black uppercase tracking-wide text-orange-500">
                  {m.year}
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">{m.title}</h2>
                <p className="mt-3 text-zinc-300 leading-relaxed">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
