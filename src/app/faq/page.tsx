import type { Metadata } from "next";
import { getFaqs } from "@/lib/contentful";
import RichText from "@/components/RichText";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we get asked... all the time.",
};

/** Fallback content (migrated from the current site) shown until FAQ entries exist in the CMS. */
const FALLBACK_FAQS: { q: string; a: string }[] = [
  { q: "When is the party?", a: "It is ALWAYS the last FULL weekend of July." },
  {
    q: "Can I leave and come back?",
    a: "As long as you have your arm band on, come and go as you please — but please be sober.",
  },
  { q: "What time do the gates open?", a: "Noon on Thursday and Friday." },
  { q: "Can I get in early?", a: "Yes, you can get in on Thursday — see rates on the Wetzelland page." },
  {
    q: "Where can I park my RV?",
    a: "Anywhere in the designated RV area, east of the former party area. The original party area is for bikes and tents only — after all, it is a biker party. There are no reservations, water, or electricity.",
  },
  {
    q: "Why can't I bring glass?",
    a: "Glass is a problem with bare feet, tires, and general safety. Coolers WILL be checked.",
  },
  {
    q: "Can I bring my golf cart?",
    a: "Yes, with a golf cart pass (see the fee schedule). All carts are subject to inspection, must have a dead-man switch, and need permanently mounted lights to move after dark. No ATVs, Gators, SxS, or UTVs.",
  },
  {
    q: "I am handicapped. Are there any special provisions?",
    a: "Yes — with a handicapped placard that's provably yours, there's a special camping area close to the vendors and stage with accessible porta-pots. Please don't abuse this area.",
  },
  {
    q: "What time do the bands play?",
    a: "The band schedule is posted on the website (and the event calendar) as soon as it is set.",
  },
  {
    q: "Where can I get a motel room or campground spot?",
    a: "Van Wert is about 15 miles away — check the Van Wert Convention and Visitors Bureau. For campgrounds, Bluewater is just down the road: 419-587-3186. They fill up fast.",
  },
  {
    q: "Can I build a campfire?",
    a: "Yes, but be responsible. If you're coming from a county with firewood restrictions due to insects, please don't bring wood from there.",
  },
  {
    q: "I don't have a picture ID, but I am old enough. Can I get in?",
    a: "No. There is no excuse for no ID — the license bureau will make you a state ID without it being a driver's license.",
  },
];

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">FAQ</h1>
      <p className="mt-2 text-zinc-400">
        Some of the questions we get asked... all the time.
      </p>

      <div className="mt-8 space-y-3">
        {faqs.length > 0
          ? faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-lg border border-zinc-800 bg-zinc-900 p-5"
              >
                <summary className="cursor-pointer font-bold text-white marker:text-orange-500">
                  {f.question}
                </summary>
                <div className="mt-3">
                  <RichText document={f.answer} />
                </div>
              </details>
            ))
          : FALLBACK_FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg border border-zinc-800 bg-zinc-900 p-5"
              >
                <summary className="cursor-pointer font-bold text-white marker:text-orange-500">
                  {f.q}
                </summary>
                <p className="mt-3 text-zinc-300">{f.a}</p>
              </details>
            ))}
      </div>
    </div>
  );
}
