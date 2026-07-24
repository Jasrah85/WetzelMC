import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getFaqs } from "@/lib/contentful";
import type { FaqItem } from "@/lib/types";
import RichText from "@/components/RichText";
import FaqBackground from "@/components/FaqBackground";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we get asked... all the time.",
};

/**
 * Presentation-only grouping. FAQ content lives in Contentful; this just
 * organizes known questions into sections with a little icon. Any question
 * not listed here (e.g. a new one added in the CMS) falls into "More
 * Questions" automatically — update the lists below to slot it into a group.
 */
const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

type Group = { title: string; icon: ReactNode; questions: string[] };

const GROUPS: Group[] = [
  {
    title: "Getting In",
    icon: <GateIcon />,
    questions: [
      "When is the party?",
      "Where exactly are you located?",
      "Can I leave and come back?",
      "What time do the gates open?",
      "Can I get in early?",
      "Do I have to buy tickets in advance?",
      "But I know one of your members — George — and he said I could come in early!",
      "I don't have a picture ID, but I am old enough. Can I get in?",
    ],
  },
  {
    title: "Camping & RVs",
    icon: <TentIcon />,
    questions: [
      "Where can I park my 110' motorhome?",
      "I have parked my RV in the old party area for 100 years. Can't I park there?",
      "Can I reserve a spot for my RV with water and electric?",
      "My old man is riding the bike and I am driving the RV. Can't we park together?",
      "I am driving my car and want to camp in the original area. Can I do that?",
      "Can I drive into the bike and tent area to drop off my stuff, then move my car?",
      "Can I build a campfire?",
      "I'd like to park my camper at a real campground. Is there one close?",
    ],
  },
  {
    title: "Rules & Vehicles",
    icon: <RuleIcon />,
    questions: [
      "Why can't I bring glass?",
      "What if I bring a bottle anyway?",
      "Can I bring my golf cart?",
      "Can I bring my Gator or ATV?",
      "I am handicapped. Are there any special provisions for me?",
    ],
  },
  {
    title: "Music & Lodging",
    icon: <MusicIcon />,
    questions: [
      "What time do the bands play?",
      "Where can I get a motel room?",
    ],
  },
  {
    title: "Vendors & Tents",
    icon: <VendorIcon />,
    questions: [
      "I'd like to rent a tent. How do I do that?",
      "I am a food, tattoo, or goods vendor. What arrangements do I need to make?",
    ],
  },
];

function groupFaqs(faqs: FaqItem[]) {
  const remaining = new Set(faqs.map((_, i) => i));
  const sections: { title: string; icon: ReactNode; items: FaqItem[] }[] = [];

  for (const g of GROUPS) {
    const wanted = new Set(g.questions.map(norm));
    const items: FaqItem[] = [];
    faqs.forEach((f, i) => {
      if (remaining.has(i) && wanted.has(norm(f.question))) {
        items.push(f);
        remaining.delete(i);
      }
    });
    if (items.length) sections.push({ title: g.title, icon: g.icon, items });
  }

  const leftovers = [...remaining].map((i) => faqs[i]);
  if (leftovers.length) {
    sections.push({ title: "More Questions", icon: <RuleIcon />, items: leftovers });
  }
  return sections;
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  const sections = groupFaqs(faqs);

  return (
    <div className="relative overflow-hidden">
      <FaqBackground />
      <div className="relative mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-black text-white">FAQ</h1>
        <p className="mt-2 text-zinc-400">
          Everything you need to know is on this website — but we always get all
          kinds of emails asking questions anyway. So here are the questions we
          get asked... all the time.
        </p>

        {sections.length > 0 ? (
          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                  <span className="text-orange-500">{section.icon}</span>
                  <h2 className="text-xl font-black uppercase tracking-wide text-white">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-4 space-y-3">
                  {section.items.map((f) => (
                    <details
                      key={f.question}
                      className="group rounded-lg border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-sm"
                    >
                      <summary className="cursor-pointer font-bold text-white marker:text-orange-500">
                        {f.question}
                      </summary>
                      <div className="mt-3">
                        <RichText document={f.answer} />
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-zinc-400">
            FAQ entries will appear here once published in Contentful.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Little section icons (inline SVG, currentColor) ─────────────── */
function GateIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21V5l9-2 9 2v16M3 10h18M9 21v-7h6v7" />
    </svg>
  );
}
function TentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4L3 20h18L12 4zM12 4v16" />
    </svg>
  );
}
function RuleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
function MusicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
function VendorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16" />
    </svg>
  );
}
