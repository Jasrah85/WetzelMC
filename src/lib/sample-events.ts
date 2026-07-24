import type { ClubEvent } from "./types";

/**
 * Placeholder events shown when no events exist in the CMS yet.
 * Based on the real Wetzelland 2026 schedule. Once `event` entries are
 * published in Contentful, these are ignored automatically.
 */
export const SAMPLE_EVENTS: ClubEvent[] = [
  {
    title: "Wetzelland 2026 — Party Weekend",
    slug: "wetzelland-2026",
    startDate: "2026-07-23T12:00:00-04:00",
    endDate: "2026-07-26T12:00:00-04:00",
    location: "Wetzel MC Grounds",
    ticketUrl: "https://ticketstripe.com/wetzelland2026",
    category: "party",
  },
  {
    title: "Off The Edge — Main Stage",
    slug: "off-the-edge",
    startDate: "2026-07-23T19:00:00-04:00",
    endDate: "2026-07-23T20:30:00-04:00",
    location: "Main Stage",
    category: "music",
  },
  {
    title: "Collective Soul — Main Stage",
    slug: "collective-soul",
    startDate: "2026-07-23T21:00:00-04:00",
    endDate: "2026-07-23T22:30:00-04:00",
    location: "Main Stage",
    category: "music",
  },
  {
    title: "Presidents Dunk for the Fallen Riders Memorial",
    slug: "presidents-dunk",
    startDate: "2026-07-24T13:00:00-04:00",
    endDate: "2026-07-24T15:00:00-04:00",
    location: "Dunk Tank",
    category: "charity",
  },
  {
    title: "Opening Ceremonies & Skydivers",
    slug: "opening-ceremonies",
    startDate: "2026-07-24T16:00:00-04:00",
    location: "Flagpole",
    category: "party",
  },
  {
    title: "Tattoo Contest",
    slug: "tattoo-contest",
    startDate: "2026-07-24T17:00:00-04:00",
    location: "Beer Tent (register 10 AM–5 PM)",
    category: "games",
  },
  {
    title: "Drowning Pool — Main Stage",
    slug: "drowning-pool",
    startDate: "2026-07-24T21:00:00-04:00",
    endDate: "2026-07-24T22:30:00-04:00",
    location: "Main Stage",
    category: "music",
  },
  {
    title: "469 Burnout Contest",
    slug: "burnout-contest",
    startDate: "2026-07-24T22:30:00-04:00",
    location: "Party Pit, south of the vendors",
    category: "games",
  },
  {
    title: "Bike Show",
    slug: "bike-show",
    startDate: "2026-07-25T11:00:00-04:00",
    location: "Sign up at the Beer Tent, 7:30–11:00 AM",
    category: "games",
  },
  {
    title: "Bike Games",
    slug: "bike-games",
    startDate: "2026-07-25T12:00:00-04:00",
    location: "Sign up at the Beer Tent, 7:30 AM–Noon",
    category: "games",
  },
  {
    title: "Deep Cuts — Main Stage",
    slug: "deep-cuts",
    startDate: "2026-07-25T21:00:00-04:00",
    endDate: "2026-07-25T22:30:00-04:00",
    location: "Main Stage",
    category: "music",
  },
  {
    title: "50/50 Drawing & Harley Giveaway",
    slug: "bike-giveaway",
    startDate: "2026-07-25T22:45:00-04:00",
    location: "Main Stage, after Deep Cuts",
    category: "party",
  },
];
