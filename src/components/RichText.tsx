import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

/** Renders Contentful rich text with site typography. */
export default function RichText({ document }: { document?: Document }) {
  if (!document) return null;
  return (
    <div className="prose prose-invert prose-orange max-w-none">
      {documentToReactComponents(document)}
    </div>
  );
}
