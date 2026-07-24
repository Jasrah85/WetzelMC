import { NextResponse } from "next/server";
import { getEvents } from "@/lib/contentful";

// TEMPORARY diagnostic — delete this route once Contentful is confirmed working.
// Runs at request time, so it reflects the *runtime* env vars and does a live fetch.
// Never returns the secret values, only whether they're present and their length.
export const dynamic = "force-dynamic";

export async function GET() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID ?? "";
  const token = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";

  let liveEventCount: number | string;
  try {
    const events = await getEvents();
    liveEventCount = events.length;
  } catch (err) {
    liveEventCount = `error: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json({
    spaceIdPresent: spaceId.length > 0,
    spaceIdLength: spaceId.length,
    tokenPresent: token.length > 0,
    tokenLength: token.length,
    tokenLooksLikeManagementToken: token.startsWith("CFPAT-"),
    liveEventCount,
  });
}
