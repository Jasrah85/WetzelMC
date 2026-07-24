import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { getFaqs } from "@/lib/contentful";
import RichText from "@/components/RichText";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we get asked... all the time.",
};

/**
 * Fallback content (migrated from the current site) shown until FAQ entries
 * exist in the CMS. The voice is intentional — keep the attitude when editing.
 */
const link = "text-orange-500 hover:underline font-semibold";

const FALLBACK_FAQS: { q: string; a: ReactNode }[] = [
  { q: "When is the party?", a: "It is ALWAYS the last FULL weekend of July." },
  {
    q: "Where exactly are you located?",
    a: (
      <>
        About 13 miles northeast of Van Wert in &quot;scenic&quot; Northwest
        Ohio. The street address is 20508 Van Wert Paulding County Line Rd,
        Grover Hill, OH — but most GPS units can&apos;t find us. Try 17816 Van
        Wert-Paulding County Line Rd instead; you truly can&apos;t miss us from
        there. Map and site layout on the{" "}
        <Link href="/directions" className={link}>
          Directions page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can I leave and come back?",
    a: "As long as you have your arm band on, come and go as you please — but please be sober.",
  },
  { q: "What time do the gates open?", a: "Noon on Thursday and Friday." },
  {
    q: "Can I get in early?",
    a: (
      <>
        Yes, you can get in on Thursday — see the{" "}
        <Link href="/wetzelland#tickets" className={link}>
          ticket rates
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do I have to buy tickets in advance?",
    a: (
      <>
        No — tickets can always be purchased at the gate starting Thursday at
        noon. But pre-buy pricing ends July 19 and comes with extra bike raffle
        tickets, so buying ahead is the smart move.{" "}
        <Link href="/wetzelland#tickets" className={link}>
          See tickets &amp; passes
        </Link>
        .
      </>
    ),
  },
  {
    q: "But I know one of your members — George — and he said I could come in early!",
    a: "I don't care if you know Jesus Christ personally — no. By the way, George and Jesus Christ are not members.",
  },
  {
    q: "Where can I park my 110' motorhome?",
    a: "Anywhere in the designated RV area, which is to the east of the former party area.",
  },
  {
    q: "I have parked my RV in the old party area for 100 years. Can't I park there?",
    a: "No, the original party area is for bikes and tents only — after all, it is a Biker party.",
  },
  {
    q: "Can I reserve a spot for my RV with water and electric?",
    a: "There are no reservations, water, or electricity. It is a field — dirt. You'll have to be primitive this weekend or bring your own.",
  },
  {
    q: "My old man is riding the bike and I am driving the RV. Can't we park together?",
    a: "Sure you can, but the bike will have to be in the RV area.",
  },
  {
    q: "I am driving my car and want to camp in the original area. Can I do that?",
    a: "Yes — you'll need to park in the new part, but you can pitch your tent in the original area.",
  },
  {
    q: "Can I drive into the bike and tent area to drop off my stuff, then move my car?",
    a: "Yes, BUT the car MUST not remain there unless you want it towed out — and we will NOT be responsible for damage.",
  },
  {
    q: "Why can't I bring glass?",
    a: "Glass is a problem with bare feet, tires, and general safety. COOLERS WILL BE CHECKED!!!",
  },
  {
    q: "What if I bring a bottle anyway?",
    a: "If I'm at the gate and find it in your cooler, I get a free bottle. If you're caught on the grounds — WELL!!! Let's just say you won't keep it and you won't be happy.",
  },
  {
    q: "Can I bring my golf cart?",
    a: (
      <>
        Yes, but there is a fee to bring in a cart — see the{" "}
        <Link href="/wetzelland#tickets" className={link}>
          fee schedule
        </Link>
        . All carts are subject to our inspection: dead-man switch required,
        and anything moving after dark MUST have permanently mounted headlights
        and taillights. Please drive responsibly.
      </>
    ),
  },
  {
    q: "Can I bring my Gator or ATV?",
    a: "No. Golf carts are OK, but NO ATVs.",
  },
  {
    q: "I am handicapped. Are there any special provisions for me?",
    a: "Yes — you must have a handicapped placard and be able to prove it's yours and not one you borrowed from Grandma. There's a special area close to the vendors and stage with handicap-accessible porta-pots. Please don't abuse this area by bringing 25 friends who have to camp with you. It is for people who need it.",
  },
  {
    q: "What time do the bands play?",
    a: (
      <>
        The band schedule is posted on the{" "}
        <Link href="/events" className={link}>
          event calendar
        </Link>{" "}
        as soon as it is set.
      </>
    ),
  },
  {
    q: "Where can I get a motel room?",
    a: "The town of Van Wert is about 15 miles away — check the Van Wert Convention and Visitors Bureau.",
  },
  {
    q: "I'd like to park my camper at a real campground. Is there one close?",
    a: "There's a real nice one just down the road called Bluewater: 419-587-3186. Call quickly — they fill up fast. There are others a little further away; please consult your campground directory.",
  },
  {
    q: "Can I build a campfire?",
    a: "Yes, but be responsible about it. If you're coming from one of the many counties with firewood restrictions due to insects, please don't bring wood from there. We don't need those bugs in this county either. If busted by the DNR, you will be very unhappy.",
  },
  {
    q: "I'd like to rent a tent. How do I do that?",
    a: (
      <>
        We have designated tent vendors willing to work that out with you
        directly — see the rental contacts on the{" "}
        <Link href="/wetzelland" className={link}>
          Wetzelland page
        </Link>
        . Own tent larger than 20×20? You can set it up for a fee: call
        419-587-3826 (leave a message if no answer).
      </>
    ),
  },
  {
    q: "I am a food, tattoo, or goods vendor. What arrangements do I need to make?",
    a: (
      <>
        Complete information for all vendors — including out-of-state vendor
        license questions — is in the vendor forms on the{" "}
        <Link href="/contact" className={link}>
          Contact page
        </Link>
        .
      </>
    ),
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
        Everything you need to know is on this website — but we always get all
        kinds of emails asking questions anyway. So here are the questions we
        get asked... all the time.
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
