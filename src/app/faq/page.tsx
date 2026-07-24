import type { Metadata } from "next";
import { getFaqs } from "@/lib/contentful";
import RichText from "@/components/RichText";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we get asked... all the time.",
};

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

      {faqs.length > 0 ? (
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
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
          ))}
        </div>
      ) : (
        <p className="mt-8 text-zinc-400">
          FAQ entries will appear here once published in Contentful.
        </p>
      )}
    </div>
  );
}
