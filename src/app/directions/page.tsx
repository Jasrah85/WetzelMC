import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directions & Site Map",
  description:
    "How to find Wetzelland: 20508 Van Wert Paulding County Line Rd, Grover Hill, Ohio — about 13 miles northeast of Van Wert.",
};

export default function DirectionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">Directions &amp; Site Map</h1>

      <div className="prose prose-invert prose-orange mt-8 max-w-none">
        <p>
          We are located approximately 13 miles northeast of Van Wert, OH in
          &quot;scenic&quot; Northwest Ohio.
        </p>
        <p>
          Our &quot;street&quot; address is{" "}
          <strong>20508 Van Wert Paulding County Line Rd, Grover Hill, Ohio</strong>{" "}
          — but most mapping programs and GPS units can&apos;t find us.
        </p>
        <p>
          See if your GPS will accept{" "}
          <strong>17816 Van Wert-Paulding County Line Rd, Grover Hill, OH</strong> —
          you truly can&apos;t miss us from there!
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-zinc-800">
        <iframe
          title="Map to Wetzelland"
          src="https://www.google.com/maps?q=17816+Van+Wert-Paulding+County+Line+Rd,+Grover+Hill,+OH&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Site map graphic: add the grounds/site-map image to <code>/public/site-map.jpg</code>{" "}
        (or manage it through the CMS) and it will display here.
      </p>
    </div>
  );
}
