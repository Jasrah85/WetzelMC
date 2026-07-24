import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wetzelland 2026",
  description:
    "All the information for this year's party: schedule, tickets, rentals, and party rules. July 23–26, 2026.",
};

const TICKETS = [
  {
    name: "Thursday Early w/ 2 Extra Bike Tickets",
    price: "$80.00",
    note: "Early Thursday entry plus Friday & Saturday. Includes 2 free bike raffle tickets.",
  },
  {
    name: "Thursday Early w/ 1 Extra Bike Ticket",
    price: "$80.00",
    note: "Available after June 30. Early Thursday entry plus Friday & Saturday. Includes 1 free bike raffle ticket. Pre-buy expires July 19.",
  },
  {
    name: "Friday and Saturday Normal Entry",
    price: "$60.00",
    note: "General admission for Friday and Saturday. Pre-buy expires July 19.",
  },
  {
    name: "Automobile Parking Pass",
    price: "$10.00",
    note: "For vehicles other than motorcycles (motorcycle parking is free). Pre-buy expires July 19.",
  },
  {
    name: "Campers and RVs",
    price: "$160.00",
    note: "Required for non-primitive camping with a camper, RV, or similar. Pre-buy expires July 19.",
  },
  {
    name: "Golf Cart Pass / Trailer Pass",
    price: "$60.00 / $10.00",
    note: "Golf cart pass required to drive a cart on-site. Trailer pass for non-motorcycle trailers. Pre-buy expires July 19.",
  },
];

const SCHEDULE: { day: string; items: string[] }[] = [
  {
    day: "Thursday, July 23",
    items: [
      "Noon — Gates Open",
      "7:00–8:30 PM — Off The Edge",
      "9:00–10:30 PM — Collective Soul",
    ],
  },
  {
    day: "Friday, July 24",
    items: [
      "1:00–3:00 PM — Presidents Dunk for the Fallen Riders Memorial",
      "3:00–6:00 PM — Chick Dunk & Beat-a-Bike",
      "4:00 PM — Opening Ceremonies (near the flagpole, followed by skydivers)",
      "5:00 PM — Tattoo Contest (register at the Beer Tent, 10 AM–5 PM)",
      "5:00–6:30 PM — Colt & Crew",
      "7:00–8:30 PM — Never Again",
      "9:00–10:30 PM — Drowning Pool",
      "After main stage — 469 Burnout Contest (Party Pit, south of the vendors by Mudsock)",
    ],
  },
  {
    day: "Saturday, July 25",
    items: [
      "11:00 AM — Bike Show (sign up at the Beer Tent, 7:30–11:00 AM)",
      "Noon — Bike Games (sign up at the Beer Tent, 7:30 AM–Noon)",
      "3:00–6:00 PM — Chick Dunk for the Fallen Riders Memorial & Beat-a-Bike",
      "5:00–6:30 PM — Section Ate",
      "7:00–8:30 PM — Karmas Pawn",
      "9:00–10:30 PM — Deep Cuts",
      "After Deep Cuts — 50/50 & Bike Giveaway",
    ],
  },
];

const RULES = [
  "21+ only. IDs checked at the gate — no exceptions.",
  "No glass, firearms, fireworks, pets, or bad attitudes. Coolers will be checked.",
  "Gates open at noon on Thursday. Tickets available at the gate.",
  "Towing a camper or trailer with a motorcycle is free.",
  "Contained fires allowed; you may bring your own firewood.",
  "No ATVs, SxS, UTVs, or go-carts. Golf carts require a pass and inspection.",
  "Every admission includes a bike raffle ticket — win a brand-new Harley-Davidson.",
  "Shower house available for all attendees.",
];

const RENTALS = [
  {
    name: "Golf Cart Rental",
    contact: "D&W Golf Cart Sales — 419-394-3824",
    note: "Limited number available on-site.",
  },
  {
    name: "Porta-Shitter Rental",
    contact: "Horse's Sanitation — (419) 648-9135",
    note: "Personal units available.",
    url: "https://www.horsessanitationservice.com/",
  },
  {
    name: "Large-Tent Rental",
    contact: "Reliable Tent Rentals — (419) 268-1800",
    note: "Various sizes; call for placement and options.",
    url: "https://reliablerentalinc.com/",
  },
];

export default function WetzellandPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-black text-white">
        Wetzelland <span className="text-orange-500">2026</span>
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-300">
        Ohio&apos;s longest-running biker party, celebrating 40 incredible years.
        Live music, thrilling bike games, vendors, the iconic Harley Emblem Pond —
        July 23–26, 2026 at the Wetzel MC Grounds.
      </p>
      <a
        href="https://ticketstripe.com/wetzelland2026"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded bg-orange-600 px-8 py-3 font-bold text-white hover:bg-orange-500"
      >
        Buy Tickets Now
      </a>

      {/* Schedule */}
      <h2 className="mt-14 text-2xl font-black text-white">
        Shit Going On at Wetzelland 2026
      </h2>
      <p className="mt-2 max-w-3xl text-zinc-400">
        Live music, bike events, contests, games, dunk tanks, skydivers,
        burnouts, and plenty of rally chaos. Get signed up early for the
        contests and games.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {SCHEDULE.map((d) => (
          <div key={d.day} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="font-bold text-orange-500">{d.day}</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {d.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tickets */}
      <h2 id="tickets" className="mt-14 scroll-mt-24 text-2xl font-black text-white">
        Tickets &amp; Passes
      </h2>
      <p className="mt-2 text-zinc-400 max-w-3xl">
        Pre-buy pricing ends July 19, but tickets and passes are also available at
        the gate starting Thursday at noon.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TICKETS.map((t) => (
          <div key={t.name} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-bold text-white">{t.name}</h3>
              <span className="shrink-0 font-black text-orange-500">{t.price}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{t.note}</p>
          </div>
        ))}
      </div>

      {/* Rules */}
      <h2 id="rules" className="mt-14 scroll-mt-24 text-2xl font-black text-white">
        Party Rules
      </h2>
      <ul className="mt-4 max-w-3xl space-y-2 text-zinc-300 list-disc pl-5">
        {RULES.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      {/* Rentals */}
      <h2 className="mt-14 text-2xl font-black text-white">On-Site Rentals</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {RENTALS.map((r) => (
          <div key={r.name} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="font-bold text-white">{r.name}</h3>
            <p className="mt-2 text-sm text-zinc-400">{r.note}</p>
            <p className="mt-2 text-sm font-semibold text-zinc-300">{r.contact}</p>
            {r.url && (
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm text-orange-500 hover:underline"
              >
                Website →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
