import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
  description:
    "The origin story of Wetzel Motorcycle Club — from a spray-painted gas tank in 1986 to Ohio's longest-running biker party.",
};

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">
        The Origin Story of Wetzel Motorcycle Club
      </h1>
      <div className="prose prose-invert prose-orange mt-8 max-w-none">
        <p>
          Wetzel Motorcycle Club&apos;s story began on a summer afternoon in 1986,
          fueled by the camaraderie and resourcefulness that define bikers. A group
          of friends gathered at a motorcycle garage, preparing for a road trip the
          next day. One friend needed a bigger gas tank for his bike, so the group
          jumped into action. While he headed to work, the others swapped the tank,
          spray-painted it with flames, and humorously added &quot;Property of
          Wetzel MC.&quot; When their friend arrived at the local watering hole that
          evening, he didn&apos;t even recognize his own bike, sparking laughter and
          a name that would become legendary.
        </p>
        <p>
          What started as a playful moment among friends became the foundation for
          something much bigger. In January 1987, Wetzel MC held its first official
          meeting. The club was founded with a mission to embrace motorcycle culture
          while challenging the negative stereotypes often associated with bikers.
          Wetzel MC was about family, friendship, and giving back to the
          community—a group bound not just by motorcycles, but by shared values.
        </p>
        <p>
          Later that year, the club hosted its first party. Despite fewer than 500
          attendees and significant out-of-pocket costs for the members, the spirit
          of the event planted the seeds for what would become Wetzelland. A local
          farmer soon offered his land, and word began to spread. By 1991, Wetzel MC
          had incorporated and purchased its permanent home, transforming it into
          the vibrant hub known today as Wetzelland.
        </p>
        <p>
          What sets Wetzel MC apart is our dedication to both our members and the
          broader community. Over the years, the club has donated to local EMS
          units, schools, and youth programs, and established scholarships for
          Vantage students. We&apos;ve adopted highways, partnered with
          organizations like ABATE and the Salvation Army for toy drives, and
          brought flat-track motorcycle racing back to the Van Wert Fairgrounds.
        </p>
        <p>
          Every July, Wetzelland brings thousands of bikers together for a weekend
          of bike games, live music, and camaraderie. From iconic bands like Puddle
          of Mudd, Theory of a Deadman, Lynyrd Skynyrd, Ted Nugent, and Buckcherry,
          to the roar of motorcycles and the laughter of old friends, Wetzelland
          embodies the spirit of adventure and unity that Wetzel MC was built on.
        </p>
        <p>
          Wetzel Motorcycle Club is more than a club; it&apos;s a legacy of
          friendship, resilience, and the open road. From that first spray-painted
          tank to the thriving community it is today, Wetzel MC proves that bikers
          are not just riders but family, making a difference one mile at a time.
        </p>
      </div>
    </div>
  );
}
