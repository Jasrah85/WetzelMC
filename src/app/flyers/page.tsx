import type { Metadata } from "next";
import { getFlyers } from "@/lib/contentful";
import FlyerGallery from "@/components/FlyerGallery";

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
        Four decades of Wetzelland history, one flyer at a time. Click any flyer
        to see the full-size version.
      </p>

      {flyers.length > 0 ? (
        <FlyerGallery flyers={flyers} />
      ) : (
        <p className="mt-8 text-zinc-400">
          Flyers will appear here once uploaded to the CMS (one “Flyer” entry per
          year, newest first).
        </p>
      )}
    </div>
  );
}
