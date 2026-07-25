/**
 * Adds news posts to Contentful from the POSTS array below. Idempotent by
 * slug — running it again only creates posts that don't already exist, so
 * it's the easy place to drop in future announcements.
 *
 * Optional cover image: set `coverFile` to a filename in public/history and
 * it'll be uploaded and attached.
 *
 * Usage (Git Bash):
 *   CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/add-news-posts.mjs
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import contentfulManagement from "contentful-management";

const { createClient } = contentfulManagement;

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !CMA_TOKEN) {
  console.error(
    "Missing env vars. Run as:\n" +
      "  CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/add-news-posts.mjs",
  );
  process.exit(1);
}

const loc = (v) => ({ "en-US": v });

// Rich-text helpers
const textNode = (value) => ({ nodeType: "text", value, marks: [], data: {} });
const boldNode = (value) => ({
  nodeType: "text",
  value,
  marks: [{ type: "bold" }],
  data: {},
});
const linkNode = (uri, label) => ({
  nodeType: "hyperlink",
  data: { uri },
  content: [textNode(label)],
});
const paragraph = (content) => ({ nodeType: "paragraph", data: {}, content });
const doc = (paras) => ({ nodeType: "document", data: {}, content: paras });

const POSTS = [
  {
    title: "Wetzel MC Honors Its President With an Honor Walk",
    slug: "honor-walk-jake-demoss",
    publishDate: "2022-09-22",
    // No cover image — respectful, text-only.
    excerpt:
      "After losing club president Jake DeMoss in a 2022 crash, Wetzel MC and riders from across the area gave him one last ride — an Honor Walk as he became an organ donor.",
    body: doc([
      paragraph([
        textNode(
          "In September 2022, the Wetzel Motorcycle Club lost its president, Jake DeMoss of Payne, following a crash on U.S. 224 near Convoy in Van Wert County. He was 48.",
        ),
      ]),
      paragraph([
        textNode(
          "Jake was an organ donor. When the time came, the club and riders from other area clubs, along with family and friends, gathered at the hospital for an Honor Walk — lining the hallway as he was moved from the ICU to surgery so his gift could reach others waiting for a transplant. It was, as the members put it, his last ride.",
        ),
      ]),
      paragraph([
        textNode("Club secretary Jesse Wallace said they chose to see it as a celebration of Jake's life: "),
        textNode("“It's really nice that he can give back at least one more time.”"),
      ]),
      paragraph([
        textNode(
          "It was Jake, one more time, doing what Wetzel MC has always been about — supporting the community and each other in the hard moments as well as the good ones. If his story moves you, consider adding the organ-donor designation to your license.",
        ),
      ]),
      paragraph([
        textNode("Source: "),
        linkNode(
          "https://www.limaohio.com/news/2022/09/22/motorcycle-club-honors-president-on-honor-walk/",
          "“Motorcycle Club honors president on Honor Walk,” The Lima News",
        ),
        textNode(" (Dean Brown, Sept. 22, 2022)."),
      ]),
    ]),
  },
];

async function main() {
  const client = createClient({ accessToken: CMA_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment("master");

  for (const post of POSTS) {
    const existing = await env.getEntries({
      content_type: "post",
      "fields.slug": post.slug,
      limit: 1,
    });
    if (existing.total > 0) {
      console.log(`✓ Post "${post.slug}" already exists — skipping`);
      continue;
    }

    const fields = {
      title: loc(post.title),
      slug: loc(post.slug),
      publishDate: loc(post.publishDate),
      excerpt: loc(post.excerpt),
      body: loc(post.body),
    };

    if (post.coverFile) {
      const imgPath = path.join(process.cwd(), "public", "history", post.coverFile);
      const upload = await env.createUpload({ file: readFileSync(imgPath) });
      let asset = await env.createAsset({
        fields: {
          title: loc(post.title),
          file: loc({
            contentType: post.coverFile.endsWith(".webp") ? "image/webp" : "image/jpeg",
            fileName: post.coverFile,
            uploadFrom: {
              sys: { type: "Link", linkType: "Upload", id: upload.sys.id },
            },
          }),
        },
      });
      asset = await asset.processForAllLocales({
        processingCheckWait: 2000,
        processingCheckRetries: 30,
      });
      asset = await asset.publish();
      fields.coverImage = loc({
        sys: { type: "Link", linkType: "Asset", id: asset.sys.id },
      });
    }

    const entry = await env.createEntry("post", { fields });
    await entry.publish();
    console.log(`✓ Published post: ${post.title}`);
  }
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
