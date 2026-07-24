import Link from "next/link";
import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { INLINES, type Document } from "@contentful/rich-text-types";

const options: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = (node.data as { uri?: string }).uri ?? "";
      const isInternal = uri.startsWith("/") || uri.startsWith("#");
      if (isInternal) {
        return (
          <Link href={uri} className="text-orange-500 hover:underline font-semibold">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:underline font-semibold"
        >
          {children}
        </a>
      );
    },
  },
};

/** Renders Contentful rich text with site typography. */
export default function RichText({ document }: { document?: Document }) {
  if (!document) return null;
  return (
    <div className="prose prose-invert prose-orange max-w-none">
      {documentToReactComponents(document, options)}
    </div>
  );
}
