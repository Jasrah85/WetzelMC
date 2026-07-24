import type { Metadata } from "next";
import FacebookFeed from "@/components/FacebookFeed";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Wetzel MC about the club or upcoming events — Facebook Messenger, email, or mail.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-black text-white">Contact Us</h1>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-white">Message Us</h2>
            <p className="mt-2 text-zinc-400">
              The fastest way to reach us about the club or upcoming events is
              Facebook Messenger.
            </p>
            <a
              href="https://www.facebook.com/wetzelland/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded bg-orange-600 px-6 py-2.5 font-bold text-white hover:bg-orange-500"
            >
              Message Us on Facebook
            </a>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Email</h2>
            <a
              href="mailto:wetzelmc1987@gmail.com"
              className="mt-1 block text-orange-500 hover:underline"
            >
              wetzelmc1987@gmail.com
            </a>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Mail</h2>
            <p className="mt-1 text-zinc-300">
              Wetzel Motorcycle Club
              <br />
              PO Box 891
              <br />
              Van Wert, Ohio 45891
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Vendors</h2>
            <p className="mt-2 text-zinc-400">
              Food, tattoo, and goods vendors: download the vendor forms for
              complete information.
            </p>
            <a
              href="/vendor-forms.pdf"
              className="mt-2 inline-block text-orange-500 hover:underline"
            >
              Download Vendor Forms →
            </a>
            <p className="mt-1 text-xs text-zinc-600">
              (Place the vendor forms PDF at /public/vendor-forms.pdf)
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">Latest From Facebook</h2>
          <div className="mt-4">
            <FacebookFeed height={500} />
          </div>
        </div>
      </div>
    </div>
  );
}
