/**
 * One-time Contentful space setup for the Wetzel MC site.
 *
 * Creates the four content types the code expects (post, event, flyer,
 * faqItem), publishes them, and creates a Content Delivery API key.
 * Optionally seeds the 2026 sample events with --seed.
 *
 * Usage (Git Bash):
 *   CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx npm run setup:contentful
 *   ... add -- --seed to also create sample event entries:
 *   CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx npm run setup:contentful -- --seed
 *
 * Get the values from Contentful:
 *   Space ID:          Settings → General settings
 *   Management token:  Settings → API keys → Content management tokens → Generate
 *                      (starts with CFPAT-; used once for this script, don't commit it)
 *
 * Safe to re-run: existing content types are left untouched.
 */
import contentfulManagement from "contentful-management";

const { createClient } = contentfulManagement;

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const SEED = process.argv.includes("--seed");

if (!SPACE_ID || !CMA_TOKEN) {
  console.error(
    "Missing env vars. Run as:\n" +
      "  CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx npm run setup:contentful",
  );
  process.exit(1);
}

const sym = (id, name, opts = {}) => ({ id, name, type: "Symbol", ...opts });

const CONTENT_TYPES = [
  {
    id: "post",
    name: "Post",
    description: "News / announcements shown on the News page and homepage.",
    displayField: "title",
    fields: [
      sym("title", "Title", { required: true }),
      sym("slug", "Slug", {
        required: true,
        validations: [{ unique: true }],
      }),
      { id: "publishDate", name: "Publish Date", type: "Date", required: true },
      sym("excerpt", "Excerpt"),
      { id: "body", name: "Body", type: "RichText" },
      {
        id: "coverImage",
        name: "Cover Image",
        type: "Link",
        linkType: "Asset",
        validations: [{ linkMimetypeGroup: ["image"] }],
      },
    ],
  },
  {
    id: "event",
    name: "Event",
    description:
      "Calendar entries — party weekend, band sets, contests, charity events.",
    displayField: "title",
    fields: [
      sym("title", "Title", { required: true }),
      sym("slug", "Slug", {
        required: true,
        validations: [{ unique: true }],
      }),
      { id: "startDate", name: "Start Date", type: "Date", required: true },
      { id: "endDate", name: "End Date", type: "Date" },
      sym("location", "Location"),
      { id: "description", name: "Description", type: "RichText" },
      sym("ticketUrl", "Ticket URL"),
      {
        id: "flyerImage",
        name: "Flyer Image",
        type: "Link",
        linkType: "Asset",
        validations: [{ linkMimetypeGroup: ["image"] }],
      },
      sym("category", "Category", {
        validations: [{ in: ["party", "music", "games", "charity", "other"] }],
      }),
    ],
  },
  {
    id: "flyer",
    name: "Flyer",
    description: "Historical party flyers for the archive gallery.",
    displayField: "title",
    fields: [
      sym("title", "Title", { required: true }),
      { id: "year", name: "Year", type: "Integer", required: true },
      {
        id: "image",
        name: "Image",
        type: "Link",
        linkType: "Asset",
        required: true,
        validations: [{ linkMimetypeGroup: ["image"] }],
      },
    ],
  },
  {
    id: "faqItem",
    name: "FAQ Item",
    description:
      "FAQ entries. Keep the voice — the attitude is intentional. House style: link to /wetzelland#tickets, /directions, /events where relevant.",
    displayField: "question",
    fields: [
      sym("question", "Question", { required: true }),
      { id: "answer", name: "Answer", type: "RichText", required: true },
      { id: "order", name: "Order", type: "Integer" },
    ],
  },
];

// Mirrors src/lib/sample-events.ts (plain fields only)
const SAMPLE_EVENTS = [
  ["Wetzelland 2026 — Party Weekend", "wetzelland-2026", "2026-07-23T12:00-04:00", "2026-07-26T12:00-04:00", "Wetzel MC Grounds", "party", "https://ticketstripe.com/wetzelland2026"],
  ["Off The Edge — Main Stage", "off-the-edge", "2026-07-23T19:00-04:00", "2026-07-23T20:30-04:00", "Main Stage", "music"],
  ["Collective Soul — Main Stage", "collective-soul", "2026-07-23T21:00-04:00", "2026-07-23T22:30-04:00", "Main Stage", "music"],
  ["Presidents Dunk for the Fallen Riders Memorial", "presidents-dunk", "2026-07-24T13:00-04:00", "2026-07-24T15:00-04:00", "Dunk Tank", "charity"],
  ["Opening Ceremonies & Skydivers", "opening-ceremonies", "2026-07-24T16:00-04:00", null, "Flagpole", "party"],
  ["Tattoo Contest", "tattoo-contest", "2026-07-24T17:00-04:00", null, "Beer Tent (register 10 AM–5 PM)", "games"],
  ["Drowning Pool — Main Stage", "drowning-pool", "2026-07-24T21:00-04:00", "2026-07-24T22:30-04:00", "Main Stage", "music"],
  ["469 Burnout Contest", "burnout-contest", "2026-07-24T22:30-04:00", null, "Party Pit, south of the vendors", "games"],
  ["Bike Show", "bike-show", "2026-07-25T11:00-04:00", null, "Sign up at the Beer Tent, 7:30–11:00 AM", "games"],
  ["Bike Games", "bike-games", "2026-07-25T12:00-04:00", null, "Sign up at the Beer Tent, 7:30 AM–Noon", "games"],
  ["Deep Cuts — Main Stage", "deep-cuts", "2026-07-25T21:00-04:00", "2026-07-25T22:30-04:00", "Main Stage", "music"],
  ["50/50 Drawing & Harley Giveaway", "bike-giveaway", "2026-07-25T22:45-04:00", null, "Main Stage, after Deep Cuts", "party"],
];

const loc = (v) => ({ "en-US": v });

async function main() {
  const client = createClient({ accessToken: CMA_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment("master");

  // 1. Content types
  const existing = (await env.getContentTypes()).items.map((ct) => ct.sys.id);
  for (const def of CONTENT_TYPES) {
    if (existing.includes(def.id)) {
      console.log(`✓ Content type "${def.id}" already exists — skipping`);
      continue;
    }
    const ct = await env.createContentTypeWithId(def.id, {
      name: def.name,
      description: def.description,
      displayField: def.displayField,
      fields: def.fields.map((f) => ({
        localized: false,
        required: false,
        validations: [],
        ...f,
      })),
    });
    await ct.publish();
    console.log(`✓ Created + published content type "${def.id}"`);
  }

  // 2. Delivery API key (for .env.local / Vercel)
  const keys = await space.getApiKeys();
  let key = keys.items.find((k) => k.name === "wetzelmc-site");
  if (!key) {
    key = await space.createApiKey({
      name: "wetzelmc-site",
      environments: [
        { sys: { type: "Link", linkType: "Environment", id: "master" } },
      ],
    });
    console.log("✓ Created delivery API key");
  } else {
    console.log("✓ Delivery API key already exists");
  }

  // 3. Optional sample events
  if (SEED) {
    const current = await env.getEntries({ content_type: "event", limit: 1 });
    if (current.total > 0) {
      console.log("✓ Events already exist — skipping seed");
    } else {
      for (const [title, slug, startDate, endDate, location, category, ticketUrl] of SAMPLE_EVENTS) {
        const fields = {
          title: loc(title),
          slug: loc(slug),
          startDate: loc(startDate),
          location: loc(location),
          category: loc(category),
        };
        if (endDate) fields.endDate = loc(endDate);
        if (ticketUrl) fields.ticketUrl = loc(ticketUrl);
        const entry = await env.createEntry("event", { fields });
        await entry.publish();
        console.log(`  ✓ Seeded event: ${title}`);
      }
    }
  }

  console.log("\n──────────────────────────────────────────────");
  console.log("Add these to .env.local (and Vercel env vars):\n");
  console.log(`CONTENTFUL_SPACE_ID=${SPACE_ID}`);
  console.log(`CONTENTFUL_ACCESS_TOKEN=${key.accessToken}`);
  console.log("──────────────────────────────────────────────");
  console.log("\nDone. Editors can now create Posts, Events, Flyers, and FAQ Items.");
}

main().catch((err) => {
  console.error("Setup failed:", err.message ?? err);
  process.exit(1);
});
