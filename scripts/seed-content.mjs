/**
 * Seeds FAQ items, starter news posts, and historical flyers into Contentful.
 * Run AFTER setup-contentful.mjs has created the content types.
 *
 * Usage (Git Bash):
 *   CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx npm run seed:content
 *
 * Flags:
 *   --skip-flyers   Don't upload the ~19 historical flyer images (faster).
 *
 * Safe to re-run: each content type is skipped if entries already exist.
 * Flyer images are fetched by Contentful directly from the old Wix site.
 */
import contentfulManagement from "contentful-management";

const { createClient } = contentfulManagement;

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const SKIP_FLYERS = process.argv.includes("--skip-flyers");

if (!SPACE_ID || !CMA_TOKEN) {
  console.error(
    "Missing env vars. Run as:\n" +
      "  CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx npm run seed:content",
  );
  process.exit(1);
}

const loc = (v) => ({ "en-US": v });

// ── Rich-text helpers ────────────────────────────────────────────────
const textNode = (value) => ({ nodeType: "text", value, marks: [], data: {} });
const linkNode = (uri, label) => ({
  nodeType: "hyperlink",
  data: { uri },
  content: [textNode(label)],
});
const paragraph = (content) => ({ nodeType: "paragraph", data: {}, content });
const document = (paragraphs) => ({
  nodeType: "document",
  data: {},
  content: paragraphs,
});

// Build a one-paragraph rich-text doc from segments.
// A segment is either a string (plain text) or [label, href] (a link).
const answer = (...segments) =>
  document([
    paragraph(
      segments.map((s) =>
        typeof s === "string" ? textNode(s) : linkNode(s[1], s[0]),
      ),
    ),
  ]);

// Multi-paragraph plain-text doc.
const prose = (...paras) =>
  document(paras.map((p) => paragraph([textNode(p)])));

// ── FAQ content (voice is intentional — keep the attitude) ───────────
const FAQS = [
  ["When is the party?", answer("It is ALWAYS the last FULL weekend of July.")],
  [
    "Where exactly are you located?",
    answer(
      'About 13 miles northeast of Van Wert in "scenic" Northwest Ohio. The street address is 20508 Van Wert Paulding County Line Rd, Grover Hill, OH — but most GPS units can\'t find us. Try 17816 Van Wert-Paulding County Line Rd instead; you truly can\'t miss us from there. Map and site layout on the ',
      ["Directions page", "/directions"],
      ".",
    ),
  ],
  [
    "Can I leave and come back?",
    answer(
      "As long as you have your arm band on, come and go as you please — but please be sober.",
    ),
  ],
  ["What time do the gates open?", answer("Noon on Thursday and Friday.")],
  [
    "Can I get in early?",
    answer(
      "Yes, you can get in on Thursday — see the ",
      ["ticket rates", "/wetzelland#tickets"],
      ".",
    ),
  ],
  [
    "Do I have to buy tickets in advance?",
    answer(
      "No — tickets can always be purchased at the gate starting Thursday at noon. But pre-buy pricing ends July 19 and comes with extra bike raffle tickets, so buying ahead is the smart move. ",
      ["See tickets & passes", "/wetzelland#tickets"],
      ".",
    ),
  ],
  [
    "But I know one of your members — George — and he said I could come in early!",
    answer(
      "I don't care if you know Jesus Christ personally — no. By the way, George and Jesus Christ are not members.",
    ),
  ],
  [
    "Where can I park my 110' motorhome?",
    answer(
      "Anywhere in the designated RV area, which is to the east of the former party area.",
    ),
  ],
  [
    "I have parked my RV in the old party area for 100 years. Can't I park there?",
    answer(
      "No, the original party area is for bikes and tents only — after all, it is a Biker party.",
    ),
  ],
  [
    "Can I reserve a spot for my RV with water and electric?",
    answer(
      "There are no reservations, water, or electricity. It is a field — dirt. You'll have to be primitive this weekend or bring your own.",
    ),
  ],
  [
    "My old man is riding the bike and I am driving the RV. Can't we park together?",
    answer("Sure you can, but the bike will have to be in the RV area."),
  ],
  [
    "I am driving my car and want to camp in the original area. Can I do that?",
    answer(
      "Yes — you'll need to park in the new part, but you can pitch your tent in the original area.",
    ),
  ],
  [
    "Can I drive into the bike and tent area to drop off my stuff, then move my car?",
    answer(
      "Yes, BUT the car MUST not remain there unless you want it towed out — and we will NOT be responsible for damage.",
    ),
  ],
  [
    "Why can't I bring glass?",
    answer(
      "Glass is a problem with bare feet, tires, and general safety. COOLERS WILL BE CHECKED!!!",
    ),
  ],
  [
    "What if I bring a bottle anyway?",
    answer(
      "If I'm at the gate and find it in your cooler, I get a free bottle. If you're caught on the grounds — WELL!!! Let's just say you won't keep it and you won't be happy.",
    ),
  ],
  [
    "Can I bring my golf cart?",
    answer(
      "Yes, but there is a fee to bring in a cart — see the ",
      ["fee schedule", "/wetzelland#tickets"],
      ". All carts are subject to our inspection: dead-man switch required, and anything moving after dark MUST have permanently mounted headlights and taillights. Please drive responsibly.",
    ),
  ],
  [
    "Can I bring my Gator or ATV?",
    answer("No. Golf carts are OK, but NO ATVs."),
  ],
  [
    "I am handicapped. Are there any special provisions for me?",
    answer(
      "Yes — you must have a handicapped placard and be able to prove it's yours and not one you borrowed from Grandma. There's a special area close to the vendors and stage with handicap-accessible porta-pots. Please don't abuse this area by bringing 25 friends who have to camp with you. It is for people who need it.",
    ),
  ],
  [
    "What time do the bands play?",
    answer(
      "The band schedule is posted on the ",
      ["event calendar", "/events"],
      " as soon as it is set.",
    ),
  ],
  [
    "Where can I get a motel room?",
    answer(
      "The town of Van Wert is about 15 miles away — check the Van Wert Convention and Visitors Bureau.",
    ),
  ],
  [
    "I'd like to park my camper at a real campground. Is there one close?",
    answer(
      "There's a real nice one just down the road called Bluewater: 419-587-3186. Call quickly — they fill up fast. There are others a little further away; please consult your campground directory.",
    ),
  ],
  [
    "Can I build a campfire?",
    answer(
      "Yes, but be responsible about it. If you're coming from one of the many counties with firewood restrictions due to insects, please don't bring wood from there. We don't need those bugs in this county either. If busted by the DNR, you will be very unhappy.",
    ),
  ],
  [
    "I'd like to rent a tent. How do I do that?",
    answer(
      "We have designated tent vendors willing to work that out with you directly — see the rental contacts on the ",
      ["Wetzelland page", "/wetzelland"],
      ". Own tent larger than 20×20? You can set it up for a fee: call 419-587-3826 (leave a message if no answer).",
    ),
  ],
  [
    "I am a food, tattoo, or goods vendor. What arrangements do I need to make?",
    answer(
      "Complete information for all vendors — including out-of-state vendor license questions — is in the vendor forms on the ",
      ["Contact page", "/contact"],
      ".",
    ),
  ],
  [
    "I don't have a picture ID, but I am old enough. Can I get in?",
    answer(
      "No. There is no excuse for no ID — the license bureau will make you a state ID without it being a driver's license.",
    ),
  ],
];

// ── Starter news posts ───────────────────────────────────────────────
const POSTS = [
  {
    title: "Collective Soul & Drowning Pool Headline Wetzelland 2026",
    slug: "wetzelland-2026-lineup",
    publishDate: "2026-05-01",
    excerpt:
      "The 40th anniversary lineup is stacked — Collective Soul Thursday night, Drowning Pool Friday, plus a weekend full of local favorites.",
    body: prose(
      "Wetzelland turns 40 this year, and we're bringing the noise. Collective Soul closes out Thursday night on the main stage, with Off The Edge warming things up beforehand.",
      "Friday belongs to Drowning Pool, with Colt & Crew and Never Again earlier in the evening. Saturday rounds out the weekend with Section Ate, Karmas Pawn, and Deep Cuts, followed by the 50/50 drawing and the Harley giveaway.",
      "Check the event calendar for set times, and get your tickets early — pre-buy pricing ends July 19.",
    ),
  },
  {
    title: "Pre-Buy Ticket Prices End July 19",
    slug: "pre-buy-deadline-2026",
    publishDate: "2026-06-15",
    excerpt:
      "Save on admission and camping by buying before July 19. You can still pay at the gate starting Thursday at noon.",
    body: prose(
      "Pre-buy pricing runs through July 19. Buy ahead and you'll lock in the lower rate — plus the Thursday early-entry options include free bike raffle tickets.",
      "Can't buy ahead? No problem. Tickets and passes are available at the gate starting Thursday at noon. See the Wetzelland page for the full ticket and pass breakdown.",
    ),
  },
];

// ── Historical flyers (images pulled from the old Wix site) ──────────
const WIX = "https://static.wixstatic.com/media/";
const FLYERS = [
  [2024, "Wetzelland 2024", "bc126d_0aa08d7f08f64c239dc51f1f4a5d61d8~mv2.jpg"],
  [2020, "Wetzelland 2020 (Cancelled)", "bc126d_f27ea5ec206f417795c0b5bff23107b7~mv2.jpg"],
  [2019, "Wetzelland 2019", "bc126d_f87a2f15548745ad95b8316fa23560d4~mv2.jpg"],
  [2018, "Wetzelland 2018", "bc126d_1af724c3f70e4c9cbbf36c2522df4a64~mv2.jpg"],
  [2017, "Wetzelland 2017", "bc126d_78a3d79f763d413ca5dc8624dd3d3fde~mv2.jpg"],
  [2016, "Wetzelland 2016", "bc126d_da746a1ab2ee42cdbd97bdfdd95267a6~mv2.jpg"],
  [2015, "Wetzelland 2015", "bc126d_6054262ccd2a4819bd1f04ba8407d2fb~mv2.jpg"],
  [2014, "Wetzelland 2014", "bc126d_be764ba6828f4d24a457e58d285d0f0c~mv2.jpg"],
  [2013, "Wetzelland 2013", "bc126d_c7db6b44ae3a442c9fe68037b67da273~mv2.jpg"],
  [2012, "Wetzelland 2012", "bc126d_2c59fd607d824d54a8d113df85202107~mv2.jpg"],
  [2011, "Wetzelland 2011", "bc126d_1f361741481d43d69c66b72562aafc42~mv2.jpg"],
  [2010, "Wetzelland 2010", "bc126d_f06d7779363f4e7ba42d6d83195c4382~mv2.jpg"],
  [2009, "Wetzelland 2009", "bc126d_f697e59581224409bf6e11f25c1d14b1~mv2.jpg"],
  [2008, "Wetzelland 2008", "bc126d_7195c12e2cb04b93ae031a7fe6cb0505~mv2.jpg"],
  [2007, "Wetzelland 2007", "bc126d_1d411eaca27c4d0a8d653b876e7d1a0d~mv2.jpg"],
  [2006, "Wetzelland 2006", "bc126d_573756e9fb104ed28f7f92ea6f1de9dd~mv2.jpg"],
  [2005, "Wetzelland 2005", "bc126d_dd872d832a7446e6b7ed26d3704df76e~mv2.jpg"],
  [2004, "Wetzelland 2004", "bc126d_f6740d11391d44259d70a71101029405~mv2.jpg"],
  [2003, "Wetzelland 2003", "bc126d_aa7787ee22234d11a1d22afb3984f343~mv2.jpg"],
];

async function typeIsEmpty(env, contentType) {
  const res = await env.getEntries({ content_type: contentType, limit: 1 });
  return res.total === 0;
}

async function seedFaqs(env) {
  if (!(await typeIsEmpty(env, "faqItem"))) {
    console.log("✓ FAQ items already exist — skipping");
    return;
  }
  let order = 1;
  for (const [question, doc] of FAQS) {
    const entry = await env.createEntry("faqItem", {
      fields: { question: loc(question), answer: loc(doc), order: loc(order) },
    });
    await entry.publish();
    console.log(`  ✓ FAQ: ${question}`);
    order++;
  }
}

async function seedPosts(env) {
  if (!(await typeIsEmpty(env, "post"))) {
    console.log("✓ Posts already exist — skipping");
    return;
  }
  for (const p of POSTS) {
    const entry = await env.createEntry("post", {
      fields: {
        title: loc(p.title),
        slug: loc(p.slug),
        publishDate: loc(p.publishDate),
        excerpt: loc(p.excerpt),
        body: loc(p.body),
      },
    });
    await entry.publish();
    console.log(`  ✓ Post: ${p.title}`);
  }
}

async function seedFlyers(env) {
  if (SKIP_FLYERS) {
    console.log("• Skipping flyers (--skip-flyers)");
    return;
  }
  if (!(await typeIsEmpty(env, "flyer"))) {
    console.log("✓ Flyers already exist — skipping");
    return;
  }
  console.log("  Uploading flyer images (this takes a minute)…");
  for (const [year, title, mediaId] of FLYERS) {
    try {
      let asset = await env.createAsset({
        fields: {
          title: loc(title),
          file: loc({
            contentType: "image/jpeg",
            fileName: `wetzelland-${year}.jpg`,
            upload: `${WIX}${mediaId}`,
          }),
        },
      });
      asset = await asset.processForAllLocales({
        processingCheckWait: 2000,
        processingCheckRetries: 30,
      });
      asset = await asset.publish();

      const entry = await env.createEntry("flyer", {
        fields: {
          title: loc(title),
          year: loc(year),
          image: loc({
            sys: { type: "Link", linkType: "Asset", id: asset.sys.id },
          }),
        },
      });
      await entry.publish();
      console.log(`  ✓ Flyer: ${title}`);
    } catch (err) {
      console.warn(
        `  ! Flyer ${year} failed (${err instanceof Error ? err.message : err}). ` +
          "You can add this one manually in Contentful.",
      );
    }
  }
}

async function main() {
  const client = createClient({ accessToken: CMA_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment("master");

  console.log("Seeding FAQ items…");
  await seedFaqs(env);
  console.log("Seeding news posts…");
  await seedPosts(env);
  console.log("Seeding flyers…");
  await seedFlyers(env);

  console.log("\nDone. Review and tweak everything in Contentful as needed.");
}

main().catch((err) => {
  console.error("Seeding failed:", err.message ?? err);
  process.exit(1);
});
