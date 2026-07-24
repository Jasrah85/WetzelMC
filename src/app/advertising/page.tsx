import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertising with Wetzelland",
  description:
    "Advertise at Wetzelland — prime spots in front of thousands of attendees.",
};

export default function AdvertisingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">Advertise at Wetzelland</h1>
      <p className="mt-4 text-zinc-300 max-w-2xl">
        Put your business in front of thousands of bikers from across the country.
        If you&apos;re interested in advertising at Wetzelland, reach out to our
        representative and we&apos;ll get you set up with a prime spot.
      </p>
      <a
        href="mailto:cornershelf342@tds.net?subject=Advertise%20at%20Wetzelland"
        className="mt-8 inline-block rounded bg-orange-600 px-8 py-3 font-bold text-white hover:bg-orange-500"
      >
        Contact Us Today
      </a>
      <p className="mt-4 text-sm text-zinc-500">
        Or email directly:{" "}
        <a href="mailto:cornershelf342@tds.net" className="text-orange-500 hover:underline">
          cornershelf342@tds.net
        </a>
      </p>
    </div>
  );
}
