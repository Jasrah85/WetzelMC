/**
 * Adds the "Fallen Bikers Memorial" news post to Contentful, uploading a
 * local cover image from public/history. Idempotent: does nothing if a post
 * with this slug already exists.
 *
 * Usage (Git Bash):
 *   CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/add-memorial-post.mjs
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
      "  CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-xxx node scripts/add-memorial-post.mjs",
  );
  process.exit(1);
}

const loc = (v) => ({ "en-US": v });

// Rich-text helpers
const textNode = (value) => ({ nodeType: "text", value, marks: [], data: {} });
const linkNode = (uri, label) => ({
  nodeType: "hyperlink",
  data: { uri },
  content: [textNode(label)],
});
const paragraph = (content) => ({ nodeType: "paragraph", data: {}, content });
const doc = (paras) => ({ nodeType: "document", data: {}, content: paras });

const SLUG = "fallen-bikers-memorial";
const COVER_FILE = "fallen-bikers-memorial.webp"; // in public/history

const POST = {
  title: "A Place to Remember: The Fallen Bikers Memorial",
  slug: SLUG,
  publishDate: "2024-06-23",
  excerpt:
    "Just outside the Wetzelland grounds stands the Fallen Bikers Memorial — a tribute to the brothers and sisters we've lost, dedicated June 23, 2024 with fourteen names engraved in stone.",
  body: doc([
    paragraph([
      textNode(
        "Just outside the Wetzelland grounds, at 20985 Rd 12 in Grover Hill, stands a place built for remembering. The Fallen Bikers Memorial is Wetzel MC's tribute to the brothers and sisters who lost their lives in motorcycle accidents — a covered monument where their names live on in stone.",
      ),
    ]),
    paragraph([
      textNode(
        "The memorial was dedicated on Sunday, June 23, 2024, with the names of fourteen riders engraved for all to see. Old Man's motorcycle was raised alongside the monument, standing watch as a tribute to everyone we've lost. Beneath the sign's simple charge — Ride Free — it's a permanent place to gather, reflect, and honor the ride we all share.",
      ),
    ]),
    paragraph([
      textNode(
        "The Fallen Riders Memorial fundraisers woven through every Wetzelland weekend — the Presidents Dunk, the Chick Dunk, and more — help keep this tribute standing. Follow the ",
      ),
      linkNode(
        "https://www.facebook.com/profile.php?id=61561013616164",
        "memorial's Facebook page",
      ),
      textNode(
        " for details on how riders lost in accidents can have their names added to the stone.",
      ),
    ]),
  ]),
};

async function main() {
  const client = createClient({ accessToken: CMA_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment("master");

  const existing = await env.getEntries({
    content_type: "post",
    "fields.slug": SLUG,
    limit: 1,
  });
  if (existing.total > 0) {
    console.log("✓ Memorial post already exists — nothing to do.");
    return;
  }

  // 1. Upload the cover image from the local History folder
  console.log("Uploading cover image…");
  const imgPath = path.join(process.cwd(), "public", "history", COVER_FILE);
  const upload = await env.createUpload({ file: readFileSync(imgPath) });

  let asset = await env.createAsset({
    fields: {
      title: loc("Fallen Bikers Memorial"),
      description: loc("The Fallen Bikers Memorial at Wetzelland"),
      file: loc({
        contentType: "image/webp",
        fileName: COVER_FILE,
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
  console.log("✓ Cover image uploaded");

  // 2. Create + publish the post
  const entry = await env.createEntry("post", {
    fields: {
      title: loc(POST.title),
      slug: loc(POST.slug),
      publishDate: loc(POST.publishDate),
      excerpt: loc(POST.excerpt),
      body: loc(POST.body),
      coverImage: loc({
        sys: { type: "Link", linkType: "Asset", id: asset.sys.id },
      }),
    },
  });
  await entry.publish();
  console.log(`✓ Published post: ${POST.title}`);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
