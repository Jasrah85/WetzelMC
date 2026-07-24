import type { Document } from "@contentful/rich-text-types";

/** A news/blog post authored in Contentful. */
export interface Post {
  title: string;
  slug: string;
  publishDate: string; // ISO date
  excerpt?: string;
  body?: Document; // Contentful rich text
  coverImageUrl?: string;
  coverImageAlt?: string;
}

/** An event shown on the calendar and events pages. */
export interface ClubEvent {
  title: string;
  slug: string;
  startDate: string; // ISO datetime
  endDate?: string; // ISO datetime
  location?: string;
  description?: Document;
  ticketUrl?: string;
  flyerImageUrl?: string;
  category?: "party" | "music" | "games" | "charity" | "other";
}

/** A historical party flyer for the archive gallery. */
export interface Flyer {
  title: string;
  year: number;
  imageUrl: string;
}

/** A frequently asked question. */
export interface FaqItem {
  question: string;
  answer: Document;
  order?: number;
}
