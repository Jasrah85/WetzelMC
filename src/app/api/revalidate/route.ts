import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Contentful webhook target: POST /api/revalidate?secret=...
 *
 * Configure in Contentful: Settings → Webhooks → add a webhook pointing to
 *   https://<your-domain>/api/revalidate?secret=<CONTENTFUL_REVALIDATE_SECRET>
 * triggered on Entry publish/unpublish. Content then updates on the live site
 * within seconds instead of waiting for the hourly revalidation window.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.CONTENTFUL_REVALIDATE_SECRET || secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Revalidate all content-driven pages. Fine at this site's scale;
  // could be narrowed by inspecting the webhook payload's content type.
  for (const path of ["/", "/events", "/news", "/flyers", "/faq"]) {
    revalidatePath(path);
  }
  revalidatePath("/news/[slug]", "page");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
