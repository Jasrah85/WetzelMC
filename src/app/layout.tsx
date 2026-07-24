import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wetzelmc.com"),
  title: {
    default: "Wetzel Motorcycle Club | Wetzelland — Ohio's Longest-Running Biker Party",
    template: "%s | Wetzel MC",
  },
  description:
    "Wetzelland: The ultimate motorcycle party in Ohio. An adult-only celebration of motorcycle culture, camaraderie, and adventure — live music, bike games, camping, and more.",
  openGraph: {
    siteName: "Wetzelland",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
